import { NextRequest, NextResponse } from "next/server";
import { requireUser, authErrorResponse } from "@/lib/authz";
import { presignGet } from "@/lib/r2";
import { audit, findFile, isUuid } from "@/lib/submissions";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const { id } = await params;
    if (!isUuid(id)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const row = await findFile(id, user.id);
    if (!row || row.file.status !== "uploaded") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const { file, submission } = row;
    const mode = req.nextUrl.searchParams.get("mode") === "download" ? "download" : "preview";

    const url = await presignGet({
      key: file.r2Key,
      fileName: file.originalName,
      contentType: file.contentType,
      disposition: mode === "download" ? "attachment" : "inline",
    });

    await audit(user, mode, {
      submissionId: submission.id,
      fileId: file.id,
      fileName: file.originalName,
    });

    return NextResponse.json({ url });
  } catch (error) {
    const authRes = authErrorResponse(error);
    if (authRes) return authRes;
    console.error("Failed to sign file URL:", error);
    return NextResponse.json({ error: "Failed to open file" }, { status: 500 });
  }
}
