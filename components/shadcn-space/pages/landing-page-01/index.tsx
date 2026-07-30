"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import Projects from "@/components/shadcn-space/pages/landing-page-01/portfolio";
import Navbar from "@/components/shadcn-space/pages/landing-page-01/layout/navbar";
import Footer, {
  FooterNavItem,
} from "@/components/shadcn-space/pages/landing-page-01/layout/footer";
import type { NavigationSection } from "@/components/shadcn-space/pages/landing-page-01/layout/navbar";

const navigationData: NavigationSection[] = [
  { name: "GitHub", href: "#github" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const footerNavItems: FooterNavItem[] = [
  { label: "GitHub", href: "#github" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/**
 * Client shell: owns the scroll-spy state that drives the navbar's active link.
 *
 * Only Navbar (state), Hero (motion) and Projects (carousel/modal/theme observer)
 * genuinely need the client. The GitHub, About and Contact sections are static, so
 * they arrive as already-rendered server elements (`hero`, `github`, `children`)
 * and never join the client bundle.
 */
export default function PortfolioLandingPage({
  hero,
  github,
  children,
}: {
  hero: ReactNode;
  github: ReactNode;
  children: ReactNode;
}) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sections = ["github", "projects", "about", "contact"];

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
        {hero}
        {github}
        <Projects />
        {children}
      </main>
      <Footer footernavItems={footerNavItems} />
    </>
  );
}
