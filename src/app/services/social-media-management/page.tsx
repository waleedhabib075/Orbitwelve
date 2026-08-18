import ServiceSchema from "@/components/ServiceSchema";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = pageMetadata({
  title: "Social Media Management | Orbitwelve",
  description:
    "Channel strategy, content production, scheduling, and community management across social platforms.",
  path: "/services/social-media-management",
});

export default function Page() {
	return (
		<>
		  <ServiceSchema
		    name="Social Media Management"
		    description="Channel strategy, content production, scheduling, and community management across social platforms."
		    path="/services/social-media-management"
		  />
		  <main className="min-h-screen bg-white">
			<section className="bg-[#1f1f1f] py-24 sm:py-32 relative">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-3xl text-center">
						<h1 className="text-5xl sm:text-7xl font-bold text-white">
							SMART SOCIAL<span className="text-[#1098D5]">MANAGEMENT</span>
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-300">
						Fix scattered content and grow engaging social presence.
						</p>
					</div>
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1098D5]"></div>
			</section>

			<section className="py-16 bg-gray-50">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-4xl">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
							SOCIAL MEDIA MANAGEMENT
						</h2>
						<div className="text-gray-700 leading-relaxed space-y-4 text-center mb-12">
							<p>
								Build your brand's voice and grow your community with Orbitwelve's full-funnel social media management. We design result-driven strategies, create engaging visuals, manage influencer collaborations, and optimize campaigns across Instagram, Facebook, LinkedIn, and TikTok. Our comprehensive approach ensures consistent brand messaging, increased engagement, and measurable ROI across all platforms.
							</p>
						</div>

						<div className="grid grid-cols-3 md:grid-cols-6 gap-8 mb-12 justify-items-center">
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/Meta.png" alt="Instagram" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Meta</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/Buffer.png" alt="Facebook" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Buffer</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/GoogleSearchConsol.png" alt="LinkedIn" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Google Search Console</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/GoogleAnalytics.png" alt="TikTok" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Google Analytics</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/SEMRush.png" alt="Content Creation" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">SEMRush</span>
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
