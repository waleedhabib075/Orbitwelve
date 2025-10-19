import { getClients, getReviews, getProjects, getTeam } from "@/lib/public-api";
import { Hero } from "@/components/heros";
import ViewAllButton from "@/components/ViewAllButton";
import AboutSection from "@/components/AboutSection";
import PurposeSection from "@/components/PurposeSection";
import OurServices from "@/components/OurServices";
import ClientsSection from "@/components/ClientsSection";
import ClientReviews from "@/components/ClientReviews";
import LatestWorkSection from "@/components/LatestWorkSection";
import TeamSection from "@/components/TeamPage";
import FindUsSection from "@/components/FindUsSection";
import ContactSection from "@/components/ContactSection";
import LocationMap from "@/components/LocationMap";

export default async function Home() {
  // Fetch all data in parallel with error handling
  const [clients, reviews, projects, team] = await Promise.all([
    getClients().catch(() => []),
    getReviews().catch(() => []),
    getProjects().catch(() => []),
    getTeam().catch(() => []),
  ]);

  return (
    <>
      <Hero />
      <AboutSection />
      <PurposeSection />
      <OurServices />
      <ClientsSection clients={clients} />
      
      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Our Clients Say About Us
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from businesses that have transformed with our solutions
            </p>
            <ViewAllButton href="/reviews">
              View All Testimonials
            </ViewAllButton>
          </div>
          <ClientReviews reviews={reviews} />
        </div>
      </section>
      
      {/* <LatestWorkSection projects={projects} /> */}
      {/* <TeamSection team={team} /> */}
      {/* <FindUsSection /> */}
      <LocationMap />
      <ContactSection />
    </>
  );
}
