import ServiceSchema from "@/components/ServiceSchema";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import ServiceProject from "@/components/ServiceProject";
import DigitalMarketing from "@/components/DigitalMarketing";

export const metadata = pageMetadata({
  title: "Digital Marketing Services | Orbitwelve",
  description:
    "Paid media, content, and campaign management that turn digital spend into measurable pipeline.",
  path: "/services/digital-marketing",
});

export default function Page() {
	return (
		<>
		  <ServiceSchema
		    name="Digital Marketing Services"
		    description="Paid media, content, and campaign management that turn digital spend into measurable pipeline."
		    path="/services/digital-marketing"
		  />
		  <main className="min-h-screen bg-white">
			<section className="bg-[#1f1f1f] py-24 sm:py-32 relative">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-3xl text-center">
						<h1 className="text-5xl sm:text-7xl font-bold text-white">
							RESULT FOCUSED <span className="text-[#1098D5]">DIGITAL MARKETING</span>
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-300">
							Fix poor online visibility and drive qualified customers.
						</p>
					</div>
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1098D5]"></div>
			</section>

			<section className="py-16 bg-gray-50">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-4xl">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
							DIGITAL MARKETING
						</h2>
						<div className="text-gray-700 leading-relaxed space-y-4 text-center mb-12">
							<p>
								From PPC and content marketing to automation and funnel optimization, Orbitwelve helps brands attract, convert, and retain customers. Our tailored digital marketing strategies drive consistent ROI across global markets. We combine data-driven insights with creative execution to deliver campaigns that resonate with your target audience and drive measurable business growth.
							</p>
						</div>

						{/* Icons Grid */}
						<div className="grid grid-cols-3 md:grid-cols-6 gap-8 mb-12 justify-items-center">
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/GoogleAnalytics.png" alt="PPC" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Google Analytics</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/Meta.png" alt="Content Marketing" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Meta Bussiness Suite</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/Mailchimp.png" alt="Automation" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Mailchimp</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/SEMRush.png" alt="Funnel Optimization" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">SEM Rush</span>
							</div>
						</div>

						{/* Our Projects Section */}
						<div className="text-center mb-12">
							<h3 className="text-2xl font-bold text-gray-900 mb-4">Our Projects</h3>
							<p className="text-gray-600 max-w-2xl mx-auto">
								Explore our digital marketing project showcases and portfolio work
							</p>
						</div>

						{/* Service Project Component */}
						<ServiceProject
							title="Digital Marketing"
							description="Comprehensive digital marketing strategies including SEO, content marketing, and performance analytics."
							iframeSrc="https://playbook.com/e/orbitwelve1/yUvQ3DJRgoLZgP5MjWna4SEY?theme=gallery&assetNumber=3&displaySize=medium"
							iframeTitle="Digital Marketing - Playbook.com"
						/>

						{/* Relevant Component Data */}
						<div className="mt-12">
							<DigitalMarketing />
						</div>
					</div>
				</div>
			</section>

			<section className="py-16 bg-gray-50">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="text-center">
						<a
							href="/contact"
							className="inline-block bg-[#1098D5] hover:bg-[#0d7fb3] text-white font-semibold px-8 py-4 rounded-md text-lg transition-colors"
						>
							LET'S TALK ABOUT YOUR PROJECT
						</a>
					</div>
				</div>
			</section>
		</main>
	  </>
	);
}
