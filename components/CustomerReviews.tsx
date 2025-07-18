"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MessageSquareMore } from "lucide-react";

// Sample review data - can be replaced later
const reviewsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/avatars/avatar-1.jpg",
    rating: 5,
    review:
      "Ray at Inspire Partners has been an incredible support to us. From the very first conversation, he took the time to genuinely understand our situation and what we were hoping to achieve. His advice was not only insightful but also practical and tailored to our needs. What really sets Ray apart is his patience, honesty, and the way he truly cares about his clients. We never felt like just another number—he made us feel valued and supported every step of the way. We are so grateful for his guidance and cannot recommend him highly enough! Thank you, Ray!",
    position: "GP",
  },
  {
    id: 2,
    name: "Jack Thompson",
    avatar: "/avatars/avatar-2.jpg",
    rating: 5,
    review:
      "We recently had our home loan refinanced and we were lucky to have Ray from Inspire Partners help us all throughout the whole process. Ray was very knowledgeable and helpful. He patiently answered our many questions and was always available to help us complete the many requirements. Overall, it was a very good experience and we won't hesitate to recommend Ray to anyone who needs assistance in their home loan or refinancing journey. Thank you, Ray! You're the best!",
    position: "Dentist",
  },
  {
    id: 3,
    name: "David Wilson",
    avatar: "/avatars/avatar-3.jpg",
    rating: 5,
    review:
      "We had an excellent experience working with Ray to refinance our loan. Ray was not only extremely knowledgeable about the lending process but also took the time to help us explore various options tailored to our needs. From start to finish, Ray was attentive, thorough, and very communicative, ensuring we understood each step and felt confident in our decisions. Thanks to Ray's dedication, we secured a fantastic rate. His expertise and patience made the entire process seamless, and we felt reassured knowing we were in capable hands. I highly recommend Ray to anyone looking for a broker who genuinely cares about finding the best solutions for their clients.",
    position: "Specialist",
  },
];

export default function CustomerReviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextReview = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
  };

  const prevReview = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + reviewsData.length) % reviewsData.length
    );
  };

  return (
    <section
      className="py-16 font-montaga"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl font-bold text-center mb-2"
          style={{ color: "#052f46" }}
        >
          What Our Customers Say
        </h2>
        <p
          className="text-center mb-12 max-w-2xl mx-auto font-medium"
          style={{ color: "#052f46" }}
        >
          Our results speak for themselves. Here&apos;s what our clients have to
          say.
        </p>

        <div className="flex flex-wrap justify-center gap-6 font-montaga">
          {/* Desktop View - Show multiple reviews */}
          <div className="hidden md:flex gap-6 flex-wrap justify-center">
            {reviewsData.map((review) => (
              <Card
                key={review.id}
                className="w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
                style={{
                  backgroundColor: "rgba(227, 211, 160, 0.1)",
                  borderColor: "#052f46",
                }}
              >
                <div
                  className="absolute -top-3 -right-3 rounded-full p-4 shadow-lg"
                  style={{ backgroundColor: "#052f46", opacity: 0.8 }}
                >
                  <MessageSquareMore
                    className="h-10 w-10"
                    style={{ color: "#f5e5be" }}
                  />
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3
                        className="font-semibold text-lg"
                        style={{ color: "#052f46" }}
                      >
                        {review.name}
                      </h3>
                      <p className="text-sm" style={{ color: "#052f46" }}>
                        {review.position}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-6 w-6 ${i < review.rating ? "fill-yellow-400" : ""}`}
                        style={{
                          color: i < review.rating ? "#fbbf24" : "#052f46",
                        }}
                      />
                    ))}
                  </div>

                  <p
                    className="font-montaga font-medium"
                    style={{ color: "#052f46" }}
                  >
                    {review.review}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile View - Show one review at a time with navigation */}
          <div className="md:hidden w-full max-w-md">
            <Card
              className="shadow-lg relative"
              style={{
                backgroundColor: "rgba(227, 211, 160, 0.1)",
                borderColor: "#052f46",
              }}
            >
              <div
                className="absolute -top-3 -right-3 rounded-full p-2 shadow-md"
                style={{ backgroundColor: "#052f46" }}
              >
                <MessageSquareMore
                  className="h-5 w-5"
                  style={{ color: "#f5e5be" }}
                />
              </div>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={reviewsData[activeIndex].avatar}
                      alt={reviewsData[activeIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-lg"
                      style={{ color: "#052f46" }}
                    >
                      {reviewsData[activeIndex].name}
                    </h3>
                    <p className="text-sm" style={{ color: "#052f46" }}>
                      {reviewsData[activeIndex].position}
                    </p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < reviewsData[activeIndex].rating ? "fill-yellow-400" : ""}`}
                      style={{
                        color:
                          i < reviewsData[activeIndex].rating
                            ? "#fbbf24"
                            : "#052f46",
                      }}
                    />
                  ))}
                </div>

                <p className="font-medium" style={{ color: "#052f46" }}>
                  {reviewsData[activeIndex].review}
                </p>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={prevReview}
                    className="p-2 rounded-full hover:bg-gray-200"
                    style={{ backgroundColor: "rgba(5, 47, 70, 0.1)" }}
                    aria-label="Previous review"
                  >
                    <span style={{ color: "#052f46" }}>←</span>
                  </button>
                  <div className="flex gap-1">
                    {reviewsData.map((_, idx) => (
                      <span
                        key={idx}
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor:
                            idx === activeIndex
                              ? "#052f46"
                              : "rgba(5, 47, 70, 0.3)",
                        }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextReview}
                    className="p-2 rounded-full hover:bg-gray-200"
                    style={{ backgroundColor: "rgba(5, 47, 70, 0.1)" }}
                    aria-label="Next review"
                  >
                    <span style={{ color: "#052f46" }}>→</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
