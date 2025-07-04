import type { Metadata } from "next";
import { Geist, Geist_Mono, Montaga } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montaga = Montaga({
  weight: ["400"],
  variable: "--font-montaga",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inspaire Partners",
  description:
    "We take care of all your wealth advisory, tax and accounting, lending, and superannuation needs, with the goal of ensuring you achieve your financial dreams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montaga.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
