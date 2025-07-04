"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  eventTitle: z
    .string()
    .min(3, { message: "Title must be at least 3 characters." }),
  eventDescription: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  eventLocation: z
    .string()
    .min(3, { message: "Location must be at least 3 characters." }),
  eventDate: z.string().min(1, { message: "Date is required" }),
  eventTime: z.string().min(1, { message: "Time is required" }),
  eventDuration: z
    .number()
    .int()
    .positive()
    .min(15, { message: "Duration must be at least 15 minutes" }),
  zoomLink: z.string().url({ message: "Please enter a valid URL" }),
  organizerEmail: z
    .string()
    .email({ message: "Please enter a valid email" })
    .optional(),
});

// Infer the type from our schema
type FormValues = z.infer<typeof formSchema>;

export default function EventConfigForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Initialize form with react-hook-form
  // FIXME: modify this later
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventTitle: "Welcome Onboarding Call",
      eventDescription:
        "Join us for a quick onboarding session to get you started with our platform.",
      eventLocation: "Online via Zoom",
      eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // One week from now
      eventTime: "10:00",
      eventDuration: 60, // minutes
      zoomLink: "https://zoom.us/j/123456789?pwd=abcdefghijklmnopqrstuvwxyz",
      organizerEmail: "inspirepartnersau@gmail.com",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      // Format date and time properly to avoid invalid date errors
      const dateStr = values.eventDate; // YYYY-MM-DD
      const timeStr = values.eventTime; // HH:MM

      // Combine date and time for start time
      const startDateTime = new Date(`${dateStr}T${timeStr}`);

      // Calculate end time based on duration
      const endDateTime = new Date(startDateTime.getTime());
      endDateTime.setMinutes(endDateTime.getMinutes() + values.eventDuration);

      // Make API call to save event to database
      const response = await fetch("/api/admin/event-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventTitle: values.eventTitle,
          eventDescription: values.eventDescription,
          eventLocation: values.eventLocation,
          eventDate: dateStr,
          eventTime: timeStr,
          eventDuration: values.eventDuration,
          eventStartTime: startDateTime.toISOString(),
          eventEndTime: endDateTime.toISOString(),
          zoomLink: values.zoomLink,
          organizerEmail: values.organizerEmail,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create event");
      }

      setStatus({
        type: "success",
        message: "Event created successfully!",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to create event",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Create New Event</h2>
      <p className="text-gray-600 mb-6">
        Add a new event to the database. This event will be available for users
        to register.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="eventTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Event Title"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Event Description"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide details about what users can expect during this event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Event Location"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Can be a physical address or virtual meeting link.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Date</FormLabel>
                  <FormControl>
                    <Input type="date" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Time</FormLabel>
                  <FormControl>
                    <Input type="time" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="eventDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="15"
                    step="15"
                    disabled={isLoading}
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 60)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zoomLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zoom Meeting Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://zoom.us/j/123456789?pwd=..."
                    disabled={isLoading}
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  Provide the Zoom meeting link that attendees will use to join
                  the event
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organizerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organizer Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="admin@yourcompany.com"
                    disabled={isLoading}
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  The event organizer&apos;s email (will be shown as the host in
                  calendar invites and attendees will not be able to modify the
                  event)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Event"}
          </Button>

          {status.type && (
            <div
              className={`mt-4 p-3 rounded ${
                status.type === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {status.message}
            </div>
          )}
        </form>
      </Form>
    </Card>
  );
}
