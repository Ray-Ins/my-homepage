import { and, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import {
  fileAuditLogsTable,
  submissionFilesTable,
  submissionsTable,
} from "@/db/schema";
import type { AuthedUser } from "@/lib/authz";
import { requestMeta } from "@/lib/authz";

export type FileRow = typeof submissionFilesTable.$inferSelect;
export type SubmissionRow = typeof submissionsTable.$inferSelect;

export function toFileDto(f: FileRow) {
  return {
    id: f.id,
    name: f.originalName,
    contentType: f.contentType,
    size: f.size,
    sha256: f.sha256,
    status: f.status,
    uploadedAt: f.uploadedAt,
  };
}

export type FileDto = ReturnType<typeof toFileDto>;

/** Attaches files to each submission, preserving submission order. */
export async function withFiles(submissions: SubmissionRow[]) {
  if (submissions.length === 0) return [];
  const files = await db
    .select()
    .from(submissionFilesTable)
    .where(
      inArray(
        submissionFilesTable.submissionId,
        submissions.map((s) => s.id)
      )
    )
    .orderBy(submissionFilesTable.createdAt);

  return submissions.map((s) => ({
    ...s,
    files: files
      .filter(
        (f) =>
          f.submissionId === s.id &&
          (s.status === "draft" || f.status === "uploaded")
      )
      .map(toFileDto),
  }));
}

export async function listUserSubmissions(userId: string) {
  const rows = await db
    .select()
    .from(submissionsTable)
    .where(eq(submissionsTable.userId, userId))
    .orderBy(desc(submissionsTable.createdAt));
  return withFiles(rows);
}

/** Returns the user's open draft, creating it if needed. */
export async function getOrCreateDraft(user: AuthedUser) {
  const find = () =>
    db
      .select()
      .from(submissionsTable)
      .where(
        and(
          eq(submissionsTable.userId, user.id),
          eq(submissionsTable.status, "draft")
        )
      )
      .limit(1);

  const [existing] = await find();
  if (existing) return existing;

  // Partial unique index guarantees one draft per user under concurrency.
  await db
    .insert(submissionsTable)
    .values({ userId: user.id, userEmail: user.email, userName: user.name })
    .onConflictDoNothing();
  const [draft] = await find();
  return draft;
}

/** Loads a file together with its submission, optionally scoped to an owner. */
export async function findFile(fileId: string, ownerId?: string) {
  const conditions = [eq(submissionFilesTable.id, fileId)];
  if (ownerId) conditions.push(eq(submissionsTable.userId, ownerId));
  const [row] = await db
    .select({ file: submissionFilesTable, submission: submissionsTable })
    .from(submissionFilesTable)
    .innerJoin(
      submissionsTable,
      eq(submissionFilesTable.submissionId, submissionsTable.id)
    )
    .where(and(...conditions))
    .limit(1);
  return row ?? null;
}

export async function audit(
  actor: AuthedUser,
  action: (typeof fileAuditLogsTable.$inferInsert)["action"],
  target: { submissionId?: string; fileId?: string; fileName?: string }
) {
  const meta = await requestMeta();
  await db.insert(fileAuditLogsTable).values({
    action,
    submissionId: target.submissionId,
    fileId: target.fileId,
    fileName: target.fileName,
    actorUserId: actor.id,
    actorEmail: actor.email,
    actorRole: actor.role ?? "user",
    ipAddress: meta.ipAddress,
    userAgent: meta.userAgent,
  });
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (s: string) => UUID_RE.test(s);
