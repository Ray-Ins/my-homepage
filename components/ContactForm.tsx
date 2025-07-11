"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
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
  phone: z.string().optional(),
  organisation: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

// Infer the type from our schema
type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
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
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit the contact form");
      }

      setStatus({
        type: "success",
        message: "Thank you for your message! We'll get back to you shortly.",
      });
      form.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit the contact form",
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={{ color: "#052f46", fontWeight: "600" }}>
                  Phone (Optional)
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

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={{ color: "#052f46", fontWeight: "600" }}>
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="How can we help you?"
                    className="min-h-[120px]"
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
            {isLoading ? "Sending..." : "Send Message"}
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
