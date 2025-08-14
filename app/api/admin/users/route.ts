import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable, userEventTable } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const eventIdParam = searchParams.get("eventId");

    if (eventIdParam) {
      const eventId = Number(eventIdParam);
      if (Number.isNaN(eventId)) {
        return NextResponse.json({ error: "Invalid eventId" }, { status: 400 });
      }

      const usersForEvent = await db
        .select({
          id: usersTable.id,
          name: usersTable.name,
          email: usersTable.email,
          phone: usersTable.phone,
          organisation: usersTable.organisation,
          registeredAt: userEventTable.registeredAt,
        })
        .from(userEventTable)
        .innerJoin(usersTable, eq(userEventTable.userId, usersTable.id))
        .where(eq(userEventTable.eventId, eventId))
        .orderBy(asc(userEventTable.registeredAt));

      return NextResponse.json(usersForEvent);
    }

    const users = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        phone: usersTable.phone,
        organisation: usersTable.organisation,
      })
      .from(usersTable)
      .orderBy(asc(usersTable.id));

    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
