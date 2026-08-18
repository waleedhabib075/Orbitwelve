import ServiceSchema from "@/components/ServiceSchema";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = pageMetadata({
  title: "Academic & Research Writing | Orbitwelve",
  description:
    "Research support, literature review, data analysis, and academic writing assistance to publication standard.",
  path: "/services/academic-research-writing",
});

export default function Page() {
  return (
    <>
      <ServiceSchema
        name="Academic & Research Writing"
        description="Research support, literature review, data analysis, and academic writing assistance to publication standard."
        path="/services/academic-research-writing"
      />
      <main className="min-h-screen bg-white">
      <section className="bg-[#1f1f1f] py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl sm:text-7xl font-bold text-white">
              ACADEMIC WRITING <span className="text-[#1098D5]">SUPPORT</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
            Solve structure citation and clarity issues in manuscripts.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1098D5]"></div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
              ACADEMIC RESEARCH WRITING
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4 text-center mb-12">
              <p>
                Orbitwelve offers expert academic and scientific writing
                support, from literature reviews to journal-ready manuscripts.
                We help universities, researchers, and professionals produce
                plagiarism-free, well-structured, and publication-compliant
                papers. Our team ensures rigorous research methodology, proper
                citation, and adherence to academic standards.
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 mb-12 justify-items-center">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
                  <Image
                    src="/spss.png"
                    alt="Literature Review"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm text-gray-600 text-center">
                  SPSS Analysis
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
                  <Image
                    src="/STATA.png"
                    alt="Research Papers"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm text-gray-600 text-center">
                  STATA Analysis
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
                  <Image
                    src="/EndNote.png"
                    alt="Thesis Writing"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm text-gray-600 text-center">
                  EndNote Citation
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
                  <Image
                    src="/Turnitin.png"
                    alt="Citation & Formatting"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm text-gray-600 text-center">
                  Turnitin Plagiarism
                </span>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/contact"
                className="inline-block bg-[#1098D5] hover:bg-[#0d7fb3] text-white font-semibold px-8 py-4 rounded-md text-lg transition-colors"
              >
                LET'S TALK ABOUT YOUR PROJECT
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
    </>
  );
}
