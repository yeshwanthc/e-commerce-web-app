"use client";

import { useEffect, useState } from "react";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Banner1 from "../../assets/images/Banner.jpg";
import Banner2 from "../../assets/images/Banner3.jpg";
import Banner3 from "../../assets/images/Banner4.jpg";

const slides = [
  {
    image: Banner1,
    title: "Summer Collection",
    description:
      "Discover our latest summer styles. Light, breezy, and perfect for the season.",
    cta: "Shop Summer",
    link: "/summer-collection",
  },
  {
    image: Banner2,
    title: "New Arrivals",
    description:
      "Be the first to get our freshest styles. Limited quantities available.",
    cta: "See What's New",
    link: "/new-arrivals",
  },
  {
    image: Banner3,
    title: "Clearance Sale",
    description:
      "Up to 70% off on selected items. Don't miss out on these incredible deals!",
    cta: "Shop Sale",
    link: "/clearance",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000); 

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60">
                <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white md:px-6">
                  <h1 className="mb-4 text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    {slide.title}
                  </h1>
                  <p className="mb-8 max-w-[600px] text-base sm:text-lg md:text-xl">
                    {slide.description}
                  </p>
                  <Button asChild size="lg" className="text-lg">
                    <a href={slide.link}>
                      {slide.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
