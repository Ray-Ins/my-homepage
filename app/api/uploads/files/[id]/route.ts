import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { submissionFilesTable } from "@/db/schema";
import { requireUser, authErrorResponse } from "@/lib/authz";
import { deleteObject } from "@/lib/r2";
import { audit, findFile, isUuid } from "@/lib/submissions";

/** Removes a file from the user's draft. Submitted files can never be deleted. */
export async function DELETE(
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
      return NextResponse.json(
        { error: "Submitted files cannot be removed" },
        { status: 409 }
      );
    }

    await deleteObject(file.r2Key);
    await db.delete(submissionFilesTable).where(eq(submissionFilesTable.id, file.id));

    if (file.status === "uploaded") {
      await audit(user, "remove_draft", {
        submissionId: submission.id,
        fileId: file.id,
        fileName: file.originalName,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const authRes = authErrorResponse(error);
    if (authRes) return authRes;
    console.error("Failed to remove file:", error);
    return NextResponse.json({ error: "Failed to remove file" }, { status: 500 });
  }
}
