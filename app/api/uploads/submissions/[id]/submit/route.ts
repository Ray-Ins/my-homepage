import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { submissionFilesTable, submissionsTable } from "@/db/schema";
import { requireUser, authErrorResponse } from "@/lib/authz";
import { mailer } from "@/lib/mailer";
import { audit, isUuid } from "@/lib/submissions";

const bodySchema = z.object({
  note: z.string().trim().max(2000).optional(),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const { id } = await params;
    if (!isUuid(id)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const parsed = bodySchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) {
      return NextResponse.json({ error: "Note is too long" }, { status: 400 });
    }

    const [submission] = await db
      .select()
      .from(submissionsTable)
      .where(and(eq(submissionsTable.id, id), eq(submissionsTable.userId, user.id)))
      .limit(1);
    if (!submission) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (submission.status !== "draft") {
      return NextResponse.json({ error: "Already submitted" }, { status: 409 });
    }

    const files = await db
      .select()
      .from(submissionFilesTable)
      .where(eq(submissionFilesTable.submissionId, submission.id));
    if (files.length === 0) {
      return NextResponse.json({ error: "Add at least one file" }, { status: 400 });
    }
    if (files.some((f) => f.status !== "uploaded")) {
      return NextResponse.json(
        { error: "Some files are still uploading or failed. Remove or retry them first." },
        { status: 400 }
      );
    }

    const [locked] = await db
      .update(submissionsTable)
      .set({
        status: "submitted",
        submittedAt: new Date(),
        note: parsed.data.note || null,
        userName: user.name,
        userEmail: user.email,
      })
      .where(and(eq(submissionsTable.id, submission.id), eq(submissionsTable.status, "draft")))
      .returning();
    if (!locked) {
      return NextResponse.json({ error: "Already submitted" }, { status: 409 });
    }

    await audit(user, "submit", { submissionId: submission.id });

    try {
      await mailer.sendMail({
        from: `"Inspire Partners" <${process.env.NEXT_PUBLIC_APP_USER}>`,
        to: user.email,
        subject: "We've received your documents",
        text: [
          `Hi ${user.name},`,
          "",
          `We've received your submission of ${files.length} file(s) on ${locked.submittedAt?.toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}:`,
          ...files.map((f) => `- ${f.originalName}`),
          "",
          "Reference: " + submission.id,
          "",
          "Inspire Partners",
        ].join("\n"),
      });
    } catch (emailError) {
      console.error("Submission confirmation email failed:", emailError);
    }

    return NextResponse.json({ ok: true, submissionId: submission.id });
  } catch (error) {
    const authRes = authErrorResponse(error);
    if (authRes) return authRes;
    console.error("Failed to submit:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
