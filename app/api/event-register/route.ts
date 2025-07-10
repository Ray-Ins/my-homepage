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

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_PUBLIC_APP_USER,
    pass: process.env.NEXT_PUBLIC_APP_PASS,
  },
});

//FIXME: modify this later
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

    // 1. First, get or create the user
    let userId: number;

    try {
      // Check if user exists
      const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);

      if (existingUser.length > 0) {
        // User exists
        userId = existingUser[0].id;
      } else {
        // Create new user
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
    } catch (dbError: any) {
      return NextResponse.json(
        { error: "Failed to register user" },
        { status: 500 }
      );
    }

    // 2. Get event details
    let eventDetails;
    try {
      const event = await db
        .select()
        .from(eventTable)
        .where(eq(eventTable.id, eventId))
        .limit(1);

      if (event.length === 0) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      eventDetails = event[0];
    } catch (eventError) {
      return NextResponse.json(
        { error: "Get event details failed" },
        { status: 500 }
      );
    }

    // 3. Register user for the event (create relationship in the junction table)
    try {
      // Check if the user is already registered for this event
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
        // User not registered yet, create the relationship
        await db.insert(userEventTable).values({
          userId,
          eventId,
        });
      }
      // If already registered, we don't need to do anything
    } catch (registrationError) {
      return NextResponse.json(
        { error: "Failed to register for the event" },
        { status: 500 }
      );
    }

    // 4. Send confirmation email
    try {
      // Format date properly to avoid invalid date errors
      const formatDateTime = (dateStr, timeStr) => {
        try {
          // Convert date to string if it's a Date object
          let formattedDate = "";
          if (dateStr instanceof Date) {
            formattedDate = dateStr.toISOString().split("T")[0]; // YYYY-MM-DD
          } else if (typeof dateStr === "string") {
            // Extract just the date part if it's already in YYYY-MM-DD format
            formattedDate = dateStr.split("T")[0];
          } else {
            formattedDate = new Date().toISOString().split("T")[0];
          }

          // Handle timeStr more carefully - it might contain full datetime
          let formattedTime = String(timeStr || "00:00");

          // If timeStr contains a 'T', extract just the time part
          if (formattedTime.includes("T")) {
            const timePart = formattedTime.split("T")[1];
            formattedTime = timePart ? timePart.split(".")[0] : "00:00"; // Remove milliseconds if present
          }

          // Remove any whitespace and Z suffix
          formattedTime = formattedTime.trim().replace("Z", "");

          // Ensure it has colon and is in HH:MM format
          if (!formattedTime.includes(":")) {
            formattedTime = `${formattedTime}:00`;
          }

          // Parse the time components
          const [hours, minutes] = formattedTime.split(":").map(Number);
          const [year, month, day] = formattedDate.split("-").map(Number);

          // Create a local date (not UTC) - this represents the actual event time
          const date = new Date(year, month - 1, day, hours, minutes, 0, 0);

          // Validate the date
          if (isNaN(date.getTime())) {
            console.warn(
              `Invalid date created from: dateStr: ${dateStr}, timeStr: ${timeStr}`
            );
            return new Date(); // Return current date as fallback
          }

          console.log(
            `Successfully created local date: ${date.toISOString()} from dateStr: ${dateStr}, timeStr: ${timeStr}`
          );
          return date;
        } catch (err) {
          console.error("Error in formatDateTime:", err);
          console.error(
            `Failed inputs - dateStr: ${dateStr}, timeStr: ${timeStr}`
          );
          return new Date(); // Return current date as fallback
        }
      };

      // Safe wrapper for toISOString
      const safeToISOString = (date) => {
        try {
          return date.toISOString();
        } catch (err) {
          return new Date().toISOString(); // Fallback to current date
        }
      };

      // Prepare email template props
      const emailProps = {
        name,
        email,
        eventTitle: eventDetails.eventName,
        eventDescription: eventDetails.description,
        eventLocation: eventDetails.location || "Online",
        eventStartTime: safeToISOString(
          formatDateTime(eventDetails.date, eventDetails.startTime)
        ),
        eventEndTime: safeToISOString(
          formatDateTime(eventDetails.date, eventDetails.endTime)
        ),
        zoomLink: eventDetails.zoomLink,
        organizerEmail:
          eventDetails.organizerEmail || "inspirepartnersau@gmail.com",
        // Add CID references for images
        webinarImageCid: "webinar-image",
        logoCid: "company-logo",
      };

      // Generate ICS file content
      const icsContent = await generateIcsFile({
        title: emailProps.eventTitle,
        description:
          emailProps.eventDescription || `Welcome onboarding for ${name}`,
        location: emailProps.eventLocation,
        start: emailProps.eventStartTime,
        end: emailProps.eventEndTime,
        zoomLink: emailProps.zoomLink,
        organizerEmail: emailProps.organizerEmail,
        organizerName: "Inspire Partners",
        attendeeEmail: email,
        attendeeName: name,
      });

      // Render the React email template to HTML
      const emailHtml = await render(WelcomeEmail(emailProps));

      // Prepare image attachments (you can customize these paths)
      const attachments: any[] = [
        // ICS calendar file (existing)
        {
          filename: "event.ics",
          content: icsContent,
          contentType: "text/calendar",
        },
      ];

      // Add logo image if it exists
      try {
        const logoPath = path.join(process.cwd(), "public", "Logo.png");
        if (fs.existsSync(logoPath)) {
          attachments.push({
            filename: "logo.png",
            path: logoPath,
            cid: "company-logo", // This matches the logoCid in emailProps
            contentType: "image/png",
          });
        }
      } catch (error) {
        console.log("Logo image not found, skipping attachment");
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
            cid: "webinar-image", // This matches the webinarImageCid in emailProps
            contentType: "image/jpeg",
          });
        }
      } catch (error) {
        console.log("Webinar image not found, skipping attachment");
      }

      // Email options with attachments
      const mailOptions = {
        from: `"Inspire Partners" <${process.env.NEXT_PUBLIC_APP_USER}>`,
        to: email,
        subject: `You're Registered for ${eventDetails.eventName}!`,
        html: emailHtml,
        text: `Hello ${name}! You've successfully registered for ${eventDetails.eventName} on ${
          typeof eventDetails.date === "string"
            ? eventDetails.date
            : eventDetails.date instanceof Date
              ? eventDetails.date.toLocaleDateString()
              : "the scheduled date"
        } at ${eventDetails.startTime}. Join via Zoom: ${eventDetails.zoomLink}. We look forward to seeing you there!`,
        attachments,
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);

      return NextResponse.json({
        success: true,
        message: "Registration successful and confirmation email sent",
        messageId: info.messageId,
      });
    } catch (emailError) {
      // User was registered but email failed
      return NextResponse.json(
        {
          success: true,
          message:
            "Registration successful but failed to send confirmation email",
        },
        { status: 207 }
      ); // 207 Multi-Status
    }
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
