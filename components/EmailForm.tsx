"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

// Define form schema with Zod
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(8, { message: "Please enter a valid phone number." }),
  organisation: z
    .string()
    .max(50, { message: "Organisation must be less than 50 characters." }),
});

// Infer the type from our schema
type FormValues = z.infer<typeof formSchema>;

export default function EmailForm({ eventId }: { eventId?: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      organisation: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/event-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventId ? { ...values, eventId } : values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to register for the event");
      }

      setStatus({
        type: "success",
        message: "Registration successful! Check your email for event details.",
      });
      form.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to register for the event",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className="p-6 shadow-md"
      style={{
        backgroundColor: "rgba(227, 211, 160, 0.1)",
        borderColor: "#052f46",
      }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={{ color: "#052f46", fontWeight: "600" }}>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={{ color: "#052f46", fontWeight: "600" }}>
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={{ color: "#052f46", fontWeight: "600" }}>
                  Phone
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your phone number"
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
            name="organisation"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={{ color: "#052f46", fontWeight: "600" }}>
                  Organisation (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your organisation"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-4 w-full h-[50px] hover:cursor-pointer"
            disabled={isLoading}
            style={{
              backgroundColor: "#052f46",
              color: "#f5e5be",
              borderColor: "#052f46",
            }}
          >
            {isLoading ? "Registering..." : "Register Event"}
          </Button>

          {status.type && (
            <div
              className="mt-4 p-3 rounded"
              style={{
                backgroundColor:
                  status.type === "success"
                    ? "rgba(34, 197, 94, 0.1)"
                    : "rgba(239, 68, 68, 0.1)",
                color: status.type === "success" ? "#15803d" : "#dc2626",
                borderColor: status.type === "success" ? "#15803d" : "#dc2626",
                borderWidth: "1px",
              }}
            >
              {status.message}
            </div>
          )}
        </form>
      </Form>
    </Card>
  );
}
