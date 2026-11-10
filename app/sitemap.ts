import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/profile";

// Single-page site: the sections (#about, #projects, #contact) are anchors,
// not URLs, so the apex is the only entry. lastModified is the build time.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
