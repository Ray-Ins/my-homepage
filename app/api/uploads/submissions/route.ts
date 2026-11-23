import { NextResponse } from "next/server";
import { requireUser, authErrorResponse } from "@/lib/authz";
import { listUserSubmissions } from "@/lib/submissions";

export async function GET() {
  try {
    const user = await requireUser();
    const submissions = await listUserSubmissions(user.id);
    return NextResponse.json({
      draft: submissions.find((s) => s.status === "draft") ?? null,
      submitted: submissions.filter((s) => s.status === "submitted"),
    });
  } catch (error) {
    const authRes = authErrorResponse(error);
    if (authRes) return authRes;
    console.error("Failed to list submissions:", error);
    return NextResponse.json({ error: "Failed to load submissions" }, { status: 500 });
  }
}
