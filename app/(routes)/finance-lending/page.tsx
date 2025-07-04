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
    "Guarantor loans",
    "Private Banking Solutions",
  ];

  const commercialServices = [
    "Business purchases & goodwill loans",
    "Commercial property acquisition",
    "Construction & development finance",
    "Car & equipment loans",
    "Medical finance",
    "SMSF lending",
  ];

  return (
    <div className="container mx-auto py-12">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto mb-16">
        <div className="space-y-6">
          <Badge variant="outline" className="text-[#2a8e9e] px-4 py-1">
            Finance and Lending
          </Badge>
          <h1 className="text-4xl font-bold">
            Strategic Lending Solutions for Every Stage of Your Journey
          </h1>
          <p className="text-gray-600">
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
      <div className="max-w-6xl mx-auto mb-16">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
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
                commercial finance solutions. Ray and his team work tirelessly
                to find the right lending solution for your unique situation.
              </p>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Services Tabs Section */}
      <div className="max-w-6xl mx-auto my-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Our Lending Services
        </h2>

        <Tabs defaultValue="residential" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-16">
            <TabsTrigger value="residential" className="text-lg h-12">
              Residential Lending
            </TabsTrigger>
            <TabsTrigger value="commercial" className="text-lg h-12">
              Commercial Lending
            </TabsTrigger>
          </TabsList>

          <TabsContent value="residential">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {residentialServices.map((service, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#c5e2e6] rounded-full flex items-center justify-center mr-4 text-[#003447] font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-medium text-[#003447]">
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
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#c5e2e6] rounded-full flex items-center justify-center mr-4 text-[#003447] font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-medium text-[#003447]">
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
      <div className="max-w-6xl mx-auto my-16 bg-[#003447] text-white p-12 rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to discuss your lending needs?
          </h2>
          <p className="text-lg mb-8">
            Our team provides personalized lending solutions tailored to your
            unique situation. Let&apos;s find the right finance option for you.
          </p>
          <div className="flex justify-center">
            <a
              href="/event-register"
              className="px-8 py-3 bg-white text-[#003447] font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              Contact Us Today
            </a>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="max-w-6xl mx-auto my-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Our Lending Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#c5e2e6] rounded-full flex items-center justify-center mb-4 text-[#003447] font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#003447]">
                Consultation
              </h3>
              <p className="text-gray-600">
                We start with understanding your goals, timeline, and financial
                situation to identify the best lending options.
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#c5e2e6] rounded-full flex items-center justify-center mb-4 text-[#003447] font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#003447]">
                Strategy
              </h3>
              <p className="text-gray-600">
                We develop a tailored lending strategy and compare options
                across our panel of lenders to find your ideal solution.
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#c5e2e6] rounded-full flex items-center justify-center mb-4 text-[#003447] font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#003447]">
                Execution
              </h3>
              <p className="text-gray-600">
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
