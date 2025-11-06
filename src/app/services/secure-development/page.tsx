export default function Page() {
	return (
		<main className="min-h-screen bg-white">
			<section className="bg-gray-900 text-white py-16">
				<div className="max-w-5xl mx-auto px-6">
					<h1 className="text-3xl md:text-5xl font-extrabold">Secure Development</h1>
					<p className="mt-4 text-gray-300 text-sm md:text-base">
						Build smarter, safer systems.
					</p>
				</div>
			</section>
			<section className="py-12">
				<div className="max-w-5xl mx-auto px-6 space-y-4 text-gray-800">
					<ul className="list-disc pl-6 space-y-1">
						<li><strong>Secure Full-Stack Development:</strong> Security integrated from front-end to backend.</li>
						<li><strong>AI in Cybersecurity:</strong> Threat detection, automation, and system hardening.</li>
					</ul>
				</div>
			</section>
		</main>
	);
}


