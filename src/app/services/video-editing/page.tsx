import ServiceSchema from "@/components/ServiceSchema";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = pageMetadata({
  title: "Video Editing Services | Orbitwelve",
  description:
    "Post-production for marketing, social, and corporate video — editing, motion graphics, colour, and sound.",
  path: "/services/video-editing",
});

export default function Page() {
	return (
		<>
		  <ServiceSchema
		    name="Video Editing Services"
		    description="Post-production for marketing, social, and corporate video — editing, motion graphics, colour, and sound."
		    path="/services/video-editing"
		  />
		  <main className="min-h-screen bg-white">
			<section className="bg-[#1f1f1f] py-24 sm:py-32 relative">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-3xl text-center">
						<h1 className="text-5xl sm:text-7xl font-bold text-white">
							IMPACTFUL VIDEO <span className="text-[#1098D5]">EDITING</span>
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-300">
						Turn raw footage into stories that drive action.
						</p>
					</div>
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1098D5]"></div>
			</section>

			<section className="py-16 bg-gray-50">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-4xl">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
							VIDEO EDITING
						</h2>
						<div className="text-gray-700 leading-relaxed space-y-4 text-center mb-12">
							<p>
								Turn raw footage into cinematic content that connects. Our editors create corporate videos, product reels, promotional clips, and motion graphics aligned with your brand story. We combine technical expertise with creative storytelling to produce videos that captivate audiences and drive engagement.
							</p>
						</div>

						<div className="grid grid-cols-3 md:grid-cols-6 gap-8 mb-12 justify-items-center">
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/premierpro.png" alt="Premiere Pro" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Premiere Pro</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/filmora.png" alt="After Effects" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Filmora</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/capcut.png" alt="Motion Graphics" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Capcut</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/DaVinciResolve.png" alt="Color Grading" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">DaVinciResolve</span>
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
