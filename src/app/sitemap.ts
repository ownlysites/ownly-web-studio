import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/#services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/#examples`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/#process`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/#pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/#mockup`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
