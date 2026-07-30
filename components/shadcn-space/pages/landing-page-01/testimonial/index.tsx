"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const testimonialData = [
  {
    brand: "afterpay",
    logo: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-1.svg",
    lightLogo:
      "https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-1.svg",
    items: [
      {
        quote:
          "She took the time to truly understand our challenges and delivered a solution that made our work simpler and more efficient.",
        author: "Steve Harrington",
        image:
          "https://images.shadcnspace.com/assets/hero-img/hero-team-img-4.jpg",
      },
      {
        quote:
          "Rachel delivered a refined, modern design system that not only looks premium but has significantly boosted our user engagement.",
        author: "Sarah Jenkins",
        image:
          "https://images.shadcnspace.com/assets/hero-img/hero-team-img-8.jpg",
      },
    ],
  },
  {
    brand: "basecamp",
    logo: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-2.svg",
    lightLogo:
      "https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-2.svg",
    items: [
      {
        quote:
          "Her strategic UX approach and flawless design execution transformed our complex requirements into a seamless web application.",
        author: "Daniel Morris",
        image:
          "https://images.shadcnspace.com/assets/hero-img/hero-team-img-10.jpg",
      },
      {
        quote:
          "A truly collaborative partner. Rachel didn't just design our mobile app; she helped us redefine our entire digital product strategy.",
        author: "Nancy Wheeler",
        image:
          "https://images.shadcnspace.com/assets/hero-img/hero-team-img-2.jpg",
      },
    ],
  },
  {
    brand: "splunk",
    logo: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-3.svg",
    lightLogo:
      "https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-3.svg",
    items: [
      {
        quote:
          "From initial wireframe to final developer handoff, her process was smooth and professional. The new dashboard design not only looks stunning but has simplified complex data analysis.",
        author: "Emily Carter",
        image:
          "https://images.shadcnspace.com/assets/hero-img/hero-team-img-6.jpg",
      },
      {
        quote:
          "The level of design sensibility and UX expertise she brought to the table was exactly what we needed to scale our enterprise platform.",
        author: "Jonathan Byers",
        image:
          "https://images.shadcnspace.com/assets/hero-img/hero-team-img-3.jpg",
      },
    ],
  },
  {
    brand: "ghost",
    logo: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-4.svg",
    lightLogo:
      "https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-4.svg",
    items: [
      {
        quote:
          "Her attention to detail, creative thinking, and systematic design approach made all the difference. We're extremely happy with the outcome.",
        author: "Michael Thompson",
        image:
          "https://images.shadcnspace.com/assets/hero-img/hero-team-img-5.jpg",
      },
      {
        quote:
          "Her ability to translate complex user flows into a simple, elegant interface design is second to none.",
        author: "Robin Buckley",
        image:
          "https://images.shadcnspace.com/assets/hero-img/hero-team-img-7.jpg",
      },
    ],
  },
];

interface TestimonialItemProps {
  quote: string;
  author: string;
  image: string;
}

const TestimonialItem = ({ quote, author, image }: TestimonialItemProps) => (
  <div className="flex md:flex-row flex-col h-full md:pb-0 pb-15 relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.05)_0%,transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08)_0%,transparent_30%)] -z-1" />
    <div className="flex-1 md:p-16 px-5 py-6 flex flex-col gap-16 justify-between h-full relative">
      <p className="text-xl md:text-2xl text-foreground">“{quote}”</p>
      <p className="md:text-xl text-lg text-foreground">@{author}</p>
    </div>
    <div className="md:border-l md:border-t-0 border-t border-l-0 border-border h-full lg:p-10 p-5 w-full md:w-[320px] lg:w-[480px] shrink-0 flex md:items-center justify-center">
      <img
        src={image}
        alt={author}
        width={1200}
        height={0}
        sizes="100vw"
        className="object-cover w-full aspect-video object-[center_20%] sm:object-[center_30%] grayscale"
      />
    </div>
  </div>
);

const TabCarousel = ({ items }: { items: TestimonialItemProps[] }) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <Carousel setApi={setApi} className="relative">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <TestimonialItem {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="relative md:absolute flex justify-center gap-2 py-8 md:py-0 lg:right-140 md:right-100 lg:bottom-16 md:bottom-10">
        <Button
          variant="outline"
          size="icon"
          disabled={!canScrollPrev}
          onClick={() => api?.scrollPrev()}
          className="h-10 w-10 rounded-full cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          <span className="sr-only">Previous slide</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          disabled={!canScrollNext}
          onClick={() => api?.scrollNext()}
          className="h-10 w-10 rounded-full cursor-pointer"
        >
          <ArrowRight className="size-4" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>
    </Carousel>
  );
};

export default function Testimonial() {
  return (
    <section id="testimonials" className="overflow-hidden">
      {/* 1. Header Row */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        <div className="py-8 sm:py-16 px-4 md:px-8 border-x border-b border-border relative before:absolute before:-bottom-px before:right-full before:w-screen before:h-px before:bg-border after:absolute after:-bottom-px after:left-full after:w-screen after:h-px after:bg-border">
          <div className="space-y-4">
            <p className="flex items-center gap-1.5 text-muted-foreground text-base">
              <span className="w-2 h-2 shrink-0 bg-muted-foreground rounded-full" />
              What people are saying
            </p>
            <h2 className="text-foreground font-semibold text-5xl sm:text-6xl lg:text-7xl">
              Testimonials.
            </h2>
          </div>
        </div>
      </div>

      {/* 2. Main content Row */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        <div className="border-x border-border">
          <Tabs defaultValue={testimonialData[0].brand} className="gap-0">
            {/* Tabs Header */}
            <div className="border-b border-border relative before:absolute before:-bottom-px before:right-full before:w-screen before:h-px before:bg-border after:absolute after:-bottom-px after:left-full after:w-screen after:h-px after:bg-border">
              <TabsList className="p-0 bg-transparent flex justify-start w-full h-fit! rounded-none overflow-x-auto overflow-y-hidden no-scrollbar">
                {testimonialData.map((tab) => (
                  <TabsTrigger
                    key={tab.brand}
                    value={tab.brand}
                    className={cn(
                      "bg-transparent cursor-pointer opacity-40 hover:opacity-100 transition",
                      "data-[state=active]:opacity-100 data-active:opacity-100 dark:data-active:bg-background",
                      "border-r border-border last:border-r-0 rounded-none h-20 px-6.5 md:flex-1 shrink-0 min-w-40 md:min-w-0",
                    )}
                  >
                    <img
                      src={tab.logo}
                      alt={tab.brand}
                      className="grayscale dark:hidden block"
                    />
                    <img
                      src={tab.lightLogo}
                      alt={tab.brand}
                      className="grayscale dark:block hidden"
                    />
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Tabs Content */}
            {testimonialData.map((tab) => (
              <TabsContent key={tab.brand} value={tab.brand}>
                <TabCarousel items={tab.items} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* 3. Footer Row */}
      <div className="border-y border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="py-10 relative before:absolute before:-bottom-px before:right-full before:w-screen before:h-px before:bg-border after:absolute after:-bottom-px after:left-full after:w-screen after:h-px after:bg-border border-x border-border" />
        </div>
      </div>
    </section>
  );
}
