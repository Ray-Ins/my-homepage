"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Building2, Utensils, HardHat, Home } from "lucide-react";

export default function SpecialisedIndustriesPage() {
  const industries = [
    {
      title: "Medical & Healthcare",
      icon: <Building2 className="h-10 w-10 text-[#003447]" />,
      description:
        "GPs, dentists, clinics, surgeons — we manage your tax and structure your finances for long-term growth.",
      image: "/jason-goodman-Oalh2MojUuk-unsplash.jpg",
    },
    {
      title: "Hospitality",
      icon: <Utensils className="h-10 w-10 text-[#003447]" />,
      description:
        "From cafes to restaurants and venues, we help you navigate seasonal cashflow, payroll, and asset finance.",
      image: "/hendo-wang-GUDObDUsI6E-unsplash.jpg",
    },
    {
      title: "Construction & Property",
      icon: <HardHat className="h-10 w-10 text-[#003447]" />,
      description:
        "From builders to developers, we manage project-based cashflow, structure loans, and reduce risk.",
      image: "/redd-francisco-PTRzqc_h1r4-unsplash.jpg",
    },
    {
      title: "Real Estate & Agencies",
      icon: <Home className="h-10 w-10 text-[#003447]" />,
      description:
        "Commission structuring, contractor compliance, business lending — we've got it covered.",
      image: "/weyne-yew-PCbpcMAY_ew-unsplash.jpg",
    },
  ];

  return (
    <div className="container mx-auto py-12">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <Badge
          variant="outline"
          className="text-[#2a8e9e] px-4 py-1 mb-6 inline-flex mx-auto"
        >
          Specialised Industries
        </Badge>
        <h1 className="text-4xl font-bold mb-6">
          Tailored Financial Solutions for Complex Industries
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          We understand your industry because we&apos;ve served it for years.
        </p>
      </div>

      {/* Industries Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {industries.map((industry, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-[250px]">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">
                      {industry.title}
                    </h2>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#c5e2e6] p-3 rounded-full flex-shrink-0">
                    {industry.icon}
                  </div>
                  <p className="text-gray-600">{industry.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-6xl mx-auto bg-[#003447] text-white p-12 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Why Choose Industry Specialists?
            </h2>
            <p className="mb-4">
              Working with advisors who understand your industry&apos;s unique
              challenges and opportunities can make all the difference. Our team
              brings:
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#2a8e9e] rounded-full"></div>
                <span>Deep knowledge of industry-specific tax regulations</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#2a8e9e] rounded-full"></div>
                <span>Benchmarking data to compare your performance</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#2a8e9e] rounded-full"></div>
                <span>Tailored financial strategies for your sector</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#2a8e9e] rounded-full"></div>
                <span>Networks and connections within your industry</span>
              </li>
            </ul>
          </div>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image
              src="/krakenimages-376KN_ISplE-unsplash.jpg"
              alt="Professional meeting"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto my-16 text-center">
        <h2 className="text-2xl font-bold mb-6">
          Ready to work with industry specialists?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Book a consultation with our team to discuss your specific industry
          needs and how we can help you achieve your financial goals.
        </p>
        <a
          href="/contact"
          className="px-8 py-3 bg-[#003447] text-white font-medium rounded-md hover:bg-[#003447]/90 transition-colors inline-block"
        >
          Contact Us Today
        </a>
      </div>
    </div>
  );
}
