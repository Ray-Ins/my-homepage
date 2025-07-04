"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function AboutUsPage() {
  return (
    <div className="container mx-auto py-12">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <Badge
          variant="outline"
          className="text-[#2a8e9e] px-4 py-1 mb-6 inline-flex"
        >
          Our Story
        </Badge>
        <h1 className="text-4xl font-bold mb-6">
          Built on Logic, Driven by Results
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Inspire Partners was founded by David Li and Ray Jiang — two
          professionals who believe clients deserve more than fragmented
          financial services. Combining over 25 years of experience in
          accounting, taxation, banking, and lending, Inspire Partners delivers
          a full-circle advisory model designed to help clients achieve wealth
          with clarity and confidence.
        </p>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Meet Our Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* David Li Card */}
          <Card className="p-6">
            <div className="flex flex-col items-center text-center md:text-left md:flex-row gap-6">
              <div className="w-32 h-32 relative flex-shrink-0">
                <Image
                  src="/partners-avatars/David.png"
                  alt="David Li"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <CardContent className="p-0">
                <h3 className="text-xl font-bold mb-1">David Li</h3>
                <p className="text-[#2a8e9e] mb-3">
                  CPA & Registered Tax Agent
                </p>
                <p className="text-gray-600">
                  With 15+ years of experience and an engineering background,
                  David brings a first-principles mindset to accounting. He
                  specialises in small to medium business tax, particularly in
                  the medical, hospitality, and IT sectors. Known for his
                  logical thinking and problem-solving skills, David is a
                  passionate advisor, family man, and seafood-loving basketball
                  fan.
                </p>
              </CardContent>
            </div>
          </Card>

          {/* Ray Jiang Card */}
          <Card className="p-6">
            <div className="flex flex-col items-center text-center md:text-left md:flex-row gap-6">
              <div className="w-32 h-32 relative flex-shrink-0">
                <Image
                  src="/partners-avatars/Ray.png"
                  alt="Ray Jiang"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <CardContent className="p-0">
                <h3 className="text-xl font-bold mb-1">Ray Jiang</h3>
                <p className="text-[#2a8e9e] mb-3">
                  Finance Broker & Property Expert
                </p>
                <p className="text-gray-600">
                  Ray is a former ANZ banker with over a decade in the property
                  and finance industry. His never-give-up attitude and attention
                  to detail have helped countless clients secure residential and
                  commercial finance solutions. A devoted family man, Ray loves
                  reading, travelling, and playing basketball.
                </p>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>

      {/* Vision Section */}
      <div className="max-w-6xl mx-auto mb-16 bg-[#003447] text-white p-12 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Vision</h2>
        <p className="text-center max-w-3xl mx-auto">
          To provide holistic financial services that build long-term
          relationships, transform high-income earners into high-net-worth
          individuals, and help our clients grow — personally and
          professionally.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Why Choose Inspire Partners?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "We prioritise relationships over transactions",
            "Tailored, transparent advice",
            "Specialised industry knowledge",
            "One-stop shop with integrated solutions",
            "Banking expertise with an edge",
            "Proven track record of results",
            "Access to exclusive lending panels",
            "Ongoing support beyond settlement",
          ].map((item, index) => (
            <Card key={index} className="p-6 flex items-center justify-center">
              <p className="text-center font-medium text-[#003447]">{item}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
