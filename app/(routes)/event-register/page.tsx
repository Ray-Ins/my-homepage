import type { Metadata } from "next";
import EmailForm from "@/components/EmailForm";
import ScrollToFormButton from "@/components/ScrollToFormButton";
import Image from "next/image";
import { BadgeCheckIcon, Calendar, Clock, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { eventTable } from "@/db/schema";
import { and, asc, eq, gte } from "drizzle-orm";
import { formatInTimeZone } from "date-fns-tz";
import { enAU } from "date-fns/locale";

export async function generateMetadata(): Promise<Metadata> {
  const today = new Date().toISOString().slice(0, 10);
  const active = await db
    .select()
    .from(eventTable)
    .where(
      and(eq(eventTable.available, true), gte(eventTable.date as any, today))
    )
    .orderBy(asc(eventTable.date))
    .limit(1);
  const event = active[0] ?? null;

  const title = event
    ? `${event.eventName} | Inspire Partners`
    : "Event Registration | Inspire Partners";
  const description =
    event?.description ??
    "Register for our upcoming online event with Inspire Partners.";
  const keywords = event
    ? [
        event.eventName,
        "webinar",
        "online event",
        "registration",
        "Inspire Partners",
      ]
    : ["webinar", "online event", "registration", "Inspire Partners"];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: "/event-register.webp",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/event-register.webp"],
    },
  };
}

export default async function EventRegistrationPage() {
  const today = new Date().toISOString().slice(0, 10);
  const active = await db
    .select()
    .from(eventTable)
    .where(
      and(eq(eventTable.available, true), gte(eventTable.date as any, today))
    )
    .orderBy(asc(eventTable.date))
    .limit(1);
  const event = active[0] ?? null;
  const formattedDate = event
    ? formatInTimeZone(
        new Date(`${String(event.date)}T00:00:00`),
        "Australia/Sydney",
        "EEEE, d MMMM yyyy",
        { locale: enAU }
      )
    : "TBA";
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
      {/* Section 1: Event Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto mb-12 container">
        <div className="space-y-6">
          <Badge
            variant="outline"
            className="px-4 py-1"
            style={{ color: "#052f46", borderColor: "#052f46" }}
          >
            <BadgeCheckIcon />
            Active Online Event
          </Badge>
          <h1 className="text-4xl font-bold" style={{ color: "#052f46" }}>
            {event ? `Topic: ${event.eventName}` : "Upcoming Online Event"}
          </h1>
          <p style={{ color: "#052f46" }}>
            {event?.description ??
              "Join our upcoming online session. Details will be announced soon."}
          </p>
          <ScrollToFormButton
            targetId="registration-form"
            className="mt-4 h-[50px] w-[200px] hover:bg-gray-100 hover:cursor-pointer"
            style={{ backgroundColor: "#052f46", color: "#f5e5be" }}
          >
            Register Now
          </ScrollToFormButton>
        </div>

        <div className="w-full h-full relative">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-md">
            <Image
              src="/event-register.webp"
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
      <Card
        className="max-w-6xl mx-auto my-12 p-6 container"
        style={{
          backgroundColor: "rgba(227, 211, 160, 0.1)",
          borderColor: "#052f46",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-4">
            <Calendar className="h-8 w-8" style={{ color: "#052f46" }} />
            <div>
              <h3 className="font-medium" style={{ color: "#052f46" }}>
                Date
              </h3>
              <p style={{ color: "#052f46" }}>{formattedDate}</p>
            </div>
          </div>

          <div
            className="flex items-center space-x-4 md:border-x md:px-4"
            style={{ borderColor: "#052f46" }}
          >
            <Clock className="h-8 w-8" style={{ color: "#052f46" }} />
            <div>
              <h3 className="font-medium" style={{ color: "#052f46" }}>
                Time
              </h3>
              <p style={{ color: "#052f46" }}>
                {event ? `${event.startTime} – ${event.endTime}` : "TBA"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Globe className="h-8 w-8" style={{ color: "#052f46" }} />
            <div>
              <h3 className="font-medium" style={{ color: "#052f46" }}>
                Timezone
              </h3>
              <p style={{ color: "#052f46" }}>Australia, AEST</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Section 3: Event Info and Registration Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto container">
        <div className="lg:col-span-8 space-y-8">
          {/* Event Introduction */}
          <div>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              Why Attend?
            </h2>
            <p className="mb-4">
              If you earn income from your skills, knowledge, or expertise, the
              Personal Services Income (PSI) rules could directly affect how
              you’re taxed and what deductions you can claim. In this session,
              we’ll break down the rules in plain language, share real-world
              examples, and help you understand whether PSI applies to you.
              You’ll walk away with clarity, confidence, and practical steps to
              manage your obligations and maximise your financial position.
            </p>
          </div>

          {/* Additional Speaker Info */}
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#052f46" }}>
            Who Should Attend?{" "}
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>GPs, dentists, specialists & allied health professionals</li>
            <li>Contractors, practice owners, and medical investors</li>
            <li>
              Anyone unsure whether the PSI or PSB rules apply to their business
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4" style={{ color: "#052f46" }}>
            About Inspire Partners
          </h2>
          <p>
            Founded by David Li (CPA & Tax Agent) and Ray Jiang (Finance
            Broker), Inspire Partners provides strategic tax, accounting, and
            lending advice tailored to Australia's healthcare professionals.
            With deep experience in the healthcare sector, we help clients
            protect their income, structure wisely, and build lasting wealth.
          </p>

          {/* Speakers Introduction */}
          <div>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#052f46" }}
            >
              Featured Speakers
            </h2>

            {/* David Li Speaker Card */}
            <Card
              className="p-6 mb-6"
              style={{
                backgroundColor: "rgba(227, 211, 160, 0.1)",
                borderColor: "#052f46",
              }}
            >
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
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: "#052f46" }}
                  >
                    David Li
                  </h3>
                  <p className="mb-3" style={{ color: "#052f46" }}>
                    CPA & Registered Tax Agent
                  </p>
                  <p className="font-medium" style={{ color: "#052f46" }}>
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
            <Card
              className="p-6"
              style={{
                backgroundColor: "rgba(227, 211, 160, 0.1)",
                borderColor: "#052f46",
              }}
            >
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
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: "#052f46" }}
                  >
                    Ray Jiang
                  </h3>
                  <p className="mb-3" style={{ color: "#052f46" }}>
                    Finance Broker & Property Expert
                  </p>
                  <p className="font-medium" style={{ color: "#052f46" }}>
                    Ray is a former ANZ banker with over a decade of experience
                    in the property and finance industry. His never-give-up
                    attitude and attention to detail have helped countless
                    clients secure residential and commercial finance solutions.
                    A devoted family man, Ray loves reading, travelling, and
                    playing basketball.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Registration Form */}
        <div className="lg:col-span-4" id="registration-form">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#052f46" }}>
            Register Here
          </h2>
          <EmailForm eventId={event?.id} />
        </div>
      </div>
    </div>
  );
}
