import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Required for `output: "export"` — emits a static robots.txt at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The Sanity Studio and the mail endpoint are not content.
        disallow: ["/studio/", "/contact.php", "/contact-config.php"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
