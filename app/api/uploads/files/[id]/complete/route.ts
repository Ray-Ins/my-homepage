import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { submissionFilesTable } from "@/db/schema";
import { requireUser, authErrorResponse } from "@/lib/authz";
import { deleteObject, headObject } from "@/lib/r2";
import { audit, findFile, isUuid, toFileDto } from "@/lib/submissions";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const { id } = await params;
    if (!isUuid(id)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const row = await findFile(id, user.id);
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const { file, submission } = row;

    if (submission.status !== "draft") {
      return NextResponse.json({ error: "Submission is locked" }, { status: 409 });
    }
    if (file.status === "uploaded") {
      return NextResponse.json({ file: toFileDto(file) });
    }

    const head = await headObject(file.r2Key);
    if (!head) {
      return NextResponse.json(
        { error: "Upload not found in storage. Please retry." },
        { status: 400 }
      );
    }

    const expectedChecksum = Buffer.from(file.sha256, "hex").toString("base64");
    const mismatch =
      head.ContentLength !== file.size ||
      head.ContentType !== file.contentType ||
      (head.ChecksumSHA256 !== undefined && head.ChecksumSHA256 !== expectedChecksum);

    if (mismatch) {
      await deleteObject(file.r2Key);
      await db.delete(submissionFilesTable).where(eq(submissionFilesTable.id, file.id));
      return NextResponse.json(
        { error: "Uploaded file did not match. Please upload it again." },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(submissionFilesTable)
      .set({ status: "uploaded", uploadedAt: new Date() })
      .where(
        and(
          eq(submissionFilesTable.id, file.id),
          eq(submissionFilesTable.status, "pending")
        )
      )
      .returning();

    await audit(user, "upload", {
      submissionId: submission.id,
      fileId: file.id,
      fileName: file.originalName,
    });

    return NextResponse.json({ file: toFileDto(updated ?? file) });
  } catch (error) {
    const authRes = authErrorResponse(error);
    if (authRes) return authRes;
    console.error("Failed to complete upload:", error);
    return NextResponse.json({ error: "Failed to verify upload" }, { status: 500 });
  }
}
