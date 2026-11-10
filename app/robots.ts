import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/profile";

// Everything is public, AI crawlers included: being findable by LLM-based
// search is the point. hub.hugofmiranda.com serves this too; its sitemap
// entry still points at the canonical apex.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
