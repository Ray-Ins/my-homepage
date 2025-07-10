import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface WelcomeEmailProps {
  name: string;
  email: string;
  eventTitle?: string;
  eventDescription?: string;
  eventLocation?: string;
  eventStartTime?: string; // ISO format
  eventEndTime?: string; // ISO format
  zoomLink?: string; // Zoom meeting link
  organizerEmail?: string; // Email of the event organizer/admin
  webinarImageCid?: string; // Content ID for attached webinar image
  logoCid?: string; // Content ID for attached logo
}

// Helper function to safely parse dates
const safeParseDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return new Date(); // Return current date as fallback
    }
    return date;
  } catch (err) {
    return new Date(); // Return current date as fallback
  }
};

// Helper function to format date and time correctly
const formatEventDateTime = (eventStartTime: string) => {
  try {
    // Parse the ISO string directly without timezone conversion
    const isoString = eventStartTime;

    // Extract date and time components directly from the ISO string
    // Format: "2025-07-30T20:30:00.000Z"
    const [datePart, timePart] = isoString.split("T");

    if (!datePart || !timePart) {
      throw new Error("Invalid ISO string format");
    }

    // Parse date components
    const [year, month, day] = datePart.split("-").map(Number);

    // Parse time components (remove Z and any milliseconds)
    const timeOnly = timePart.replace("Z", "").split(".")[0]; // "20:30:00"
    const [hours, minutes] = timeOnly.split(":").map(Number);

    // Format date
    const dateObj = new Date(year, month - 1, day); // month is 0-indexed
    const eventDate = dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Format time - convert 24h to 12h format
    let displayHours = hours;
    const ampm = hours >= 12 ? "PM" : "AM";

    if (hours === 0) {
      displayHours = 12; // 00:xx becomes 12:xx AM
    } else if (hours > 12) {
      displayHours = hours - 12; // 13:xx becomes 1:xx PM
    }

    const eventTime = `${displayHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;

    return { eventDate, eventTime };
  } catch (err) {
    console.error(
      "Error formatting event date/time:",
      err,
      "Input:",
      eventStartTime
    );
    return {
      eventDate: "Date to be announced",
      eventTime: "Time to be announced",
    };
  }
};

export default function WelcomeEmail({
  name,
  email,
  eventTitle,
  eventDescription,
  eventLocation,
  eventStartTime,
  eventEndTime,
  zoomLink,
  organizerEmail,
  webinarImageCid,
  logoCid,
}: WelcomeEmailProps) {
  // Check if we have event details
  const hasEventDetails = eventStartTime && eventEndTime && eventTitle;

  // Format event date and time for display
  let eventDate = "";
  let eventTime = "";

  if (hasEventDetails) {
    const { eventDate: formattedDate, eventTime: formattedTime } =
      formatEventDateTime(eventStartTime!);
    eventDate = formattedDate;
    eventTime = formattedTime;
  }

  return (
    <div>
      <Html>
        <Head />
        <Preview>Welcome to our platform, {name}!</Preview>
        <Tailwind>
          <Body className="bg-gray-100 font-sans">
            <Container className="bg-white mx-auto my-10 p-5 max-w-4xl rounded shadow">
              {/* Logo Section - if logo CID is provided */}
              {logoCid && (
                <Section className="text-center mb-6">
                  <Img
                    src={`cid:${logoCid}`}
                    alt="Company Logo"
                    width="200"
                    className="mx-auto"
                  />
                </Section>
              )}

              <Heading className="text-2xl font-bold text-center text-gray-800 my-6">
                Welcome, {name}!
              </Heading>
              <Text className="text-gray-600 text-base leading-6 mb-4">
                Thank you for joining our event. We are thrilled to have you on
                board!
              </Text>
              <Text className="text-gray-600 text-base leading-6 mb-4">
                Your registered email is: <strong>{email}</strong>
              </Text>

              {/* Calendar Event Section - Only show if we have event details */}
              {hasEventDetails && (
                <>
                  <Hr className="border-t border-gray-300 my-6" />
                  <Heading className="text-xl font-bold text-gray-800 mb-4">
                    Join Our Event
                  </Heading>

                  <Text className="text-gray-600 text-base leading-6 mb-2">
                    <strong>Date:</strong> {eventDate}
                  </Text>
                  <Text className="text-gray-600 text-base leading-6 mb-2">
                    <strong>Time:</strong> {eventTime}
                  </Text>
                  <Text className="text-gray-600 text-base leading-6 mb-2">
                    <strong>Location:</strong> {eventLocation || "Online"}
                  </Text>
                  {zoomLink && (
                    <Text className="text-gray-600 text-base leading-6 mb-2">
                      <strong>Zoom Meeting:</strong>{" "}
                      <Link
                        href={zoomLink}
                        className="text-[#003447] underline"
                      >
                        {zoomLink}
                      </Link>
                    </Text>
                  )}

                  {/* Webinar Image - if webinar image CID is provided */}
                  {webinarImageCid && (
                    <Section className="text-center mb-4">
                      <Img
                        src={`cid:${webinarImageCid}`}
                        alt="Webinar Session Preview"
                        width="600"
                        className="mx-auto rounded-lg shadow-md"
                      />
                    </Section>
                  )}
                </>
              )}

              <Hr className="border-t border-gray-300 my-6" />
              <Text className="text-gray-500 text-sm mt-6">
                If you have any questions, feel free to{" "}
                <Link
                  href="mailto:support@inspirepartners.com.au"
                  className="text-[#003447] underline"
                >
                  contact our support team
                </Link>
                .
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    </div>
  );
}
