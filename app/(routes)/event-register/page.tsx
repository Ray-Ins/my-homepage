"use client";

import { useRef } from "react";
import EmailForm from "@/components/EmailForm";
import Image from "next/image";
import { BadgeCheckIcon, Calendar, Clock, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function EventRegistrationPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mx-auto py-12">
      {/* Section 1: Event Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto mb-12">
        <div className="space-y-6">
          <Badge
            variant="outline"
            className="text-[#2a8e9e] px-4 py-1"
            // className="bg-[#2a8e9e] text-white px-2 py-1"
          >
            <BadgeCheckIcon />
            Active Online Event
          </Badge>
          <h1 className="text-4xl font-bold">
            Topic: Am I in the Right Business Structure?
          </h1>
          <p className="text-gray-600">
            Strategic Tax & Lending Advisors for Medical Professionals, Upcoming
            Webinar for VAAUS, BGPAA, and ABHF Members
          </p>
          <Button
            size="lg"
            className="mt-4 h-[50px] w-[200px] bg-[#003447] hover:bg-[#003447]/90 hover:cursor-pointer"
            onClick={scrollToForm}
          >
            Register Now
          </Button>
        </div>

        <div className="w-full h-full relative">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-md">
            <Image
              src="/event-register.jpg"
              alt="Event Registration"
              fill
              style={{ objectFit: "cover" }}
              priority
              className="rounded-lg hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Event Details Card */}
      <Card className="max-w-6xl mx-auto my-12 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-4">
            <Calendar className="h-8 w-8 text-[#c5e2e6]" />
            <div>
              <h3 className="font-medium">Date</h3>
              <p className="text-gray-600">Wednesday, 30 July 2025</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 md:border-x border-gray-200 md:px-4">
            <Clock className="h-8 w-8 text-[#c5e2e6]" />
            <div>
              <h3 className="font-medium">Time</h3>
              <p className="text-gray-600">8:30 PM – 9:15 PM </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Globe className="h-8 w-8 text-[#c5e2e6]" />
            <div>
              <h3 className="font-medium">Timezone</h3>
              <p className="text-gray-600">Australia, AEST</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Section 3: Event Info and Registration Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-8 space-y-8">
          {/* Event Introduction */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Why Attend?</h2>
            <p className="mb-4">
              Choosing the right business structure can significantly impact
              your tax obligations, legal protection, and long-term wealth. In
              this session, David Li (CPA & Registered Tax Agent) will guide you
              through:{" "}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                The pros and cons of sole trader, partnership, company, and
                trust structures
              </li>
              <li>
                How the wrong structure could cost you more in tax or leave you
                exposed
              </li>
              <li>Real-world examples tailored to medical professionals</li>
              <li>
                When and how to restructure as your career or practice evolves
              </li>
            </ul>
            <p>
              Whether you&apos;re starting your journey or re-evaluating your
              setup, this session is a must-attend for doctors, dentists, and or
              practice evolves Whether you&apos;re starting your journey or
              re-evaluating your setup, this session is a must-attend for
              doctors, dentists, and clinic owners alike.
            </p>
          </div>

          {/* Additional Speaker Info */}
          <h2 className="text-2xl font-bold mb-4">Who Should Attend? </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>GPs, dentists, specialists & allied health professionals</li>
            <li>Contractors, practice owners, and medical investors</li>
            <li>
              Anyone unsure if their current business setup is still the right
              fit
            </li>
          </ul>

          <p>
            About Inspire Partners Founded by David Li (CPA & Tax Agent) and Ray
            (Finance Broker), Inspire Partners provides strategic tax,
            accounting, and lending advice tailored to Australia’s healthcare
            professionals. With deep experience in the healthcare sector, we
            help clients protect their income, structure wisely, and build
            lasting wealth.
          </p>

          {/* Speakers Introduction */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Featured Speakers</h2>

            {/* David Li Speaker Card */}
            <Card className="p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-32 h-32 relative flex-shrink-0 mx-auto sm:mx-0">
                  <Image
                    src="/partners-avatars/David.jpg"
                    alt="David Li"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">David Li</h3>
                  <p className="text-gray-500 mb-3">
                    CPA & Registered Tax Agent
                  </p>
                  <p className="text-gray-600">
                    With 15+ years of experience and an engineering background,
                    David brings a first-principles mindset to accounting. He
                    specialises in small to medium business tax, particularly in
                    the medical, hospitality, and IT sectors. Known for his
                    logical thinking and problem-solving skills, David is a
                    passionate advisor, family man, and seafood-loving
                    basketball fan.
                  </p>
                </div>
              </div>
            </Card>

            {/* Ray Jiang Speaker Card */}
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-32 h-32 relative flex-shrink-0 mx-auto sm:mx-0">
                  <Image
                    src="/partners-avatars/Ray.jpg"
                    alt="Ray Jiang"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Ray Jiang</h3>
                  <p className="text-gray-500 mb-3">
                    Finance Broker & Property Expert
                  </p>
                  <p className="text-gray-600">
                    Ray is a former ANZ banker with over a decade in the
                    property and finance industry. His never-give-up attitude
                    and attention to detail have helped countless clients secure
                    residential and commercial finance solutions. A devoted
                    family man, Ray loves reading, travelling, and playing
                    basketball.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Registration Form */}
        <div className="lg:col-span-4" ref={formRef}>
          <h2 className="text-2xl font-bold mb-4">Register Here</h2>
          <EmailForm />
        </div>
      </div>
    </div>
  );
}
