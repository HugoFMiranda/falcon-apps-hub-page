import PortfolioLandingPage from "@/components/shadcn-space/pages/landing-page-01";
import { getGitHubStats } from "@/lib/github";

export default async function Page() {
  const stats = await getGitHubStats();
  return <PortfolioLandingPage stats={stats} />;
}
