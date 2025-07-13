import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import WelcomeEmail from "@/emails/welcome";
import { db } from "@/db";
import { usersTable, userEventTable, eventTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { generateIcsFile } from "@/lib/ics-generator";
import fs from "fs";
import path from "path";
import { fromZonedTime } from "date-fns-tz";

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_PUBLIC_APP_USER,
    pass: process.env.NEXT_PUBLIC_APP_PASS,
  },
});

const DEFAULT_EVENT_ID = 1;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      organisation,
      eventId = DEFAULT_EVENT_ID,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // 1. Get or create user
    let userId: number;
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      userId = existingUser[0].id;
    } else {
      const insertedUser = await db
        .insert(usersTable)
        .values({
          name,
          email,
          phone,
          organisation,
        })
        .returning({ id: usersTable.id });
      userId = insertedUser[0].id;
    }

    // 2. Get event details
    const event = await db
      .select()
      .from(eventTable)
      .where(eq(eventTable.id, eventId))
      .limit(1);

    if (event.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const eventDetails = event[0];

    // 3. Register user for event
    const existingRegistration = await db
      .select()
      .from(userEventTable)
      .where(
        and(
          eq(userEventTable.userId, userId),
          eq(userEventTable.eventId, eventId)
        )
      )
      .limit(1);

    if (existingRegistration.length === 0) {
      await db.insert(userEventTable).values({
        userId,
        eventId,
      });
    }

    // 4. Send confirmation email
    const eventDate = eventDetails.date; // Already in YYYY-MM-DD format
    const startTime = eventDetails.startTime; // Already in HH:MM format
    const endTime = eventDetails.endTime; // Already in HH:MM format

    // Australian Eastern timezone (handles both AEST and AEDT automatically)
    const timezone = "Australia/Sydney";

    // Create start and end datetime in Australian Eastern timezone
    const startDateTime = fromZonedTime(`${eventDate} ${startTime}`, timezone);
    const endDateTime = fromZonedTime(`${eventDate} ${endTime}`, timezone);

    // Prepare email template props
    const emailProps = {
      name,
      email,
      eventTitle: eventDetails.eventName,
      eventDescription: eventDetails.description,
      eventLocation: "Online",
      eventDate: eventDate,
      eventStartTime: startTime,
      eventEndTime: endTime,
      zoomLink: eventDetails.zoomLink,
      organizerEmail:
        eventDetails.organizerEmail || "RayJ@inspirepartners.com.au",
      webinarImageCid: "webinar-image",
      logoCid: "email-logo",
    };

    // Generate ICS file content
    const icsContent = await generateIcsFile({
      title: emailProps.eventTitle,
      description: emailProps.eventDescription,
      location: emailProps.eventLocation,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      zoomLink: emailProps.zoomLink,
      organizerEmail: emailProps.organizerEmail,
      organizerName: "Inspire Partners",
      attendeeEmail: email,
      attendeeName: name,
    });

    // Render the React email template to HTML
    const emailHtml = await render(WelcomeEmail(emailProps));

    // Prepare attachments
    const attachments: any[] = [
      {
        filename: "event.ics",
        content: icsContent,
        contentType: "text/calendar",
      },
    ];

    // Add logo image if it exists
    try {
      const logoExtensions = [".png", ".jpg", ".jpeg"];
      let logoPath = "";
      let contentType = "";
      let filename = "";

      for (const ext of logoExtensions) {
        const testPath = path.join(
          process.cwd(),
          "public",
          "email-logo",
          `email-logo${ext}`
        );
        if (fs.existsSync(testPath)) {
          logoPath = testPath;
          filename = `email-logo${ext}`;
          contentType = ext === ".png" ? "image/png" : "image/jpeg";
          break;
        }
      }

      if (logoPath) {
        attachments.push({
          filename,
          path: logoPath,
          cid: "email-logo",
          contentType,
        });
      }
    } catch (error) {
      console.log("Email logo not found, skipping attachment");
    }

    // Add webinar image if it exists
    try {
      const webinarImagePath = path.join(
        process.cwd(),
        "public",
        "webinar",
        "webinar-image.jpg"
      );
      if (fs.existsSync(webinarImagePath)) {
        attachments.push({
          filename: "webinar-image.jpg",
          path: webinarImagePath,
          cid: "webinar-image",
          contentType: "image/jpeg",
        });
      }
    } catch (error) {
      console.log("Webinar image not found, skipping attachment");
    }

    // Email options
    const mailOptions = {
      from: `"Inspire Partners" <${process.env.NEXT_PUBLIC_APP_USER}>`,
      to: email,
      subject: `You're Registered for ${eventDetails.eventName}!`,
      html: emailHtml,
      text: `Hello ${name}! You've successfully registered for ${eventDetails.eventName} on ${eventDate} at ${startTime}. Join via Zoom: ${eventDetails.zoomLink}. We look forward to seeing you there!`,
      attachments,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Registration successful and confirmation email sent",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
