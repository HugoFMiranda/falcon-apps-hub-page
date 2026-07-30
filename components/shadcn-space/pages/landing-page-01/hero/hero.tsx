"use client";
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowUpRight } from "lucide-react"
import { motion, useMotionValue, useTransform, animate, useInView, type Variants } from "motion/react";
import { useEffect, useRef } from "react";
import type { GitHubStats } from "@/lib/github";

function CountUp({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.5,
      ease: "easeOut",
    });

    return controls.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
}

const HeroSection = () => {
    const statsData: { title: string; count: number }[] = [
        { title: "Years writing code", count: new Date().getFullYear() - 2018 },
        { title: "Years in the field", count: 4 },
    ];
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.21, 0.47, 0.32, 0.98],
            },
        },
    };

    const imageVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.21, 0.47, 0.32, 0.98],
            },
        },
    };

    return (
        <section ref={sectionRef} className="border-y border-border">
            <motion.div 
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
                className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16 flex flex-col gap-8"
            >
                <div className="border-x border-border grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-7 px-4 sm:px-7 lg:px-10 py-8 lg:py-16 flex flex-col gap-12 justify-between border-b md:border-b-0 md:border-r border-border">
                        <div className="flex flex-col gap-4 sm:gap-8">
                            <div className="flex flex-col gap-2 sm:gap-3">
                                <motion.p variants={itemVariants} className="text-2xl font-medium text-foreground">
                                  I&apos;m Hugo Miranda,
                                </motion.p>
                                <motion.h1
                                  variants={itemVariants}
                                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium"
                                >
                                  Software Developer
                                </motion.h1>
                            </div>
                            <motion.div variants={itemVariants} className="flex flex-col gap-4">
                                <figure className="flex flex-col gap-2">
                                  <blockquote className="text-lg text-muted-foreground border-l-2 border-border pl-4">
                                    &ldquo;Any fool can write code that a computer can understand. Good
                                    programmers write code that humans can understand.&rdquo;
                                  </blockquote>
                                  <figcaption className="text-sm text-muted-foreground pl-4">
                                    — Martin Fowler
                                  </figcaption>
                                </figure>
                                <motion.div whileHover="hover" initial="initial" whileTap={{ scale: 0.96 }} className="w-fit">
                                  <Button render={<a href="#projects" />} className="group w-fit h-auto px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer hover:bg-primary/80 transition-all duration-500 ease-[0.23,1,0.32,1]">
                                    <motion.span
                                        variants={{
                                            initial: { x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
                                            hover: { x: 4, transition: { type: "spring", stiffness: 400, damping: 10 } }
                                        }}
                                    >
                                        <ArrowUpRight size={16} className="transition-all duration-300 group-hover:rotate-45" />
                                    </motion.span>
                                    <span className="relative z-10 flex items-center gap-2 font-medium">Check Projects</span>
                                  </Button>
                                </motion.div>
                            </motion.div>
                        </div>
                        <motion.div variants={itemVariants} className="flex items-center justify-between sm:justify-normal gap-8 md:gap-10 lg:gap-32">
                            {statsData?.map((value, index) => {
                                return (
                                    <div key={index} className="flex flex-col items-start gap-1">
                                        <div className="flex items-start gap-2">
                                            <p className="text-4xl md:text-5xl font-medium text-foreground">
                                                <CountUp value={value.count} />+
                                            </p>
                                            <motion.div 
                                                animate={{ y: [0, -3, 0] }}
                                                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                                                className="p-2 rounded-full bg-teal-400/10"
                                            >
                                                <ArrowUp size={16} className="text-teal-400" />
                                            </motion.div>
                                        </div>
                                        <p className="text-base text-muted-foreground font-normal">{value.title}</p>
                                    </div>
                                )
                            })}
                        </motion.div>
                    </div>
                    <motion.div variants={imageVariants} className="md:col-span-5 w-full p-4 sm:p-6 lg:p-10">
                      <img
                        src="https://avatars.githubusercontent.com/u/74903598?v=4"
                        alt="Hugo Miranda"
                        width={410}
                        height={529}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}

export default HeroSection