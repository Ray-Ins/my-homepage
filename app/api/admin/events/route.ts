import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { eventTable } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function GET(_req: NextRequest) {
  try {
    const events = await db
      .select()
      .from(eventTable)
      .orderBy(asc(eventTable.date));
    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      eventName,
      description,
      date,
      startTime,
      endTime,
      zoomLink,
      organizerEmail,
      available,
    } = body;
    if (
      !eventName ||
      !description ||
      !date ||
      !startTime ||
      !endTime ||
      !zoomLink ||
      !organizerEmail
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const [inserted] = await db
      .insert(eventTable)
      .values({
        eventName,
        description,
        date,
        startTime,
        endTime,
        zoomLink,
        organizerEmail,
        available: Boolean(available),
      })
      .returning();
    return NextResponse.json(inserted, { status: 201 });
  } catch (error) {
    console.error("Failed to create event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
