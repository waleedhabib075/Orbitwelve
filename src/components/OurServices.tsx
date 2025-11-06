"use client";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Social Media Management",
    slug: "social-media-management",
    icon: "/social-media.png",
    blurb:
      "Build your brand’s voice and grow your community with full-funnel social media management.",
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    icon: "/paid-media.png",
    blurb:
      "From PPC and content to automation and funnels—attract, convert, and retain customers.",
  },
  {
    title: "Android App Development",
    slug: "android-app-development",
    icon: "/devops.png",
    blurb:
      "Secure, scalable, and user-friendly Android applications optimized for speed and UX.",
  },
  {
    title: "Web Development",
    slug: "web-development",
    icon: "/devops.png",
    blurb:
      "Modern, responsive, SEO-ready websites with end-to-end performance optimization.",
  },
  {
    title: "Graphic Designing",
    slug: "graphic-designing",
    icon: "/branding.png",
    blurb:
      "Logos, brand kits, campaigns, and UI/UX that deliver a memorable brand presence.",
  },
  {
    title: "Video Editing",
    slug: "video-editing",
    icon: "/content.png",
    blurb:
      "Corporate videos, product reels, promos, and motion graphics aligned to your story.",
  },
  {
    title: "Academic Research Writing",
    slug: "academic-research-writing",
    icon: "/data-analytics.png",
    blurb:
      "From literature reviews to journal-ready manuscripts—structured and compliant.",
  },
  {
    title: "SEO Management",
    slug: "seo-management",
    icon: "/search.png",
    blurb:
      "Rank higher with data-driven keyword research, on-page optimization, and backlinks.",
  },
  {
    title: "Lead Generation",
    slug: "lead-generation",
    icon: "/digital-consultancy.png",
    blurb:
      "Automation, analytics, and creative funnels to acquire qualified leads efficiently.",
  },
  {
    title: "Cybersecurity & Intelligence",
    slug: "cybersecurity-and-intelligence",
    icon: "/security.png",
    blurb:
      "OSINT, forensics, VAPT, and research writing to protect what matters most.",
  },
  {
    title: "Infrastructure & Operations",
    slug: "infrastructure-and-operations",
    icon: "/infrastructure.png",
    blurb:
      "IT support, network security, and Linux administration for a reliable backbone.",
  },
  {
    title: "Secure Development",
    slug: "secure-development",
    icon: "/devops.png",
    blurb:
      "Secure full-stack development and AI in cybersecurity for next‑gen defense.",
  },
];

export default function OurServices() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative inline-block">
          OUR SERVICES
          <span className="block w-16 h-1 bg-[#1098D5] mx-auto mt-2 rounded-full"></span>
        </h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.title}
              href={`/services/${service.slug}`}
              className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left"
            >
              <div className="flex justify-center mb-6">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={100}
                  height={100}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {service.blurb}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
