import HeroSection from "@/components/shadcn-space/pages/landing-page-01/hero/hero";
import type { GitHubStats } from "@/lib/github";

const HeroPage = ({ stats }: { stats: GitHubStats }) => {
  return (
    <div>
      <HeroSection stats={stats} />
    </div>
  );
};

export default HeroPage;
