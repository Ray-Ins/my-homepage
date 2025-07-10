"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function AboutUsPage() {
  return (
    <div
      className="container mx-auto py-12 min-h-screen"
      style={{ backgroundColor: "#003447", color: "#e3d3a0" }}
    >
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <Badge
          variant="outline"
          className="px-4 py-1 mb-6 inline-flex"
          style={{ color: "#e3d3a0", borderColor: "#e3d3a0" }}
        >
          Our Story
        </Badge>
        <h1 className="text-4xl font-bold mb-6" style={{ color: "#e3d3a0" }}>
          Built on Logic, Driven by Results
        </h1>
        <p className="max-w-3xl mx-auto" style={{ color: "#e3d3a0" }}>
          Inspire Partners was founded by David Li and Ray Jiang — two
          professionals who believe clients deserve more than fragmented
          financial services. Combining over 25 years of experience in
          accounting, taxation, banking, and lending, Inspire Partners delivers
          a full-circle advisory model designed to help clients achieve wealth
          with clarity and confidence.
        </p>
      </div>

      {/* Logo Story Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="space-y-12">
          {/* Logo Story */}
          <div className="text-center">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "#e3d3a0" }}
            >
              Logo Story
            </h2>
            <p className="max-w-4xl mx-auto" style={{ color: "#e3d3a0" }}>
              The Tree of Life in our logo embodies the essence of Inspire
              Partners: strong foundations, supportive partnerships, and
              flourishing growth. Each element reflects a stage of the financial
              journey — roots symbolise our expertise, the trunk represents
              trust and reliability, branches signify the diverse paths and
              opportunities we help our clients explore, and leaves reflect
              individual clients and their dreams growing and thriving. We chose
              gold to represent success, stability, and the value we deliver,
              and deep blue for trust, wisdom, and calm confidence. Together,
              these elements remind us that true financial success is cultivated
              through care, connection, and shared progress.
            </p>
          </div>

          <Separator className="bg-[#e3d3a0]" />

          {/* Our Vision */}
          <div className="text-center">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "#e3d3a0" }}
            >
              Our Vision
            </h2>
            <p className="max-w-4xl mx-auto" style={{ color: "#e3d3a0" }}>
              At Inspire Partners, we see life as a journey — one where every
              decision shapes your future. Like the Tree of Life, we&apos;re
              deeply rooted in relationships, growing stronger through shared
              learning, trust, and care. We are inspired by the people we work
              with — our clients, business partners, and community — and
              we&apos;re here to guide and empower them to achieve financial
              freedom and peace of mind. Together, we share, learn, and grow —
              because it&apos;s not just about the destination, it&apos;s about
              the journey.
            </p>
          </div>

          <Separator className="bg-[#e3d3a0]" />

          {/* Our Mission */}
          <div className="text-center">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "#e3d3a0" }}
            >
              Our Mission
            </h2>
            <p className="max-w-4xl mx-auto" style={{ color: "#e3d3a0" }}>
              At Inspire Partners, our mission is to empower Australians to grow
              and thrive financially through every stage of life. We provide
              tailored taxation, lending, and financial solutions with a human
              touch — nurturing partnerships built on trust, care, and shared
              success. Together, we help individuals, families, and businesses
              navigate their journeys, learn along the way, and create a future
              they can be proud of.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2
          className="text-2xl font-bold mb-8 text-center"
          style={{ color: "#e3d3a0" }}
        >
          Meet Our Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* David Li Card */}
          <Card
            className="p-6"
            style={{
              backgroundColor: "rgba(227, 211, 160, 0.1)",
              borderColor: "#e3d3a0",
            }}
          >
            <div className="flex flex-col items-center text-center md:text-left md:flex-row gap-6">
              <div className="w-32 h-32 relative flex-shrink-0">
                <Image
                  src="/partners-avatars/David.jpg"
                  alt="David Li"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <CardContent className="p-0">
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ color: "#e3d3a0" }}
                >
                  David Li
                </h3>
                <p className="mb-3" style={{ color: "#c5e2e6" }}>
                  CPA & Registered Tax Agent
                </p>
                <p style={{ color: "#e3d3a0" }}>
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
          <Card
            className="p-6"
            style={{
              backgroundColor: "rgba(227, 211, 160, 0.1)",
              borderColor: "#e3d3a0",
            }}
          >
            <div className="flex flex-col items-center text-center md:text-left md:flex-row gap-6">
              <div className="w-32 h-32 relative flex-shrink-0">
                <Image
                  src="/partners-avatars/Ray.jpg"
                  alt="Ray Jiang"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <CardContent className="p-0">
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ color: "#e3d3a0" }}
                >
                  Ray Jiang
                </h3>
                <p className="mb-3" style={{ color: "#c5e2e6" }}>
                  Finance Broker & Property Expert
                </p>
                <p style={{ color: "#e3d3a0" }}>
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
      <div
        className="max-w-6xl mx-auto mb-16 p-12 rounded-lg"
        style={{
          backgroundColor: "rgba(227, 211, 160, 0.1)",
          border: "1px solid #e3d3a0",
        }}
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: "#e3d3a0" }}
        >
          Our Vision
        </h2>
        <p
          className="text-center max-w-3xl mx-auto"
          style={{ color: "#e3d3a0" }}
        >
          To provide holistic financial services that build long-term
          relationships, transform high-income earners into high-net-worth
          individuals, and help our clients grow — personally and
          professionally.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-2xl font-bold mb-8 text-center"
          style={{ color: "#e3d3a0" }}
        >
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
            <Card
              key={index}
              className="p-6 flex items-center justify-center"
              style={{
                backgroundColor: "rgba(227, 211, 160, 0.1)",
                borderColor: "#e3d3a0",
              }}
            >
              <p
                className="text-center font-medium"
                style={{ color: "#e3d3a0" }}
              >
                {item}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
