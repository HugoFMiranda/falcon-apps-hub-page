"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const includedFeatures = [
  "User Research & Discovery",
  "Wireframes & User Flows",
  "Design System & Components",
  "High-Fidelity UI Design",
  "Responsive Design",
  "Developer Handoff",
  "Post-launch Design Support",
];

const pricingData = [
  {
    icon: (
      <svg className="w-8 h-8 lg:w-10 lg:h-10" viewBox="0 0 60 60" fill="none">
        <path
          d="M44.0472 0.0419629C52.2082 -0.56809 59.322 5.54522 59.9464 13.7052C60.5709 21.8652 54.4701 28.9898 46.3113 29.6286C38.1323 30.2689 30.9862 24.1496 30.3603 15.9693C29.7342 7.78903 35.866 0.653614 44.0472 0.0419629Z"
          fill="var(--foreground)"
        />
        <path
          d="M13.7326 0.0428043C21.8997 -0.566716 29.0158 5.55702 29.6308 13.7237C30.2458 21.8905 24.1271 29.0109 15.9609 29.6315C7.78681 30.2526 0.658185 24.1266 0.0425872 15.952C-0.57301 7.7774 5.55771 0.652857 13.7326 0.0428043Z"
          fill="var(--foreground)"
        />
        <path
          d="M43.6928 30.3983C51.8461 29.5918 59.1097 35.5471 59.9174 43.7005C60.7245 51.8538 54.7699 59.118 46.6168 59.9266C38.4625 60.7344 31.1971 54.7789 30.3896 46.6245C29.5821 38.47 35.5384 31.205 43.6928 30.3983Z"
          fill="var(--foreground)"
        />
        <path
          d="M13.3852 30.3984C21.5583 29.595 28.829 35.5845 29.6055 43.7603C30.382 51.9361 24.3687 59.1875 16.1905 59.9368C8.05031 60.683 0.840301 54.7035 0.0674764 46.5657C-0.705424 38.4278 5.25004 31.1981 13.3852 30.3984Z"
          fill="var(--foreground)"
        />
      </svg>
    ),
    plan_name: "Foundation",
    usage: "Free for all",
    plan_price: "Free",
    features: [true, true, true, true, true, false, false],
  },
  {
    icon: (
      <svg className="w-8 h-8 lg:w-10 lg:h-10" viewBox="0 0 60 60" fill="none">
        <path
          d="M28.0794 0.0626096C44.6154 -0.99824 58.8795 11.5485 59.9375 28.0847C60.9954 44.621 48.4462 58.8832 31.9097 59.9381C15.3775 60.993 1.11985 48.4473 0.0622657 31.9152C-0.995405 15.3832 11.5475 1.12319 28.0794 0.0626096Z"
          fill="var(--foreground)"
        />
        <path
          d="M29.938 5.43555C30.2989 5.70233 30.5602 7.53155 30.7305 8.08825C31.295 9.93327 31.8036 11.8194 32.4381 13.6418C32.9825 15.2086 33.6536 16.7283 34.4448 18.1861C38.9063 26.3872 46.5536 27.6414 54.8401 30.0945C53.8653 30.2283 52.7 30.574 51.7309 30.8216C48.1695 31.7317 44.5933 32.8786 41.3706 34.6601C33.9206 38.7783 32.0471 47.0074 30.0278 54.7411C29.7404 54.245 29.1271 51.5842 28.9218 50.8406C27.7226 46.4984 26.3185 42.1085 23.3923 38.5921C19.8882 34.3811 14.429 32.5094 9.30873 31.1135C8.0174 30.7615 6.20919 30.2161 4.93066 30.0938C6.2741 29.8131 7.59979 29.3531 8.90976 28.9968C11.5513 28.2781 13.5889 27.6496 16.0963 26.5947C23.4013 23.5213 26.1866 18.3627 28.3824 11.0962C28.7664 9.82545 29.5103 6.48465 29.8996 5.52792L29.938 5.43555Z"
          fill="var(--background)"
        />
      </svg>
    ),
    plan_name: "Advanced",
    usage: "Founders and early hires",
    plan_price: "$299",
    features: [true, true, true, true, true, true, true],
  },
  {
    icon: (
      <svg className="w-8 h-8 lg:w-10 lg:h-10" viewBox="0 0 53 60" fill="none">
        <path
          d="M47.1487 0.0670867C48.4014 -0.0721207 50.9889 0.0360448 52.2517 0.115703L52.2452 59.8668C44.0025 60.5593 37.4147 58.5575 30.7882 53.7155C30.3678 53.3668 29.9518 53.0131 29.5399 52.6544C23.611 47.5495 19.9392 40.3087 19.3243 32.509C18.7418 24.2589 21.1374 16.5248 26.5911 10.2612C31.8137 4.26264 39.2125 0.593654 47.1487 0.0670867Z"
          fill="var(--foreground)"
        />
        <path
          d="M13.7278 2.74805L13.7851 2.76249C13.9633 3.05047 13.8932 5.37024 13.8927 5.9175L13.8902 15.0509L13.8949 57.4238C11.0304 55.1573 9.23544 53.4662 6.9353 50.5903C6.80712 50.4316 6.68324 50.2693 6.56385 50.1038C1.12383 42.6355 -1.06689 33.2857 0.489289 24.1782C1.84895 15.8684 6.88375 7.66687 13.7278 2.74805Z"
          fill="var(--foreground)"
        />
      </svg>
    ),
    plan_name: "Custom",
    usage: "MNC's & growing Teams",
    plan_price: "$499",
    features: [true, true, true, true, true, true, true],
  },
];

