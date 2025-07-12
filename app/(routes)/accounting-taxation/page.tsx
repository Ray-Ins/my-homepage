"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function AccountingTaxationPage() {
  const services = [
    {
      title: "Tax Compliance",
      description: "Lodgements, BAS/IAS, year-end reports",
      icon: "/file.svg",
    },
    {
      title: "Bookkeeping",
      description: "Cloud-based, real-time data management",
      icon: "/window.svg",
    },
    {
      title: "Cashflow Management",
      description: "Budgeting, forecasting, and advisory",
      icon: "/globe.svg",
    },
    {
      title: "Self Managed Super Funds (SMSF)",
      description: "Setup, reporting, compliance",
      icon: "/file.svg",
    },
    {
      title: "Due Diligence & Valuation",
      description: "Business acquisitions and risk reviews",
      icon: "/window.svg",
    },
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto mb-16 container">
        <div className="space-y-6">
          <Badge
            variant="outline"
            className="px-4 py-1 inline-flex"
            style={{ color: "#052f46", borderColor: "#052f46" }}
          >
            Accounting & Taxation
          </Badge>
          <h1 className="text-4xl font-bold" style={{ color: "#052f46" }}>
            Tax Done Smarter. Strategy Done Right.
          </h1>
          <p className="text-[#052f46]">
            We combine logic-driven analysis with decades of real-world
            experience to create practical, tailored solutions.
          </p>
        </div>

        <div className="w-full h-full relative">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-md">
            <Image
              src="/scott-graham-5fNmWej4tAA-unsplash.jpg"
              alt="Accounting Services"
              fill
              style={{ objectFit: "cover" }}
              priority
              className="rounded-lg hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto mb-16 container">
        <Card
          className="p-6"
          style={{
            backgroundColor: "rgba(227, 211, 160, 0.1)",
            borderColor: "#052f46",
          }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-32 h-32 relative flex-shrink-0">
              <Image
                src="/partners-avatars/David.jpg"
                alt="David Pham"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <CardContent className="p-0">
              <h3
                className="text-xl font-bold mb-1"
                style={{ color: "#052f46" }}
              >
                David Li
              </h3>
              <p className="mb-3" style={{ color: "#052f46" }}>
                CPA & Registered Tax Agent
              </p>
              <p style={{ color: "#052f46" }}>
                With 15+ years of experience and an engineering background,
                David brings a first-principles mindset to accounting. He
                specialises in small to medium business tax, particularly in the
                medical, hospitality, and IT sectors. Known for his logical
                thinking and problem-solving skills, David is a passionate
                advisor, family man, and seafood-loving basketball fan.
              </p>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto my-16 container">
        <h2
          className="text-2xl font-bold mb-8 text-center"
          style={{ color: "#052f46" }}
        >
          Our Accounting & Taxation Services Include:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow"
              style={{
                backgroundColor: "#052f46",
                borderColor: "#052f46",
              }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4 flex items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-2"
                    style={{
                      backgroundColor: "rgba(245, 229, 190, 0.2)",
                      color: "#f5e5be",
                    }}
                  >
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={20}
                      height={20}
                      style={{
                        filter:
                          "brightness(0) saturate(100%) invert(94%) sepia(38%) saturate(324%) hue-rotate(346deg) brightness(104%) contrast(98%)",
                      }}
                    />
                  </div>
                  <h3 className="font-semibold" style={{ color: "#f5e5be" }}>
                    {service.title}
                  </h3>
                </div>
                <p className="font-sm" style={{ color: "#f5e5be" }}>
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Who We Help Section */}
      <div
        className="max-w-6xl mx-auto my-16 p-12 rounded-lg"
        style={{
          backgroundColor: "rgba(5, 47, 70, 0.1)",
          borderColor: "#052f46",
          border: "1px solid #052f46",
        }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#052f46" }}>
          Who We Help:
        </h2>
        <p className="text-lg" style={{ color: "#052f46" }}>
          Small to medium businesses, professionals, and medical practitioners
          looking to optimise their tax position, improve financial clarity, and
          scale effectively.
        </p>
      </div>

      {/* Approach Section */}
      <div className="max-w-6xl mx-auto my-16 container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-md">
            <Image
              src="/scott-graham-OQMZwNd3ThU-unsplash.jpg"
              alt="Our Approach"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: "#052f46" }}>
              Our Approach:
            </h2>
            <p className="text-[#052f46]">
              We combine logic-driven analysis with decades of real-world
              experience to create practical, tailored solutions.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle
                  className="h-6 w-6 mr-2 flex-shrink-0"
                  style={{ color: "#052f46" }}
                />
                <p>Data-driven decision making with clear financial insights</p>
              </div>
              <div className="flex items-start">
                <CheckCircle
                  className="h-6 w-6 mr-2 flex-shrink-0"
                  style={{ color: "#052f46" }}
                />
                <p>Proactive tax planning to minimise liabilities</p>
              </div>
              <div className="flex items-start">
                <CheckCircle
                  className="h-6 w-6 mr-2 flex-shrink-0"
                  style={{ color: "#052f46" }}
                />
                <p>Industry-specific expertise for targeted solutions</p>
              </div>
              <div className="flex items-start">
                <CheckCircle
                  className="h-6 w-6 mr-2 flex-shrink-0"
                  style={{ color: "#052f46" }}
                />
                <p>Ongoing support and advisory beyond compliance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
