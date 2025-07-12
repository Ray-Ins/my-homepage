"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Home, LineChart } from "lucide-react";

export default function ExtendedServicePage() {
  const services = [
    {
      title: "Equity/Debt Investment",
      icon: <TrendingUp className="h-10 w-10" style={{ color: "#052f46" }} />,
      description:
        "Through our trusted investment partners, we provide access to high-quality property, equity, and debt investment opportunities for high-net-worth (HNW) individuals — opportunities typically reserved for investment banks and family offices. These curated offerings are sourced and managed by third-party experts, with a focus on strong fundamentals, risk-adjusted returns, and transparency.",
      tagline:
        "We connect you to institutional-grade opportunities aligned with your financial goals.",
      image: "/scott-graham-OQMZwNd3ThU-unsplash.jpg",
    },
    {
      title: "Property Advisory",
      icon: <Home className="h-10 w-10" style={{ color: "#052f46" }} />,
      description:
        "We partner with experienced third-party property advisors who bring deep knowledge of the Australian property market. Whether you're a first-time buyer, upgrader, or investor, our specialist experts help you navigate the complex property landscape with confidence — from market analysis and property selection to negotiation and settlement.",
      tagline:
        "We connect you to the right professionals so you can make informed, strategic property decisions.",
      image: "/denise-jans--gmtAa0Q5MI-unsplash.jpg",
    },
    {
      title: "Financial Planning",
      icon: <LineChart className="h-10 w-10" style={{ color: "#052f46" }} />,
      description:
        "Through our trusted financial planning partners, we offer clients access to holistic advice tailored to every stage of life. Whether you're building wealth, protecting your family, or planning for the future, our specialist advisors can assist with:",
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
          Extended Services
        </Badge>
        <h1 className="text-4xl font-bold mb-6" style={{ color: "#052f46" }}>
          Expert Partners for Your Complete Financial Journey
        </h1>
        <p className="max-w-3xl mx-auto" style={{ color: "#052f46" }}>
          We&apos;ve built a network of trusted professionals to provide
          seamless support in areas like financial planning, legal advice, and
          more.
        </p>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto space-y-24 container">
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
                <div
                  className="p-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "rgba(5, 47, 70, 0.1)" }}
                >
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold" style={{ color: "#052f46" }}>
                  {service.title}
                </h2>
              </div>

              <p className="font-medium" style={{ color: "#052f46" }}>
                {service.description}
              </p>

              {service.bulletPoints && (
                <ul className="space-y-3 pl-5 list-disc">
                  {service.bulletPoints.map((point, i) => (
                    <li key={i} style={{ color: "#052f46" }}>
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              <div
                className="border-l-4 p-4"
                style={{
                  backgroundColor: "rgba(5, 47, 70, 0.1)",
                  borderColor: "#052f46",
                }}
              >
                <p className="italic font-medium" style={{ color: "#052f46" }}>
                  {service.tagline}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div
        className="max-w-6xl mx-auto mt-24 p-12 rounded-lg text-center container"
        style={{
          backgroundColor: "rgba(5, 47, 70, 0.1)",
          borderColor: "#052f46",
          border: "1px solid #052f46",
        }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#052f46" }}>
          Ready to connect with our trusted partners?
        </h2>
        <p className="max-w-2xl mx-auto mb-8" style={{ color: "#052f46" }}>
          Our network of trusted professionals is ready to help you achieve your
          financial goals. Let us make the right introduction for your needs.
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
