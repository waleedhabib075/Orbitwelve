import type { Metadata } from "next";

export const SITE_URL = "https://orbitwelve.com";
export const SITE_NAME = "Orbitwelve";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

/**
 * Builds per-page metadata with a canonical URL and matching Open Graph and
 * Twitter cards, so every route has one authoritative address and a single
 * source of truth for its title and description.
 */
export function pageMetadata({ title, description, path, image = "/headerLogo.png" }: PageSeo): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    // Absolute, so the root layout's "%s | Orbitwelve" template does not
    // append the brand a second time to titles that already carry it.
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
