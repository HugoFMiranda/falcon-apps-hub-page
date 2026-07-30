import PortfolioLandingPage from "@/components/shadcn-space/pages/landing-page-01";
import HeroPage from "@/components/shadcn-space/pages/landing-page-01/hero";
import GitHubSection from "@/components/shadcn-space/pages/landing-page-01/github";
import About from "@/components/shadcn-space/pages/landing-page-01/about";
import Contact from "@/components/shadcn-space/pages/landing-page-01/contact";
import { getGitHubStats } from "@/lib/github";

export default async function Page() {
  const stats = await getGitHubStats();
  return (
    <PortfolioLandingPage
      hero={<HeroPage stats={stats} />}
      github={<GitHubSection stats={stats} />}
    >
      <About />
      <Contact />
    </PortfolioLandingPage>
  );
}
