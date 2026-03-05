"use client";

import { Badge } from "@/components/ui/badge";
import ContactForm from "@/components/ContactForm";
import { MapPin, Mail, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-16" style={{ backgroundColor: "transparent" }}>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-12 text-center">
          <Badge
            variant="outline"
            className="px-4 py-1 mb-6 inline-flex mx-auto"
            style={{
              color: "#052f46",
              borderColor: "#052f46",
              backgroundColor: "rgba(5, 47, 70, 0.1)",
            }}
          >
            Contact Us
          </Badge>
          <h2 className="text-3xl font-bold mb-6" style={{ color: "#052f46" }}>
            Let&apos;s Grow Together
          </h2>
          <p
            className="max-w-3xl mx-auto font-medium"
            style={{ color: "#052f46" }}
          >
            We&apos;d love to hear your story, understand your goals, and see
            how we can help.
          </p>
        </div>

        {/* Contact Info and Form Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              Contact Info:
            </h3>

            <div className="flex items-start space-x-4">
              <div
                className="p-3 rounded-full"
                style={{ backgroundColor: "rgba(5, 47, 70, 0.1)" }}
              >
                <MapPin className="h-6 w-6" style={{ color: "#052f46" }} />
              </div>
              <div>
                <h4
                  className="font-semibold text-lg"
                  style={{ color: "#052f46" }}
                >
                  Office Location
                </h4>
                <p className="font-medium" style={{ color: "#052f46" }}>
                  Office 9/602 Whitehorse Rd, Mitcham VIC 3132
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div
                className="p-3 rounded-full"
                style={{ backgroundColor: "rgba(5, 47, 70, 0.1)" }}
              >
                <Mail className="h-6 w-6" style={{ color: "#052f46" }} />
              </div>
              <div>
                <h4
                  className="font-semibold text-lg"
                  style={{ color: "#052f46" }}
                >
                  Email
                </h4>
                <div className="flex flex-col space-y-1">
                  <a
                    href="mailto:RayJ@inspartners.com.au"
                    className="hover:underline"
                    style={{ color: "#052f46" }}
                    aria-label="Send email to Ray Jiang at RayJ@inspartners.com.au"
                  >
                    RayJ@inspartners.com.au
                  </a>
                  <a
                    href="mailto:DavidL@inspartners.com.au"
                    className="hover:underline"
                    style={{ color: "#052f46" }}
                    aria-label="Send email to David Li at DavidL@inspartners.com.au"
                  >
                    DavidL@inspartners.com.au
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div
                className="p-3 rounded-full"
                style={{ backgroundColor: "rgba(5, 47, 70, 0.1)" }}
              >
                <Phone className="h-6 w-6" style={{ color: "#052f46" }} />
              </div>
              <div>
                <h4
                  className="font-semibold text-lg"
                  style={{ color: "#052f46" }}
                >
                  Phone
                </h4>
                <div className="flex flex-col space-y-1">
                  <a
                    href="tel:+61449588614"
                    className="hover:underline"
                    style={{ color: "#052f46" }}
                    aria-label="Call Ray Jiang at 04 4958 8614"
                  >
                    04 4958 8614 Ray
                  </a>
                  <a
                    href="tel:+61466098666"
                    className="hover:underline"
                    style={{ color: "#052f46" }}
                    aria-label="Call David Li at 04 6609 8666"
                  >
                    04 6609 8666 David
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-6 h-[250px] w-full rounded-lg overflow-hidden border border-gray-200">
              <iframe
                src="https://www.google.com/maps?q=Office+9%2F602+Whitehorse+Rd%2C+Mitcham+VIC+3132&hl=en&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Inspire Partners Office Location - Office 9/602 Whitehorse Rd, Mitcham VIC 3132"
                aria-label="Interactive map showing Inspire Partners office location at Office 9/602 Whitehorse Rd, Mitcham VIC 3132"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3
              className="text-2xl font-bold mb-6"
              style={{ color: "#052f46" }}
            >
              Send Us a Message
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
