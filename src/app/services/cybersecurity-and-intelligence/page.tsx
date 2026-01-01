import Image from "next/image";

export default function Page() {
	return (
		<main className="min-h-screen bg-white">
			<section className="bg-[#1f1f1f] py-24 sm:py-32 relative">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-3xl text-center">
						<h1 className="text-5xl sm:text-7xl font-bold text-white">
							CYBER THREAT <span className="text-[#1098D5]">INTELLIGENCE</span>
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-300">
						Find unseen security gaps before attackers exploit them.
						</p>
					</div>
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1098D5]"></div>
			</section>

			<section className="py-16 bg-gray-50">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-4xl">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
							CYBERSECURITY & INTELLIGENCE
						</h2>
						<div className="text-gray-700 leading-relaxed space-y-4 text-center mb-12">
							<p>
							Protect what matters most. Our cybersecurity division provides:
Security Research Writing: Expert reports and whitepapers on emerging cyber threats.
Targeted OSINT: Deep investigation and intelligence gathering for organizations and brands.
Digital Forensics: Evidence analysis and data recovery from compromised systems.
VAPT (Vulnerability Assessment & Penetration Testing): End-to-end evaluation of your digital assets to identify and mitigate risks.
							</p>
						</div>

						<div className="grid grid-cols-3 md:grid-cols-6 gap-8 mb-12 justify-items-center">
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/Autopsy.png" alt="VAPT" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Autopsy</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/Wireshark.png" alt="OSINT" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Wireshark</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/Metasploit.png" alt="Forensics" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Metasploit</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/Nmap.png" alt="Threat Analysis" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Nmap</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="w-20 h-20 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center mb-2">
									<Image src="/Burpsuite.png" alt="Security Research" width={60} height={60} className="object-contain" />
								</div>
								<span className="text-sm text-gray-600 text-center">Burpsuite</span>
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

			{/* Our Latest Projects Section */}
			<section className="py-16 bg-gray-50">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
						Our Latest Projects
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
						<div className="bg-white rounded-lg shadow-md overflow-hidden relative">
							<div className="absolute top-4 left-4 bg-[#1098D5] text-white text-xs font-semibold px-2 py-1 rounded z-10">
								NEW
							</div>
							<div className="w-full h-64 bg-gray-200 flex items-center justify-center">
								<Image src="/placeholder-project.png" alt="Project 1" width={400} height={300} className="object-cover w-full h-full" />
							</div>
						</div>
						<div className="bg-white rounded-lg shadow-md overflow-hidden">
							<div className="w-full h-64 bg-gray-200 flex items-center justify-center">
								<Image src="/placeholder-project.png" alt="Project 2" width={400} height={300} className="object-cover w-full h-full" />
							</div>
						</div>
						<div className="bg-white rounded-lg shadow-md overflow-hidden relative">
							<div className="absolute top-4 left-4 bg-[#1098D5] text-white text-xs font-semibold px-2 py-1 rounded z-10">
								NEW
							</div>
							<div className="w-full h-64 bg-gray-200 flex items-center justify-center">
								<Image src="/placeholder-project.png" alt="Project 3" width={400} height={300} className="object-cover w-full h-full" />
							</div>
						</div>
					</div>
					<div className="text-center">
						<a
							href="/projects"
							className="inline-block bg-[#1098D5] hover:bg-[#0d7fb3] text-white font-semibold px-8 py-4 rounded-md text-lg transition-colors"
						>
							VIEW PORTFOLIO
						</a>
					</div>
				</div>
			</section>
		</main>
	);
}
