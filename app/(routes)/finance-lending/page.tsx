"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FinanceLendingPage() {
  const residentialServices = [
    "First Home Buyers",
    "Home Guarantee Scheme Loans",
    "Upsizing, Downsizing, or Relocating",
    "Investment Property Loans",
    "Refinancing",
    "Renovating / Knockdown Rebuilds",
    "Guarantor Loans",
    "Private Banking Solutions",
  ];

  const commercialServices = [
    "Business Purchases & Goodwill Loans",
    "Commercial Property Acquisition",
    "Construction & Development Finance",
    "Car & Equipment Loans",
    "Medical Finance",
    "SMSF Lending",
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
            Finance and Lending
          </Badge>
          <h1 className="text-4xl font-bold" style={{ color: "#052f46" }}>
            Strategic Lending Solutions for Every Stage of Your Journey
          </h1>
          <p className="text-[#052f46]">
            Ray and the lending team specialise in helping clients secure
            finance with clarity and confidence.
          </p>
        </div>

        <div className="w-full h-full relative">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-md">
            <Image
              src="/michael-lee-PUwNVrP7BLQ-unsplash.jpg"
              alt="Finance and Lending"
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
                src="/partners-avatars/Ray.jpg"
                alt="Ray Jiang"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <CardContent className="p-0">
              <h3
                className="text-xl font-bold mb-1"
                style={{ color: "#052f46" }}
              >
                Ray Jiang
              </h3>
              <p className="mb-3" style={{ color: "#052f46" }}>
                Finance Broker & Property Expert
              </p>
              <p style={{ color: "#052f46" }}>
                Ray is a former ANZ banker with over a decade in the property
                and finance industry. His never-give-up attitude and attention
                to detail have helped countless clients secure residential and
                commercial finance solutions. Ray and his team work tirelessly
                to find the right lending solution for your unique situation.
              </p>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Services Tabs Section */}
      <div className="max-w-6xl mx-auto my-16 container">
        <h2
          className="text-2xl font-bold mb-8 text-center"
          style={{ color: "#052f46" }}
        >
          Our Lending Services
        </h2>

        <Tabs defaultValue="residential" className="w-full">
          <TabsList
            className="grid w-full grid-cols-2 mb-8 h-16"
            style={{
              backgroundColor: "rgba(227, 211, 160, 0.1)",
            }}
          >
            <TabsTrigger
              value="residential"
              className="text-lg h-12 data-[state=active]:!bg-[#052f46] data-[state=active]:!text-[#f5e5be]"
              style={{
                color: "#052f46",
                borderColor: "#052f46",
              }}
            >
              Residential Lending
            </TabsTrigger>
            <TabsTrigger
              value="commercial"
              className="text-lg h-12 data-[state=active]:!bg-[#052f46] data-[state=active]:!text-[#f5e5be]"
              style={{
                color: "#052f46",
                borderColor: "#052f46",
              }}
            >
              Commercial Lending
            </TabsTrigger>
          </TabsList>

          <TabsContent value="residential">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {residentialServices.map((service, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow"
                  style={{
                    backgroundColor: "#052f46",
                    borderColor: "#052f46",
                  }}
                >
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-4 font-bold"
                      style={{
                        backgroundColor: "rgba(245, 229, 190, 0.2)",
                        color: "#f5e5be",
                      }}
                    >
                      {index + 1}
                    </div>
                    <h3
                      className="text-lg font-medium"
                      style={{ color: "#f5e5be" }}
                    >
                      {service}
                    </h3>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="commercial">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commercialServices.map((service, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow"
                  style={{
                    backgroundColor: "#052f46",
                    borderColor: "#052f46",
                  }}
                >
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-4 font-bold"
                      style={{
                        backgroundColor: "rgba(245, 229, 190, 0.2)",
                        color: "#f5e5be",
                      }}
                    >
                      {index + 1}
                    </div>
                    <h3
                      className="text-lg font-medium"
                      style={{ color: "#f5e5be" }}
                    >
                      {service}
                    </h3>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA Section */}
      <div
        className="max-w-6xl mx-auto my-16 p-12 rounded-lg container"
        style={{
          backgroundColor: "rgba(5, 47, 70, 0.1)",
          borderColor: "#052f46",
          border: "1px solid #052f46",
        }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#052f46" }}>
            Ready to discuss your lending needs?
          </h2>
          <p className="text-lg mb-8" style={{ color: "#052f46" }}>
            Our team provides personalized lending solutions tailored to your
            unique situation. Let&apos;s find the right finance option for you.
          </p>
          <div className="flex justify-center">
            <a
              href="/event-register"
              className="px-8 py-3 font-medium rounded-md hover:bg-gray-100 transition-colors"
              style={{ backgroundColor: "#052f46", color: "#f5e5be" }}
            >
              Contact Us Today
            </a>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="max-w-6xl mx-auto my-16 container">
        <h2
          className="text-2xl font-bold mb-8 text-center"
          style={{ color: "#052f46" }}
        >
          Our Lending Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            className="p-6 hover:shadow-lg transition-shadow"
            style={{
              backgroundColor: "#052f46",
              borderColor: "#052f46",
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 font-bold text-xl"
                style={{
                  backgroundColor: "rgba(245, 229, 190, 0.2)",
                  color: "#f5e5be",
                }}
              >
                1
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#f5e5be" }}
              >
                Consultation
              </h3>
              <p className="font-medium" style={{ color: "#f5e5be" }}>
                We start with understanding your goals, timeline, and financial
                situation to identify the best lending options.
              </p>
            </div>
          </Card>

          <Card
            className="p-6 hover:shadow-lg transition-shadow"
            style={{
              backgroundColor: "#052f46",
              borderColor: "#052f46",
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 font-bold text-xl"
                style={{
                  backgroundColor: "rgba(245, 229, 190, 0.2)",
                  color: "#f5e5be",
                }}
              >
                2
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#f5e5be" }}
              >
                Strategy
              </h3>
              <p className="font-medium" style={{ color: "#f5e5be" }}>
                We develop a tailored lending strategy and compare options
                across our panel of lenders to find your ideal solution.
              </p>
            </div>
          </Card>

          <Card
            className="p-6 hover:shadow-lg transition-shadow"
            style={{
              backgroundColor: "#052f46",
              borderColor: "#052f46",
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 font-bold text-xl"
                style={{
                  backgroundColor: "rgba(245, 229, 190, 0.2)",
                  color: "#f5e5be",
                }}
              >
                3
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#f5e5be" }}
              >
                Execution
              </h3>
              <p className="font-medium" style={{ color: "#f5e5be" }}>
                We handle the application process from start to settlement,
                managing all paperwork and lender communications.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
