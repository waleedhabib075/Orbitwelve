export default function Page() {
	return (
		<main className="min-h-screen bg-white">
			<section className="bg-gray-900 text-white py-16">
				<div className="max-w-5xl mx-auto px-6">
					<h1 className="text-3xl md:text-5xl font-extrabold">Infrastructure & Operations</h1>
					<p className="mt-4 text-gray-300 text-sm md:text-base">
						Reliable IT backbone for sustainable growth.
					</p>
				</div>
			</section>
			<section className="py-12">
				<div className="max-w-5xl mx-auto px-6 space-y-4 text-gray-800">
					<p>Our services include:</p>
					<ul className="list-disc pl-6 space-y-1">
						<li><strong>IT Support:</strong> Continuous assistance to maintain uptime and performance.</li>
						<li><strong>Network Security:</strong> Firewalls, threat detection, and protection systems for business continuity.</li>
						<li><strong>Linux System Administration:</strong> Secure, optimized, and scalable Linux environments.</li>
					</ul>
				</div>
			</section>
		</main>
	);
}


