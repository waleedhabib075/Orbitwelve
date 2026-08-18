import type { MetadataRoute } from "next";
import { getPostSlugs } from "@/sanity/lib/queries";
import { hasSanityConfig } from "@/sanity/env";
import { SITE_URL } from "@/lib/seo";

// Required for `output: "export"` — emits a static sitemap.xml at build time.
export const dynamic = "force-static";

const staticRoutes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
  { path: "/clients", priority: 0.7, changeFrequency: "monthly" },
  { path: "/reviews", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/services/web-development", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/android-app-development", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/digital-marketing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/seo-management", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/social-media-management", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/graphic-designing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/video-editing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/cybersecurity-and-intelligence", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/secure-development", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/infrastructure-and-operations", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/lead-generation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/academic-research-writing", priority: 0.8, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Blog posts come from Sanity. A CMS outage must not fail the build, so an
  // error here degrades to a sitemap of the static routes only.
  if (hasSanityConfig) {
    const slugs = await getPostSlugs().catch(() => []);
    for (const post of slugs as Array<{ slug: string; publishedAt?: string }>) {
      if (!post?.slug) continue;
      pages.push({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return pages;
}
