import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import ContactForm from "@/components/ContactForm";
import { MapPin, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - Inspire Partners | Get Expert Financial Advice",
  description:
    "Contact Inspire Partners for expert financial advisory services. Located in Mitcham, VIC. Call 04 4958 8614 (Ray) or 04 6609 8666 (David) for accounting, taxation, and lending solutions.",
  keywords: [
    "contact Inspire Partners",
    "financial advisor contact Melbourne",
    "accounting firm contact",
    "tax agent contact",
    "mortgage broker contact",
    "Mitcham financial services",
    "business advisor contact",
    "Ray Jiang contact",
    "David Li contact",
    "financial consultation",
  ],
  openGraph: {
    title: "Contact Inspire Partners - Expert Financial Advisory",
    description:
      "Get in touch with our expert team for accounting, taxation, and lending solutions. Located in Mitcham, VIC.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Inspire Partners - Financial Advisory",
    description:
      "Expert accounting, taxation, and lending solutions in Melbourne.",
  },
};

export default function ContactPage() {
  return (
    <div
      className="py-12 min-h-screen relative"
      style={{
        backgroundColor: "#003447",
        color: "#052f46",
        backgroundImage: `url('/background/background.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-16 text-center container">
        <Badge
          variant="outline"
          className="px-4 py-1 mb-6 inline-flex"
          style={{ color: "#052f46", borderColor: "#052f46" }}
        >
          Contact Us
        </Badge>
        <h1 className="text-4xl font-bold mb-6" style={{ color: "#052f46" }}>
          Let&apos;s Grow Together
        </h1>
        <p className="max-w-3xl mx-auto" style={{ color: "#052f46" }}>
          We&apos;d love to hear your story, understand your goals, and see how
          we can help.
        </p>
      </div>

      {/* Contact Info and Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto container">
        {/* Contact Information */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#052f46" }}>
            Contact Info:
          </h2>

          <div className="flex items-start space-x-4">
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: "rgba(5, 47, 70, 0.1)" }}
            >
              <MapPin className="h-6 w-6" style={{ color: "#052f46" }} />
            </div>
            <div>
              <h3
                className="font-semibold text-lg"
                style={{ color: "#052f46" }}
              >
                Office Location
              </h3>
              <p style={{ color: "#052f46" }}>
                L1/534 Whitehorse Road, Mitcham, Vic 3132
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
              <h3
                className="font-semibold text-lg"
                style={{ color: "#052f46" }}
              >
                Email
              </h3>
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
              <h3
                className="font-semibold text-lg"
                style={{ color: "#052f46" }}
              >
                Phone
              </h3>
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
          <div className="mt-8 h-[300px] w-full rounded-lg overflow-hidden border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8351288835384!2d145.18839807677254!3d-37.81384623417249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad63903cf4a29c3%3A0x9e72702a6a892d31!2s534%20Whitehorse%20Rd%2C%20Mitcham%20VIC%203132%2C%20Australia!5e0!3m2!1sen!2sus!4v1686152283599!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Inspire Partners Office Location - L1/534 Whitehorse Road, Mitcham, VIC 3132"
              aria-label="Interactive map showing Inspire Partners office location at L1/534 Whitehorse Road, Mitcham, VIC 3132"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#052f46" }}>
            Send Us a Message
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
