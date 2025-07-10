"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Home, LineChart } from "lucide-react";

export default function AffiliateServicePage() {
  const services = [
    {
      title: "Equity/Debt Investment",
      icon: <TrendingUp className="h-10 w-10 text-[#003447]" />,
      description:
        "Through our trusted investment partners, we provide access to high-quality property, equity, and debt investment opportunities for high-net-worth (HNW) individuals — opportunities typically reserved for investment banks and family offices. These curated offerings are sourced and managed by third-party experts, with a focus on strong fundamentals, risk-adjusted returns, and transparency.",
      tagline:
        "We connect you to institutional-grade opportunities aligned with your financial goals.",
      image: "/scott-graham-OQMZwNd3ThU-unsplash.jpg",
    },
    {
      title: "Property Advisory",
      icon: <Home className="h-10 w-10 text-[#003447]" />,
      description:
        "We partner with experienced third-party property advisors who bring deep knowledge of the Australian property market. Whether you're a first-time buyer, upgrader, or investor, our affiliate experts help you navigate the complex property landscape with confidence — from market analysis and property selection to negotiation and settlement.",
      tagline:
        "We connect you to the right professionals so you can make informed, strategic property decisions.",
      image: "/denise-jans--gmtAa0Q5MI-unsplash.jpg",
    },
    {
      title: "Financial Planning",
      icon: <LineChart className="h-10 w-10 text-[#003447]" />,
      description:
        "Through our trusted financial planning partners, we offer clients access to holistic advice tailored to every stage of life. Whether you're building wealth, protecting your family, or planning for the future, our affiliate advisors can assist with:",
      tagline:
        "We connect you with licensed professionals who share our values of integrity, transparency, and long-term partnership.",
      image: "/microsoft-edge-4QKqDeAZf-c-unsplash.jpg",
      bulletPoints: [
        "Investment Strategy – Structuring portfolios aligned with your goals and risk profile",
        "Retirement Planning – Ensuring financial confidence and lifestyle readiness for life after work",
        "Personal Risk Protection – Safeguarding your income, assets, and loved ones through tailored insurance solutions",
        "Succession Planning – Preparing for business continuity, estate transition, and intergenerational wealth transfer",
        "Superannuation & SMSF – Optimising your super strategy, including advice around self-managed super funds",
      ],
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
          Affiliate Services
        </Badge>
        <h1 className="text-4xl font-bold mb-6">
          Expert Partners for Your Complete Financial Journey
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          We&apos;ve built relationships with trusted specialists to provide you
          with comprehensive financial solutions beyond our core services.
        </p>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto space-y-24">
        {services.map((service, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-[#c5e2e6] p-3 rounded-full flex-shrink-0">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold">{service.title}</h2>
              </div>

              <p className="text-gray-600">{service.description}</p>

              {service.bulletPoints && (
                <ul className="space-y-3 pl-5 list-disc text-gray-600">
                  {service.bulletPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}

              <div className="bg-[#f0f9fa] border-l-4 border-[#2a8e9e] p-4">
                <p className="text-[#003447] italic font-medium">
                  {service.tagline}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto mt-24 bg-[#003447] text-white p-12 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-6">
          Ready to connect with our affiliate partners?
        </h2>
        <p className="max-w-2xl mx-auto mb-8">
          Our network of trusted professionals is ready to help you achieve your
          financial goals. Let us make the right introduction for your needs.
        </p>
        <a
          href="/contact"
          className="px-8 py-3 bg-white text-[#003447] font-medium rounded-md hover:bg-gray-100 transition-colors inline-block"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}