const Pricing = () => {
  const [activePlan, setActivePlan] = useState<number>(0);
  const AUTO_PLAY_DURATION = 5000; // 5 seconds per plan

  useEffect(() => {
    const timer = setTimeout(() => {
      setActivePlan((prev) => (prev + 1) % pricingData.length);
    }, AUTO_PLAY_DURATION);

    return () => clearTimeout(timer);
  }, [activePlan]);

  return (
    <section id="pricing" className="overflow-hidden border-y border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        <div className="border-x border-border">
          {/* Heading */}
          <div className="px-4 sm:px-7 lg:px-16 py-10 md:py-16 lg:py-20">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground m-1.5" />
                <span className="text-base font-normal text-muted-foreground">
                  Flexible pricing for any scale
                </span>
              </div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-foreground">
                Pricing Plans.
              </h2>
            </div>
          </div>

          <div className="md:hidden border-t border-border">
            {pricingData.map((plan, index) => {
              const isOpen = activePlan === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative border-b last:border-b-0 border-border overflow-hidden`}
                >
                  {isOpen && (
                    <motion.div
                      layoutId="active-plan-bg-mobile"
                      className="absolute inset-0 bg-muted/40 dark:bg-muted/20 -z-10"
                      transition={{
                        type: "tween",
                        ease: [0.22, 1, 0.36, 1],
                        duration: 0.4,
                      }}
                    />
                  )}

                  {/* PLAN HEADER */}
                  <div
                    onClick={() => setActivePlan(index)}
                    className="relative flex items-center justify-between p-6 cursor-pointer overflow-hidden"
                  >
                    {isOpen && (
                      <motion.div
                        key={`progress-mobile-${index}`}
                        className="absolute top-0 left-0 right-0 h-0.5 bg-primary z-10"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: AUTO_PLAY_DURATION / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                    <div className="flex gap-4 items-start">
                      <motion.div
                        animate={{ scale: isOpen ? 1.05 : 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {plan.icon}
                      </motion.div>

                      <div>
                        <p className="text-lg font-medium">{plan.plan_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {plan.usage}
                        </p>
                      </div>
                    </div>

                    <p className="text-2xl font-medium">
                      {plan.plan_price}
                      {plan.plan_price !== "Free" && (
                        <span className="text-sm text-muted-foreground">
                          /month
                        </span>
                      )}
                    </p>
                  </div>

                  {/* ACCORDION CONTENT */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 flex flex-col gap-10">
                          <div className="flex flex-col gap-4">
                            <p className="text-xl font-medium text-muted-foreground">
                              Includes:
                            </p>

                            <ul className="flex flex-col gap-3">
                              {includedFeatures.map((feature, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-center gap-2 text-lg"
                                >
                                  {plan.features[i] ? (
                                    <Check size={20} className="text-primary" />
                                  ) : (
                                    <X
                                      size={20}
                                      className="text-muted-foreground"
                                    />
                                  )}
                                  {feature}
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button className="group w-fit h-auto px-6 py-3.5 flex items-center gap-2 cursor-pointer hover:bg-primary/80">
                              <ArrowUpRight
                                size={16}
                                className="transition-all duration-300 group-hover:rotate-45"
                              />
                              Start Your Project
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* ---------------- DESKTOP VIEW ---------------- */}
          <div className="hidden md:flex border-t border-b border-border">
            {/* LEFT SIDE PLANS */}
            <div className="w-full flex flex-col">
              {pricingData.map((value, index) => (
                <div key={index} className="flex-1">
                  <div
                    onClick={() => setActivePlan(index)}
                    className={`relative px-6 py-8 lg:px-16 lg:py-12 flex gap-6 items-center justify-between cursor-pointer transition-colors duration-300 hover:bg-muted/40 overflow-hidden h-full`}
                  >
                    {/* Smooth sliding background */}
                    {activePlan === index && (
                      <motion.div
                        layoutId="active-plan-bg"
                        className="absolute inset-0 bg-muted/60 dark:bg-muted/20 -z-10"
                        transition={{
                          type: "tween",
                          ease: [0.22, 1, 0.36, 1],
                          duration: 0.4,
                        }}
                      />
                    )}
                    {/* Animated indicator line */}
                    {activePlan === index && (
                      <motion.div
                        key={`progress-desktop-${index}`}
                        className="absolute top-0 left-0 right-0 h-0.5 bg-primary z-10"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: AUTO_PLAY_DURATION / 1000,
                          ease: "linear",
                        }}
                      />
                    )}

                    <div className="flex items-start gap-6">
                      <motion.div
                        animate={{
                          scale: activePlan === index ? 1.1 : 1,
                          rotate: activePlan === index ? 2 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {value.icon}
                      </motion.div>

                      <div>
                        <p className="text-xl lg:text-2xl font-medium">
                          {value.plan_name}
                        </p>

                        <p className="text-muted-foreground">{value.usage}</p>
                      </div>
                    </div>

                    <p className="text-3xl font-medium">
                      {value.plan_price}
                      {value.plan_price !== "Free" && (
                        <span className="text-base text-muted-foreground">
                          /month
                        </span>
                      )}
                    </p>
                  </div>

                  {index !== pricingData.length - 1 && (
                    <div className="h-px w-full bg-border" />
                  )}
                </div>
              ))}
            </div>

            {/* RIGHT SIDE FEATURES */}
            <div className="max-w-xs lg:max-w-sm w-full p-8 lg:p-12 border-l border-border flex flex-col gap-10 justify-between">
              <div>
                <p className="text-xl font-medium text-muted-foreground mb-4">
                  Includes:
                </p>

                <AnimatePresence mode="wait">
                  <motion.ul
                    key={activePlan}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-3"
                  >
                    {includedFeatures.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-2 text-lg"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {pricingData[activePlan ?? 0].features[index] ? (
                          <Check size={20} className="text-primary" />
                        ) : (
                          <X size={20} className="text-muted-foreground" />
                        )}
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="group w-fit h-10 flex items-center gap-2 rounded-full cursor-pointer hover:bg-primary/80">
                  <ArrowUpRight
                    size={16}
                    className="transition-all duration-300 group-hover:rotate-45"
                  />
                  Start Your Project
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
