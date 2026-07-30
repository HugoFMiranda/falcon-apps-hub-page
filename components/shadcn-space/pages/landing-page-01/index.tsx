"use client";

import { useState, useEffect } from "react";
import HeroPage from "@/components/shadcn-space/pages/landing-page-01/hero";
import Services from "@/components/shadcn-space/pages/landing-page-01/services";
import Portfolio from "@/components/shadcn-space/pages/landing-page-01/portfolio";
import Pricing from "@/components/shadcn-space/pages/landing-page-01/pricing";
import Navbar from "@/components/shadcn-space/pages/landing-page-01/layout/navbar";
import Testimonial from "@/components/shadcn-space/pages/landing-page-01/testimonial";
import Footer, {
  FooterNavItem,
} from "@/components/shadcn-space/pages/landing-page-01/layout/footer";
import Faq from "@/components/shadcn-space/pages/landing-page-01/faq";
import Cta from "@/components/shadcn-space/pages/landing-page-01/cta";
import type { NavigationSection } from "@/components/shadcn-space/pages/landing-page-01/layout/navbar";

const navigationData: NavigationSection[] = [
  {
    name: "Services",
    href: "#services",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Testimonials",
    href: "#testimonials",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
];

const footerNavItems: FooterNavItem[] = [
  { label: "Services", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Testimonials", href: "#" },
  { label: "Pricing", href: "#" },
];

export default function Portfoliolandingpage() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sections = ["services", "projects", "testimonials", "pricing"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // offset for the sticky header

      if (window.scrollY < 100) {
        setActiveSection("");
        return;
      }

      let currentSection = "";
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = sectionId;
            break;
          }
        }
      }

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);

  const dynamicNavigationData = navigationData.map((item) => ({
    ...item,
    isActive: item.href === `#${activeSection}`,
  }));

  return (
    <>
      <Navbar navigationData={dynamicNavigationData} />
      <main>
        <HeroPage />
        <Services />
        <Portfolio />
        <Pricing />
        <Testimonial />
        <Faq />
        <Cta />
      </main>
      <Footer footernavItems={footerNavItems} />
    </>
  );
}
