import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { submissionFilesTable } from "@/db/schema";
import { requireUser, authErrorResponse } from "@/lib/authz";
import { presignPut } from "@/lib/r2";
import { getOrCreateDraft, toFileDto } from "@/lib/submissions";
import {
  MAX_FILE_SIZE,
  MAX_FILES_PER_SUBMISSION,
  resolveContentType,
} from "@/lib/upload-rules";

const bodySchema = z.object({
  name: z.string().trim().min(1).max(255),
  size: z.number().int().positive().max(MAX_FILE_SIZE),
  type: z.string().max(255),
  sha256: z.string().regex(/^[0-9a-f]{64}$/),
});

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const parsed = bodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid file. Check the file size (max 25MB)." },
        { status: 400 }
      );
    }
    const { name, size, type, sha256 } = parsed.data;

    const contentType = resolveContentType(name, type);
    if (!contentType) {
      return NextResponse.json(
        { error: "File type not allowed. Use PDF, Word, Excel, JPG or PNG." },
        { status: 400 }
      );
    }

    const draft = await getOrCreateDraft(user);

    const [{ count }] = await db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(submissionFilesTable)
      .where(eq(submissionFilesTable.submissionId, draft.id));
    if (count >= MAX_FILES_PER_SUBMISSION) {
      return NextResponse.json(
        { error: `A submission can contain at most ${MAX_FILES_PER_SUBMISSION} files.` },
        { status: 400 }
      );
    }

    const fileId = randomUUID();
    const key = `submissions/${user.id}/${draft.id}/${fileId}`;

    const [file] = await db
      .insert(submissionFilesTable)
      .values({
        id: fileId,
        submissionId: draft.id,
        r2Key: key,
        originalName: name,
        contentType,
        size,
        sha256,
      })
      .returning();

    const sha256Base64 = Buffer.from(sha256, "hex").toString("base64");
    const uploadUrl = await presignPut({ key, contentType, size, sha256Base64 });

    return NextResponse.json({
      submissionId: draft.id,
      file: toFileDto(file),
      upload: {
        url: uploadUrl,
        headers: {
          "Content-Type": contentType,
          "x-amz-checksum-sha256": sha256Base64,
        },
      },
    });
  } catch (error) {
    const authRes = authErrorResponse(error);
    if (authRes) return authRes;
    console.error("Failed to create upload:", error);
    return NextResponse.json({ error: "Failed to start upload" }, { status: 500 });
  }
}
