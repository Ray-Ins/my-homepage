"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
    <div className="container mx-auto py-12">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto mb-16">
        <div className="space-y-6">
          <Badge variant="outline" className="text-[#2a8e9e] px-4 py-1">
            Accounting & Taxation
          </Badge>
          <h1 className="text-4xl font-bold">
            Tax Done Smarter. Strategy Done Right.
          </h1>
          <p className="text-gray-600">
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

      {/* Services Section */}
      <div className="max-w-6xl mx-auto my-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Our Accounting & Taxation Services Include:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col h-full">
                <div className="mb-4 flex items-center">
                  <div className="w-12 h-12 bg-[#c5e2e6] rounded-full flex items-center justify-center mr-4">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={24}
                      height={24}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-[#003447]">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Who We Help Section */}
      <div className="max-w-6xl mx-auto my-16 bg-[#003447] text-white p-12 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Who We Help:</h2>
        <p className="text-lg">
          Small to medium businesses, professionals, and medical practitioners
          looking to optimise their tax position, improve financial clarity, and
          scale effectively.
        </p>
      </div>

      {/* Approach Section */}
      <div className="max-w-6xl mx-auto my-16">
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
            <h2 className="text-2xl font-bold">Our Approach:</h2>
            <p className="text-gray-600">
              We combine logic-driven analysis with decades of real-world
              experience to create practical, tailored solutions.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[#2a8e9e] mr-2 flex-shrink-0" />
                <p>Data-driven decision making with clear financial insights</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[#2a8e9e] mr-2 flex-shrink-0" />
                <p>Proactive tax planning to minimize liabilities</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[#2a8e9e] mr-2 flex-shrink-0" />
                <p>Industry-specific expertise for targeted solutions</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[#2a8e9e] mr-2 flex-shrink-0" />
                <p>Ongoing support and advisory beyond compliance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
