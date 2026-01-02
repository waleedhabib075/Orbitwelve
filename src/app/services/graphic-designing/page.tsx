import Image from "next/image";

export default function Page() {
	return (
		<main className="min-h-screen bg-white">
			<section className="bg-[#1f1f1f] py-24 sm:py-32 relative">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-3xl text-center">
						<h1 className="text-5xl sm:text-7xl font-bold text-white">
							WE STRUCTURE <span className="text-[#1098D5]">IDEAS</span>
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-300">
							Create Your Success Stories With Our Quality IT Services. See Our Key Expertise Below.
						</p>
					</div>
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1098D5]"></div>
			</section>

			<section className="py-16 bg-gray-50">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-4xl">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
							GRAPHIC DESIGNING
						</h2>
						<div className="text-gray-700 leading-relaxed space-y-4 text-center mb-12">
							<p>
								Visual storytelling that defines your identity. We craft professional designs for logos, brand kits, digital campaigns, and UI/UX projects, ensuring a consistent and memorable brand presence. Our creative team combines artistic vision with strategic thinking to deliver designs that resonate with your audience and strengthen your brand.
							</p>
						</div>

						<div className="grid grid-cols-3 md:grid-cols-6 gap-8 mb-12 justify-items-center">
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/xd.png" alt="Logo Design" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">XD Design</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/Photoshop.png" alt="Brand Identity" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Photoshop</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/sketch.png" alt="UI/UX Design" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Sketch</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/illustrator.png" alt="Adobe Creative Suite" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Illustrator</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/figma.png" alt="Figma" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Figma</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/canva.png" alt="Illustration" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Canva</span>
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
	);
}
