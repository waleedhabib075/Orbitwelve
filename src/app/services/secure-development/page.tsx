import Image from "next/image";
import SecureDevelopment from "@/components/SecureDevelopment";

export default function Page() {
	return (
		<main className="min-h-screen bg-white">
			<section className="bg-[#1f1f1f] py-24 sm:py-32 relative">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-3xl text-center">
						<h1 className="text-5xl sm:text-7xl font-bold text-white">
							SECURE DEVELOPMENT <span className="text-[#1098D5]">SOLUTION</span>
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-300">
							Find and fix vulnerabilities before code reaches production.
						</p>
					</div>
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1098D5]"></div>
			</section>

			<section className="py-16 bg-gray-50">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-4xl">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
							SECURE DEVELOPMENT
						</h2>
						<div className="text-gray-700 leading-relaxed space-y-4 text-center mb-12">
							<p>
								Build smarter, safer systems. Our secure full-stack development integrates strong security frameworks from front-end design to backend architecture. We also apply AI in cybersecurity projects for threat detection, automation, and system hardening, delivering next-generation digital defense solutions.
							</p>
						</div>

						<div className="grid grid-cols-3 md:grid-cols-6 gap-8 mb-12 justify-items-center">
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/github.png" alt="Secure Coding" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Github</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/OWASP.png" alt="Security Testing" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">OWASP</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/Postman.png" alt="AI Security" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Postman</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/PyTorch.png" alt="Threat Detection" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">PyTorch</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/Tensorflow.png" alt="Encryption" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Tensorflow</span>
							</div>
						</div>

						{/* Our Projects Section */}
						<div className="text-center mb-12">
							<h3 className="text-2xl font-bold text-gray-900 mb-4">Our Projects</h3>
							<p className="text-gray-600 max-w-2xl mx-auto">
								Explore our secure development project showcases and portfolio work
							</p>
						</div>

						{/* Relevant Component Data */}
						<div className="mt-12">
							<SecureDevelopment />
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
	);
}
