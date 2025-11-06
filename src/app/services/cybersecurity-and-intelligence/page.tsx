export default function Page() {
	return (
		<main className="min-h-screen bg-white">
			<section className="bg-gray-900 text-white py-16">
				<div className="max-w-5xl mx-auto px-6">
					<h1 className="text-3xl md:text-5xl font-extrabold">Cybersecurity & Intelligence</h1>
					<p className="mt-4 text-gray-300 text-sm md:text-base">
						Protect what matters most.
					</p>
				</div>
			</section>
			<section className="py-12">
				<div className="max-w-5xl mx-auto px-6 space-y-4 text-gray-800">
					<p>Our cybersecurity division provides:</p>
					<ul className="list-disc pl-6 space-y-1">
						<li><strong>Security Research Writing:</strong> Expert reports and whitepapers on emerging cyber threats.</li>
						<li><strong>Targeted OSINT:</strong> Deep investigation and intelligence gathering for organizations and brands.</li>
						<li><strong>Digital Forensics:</strong> Evidence analysis and data recovery from compromised systems.</li>
						<li><strong>VAPT:</strong> Vulnerability Assessment & Penetration Testing to identify and mitigate risks.</li>
					</ul>
				</div>
			</section>
		</main>
	);
}


