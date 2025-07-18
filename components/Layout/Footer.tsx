"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/accounting-taxation", label: "Accounting & Taxation" },
    { href: "/finance-lending", label: "Finance and Lending" },
    { href: "/specialised-industries", label: "Specialised Industries" },
    { href: "/extended-services", label: "Extended Services" },
    { href: "/event-register", label: "Events" },
    { href: "/contact", label: "Contact" },
  ];

  const serviceLinks = [
    { href: "/accounting-taxation", label: "Tax Compliance" },
    { href: "/accounting-taxation", label: "Bookkeeping" },
    { href: "/accounting-taxation", label: "Cashflow Management" },
    { href: "/accounting-taxation", label: "SMSF" },
    { href: "/finance-lending", label: "Residential Lending" },
    { href: "/finance-lending", label: "Commercial Lending" },
    { href: "/extended-services", label: "Property Advisory" },
    { href: "/extended-services", label: "Financial Planning" },
  ];

  return (
    <footer className="bg-[#052f46] pt-16 pb-8" style={{ color: "#f5e5be" }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Logo and About */}
          <div className="space-y-4">
            <Link href="/" className="inline-block" aria-label="Go to Inspire Partners homepage">
              <Image
                src="/Logo.png"
                alt="Inspire Partners Logo"
                width={200}
                height={200}
              />
            </Link>
            <p className="mt-4" style={{ color: "#f5e5be" }}>
              Inspire Partners delivers a full-circle advisory model designed to
              help clients achieve wealth with clarity and confidence.
            </p>
            <div className="flex space-x-4 pt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c5e2e6] transition-colors"
                style={{ color: "#f5e5be" }}
                aria-label="Visit Inspire Partners on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c5e2e6] transition-colors"
                style={{ color: "#f5e5be" }}
                aria-label="Follow Inspire Partners on Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c5e2e6] transition-colors"
                style={{ color: "#f5e5be" }}
                aria-label="Connect with Inspire Partners on LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: "#f5e5be" }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {mainLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-[#c5e2e6] transition-colors"
                    style={{ color: "#f5e5be" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: "#f5e5be" }}>
              Our Services
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-[#c5e2e6] transition-colors"
                    style={{ color: "#f5e5be" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: "#f5e5be" }}>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin
                  className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5"
                  style={{ color: "#f5e5be" }}
                />
                <span style={{ color: "#f5e5be" }}>
                  L1/534 Whitehorse Road, Mitcham, Vic 3132
                </span>
              </li>
              <li className="flex items-start">
                <Phone
                  className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5"
                  style={{ color: "#f5e5be" }}
                />
                <div className="flex flex-col space-y-1">
                  <a
                    href="tel:+61449588614"
                    className="hover:text-[#c5e2e6] transition-colors"
                    style={{ color: "#f5e5be" }}
                    aria-label="Call Ray Jiang at 04 4958 8614"
                  >
                    04 4958 8614 Ray
                  </a>
                  <a
                    href="tel:+61466098666"
                    className="hover:text-[#c5e2e6] transition-colors"
                    style={{ color: "#f5e5be" }}
                    aria-label="Call David Li at 04 6609 8666"
                  >
                    04 6609 8666 David
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail
                  className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5"
                  style={{ color: "#f5e5be" }}
                />
                <div className="flex flex-col space-y-1">
                  <a
                    href="mailto:RayJ@inspartners.com.au"
                    className="hover:text-[#c5e2e6] transition-colors"
                    style={{ color: "#f5e5be" }}
                    aria-label="Send email to Ray Jiang at RayJ@inspartners.com.au"
                  >
                    RayJ@inspartners.com.au
                  </a>
                  <a
                    href="mailto:DavidL@inspartners.com.au"
                    className="hover:text-[#c5e2e6] transition-colors"
                    style={{ color: "#f5e5be" }}
                    aria-label="Send email to David Li at DavidL@inspartners.com.au"
                  >
                    DavidL@inspartners.com.au
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-700 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p style={{ color: "#f5e5be" }}>
            © {currentYear} Inspire Partners. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className="hover:text-[#c5e2e6] transition-colors"
              style={{ color: "#f5e5be" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-[#c5e2e6] transition-colors"
              style={{ color: "#f5e5be" }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
