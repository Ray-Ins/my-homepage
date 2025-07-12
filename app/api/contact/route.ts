import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessagesTable } from "@/db/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

// Define validation schema
const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  organisation: z.string().optional(),
  message: z.string().min(10),
});

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_PUBLIC_APP_USER,
    pass: process.env.NEXT_PUBLIC_APP_PASS,
  },
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

    // Send simple email notification to company
    try {
      const mailOptions = {
        from: `"Contact Form" <${process.env.NEXT_PUBLIC_APP_USER}>`,
        to: "RayJ@inspirepartners.com.au", // Send to company email
        subject: `New Contact Message from ${name}`,
        text: `${name} from ${email} the question is: ${message}`,
        replyTo: email, // Allow easy reply to customer
      };

      // Send email
      await transporter.sendMail(mailOptions);

      return NextResponse.json({
        success: true,
        message: "Contact message received successfully and notification sent",
        id: insertedMessage[0].id,
      });
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // Message was saved but email failed - still return success
      return NextResponse.json({
        success: true,
        message: "Contact message received successfully",
        id: insertedMessage[0].id,
      });
    }
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}
