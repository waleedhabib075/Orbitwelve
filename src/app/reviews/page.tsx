import ClientMap from "@/components/ClientMap";
import ClientReviews from "@/components/ClientReviews";

// Static data for reviews (used for static export)
const fallbackReviews = [
  {
    id: "1",
    author: "John Doe",
    position: "CEO, Tech Corp",
    comment:
      "Working with OrbitTwelve was a game-changer for our business. Their expertise in digital transformation helped us scale our operations.",
    rating: 5,
  },
  {
    id: "2",
    author: "Sarah Johnson",
    position: "Marketing Director, InnovateX",
    comment:
      "The team's creative approach to our marketing strategy delivered exceptional results. Highly recommended!",
    rating: 5,
  },
  {
    id: "3",
    author: "Michael Chen",
    position: "CTO, StartUp Inc.",
    comment:
      "Their development team built us a robust and scalable solution in record time. Will definitely work with them again.",
    rating: 5,
  },
  {
    id: "4",
    author: "Emily Rodriguez",
    position: "Product Manager, TechVision",
    comment:
      "OrbitTwelve's attention to detail and user-centered design approach resulted in a product that exceeded our expectations.",
    rating: 5,
  },
  {
    id: "5",
    author: "David Kim",
    position: "Founder, NextGen Labs",
    comment:
      "The team's technical expertise and problem-solving skills were instrumental in bringing our vision to life.",
    rating: 5,
  },
  {
    id: "6",
    author: "Lisa Wong",
    position: "Director of Operations, Global Solutions",
    comment:
      "Professional, reliable, and delivered beyond our expectations. A true partner in every sense.",
    rating: 5,
  },
];

// This is a static page that uses fallback data
export default function ReviewsPage() {
  // Use the fallback data directly for static export
  const reviews = fallbackReviews;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1f1f1f] via-[#2a2a2a] to-[#1f1f1f] py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Client
              <span className="bg-gradient-to-r from-[#00aaff] to-[#1098D5] bg-clip-text text-transparent">
                {" "}
                Testimonials
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Hear from businesses that have transformed with our solutions
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-[#00aaff] rounded-full animate-pulse" />
                <span className="text-sm font-medium">
                  Trusted by Industry Leaders
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
              What Our Clients Say
              <div className="mt-2 h-1 w-20 bg-[#00aaff] mx-auto"></div>
            </h2>
            <ClientMap />
            <ClientReviews />
          </div>
        </div>
      </div>
    </main>
  );
}
