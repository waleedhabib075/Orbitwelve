import LatestWorkSection from "@/components/LatestWorkSection";
import { getProjects, Project } from "@/lib/public-api";

export default async function ProjectsPage() {
  let projects: Project[] = [];

  try {
    const [fetchedProjects] = await Promise.all([
      getProjects(),
    ]);
    projects = fetchedProjects;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    // projects remains empty array, will be handled by LatestWorkSection
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1f1f1f] via-[#2a2a2a] to-[#1f1f1f] py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
              Our
              <span className="bg-gradient-to-r from-[#00aaff] to-[#1098D5] bg-clip-text text-transparent"> Latest Work</span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-300 max-w-2xl mx-auto">
              Discover our portfolio of innovative solutions and successful projects that have transformed businesses across industries.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-[#00aaff] rounded-full animate-pulse" />
                <span className="text-sm font-medium">Delivering Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <LatestWorkSection projects={projects} />
        </div>
      </div>
    </main>
  );
}
