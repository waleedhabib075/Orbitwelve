import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Hero } from "@/components/heros";
import AboutSection from "@/components/AboutSection";
import PurposeSection from "@/components/PurposeSection";
import OurServices from "@/components/OurServices";
import ClientsSection from "@/components/ClientsSection";
import LatestWorkSection from "@/components/LatestWorkSection";
import TeamSection from "@/components/TeamPage";
import FindUsSection from "@/components/FindUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "orbitwelve",
  description: "orbitwelve",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Navbar/>
        {children}
        <Hero />
        <AboutSection/>
        <PurposeSection/>
        <OurServices/>
        <ClientsSection/>
        <LatestWorkSection/>
        <TeamSection/>
        <FindUsSection/>
        <ContactSection/>
        <Footer/> 

      </body>
    </html>
  );
}
