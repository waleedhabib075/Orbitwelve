import ServiceSchema from "@/components/ServiceSchema";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = pageMetadata({
  title: "Web Development Services | Orbitwelve",
  description:
    "Custom websites and web applications built for performance, accessibility, and search visibility.",
  path: "/services/web-development",
});

export default function Page() {
	return (
		<>
		  <ServiceSchema
		    name="Web Development Services"
		    description="Custom websites and web applications built for performance, accessibility, and search visibility."
		    path="/services/web-development"
		  />
		  <main className="min-h-screen bg-white">
			<section className="bg-[#1f1f1f] py-24 sm:py-32 relative">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-3xl text-center">
						<h1 className="text-5xl sm:text-7xl font-bold text-white">
							PROBLEM SOLVING <span className="text-[#1098D5]">WEBSITES</span>
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-300">
						Transform slow confusing sites into clear converting experiences.
						</p>
					</div>
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1098D5]"></div>
			</section>

			<section className="py-16 bg-gray-50">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-4xl">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
							WEB DEVELOPMENT
						</h2>
						<div className="text-gray-700 leading-relaxed space-y-4 text-center mb-12">
							<p>
								Orbitwelve builds modern, responsive websites using the latest frameworks. Whether corporate, eCommerce, or portfolio, every site is SEO-ready, fast, and fully secure with end-to-end performance optimization. We create custom web solutions tailored to your business needs, ensuring scalability, security, and exceptional user experience.
							</p>
						</div>

						<div className="grid grid-cols-3 md:grid-cols-6 gap-8 mb-12 justify-items-center">
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/vscode.png" alt="React" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">VS Code</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/Cursor.png" alt="Next.js" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Cursor</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/Windsurf.png" alt="Node.js" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Windsurf</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/Azure.png" alt="PHP" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Azure</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/github.png" alt="WordPress" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">GitHub</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/reactjs.png" alt="MongoDB" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">ReactJS</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/nextjs.png" alt="MongoDB" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">NextJS</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/Git.png" alt="MongoDB" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Git</span>
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
