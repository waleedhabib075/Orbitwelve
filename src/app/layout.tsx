import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import Navbar from "@/components/navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  // metadataBase turns the relative image paths used per page into the
  // absolute URLs that Open Graph and Twitter require.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OrbitTwelve - Digital Innovation & Growth",
    // Pages set their own full title; this covers any that do not.
    template: "%s | Orbitwelve",
  },
  description:
    "Transforming businesses through innovative digital solutions and strategic growth initiatives.",
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "/favicon.png",
  },
  // Paste the token from Google Search Console's HTML-tag verification here.
  // verification: { google: "..." },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Unsplash to speed up external image loads */}
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://source.unsplash.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <StructuredData />
      </head>
      <body className={`${roboto.variable} font-sans antialiased`}>
        <Navbar />
        <main>
          {children}
          <SpeedInsights />
        </main>
        <Footer />
      </body>
    </html>
  );
}
