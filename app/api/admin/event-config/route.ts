import { NextResponse } from "next/server";
import { db } from "@/db";
import { eventTable } from "@/db/schema";

// event config route is for create an event
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Extract event data from request
    const {
      eventTitle,
      eventDescription,
      eventLocation,
      eventDate,
      eventTime,
      eventDuration,
      eventStartTime,
      eventEndTime,
      zoomLink,
      organizerEmail,
    } = body;

    // Format end time properly
    const formatTime = (timeStr) => {
      try {
        const date = new Date(timeStr);
        return date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      } catch (err) {
        return timeStr; // Return original if parsing fails
      }
    };

    // Insert event into database
    const newEvent = await db
      .insert(eventTable)
      .values({
        eventName: eventTitle,
        description: eventDescription,
        date: eventDate, // Use the date string directly
        startTime: eventTime, // Use the time string directly
        endTime: formatTime(eventEndTime), // Format end time safely
        zoomLink: zoomLink || "",
        organizerEmail: organizerEmail || "",
        available: true,
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: "Event created successfully",
      event: newEvent[0],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create event" },
      { status: 500 }
    );
  }
}
