import { createEvent, EventAttributes } from "ics";
import { promisify } from "util";

// Convert the callback-based createEvent to a Promise-based function
const createEventAsync = promisify(
  (
    event: EventAttributes,
    callback: (error: Error | undefined, value: string | undefined) => void
  ) => {
    createEvent(event, callback);
  }
);

// Helper function to convert ISO string to ICS date array
// The ICS library expects a specific tuple format: [year, month, day, hour, minute]
const isoStringToIcsDate = (
  isoString: string
): [number, number, number, number, number] => {
  const date = new Date(isoString);
  return [
    date.getFullYear(),
    date.getMonth() + 1, // Month is 0-indexed in JS, 1-indexed in ICS
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ];
};

// Main function to generate ICS content
export async function generateIcsFile({
  title,
  description,
  location = "Online",
  start,
  end,
  zoomLink,
  organizerEmail,
  attendeeEmail,
  organizerName = "Ray",
  attendeeName,
}: {
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  zoomLink: string;
  organizerEmail: string;
  attendeeEmail: string;
  organizerName?: string;
  attendeeName?: string;
}): Promise<string> {
  try {
    const enhancedDescription = `${description}\n\nJoin Zoom Meeting: ${zoomLink}`;

    // Create event object for ICS
    const event: EventAttributes = {
      start: isoStringToIcsDate(start),
      end: isoStringToIcsDate(end),
      title,
      description: enhancedDescription,
      location: location,
      status: "CONFIRMED",
      busyStatus: "BUSY",
      organizer: { name: organizerName, email: organizerEmail },
      attendees: [
        {
          name: attendeeName,
          email: attendeeEmail,
          rsvp: true,
          partstat: "ACCEPTED",
          role: "REQ-PARTICIPANT",
        },
      ],
      productId: "inspire-partners/ics",
      method: "REQUEST", // Use REQUEST for invitations
      sequence: 0,
      created: isoStringToIcsDate(new Date().toISOString()),
      lastModified: isoStringToIcsDate(new Date().toISOString()),
      uid: `event-${Date.now()}@inspirepartners.com`,
    };

    // Generate ICS content
    const icsContent = await createEventAsync(event);

    if (!icsContent) {
      throw new Error("Failed to generate ICS content");
    }

    return icsContent;
  } catch (error) {
    throw error;
  }
}
