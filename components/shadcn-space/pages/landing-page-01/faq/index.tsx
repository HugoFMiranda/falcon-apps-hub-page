"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { motion } from "motion/react";

const Faq = () => {
  const FAQ_DATA = [
    {
      question: "What services do you offer?",
      answer:
        "We offer a wide range of services including web development, app development, and digital marketing.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "The time it takes to complete a project depends on the complexity of the project and the scope of the work.",
    },
    {
      question: "What industries do you work with?",
      answer:
        "We work with startups, e-commerce brands, tech companies, real estate, healthcare, creators, and corporate clients. If you have a business, we can design for it.",
    },
    {
      question: "Do you offer custom designs or use templates?",
      answer:
        "Absolutely! We offer comprehensive post-launch support to ensure a seamless implementation and provide ongoing maintenance packages tailored to clients who need regular updates or technical assistance. Our commitment doesn't end at launch — we're here to help you every step of the way.",
    },
    {
      question: "How much do your services cost?",
      answer:
        "We provide updates on a regular basis to ensure that your project is running smoothly and that you are aware of any changes or updates to the project.",
    },
    {
      question: "Can I request revisions?",
      answer:
        "Yes, we offer post-launch support and maintenance packages to help you with ongoing updates, technical assistance, and any modifications you may need after your website or app goes live.",
    },
  ];
  const countData = [
    {
      count: "40+",
      title: "Case Studies Completed",
    },
    {
      count: "200+",
      title: "Design Components",
    },
    {
      count: "12+",
      title: "Industries Served",
    },
    {
      count: "99%",
      title: "On-Time Delivery",
    },
  ];
  return (
    <section>
      <div className="overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border px-5 md:px-8 py-8 md:py-16">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground m-1.5" />
                <span className="text-base font-normal text-muted-foreground">
                  Know us better
                </span>
              </div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-foreground">
                FAQs.
              </h2>
            </motion.div>
          </div>
        </div>
        <div className="border-y border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
            <div className="border-x border-border">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <img
                    src="https://images.shadcnspace.com/assets/backgrounds/faq-3.webp"
                    alt="faq-3"
                    width={564}
                    height={536}
                    className="w-full h-auto object-cover max-h-192"
                  />
                </motion.div>
                <div>
                  <Accordion
                    defaultValue={["item-2"]}
                    className="w-full flex flex-col"
                  >
                    {FAQ_DATA.map((faq, index) => (
                      <AccordionItem
                        key={`item-${index}`}
                        value={`item-${index}`}
                        className={cn(
                          "px-4 py-6 sm:p-6 flex flex-col gap-2 group/item transition-colors animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both",
                          index === 0 && "delay-100",
                          index === 1 && "delay-200",
                          index === 2 && "delay-300",
                          index === 3 && "delay-400",
                          index === 4 && "delay-500",
                        )}
                      >
                        <AccordionTrigger className="p-0 text-lg font-medium hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden items-center cursor-pointer">
                          {faq.question}
                          <PlusIcon className="w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-45" />
                        </AccordionTrigger>
                        <AccordionContent className="p-0 text-muted-foreground text-base font-normal">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {countData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className={cn(
                    "px-2.5 py-12 md:py-16 border-border flex flex-col gap-2 items-center justify-center text-center",
                    "border-b last:border-b-0 sm:border-r sm:border-b",
                    index === 1 && "sm:border-r-0 lg:border-r",
                    index === 3 && "sm:border-r-0",
                    (index === 2 || index === 3) && "sm:border-b-0",
                    "lg:border-b-0 lg:border-r lg:last:border-r-0",
                  )}
                >
                  <h3 className="text-5xl font-semibold text-foreground">
                    {item.count}
                  </h3>
                  <p className="text-lg font-normal text-foreground">
                    {item.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
