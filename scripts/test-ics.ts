import { generateIcsFile } from "../lib/ics-generator";
import * as fs from "fs/promises";
import * as path from "path";

async function main() {
  try {
    console.log("Testing ICS file generation with default location...");

    // Test data with no location specified (should use default "Online")
    const icsContent = await generateIcsFile({
      title: "Test Event",
      description: "This is a test event description",
      location: "Online via Zoom",
      start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      end: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(), // Tomorrow + 1 hour
      zoomLink: "https://zoom.us/j/123456789",
      organizerEmail: "organizer@example.com",
      organizerName: "Inspire Partners",
      attendeeEmail: "attendee@example.com",
      attendeeName: "Attendee",
    });

    // Save to file for inspection
    const outputPath = path.join(process.cwd(), "test-event.ics");
    await fs.writeFile(outputPath, icsContent);

    console.log(`ICS file generated successfully and saved to: ${outputPath}`);
    console.log("\nICS Content:");
    console.log(icsContent);
  } catch (error) {
    console.error("Error testing ICS generation:", error);
  }
}

main().catch(console.error);
