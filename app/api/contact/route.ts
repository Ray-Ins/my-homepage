import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessagesTable } from "@/db/schema";
import { z } from "zod";

// Define validation schema
const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  organisation: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate the request data
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, phone, organisation, message } = result.data;

    // Insert the contact message into the database
    const insertedMessage = await db
      .insert(contactMessagesTable)
      .values({
        name,
        email,
        phone: phone || null,
        organisation: organisation || null,
        message,
      })
      .returning({ id: contactMessagesTable.id });

    // Send email notification (you can implement this later)
    // await sendNotificationEmail({ name, email, message });

    return NextResponse.json({
      success: true,
      message: "Contact message received successfully",
      id: insertedMessage[0].id,
    });
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}
