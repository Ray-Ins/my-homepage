import React from "react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="py-20 bg-white font-montaga">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left side - Image with decorative elements */}
          <div className="w-full md:w-2/5 relative">
            <div className="relative h-[600px] w-full">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#2a8e9e] rounded-lg z-0"></div>
              <Image
                src="/toa-heftiba-4xe-yVFJCvw-unsplash.jpg"
                alt="Professional business meeting"
                fill
                className="object-cover rounded-lg shadow-lg z-10 relative"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#c5e2e6] rounded-full z-0"></div>
            </div>
          </div>

          {/* Right side - Text content with enhanced styling */}
          <div className="w-full md:w-3/5">
            <h2 className="text-3xl md:text-4xl font-montaga text-[#003447] mb-6">
              Your Partners in Building Wealth with Purpose
            </h2>

            <p className="text-lg mb-8 text-gray-700 leading-relaxed">
              Inspire Partners is a boutique advisory firm that provides
              holistic financial solutions for individuals, professionals, and
              growing businesses. Whether you&apos;re navigating complex tax
              needs or expanding your property portfolio, we&apos;re here to
              grow with you.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#2a8e9e] shadow-sm mb-8">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                Client Promise:
              </h3>
              <p className="text-lg italic text-gray-700">
                We help high-income clients become high-net-worth individuals
                through tailored tax, lending and strategic advice.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#003447] text-white rounded-md hover:bg-[#003447]/90 transition-colors font-medium">
                Our Services
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
