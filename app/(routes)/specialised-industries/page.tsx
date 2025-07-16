import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Building2, Utensils, HardHat, Home } from "lucide-react";

export const metadata: Metadata = {
  title:
    "Specialised Industries - Medical, Hospitality & Construction Finance | Inspire Partners",
  description:
    "Tailored financial solutions for medical professionals, hospitality businesses, construction companies, and real estate agencies. Industry-specific expertise in tax, lending, and business advisory.",
  keywords: [
    "medical practice finance",
    "GP practice accounting",
    "dental practice loans",
    "hospitality business finance",
    "restaurant accounting",
    "cafe business loans",
    "construction finance",
    "builder business loans",
    "property developer finance",
    "real estate agency finance",
    "medical practice loans",
    "healthcare finance",
    "industry specific accounting",
    "specialist business advisors",
  ],
  openGraph: {
    title: "Specialised Industry Financial Solutions",
    description:
      "Expert financial services for medical, hospitality, construction, and real estate industries with tailored solutions.",
    type: "website",
    images: [
      {
        url: "/specialised-industries-1.webp",
        width: 1200,
        height: 630,
        alt: "Specialised Industry Financial Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry-Specific Financial Solutions",
    description:
      "Tailored finance and accounting for medical, hospitality, construction & real estate.",
  },
};

export default function SpecialisedIndustriesPage() {
  const industries = [
    {
      title: "Medical & Healthcare",
      icon: <Building2 className="h-10 w-10" style={{ color: "#052f46" }} />,
      description:
        "GPs, dentists, clinics, surgeons — we manage your tax and structure your finances for long-term growth.",
      image: "/specialised-industries-1.webp",
    },
    {
      title: "Hospitality",
      icon: <Utensils className="h-10 w-10" style={{ color: "#052f46" }} />,
      description:
        "From cafes to restaurants and venues, we help you navigate seasonal cashflow, payroll, and asset finance.",
      image: "/specialised-industries-2.webp",
    },
    {
      title: "Construction & Property",
      icon: <HardHat className="h-10 w-10" style={{ color: "#052f46" }} />,
      description:
        "From builders to developers, we manage project-based cashflow, structure loans, and reduce risk.",
      image: "/specialised-industries-3.webp",
    },
    {
      title: "Real Estate & Agencies",
      icon: <Home className="h-10 w-10" style={{ color: "#052f46" }} />,
      description:
        "Commission structuring, contractor compliance, business lending — we've got it covered.",
      image: "/specialised-industries-4.webp",
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
      <div className="max-w-6xl mx-auto mb-16 text-center container">
        <Badge
          variant="outline"
          className="px-4 py-1 mb-6 inline-flex mx-auto"
          style={{ color: "#052f46", borderColor: "#052f46" }}
        >
          Specialised Industries
        </Badge>
        <h1 className="text-4xl font-bold mb-6" style={{ color: "#052f46" }}>
          Tailored Financial Solutions for Complex Industries
        </h1>
        <p className="max-w-3xl mx-auto" style={{ color: "#052f46" }}>
          We understand your industry because we&apos;ve served it for years.
        </p>
      </div>

      {/* Industries Grid */}
      <div className="max-w-6xl mx-auto container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {industries.map((industry, index) => (
            <Card
              key={index}
              className="overflow-hidden"
              style={{
                backgroundColor: "rgba(227, 211, 160, 0.1)",
                borderColor: "#052f46",
              }}
            >
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
                  <div
                    className="p-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "rgba(5, 47, 70, 0.1)" }}
                  >
                    {industry.icon}
                  </div>
                  <p className="font-medium" style={{ color: "#052f46" }}>
                    {industry.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div
        className="max-w-6xl mx-auto p-12 rounded-lg container"
        style={{
          backgroundColor: "rgba(5, 47, 70, 0.1)",
          borderColor: "#052f46",
          border: "1px solid #052f46",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "#052f46" }}
            >
              Why Choose Industry Specialists?
            </h2>
            <p className="mb-4" style={{ color: "#052f46" }}>
              Working with advisors who understand your industry&apos;s unique
              challenges and opportunities can make all the difference. Our team
              brings:
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#052f46" }}
                ></div>
                <span style={{ color: "#052f46" }}>
                  Deep knowledge of industry-specific tax regulations
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#052f46" }}
                ></div>
                <span style={{ color: "#052f46" }}>
                  Benchmarking data to compare your performance
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#052f46" }}
                ></div>
                <span style={{ color: "#052f46" }}>
                  Tailored financial strategies for your sector
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#052f46" }}
                ></div>
                <span style={{ color: "#052f46" }}>
                  Networks and connections within your industry
                </span>
              </li>
            </ul>
          </div>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image
              src="/specialised-industries-5.webp"
              alt="Professional meeting"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto my-16 text-center container">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#052f46" }}>
          Ready to work with industry specialists?
        </h2>
        <p className="max-w-2xl mx-auto mb-8" style={{ color: "#052f46" }}>
          Book a consultation with our team to discuss your specific industry
          needs and how we can help you achieve your financial goals.
        </p>
        <a
          href="/contact"
          className="px-8 py-3 font-medium rounded-md hover:bg-gray-100 transition-colors inline-block"
          style={{ backgroundColor: "#052f46", color: "#f5e5be" }}
        >
          Contact Us Today
        </a>
      </div>
    </div>
  );
}
