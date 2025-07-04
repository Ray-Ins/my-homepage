"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const HeroCarousel = () => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Images for the carousel
  const carouselImages = [
    {
      src: "/annie-spratt-hCb3lIB8L8E-unsplash.jpg",
      alt: "Business meeting",
      caption: "Strategic Business Solutions",
    },
    {
      src: "/michael-lee-PUwNVrP7BLQ-unsplash.jpg",
      alt: "Modern office",
      caption: "Professional Financial Services",
    },
    {
      src: "/scott-graham-5fNmWej4tAA-unsplash.jpg",
      alt: "Financial planning",
      caption: "Expert Tax Consultation",
    },
    {
      src: "/blake-wisz-GFrBMipOd_E-unsplash.jpg",
      alt: "Corporate building",
      caption: "Industry-Leading Expertise",
    },
  ];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Autoplay plugin configuration
  const autoplayOptions = {
    delay: 5000,
    stopOnInteraction: false,
    rootNode: (emblaRoot: any) => emblaRoot.parentElement,
  };

  // Function to handle dot indicator click
  const scrollTo = (index: number) => {
    if (api) api.scrollTo(index);
  };

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[Autoplay(autoplayOptions)]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index} className="relative">
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
                  <h2 className="text-3xl md:text-5xl font-montaga text-center px-4">
                    {image.caption}
                  </h2>
                  <button className="mt-6 bg-[#003447] hover:bg-[#003447]/90 transition-colors text-white px-6 py-2 rounded-md">
                    Learn More
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 bg-white/60 hover:bg-white w-20 h-20 cursor-pointer" />
        <CarouselNext className="right-4 bg-white/60 hover:bg-white w-20 h-20 cursor-pointer" />

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === current
                  ? "bg-[#2a8e9e]"
                  : "bg-white/70 hover:bg-white"
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
