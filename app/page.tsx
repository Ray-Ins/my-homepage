import type { Metadata } from "next";
import HeroCarousel from "@/components/HeroCarousel";
import AboutSection from "@/components/AboutSection";
import CustomerReviews from "@/components/CustomerReviews";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Inspire Partners - Strategic Tax & Lending Advisors",
  description:
    "Expert financial advisory services combining accounting, taxation, and lending solutions. We help medical professionals, small businesses, and individuals achieve their financial goals with confidence.",
  keywords: [
    "financial advisory",
    "accounting services",
    "tax planning",
    "business lending",
    "mortgage broker",
    "Melbourne accountant",
    "tax agent",
    "business structure advice",
    "medical practice finance",
    "SMSF",
    "investment property loans",
    "commercial finance",
  ],
  openGraph: {
    title: "Inspire Partners - Strategic Tax & Lending Advisors",
    description:
      "Expert financial advisory combining accounting, taxation, and lending solutions for your complete financial journey.",
    type: "website",
    url: "https://inspirepartners.com.au",
    siteName: "Inspire Partners",
    images: [
      {
        url: "/hero-carousel-1.webp",
        width: 1200,
        height: 630,
        alt: "Inspire Partners - Financial Advisory Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inspire Partners - Strategic Tax & Lending Advisors",
    description:
      "Expert financial advisory combining accounting, taxation, and lending solutions.",
    images: ["/hero-carousel-1.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "#003447",
        backgroundImage: `url('/background/background.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <HeroCarousel />
      <AboutSection />
      <CustomerReviews />
      <ContactSection />
    </main>
  );
}
