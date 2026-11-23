/**
 * Deletes abandoned uploads: files in drafts untouched for DRAFT_TTL_DAYS, and
 * pending files that never completed. Submitted files are never touched.
 *
 *   npm run uploads:cleanup            (dry run)
 *   npm run uploads:cleanup -- --apply
 */
import "dotenv/config";
import { and, eq, inArray, lt, or } from "drizzle-orm";
import { db } from "../db";
import { submissionFilesTable, submissionsTable } from "../db/schema";
import { deleteObject } from "../lib/r2";

const DRAFT_TTL_DAYS = 7;
const PENDING_TTL_HOURS = 24;

async function main() {
  const apply = process.argv.includes("--apply");
  const draftCutoff = new Date(Date.now() - DRAFT_TTL_DAYS * 86_400_000);
  const pendingCutoff = new Date(Date.now() - PENDING_TTL_HOURS * 3_600_000);

  const rows = await db
    .select({ file: submissionFilesTable, submission: submissionsTable })
    .from(submissionFilesTable)
    .innerJoin(submissionsTable, eq(submissionFilesTable.submissionId, submissionsTable.id))
    .where(
      or(
        and(eq(submissionsTable.status, "draft"), lt(submissionFilesTable.createdAt, draftCutoff)),
        and(eq(submissionFilesTable.status, "pending"), lt(submissionFilesTable.createdAt, pendingCutoff))
      )
    );

  console.log(`${rows.length} abandoned file(s) found.`);
  for (const { file, submission } of rows) {
    console.log(`- [${submission.status}/${file.status}] ${submission.userEmail} ${file.originalName}`);
  }
  if (!apply || rows.length === 0) {
    if (!apply) console.log("Dry run. Re-run with --apply to delete.");
    return;
  }

  for (const { file } of rows) {
    await deleteObject(file.r2Key);
  }
  await db.delete(submissionFilesTable).where(
    inArray(
      submissionFilesTable.id,
      rows.map((r) => r.file.id)
    )
  );
  console.log("Deleted.");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
