"use client";

import { Badge } from "@/components/ui/badge";
import ContactForm from "@/components/ContactForm";
import { MapPin, Mail, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-12 text-center">
          <Badge
            variant="outline"
            className="text-[#2a8e9e] px-4 py-1 mb-6 inline-flex mx-auto"
          >
            Contact Us
          </Badge>
          <h2 className="text-3xl font-bold mb-6">Let&apos;s Grow Together</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We&apos;d love to hear your story, understand your goals, and see
            how we can help.
          </p>
        </div>

        {/* Contact Info and Form Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-4">Contact Info:</h3>

            <div className="flex items-start space-x-4">
              <div className="bg-[#c5e2e6] p-3 rounded-full">
                <MapPin className="h-6 w-6 text-[#003447]" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Office Location</h4>
                <p className="text-gray-600">
                  L1/534 Whitehorse Road, Mitcham, Vic 3132
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#c5e2e6] p-3 rounded-full">
                <Mail className="h-6 w-6 text-[#003447]" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <a
                  href="mailto:info@inspirepartners.com.au"
                  className="text-[#2a8e9e] hover:underline"
                >
                  info@inspirepartners.com.au
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#c5e2e6] p-3 rounded-full">
                <Phone className="h-6 w-6 text-[#003447]" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <a
                  href="tel:+61398723020"
                  className="text-[#2a8e9e] hover:underline"
                >
                  (03) 9872 3020
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="mt-6 h-[250px] w-full rounded-lg overflow-hidden border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8351288835384!2d145.18839807677254!3d-37.81384623417249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad63903cf4a29c3%3A0x9e72702a6a892d31!2s534%20Whitehorse%20Rd%2C%20Mitcham%20VIC%203132%2C%20Australia!5e0!3m2!1sen!2sus!4v1686152283599!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
