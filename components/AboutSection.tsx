import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section
      className="py-20 font-montaga"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left side - Image with decorative elements */}
          <div className="w-full md:w-2/5 relative">
            <div className="relative h-[600px] w-full">
              <div
                className="absolute -top-4 -left-4 w-full h-full border-2 rounded-lg z-0"
                style={{ borderColor: "#052f46" }}
              ></div>
              <Image
                src="/toa-heftiba-4xe-yVFJCvw-unsplash.jpg"
                alt="Professional business meeting"
                fill
                className="object-cover rounded-lg shadow-lg z-10 relative"
              />
              <div
                className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full z-0"
                style={{ backgroundColor: "rgba(5, 47, 70, 0.1)" }}
              ></div>
            </div>
          </div>

          {/* Right side - Text content with enhanced styling */}
          <div className="w-full md:w-3/5">
            <h2
              className="text-3xl md:text-4xl font-montaga mb-6"
              style={{ color: "#052f46" }}
            >
              Your Partners in Building Wealth with Purpose
            </h2>

            <p
              className="text-lg mb-8 leading-relaxed font-medium"
              style={{ color: "#052f46" }}
            >
              Inspire Partners is a boutique advisory firm that provides
              holistic financial solutions for individuals, professionals, and
              growing businesses. Whether you&apos;re navigating complex tax
              needs or expanding your property portfolio, we&apos;re here to
              grow with you.
            </p>

            <div
              className="p-6 rounded-lg border-l-4 shadow-sm mb-8"
              style={{
                backgroundColor: "rgba(5, 47, 70, 0.1)",
                borderColor: "#052f46",
              }}
            >
              <h3
                className="text-xl font-semibold mb-3 flex items-center"
                style={{ color: "#052f46" }}
              >
                Client Promise:
              </h3>
              <p
                className="text-lg italic font-medium"
                style={{ color: "#052f46" }}
              >
                We help high-income clients become high-net-worth individuals
                through tailored tax, lending and strategic advice.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/accounting-taxation">
                <button
                  className="px-6 py-3 border rounded-md hover:bg-gray-100 transition-colors font-medium cursor-pointer"
                  style={{
                    backgroundColor: "#052f46",
                    color: "#f5e5be",
                    borderColor: "#052f46",
                  }}
                >
                  Our Services
                </button>
              </Link>
              <Link href="/contact">
                <button
                  className="px-6 py-3 border rounded-md hover:bg-gray-100 transition-colors font-medium cursor-pointer"
                  style={{ borderColor: "#052f46", color: "#052f46" }}
                >
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
