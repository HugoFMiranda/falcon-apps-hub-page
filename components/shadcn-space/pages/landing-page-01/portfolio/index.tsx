"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const STAGGER_ANIMATION_VARIANTS = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

type PortfolioData = {
  portfolio_image: string;
  portfolio_description: string;
  width: string;
  height: string;
};

const portfolioData: PortfolioData[] = [
  {
    portfolio_image: "https://images.shadcnspace.com/assets/portfolio/portfolio-3-img-1.jpg",
    portfolio_description: "Marketing Business Website",
    width: "310",
    height: "399",
  },
  {
    portfolio_image: "https://images.shadcnspace.com/assets/portfolio/portfolio-3-img-2.jpg",
    portfolio_description: "Web Application Project",
    width: "420",
    height: "345",
  },
  {
    portfolio_image: "https://images.shadcnspace.com/assets/portfolio/portfolio-3-img-3.jpg",
    portfolio_description: "Branding for an Agency",
    width: "310",
    height: "292",
  },
  {
    portfolio_image: "https://images.shadcnspace.com/assets/portfolio/portfolio-3-img-4.jpg",
    portfolio_description: "Building Smarter Digital Products",
    width: "342",
    height: "406",
  },
];

const Portfolio = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const updateProgress = () => {
      const scrollProgress = api.scrollProgress();
      setProgress(Math.max(0, Math.min(1, scrollProgress)) * 100);
    };

    updateProgress();

    api.on("scroll", updateProgress);
    api.on("reInit", updateProgress);
    api.on("select", updateProgress);

    return () => {
      api.off("scroll", updateProgress);
      api.off("reInit", updateProgress);
      api.off("select", updateProgress);
    };
  }, [api]);

  return (
    <section id="projects">
      <div>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border px-5 md:px-8 py-8 lg:py-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={STAGGER_ANIMATION_VARIANTS}
              className="flex flex-col gap-4"
            >
              <motion.div
                variants={FADE_UP_ANIMATION_VARIANTS}
                className="flex items-center gap-1.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground m-1.5" />
                <span className="text-base font-normal text-muted-foreground">
                  Projects
                </span>
              </motion.div>
              <motion.h2
                variants={FADE_UP_ANIMATION_VARIANTS}
                className="text-5xl sm:text-6xl md:text-7xl font-semibold text-foreground"
              >
                My work.
              </motion.h2>
            </motion.div>
          </div>
        </div>
        <div className="border-y border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
            <div className="border-x border-border sm:p-8">
              <Carousel
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: false,
                  slidesToScroll: 1,
                }}
              >
                <CarouselContent className="-ml-6">
                  {portfolioData?.map((item, index) => {
                    return (
                      <CarouselItem
                        key={index}
                        className="pl-6 basis-full md:basis-1/2 lg:basis-1/3"
                      >
                        <motion.div
                          variants={FADE_UP_ANIMATION_VARIANTS}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="group flex flex-col hover:scale-105 transition-all ease-in-out duration-500"
                        >
                          <div className="relative overflow-hidden">
                            <img
                              src={item.portfolio_image}
                              alt={item.portfolio_description}
                              width={item.width}
                              height={item.height}
                              className={`w-full h-auto object-cover`}
                            />
                            <div className="hidden absolute top-0 left-0 w-full h-full backdrop-blur-xs bg-gray-950/10 group-hover:flex items-center justify-center transition-all duration-300">
                              <a href="#">
                                <Button className="h-auto px-5 py-2.5 rounded-full text-sm font-medium bg-white hover:bg-white/80 dark:bg-gray-950 dark:hover:bg-gray-950/80 text-foreground hover:cursor-pointer">
                                  See Project
                                </Button>
                              </a>
                            </div>
                          </div>
                          <p className="text-base text-foreground font-normal p-2">
                            {item.portfolio_description}
                          </p>
                        </motion.div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border p-5 md:p-8 lg:p-12 overflow-hidden">
            <motion.div
              variants={FADE_UP_ANIMATION_VARIANTS}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-10 h-10 border-border hover:bg-muted/50 transition-colors hover:cursor-pointer"
                  onClick={() => api?.scrollPrev()}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-normal text-foreground hidden sm:inline">
                  Previous
                </span>
              </div>

              <div className="flex-1 max-w-24 sm:max-w-52 h-0.5 bg-border relative rounded-full">
                <div
                  className="absolute left-0 bg-foreground h-1 top-1/2 -translate-y-1/2 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-sm font-normal text-foreground hidden sm:inline">
                  Next
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-10 h-10 border-border hover:bg-muted/50 transition-colors hover:cursor-pointer"
                  onClick={() => api?.scrollNext()}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

