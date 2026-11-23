import { NextRequest, NextResponse } from "next/server";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { fileAuditLogsTable } from "@/db/schema";
import { requireAdmin, authErrorResponse } from "@/lib/authz";
import { isUuid } from "@/lib/submissions";

const PAGE_SIZE = 50;

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = req.nextUrl;
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const submissionId = searchParams.get("submissionId");
    const where =
      submissionId && isUuid(submissionId)
        ? eq(fileAuditLogsTable.submissionId, submissionId)
        : undefined;

    const [logs, [{ total }]] = await Promise.all([
      db
        .select()
        .from(fileAuditLogsTable)
        .where(where)
        .orderBy(desc(fileAuditLogsTable.createdAt))
        .limit(PAGE_SIZE)
        .offset((page - 1) * PAGE_SIZE),
      db
        .select({ total: sql<number>`cast(count(*) as int)` })
        .from(fileAuditLogsTable)
        .where(where),
    ]);

    return NextResponse.json({ logs, total, page, pageSize: PAGE_SIZE });
  } catch (error) {
    const authRes = authErrorResponse(error);
    if (authRes) return authRes;
    console.error("Failed to list audit logs:", error);
    return NextResponse.json({ error: "Failed to load audit logs" }, { status: 500 });
  }
}
