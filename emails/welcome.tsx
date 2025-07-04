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
    try {
      // Format date for display
      const startDate = safeParseDate(eventStartTime!);

      eventDate = startDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      eventTime = startDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (err) {
      eventDate = "Date to be announced";
      eventTime = "Time to be announced";
    }
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
                  {organizerEmail && (
                    <Text className="text-gray-600 text-base leading-6 mb-2">
                      <strong>Organizer:</strong>{" "}
                      <Link
                        href={`mailto:${organizerEmail}`}
                        className="text-[#003447] underline"
                      >
                        {organizerEmail}
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
