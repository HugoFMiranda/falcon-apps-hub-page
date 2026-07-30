"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export interface ServiceItem {
  number: string;
  title: string;
  image: string;
  description: string;
}
const Services = () => {
  const services: ServiceItem[] = [
    {
      number: "01",
      title: "app design",
      image: "https://images.shadcnspace.com/assets/services/app-design.webp",
      description:
        "Intuitive mobile app design focused on usability, performance, and seamless user journeys across iOS and Andronumber platforms.",
    },
    {
      number: "02",
      title: "web design",
      image: "https://images.shadcnspace.com/assets/services/web-design.webp",
      description:
        "Modern dark-mode web design delivering sleek visuals, responsive layouts, and conversion-focused interfaces.",
    },
    {
      number: "03",
      title: "product design",
      image:
        "https://images.shadcnspace.com/assets/services/project-design.webp",
      description:
        "End-to-end product design combining UX research, wireframing, prototyping, and scalable design systems.",
    },
    {
      number: "04",
      title: "brand design",
      image: "https://images.shadcnspace.com/assets/services/brand-design.webp",
      description:
        "Strategic brand identity design including logo systems, typography, color palettes, and visual storytelling.",
    },
  ];

  return (
    <section id="services">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 xl:px-16">
        <div className="border-x px-4 md:px-8 py-12 lg:py-16 flex flex-col gap-8 md:gap-16">
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex gap-2 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
              <p className="text-base text-muted-foreground font-normal">
                Services
              </p>
            </div>
            <h2 className="text-5xl md:text-7xl font-semibold text-foreground">
              What I do.
            </h2>
          </motion.div>
        </div>
      </div>
      <div className="border-y">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 xl:px-16 ">
          <div className="flex flex-col gap-5 border-x">
            {services.map((service) => (
              <div
                key={service.number}
                className="flex lg:flex-row flex-col border-y first:border-t-0 last:border-b-0 group  overflow-hidden p-0  lg:gap-0 gap-0 "
              >
                <div className="xl:max-w-md lg:max-w-xs w-full xl:py-10 xl:px-10 py-6 px-4 flex md:flex-row flex-col xl:gap-15 gap-6  group-hover:bg-card-foreground dark:group-hover:bg-white relative">
                  <span className="text-base font-normal text-forground group-hover:text-white dark:group-hover:text-primary-foreground">
                    ({service.number})
                  </span>
                  <h3 className="text-3xl font-medium text-forground capitalize group-hover:text-white dark:group-hover:text-primary-foreground">
                    {service.title}
                  </h3>
                </div>
                <div className="lg:p-5 lg:max-w-xs w-full border-x group-hover:border-white/10 group-hover:bg-card-foreground dark:group-hover:bg-white overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="group-hover:scale-120 transition-all duration-300 ease-out h-full w-full object-cover"
                  />
                </div>
                <div className="xl:max-w-md lg:max-w-xs w-full not-first-of-type xl:py-10 xl:px-10 py-6 px-4 flex flex-col gap-6 justify-between group-hover:bg-card-foreground dark:group-hover:bg-white ">
                  <p className="text-base  text-primary/50 group-hover:text-white dark:group-hover:text-primary-foreground/50">
                    {service.description}
                  </p>
                  <div className="h-10 w-10 rounded-full bg-foreground dark:group-hover:bg-primary-foreground text-white dark:text-primary-foreground  flex justify-center items-center group-hover:bg-white ">
                    <ArrowRight
                      className="size-4 transition-transform duration-300 ease-out group-hover:text-card-foreground group-hover:-rotate-45"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
