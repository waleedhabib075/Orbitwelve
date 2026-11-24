import { SITE_NAME, SITE_URL } from "@/lib/seo";

/**
 * JSON-LD describing the organisation and the site itself.
 *
 * Rendered from a server component into a script tag, which is how Google
 * expects structured data. The content mirrors what is already on the page —
 * schema that contradicts visible content is treated as spam.
 */
export default function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/headerLogo.png`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: "contact@orbitwelve.com",
          contactType: "customer service",
          availableLanguage: ["English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
