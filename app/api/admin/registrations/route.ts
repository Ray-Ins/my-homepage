import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { userEventTable } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const eventIdParam = searchParams.get("eventId");
    if (!eventIdParam) {
      return NextResponse.json({ error: "Missing eventId" }, { status: 400 });
    }
    const eventId = Number(eventIdParam);
    if (Number.isNaN(eventId)) {
      return NextResponse.json({ error: "Invalid eventId" }, { status: 400 });
    }

    const result = await db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(userEventTable)
      .where(eq(userEventTable.eventId, eventId));

    const count = result[0]?.count ?? 0;
    return NextResponse.json({ eventId, count });
  } catch (error) {
    console.error("Failed to fetch registrations count:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations count" },
      { status: 500 }
    );
  }
}
