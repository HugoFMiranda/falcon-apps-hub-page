import HeroSection from "@/components/shadcn-space/pages/landing-page-01/hero/hero";
import UtilityBar from "@/components/shadcn-space/pages/landing-page-01/hero/utility-bar";
import type { GitHubStats } from "@/lib/github";

const HeroPage = ({ stats }: { stats: GitHubStats }) => {
  return (
    <div>
      <HeroSection stats={stats} />
      <UtilityBar />
    </div>
  );
};

export default HeroPage;
