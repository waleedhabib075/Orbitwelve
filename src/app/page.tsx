import { getClients, getReviews, getProjects, getTeam } from "@/lib/public-api";
import { Hero } from "@/components/heros";
import AboutSection from "@/components/AboutSection";
import PurposeSection from "@/components/PurposeSection";
import OurServices from "@/components/OurServices";
import ClientsSection from "@/components/ClientsSection";
import ClientReviews from "@/components/ClientReviews";
import LatestWorkSection from "@/components/LatestWorkSection";
import TeamSection from "@/components/TeamPage";
import FindUsSection from "@/components/FindUsSection";
import ContactSection from "@/components/ContactSection";

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
      <ClientReviews reviews={reviews} />
      {/* <LatestWorkSection projects={projects} /> */}
      {/* <TeamSection team={team} /> */}
      <FindUsSection />
      <ContactSection />
    </>
  );
}
