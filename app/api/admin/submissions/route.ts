import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { submissionsTable } from "@/db/schema";
import { requireAdmin, authErrorResponse } from "@/lib/authz";
import { withFiles } from "@/lib/submissions";

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = req.nextUrl;
    const q = searchParams.get("q")?.trim();
    const page = Math.max(1, Number(searchParams.get("page")) || 1);

    const conditions = [eq(submissionsTable.status, "submitted")];
    if (q) {
      const pattern = `%${q.replace(/[%_\\]/g, "\\$&")}%`;
      conditions.push(
        or(
          ilike(submissionsTable.userEmail, pattern),
          ilike(submissionsTable.userName, pattern)
        )!
      );
    }
    const where = and(...conditions);

    const [rows, [{ total }]] = await Promise.all([
      db
        .select()
        .from(submissionsTable)
        .where(where)
        .orderBy(desc(submissionsTable.submittedAt))
        .limit(PAGE_SIZE)
        .offset((page - 1) * PAGE_SIZE),
      db
        .select({ total: sql<number>`cast(count(*) as int)` })
        .from(submissionsTable)
        .where(where),
    ]);

    return NextResponse.json({
      submissions: await withFiles(rows),
      total,
      page,
      pageSize: PAGE_SIZE,
    });
  } catch (error) {
    const authRes = authErrorResponse(error);
    if (authRes) return authRes;
    console.error("Failed to list submissions:", error);
    return NextResponse.json({ error: "Failed to load submissions" }, { status: 500 });
  }
}
