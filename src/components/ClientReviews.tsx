"use client";

import { createClient } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface Review {
  id: string;
  author: string;
  comment: string;
  position?: string;
  rating?: number;
  imageUrl?: string;
}

type Country =
  | "all"
  | "Saudi Arabia"
  | "Australia"
  | "Bahrain"
  | "Belgium"
  | "Canada"
  | "France"
  | "Germany"
  | "Grenada"
  | "Gyana"
  | "Hong Kong"
  | "India"
  | "Italy"
  | "Jordan"
  | "Netherlands"
  | "Pakistan"
  | "Panama"
  | "Poland"
  | "UAE"
  | "UK"
  | "USA";

const BUCKET = "reviews";

function toFolderSlug(country: Country): string {
  if (country === "all") return "All";

  const folderMap: Record<string, string> = {
    "Saudi Arabia": "Arabia",
    Australia: "Australia",
    Bahrain: "Bahrain",
    Belgium: "Belgium",
    Canada: "Canada",
    France: "France",
    Germany: "Germany",
    Grenada: "Grenada",
    Gyana: "Gyana",
    "Hong Kong": "Hong Kong",
    India: "India",
    Italy: "Italy",
    Jordan: "Jordan",
    Netherlands: "Netherlands",
    Pakistan: "Pakistan",
    Panama: "Panama",
    Poland: "Poland",
    UAE: "UAE",
    UK: "UK",
    USA: "USA",
  };

  return folderMap[country] || country;
}

type ImageItem = {
  id: string;
  name: string;
  url: string;
  country: string;
  author?: string;
  position?: string;
  comment?: string;
  rating?: number;
};

export default function ClientReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null);
  
  // Sample review data to display
  const sampleReviews: ImageItem[] = [
    {
      id: "all",
      name: "all-reviews.jpg",
      url: "https://playbook.com/e/orbitwelve/pJpt6353pPRUuH8nsRBCWx4J?theme=gallery&assetNumber=3&displaySize=medium",
      country: "all",
      author: "All Reviews",
      position: "Client Testimonials"
    },
    {
      id: "saudi",
      name: "saudi-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/WqgLZvw1GhcXtnaSEnVAYkhd",
      country: "Saudi Arabia",
      author: "Saudi Arabia Reviews",
      position: "Client Testimonials"
    },
    {
      id: "australia",
      name: "australia-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/9BaJspXqYmr2wk2e3xfkUKtM",
      country: "Australia",
      author: "Australia Reviews",
      position: "Client Testimonials"
    },
    {
      id: "bahrain",
      name: "bahrain-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/mzcH23nD4Y9223oue5AF9wwu",
      country: "Bahrain",
      author: "Bahrain Reviews",
      position: "Client Testimonials"
    },
    {
      id: "belgium",
      name: "belgium-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/78C5giF2cbZrrKFBKBU3Fv4s",
      country: "Belgium",
      author: "Belgium Reviews",
      position: "Client Testimonials"
    },
    {
      id: "canada",
      name: "canada-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/w6CvvFjBqCsM5gvVEjRi8Dvj",
      country: "Canada",
      author: "Canada Reviews",
      position: "Client Testimonials"
    },
    {
      id: "france",
      name: "france-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/j79AMjXUo3xc5jaY46AxzQdU",
      country: "France",
      author: "France Reviews",
      position: "Client Testimonials"
    },
    {
      id: "germany",
      name: "germany-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/8gsYmd7wSKEFLrvCoDcK6xdj",
      country: "Germany",
      author: "Germany Reviews",
      position: "Client Testimonials"
    },
    {
      id: "grenada",
      name: "grenada-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/3QdtdDtZYeofouFdxHA9nn85",
      country: "Grenada",
      author: "Grenada Reviews",
      position: "Client Testimonials"
    },
    {
      id: "gyana",
      name: "gyana-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/jTt6no8QNaxREZP5UYtK9aGn",
      country: "Gyana",
      author: "Gyana Reviews",
      position: "Client Testimonials"
    },
    {
      id: "india",
      name: "india-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/M4MSJpffCC1GdAvcBSKfBgvT",
      country: "India",
      author: "India Reviews",
      position: "Client Testimonials"
    },
    {
      id: "hongkong",
      name: "hongkong-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/Std2wsMNQSMGqre5kVLqjENJ",
      country: "Hong Kong",
      author: "Hong Kong Reviews",
      position: "Client Testimonials"
    },
    {
      id: "italy",
      name: "italy-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/hukjaVDk6XhZUSUAuyZHwpvE",
      country: "Italy",
      author: "Italy Reviews",
      position: "Client Testimonials"
    },
    {
      id: "jordan",
      name: "jordan-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/47ZhKdQEZDSNZDfkXkyxkrZZ",
      country: "Jordan",
      author: "Jordan Reviews",
      position: "Client Testimonials"
    },
    {
      id: "netherlands",
      name: "netherlands-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/nB6JsKv79R794b475jUsgSQ9",
      country: "Netherlands",
      author: "Netherlands Reviews",
      position: "Client Testimonials"
    },
    {
      id: "pakistan",
      name: "pakistan-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/3PmYGn8FdnyYgCCDN5pPQteQ",
      country: "Pakistan",
      author: "Pakistan Reviews",
      position: "Client Testimonials"
    },
    {
      id: "panama",
      name: "panama-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/jdApdkLDmLVEMcuhv3szfsh4",
      country: "Panama",
      author: "Panama Reviews",
      position: "Client Testimonials"
    },
    {
      id: "poland",
      name: "poland-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/k4d1pUDqAvipkFNogK8qBJnf",
      country: "Poland",
      author: "Poland Reviews",
      position: "Client Testimonials"
    },
    {
      id: "uae",
      name: "uae-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/QUMaunvsqf667bY5j6ijBmV5",
      country: "UAE",
      author: "UAE Reviews",
      position: "Client Testimonials"
    },
    {
      id: "uk",
      name: "uk-reviews.jpg",
      url: "https://playbook.com/s/orbitwelve1/AaQdCRiXZLfEoY3AnE2AT56s",
      country: "UK",
      author: "UK Reviews",
      position: "Client Testimonials"
    },
    {
      id: "usa",
      name: "usa-reviews.jpg",
      url: "https://playbook.com/e/orbitwelve1/GXGzBHKyXsmVJ1PjA9oaDKhQ?theme=gallery&assetNumber=3&displaySize=medium",
      country: "USA",
      author: "USA Reviews",
      position: "Client Testimonials"
    }
  ];
  
  // Initialize Supabase client only on the client side
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && key) {
      try {
        setSupabase(createClient(url, key));
      } catch (err) {
        console.error("Failed to initialize Supabase:", err);
      }
    }
  }, []);

  const countries: Country[] = useMemo(
    () => [
      "all",
      "Saudi Arabia",
      "Australia",
      "Bahrain",
      "Belgium",
      "Canada",
      "France",
      "Germany",
      "Grenada",
      "Gyana",
      "Hong Kong",
      "India",
      "Italy",
      "Jordan",
      "Netherlands",
      "Pakistan",
      "Panama",
      "Poland",
      "UAE",
      "UK",
      "USA",
    ],
    []
  );

  const [activeCountry, setActiveCountry] = useState<Country>("all");
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const listFolderImages = useCallback(async (folder: string) => {
    if (!supabase) {
      setError("Supabase is not configured");
      return [];
    }

    const { data, error } = await supabase.storage.from(BUCKET).list(folder, {
      limit: 200,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

    if (error) {
      console.error("❌ Supabase error:", error);
      throw error;
    }

    const files = (data || []).filter((d: any) => !d.name.endsWith("/"));

    const withUrl: ImageItem[] = files.map((f: any, idx: number) => {
      const filePath = `${folder}/${f.name}`;
      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(filePath);

      return {
        id: `${folder}-${idx}`,
        name: f.name,
        url: urlData.publicUrl,
        country: folder,
      };
    });

    return withUrl;
  }, []);

  const loadImages = useCallback(
    async (country: Country) => {
      setLoading(true);
      setError(null);
      
      if (!supabase) {
        // Use sample data when Supabase is not configured
        const filteredReviews = country === "all" 
          ? sampleReviews 
          : sampleReviews.filter(review => review.country.toLowerCase() === country.toLowerCase());
        setImages(filteredReviews);
        setLoading(false);
        return;
      }

      try {
        if (country === "all") {
          const { data: rootData, error: rootError } = await supabase.storage
            .from(BUCKET)
            .list("", { limit: 100 });

          if (rootError) throw rootError;

          const folders =
            rootData?.filter((item) => !item.name.includes(".")) || [];

          const allImages: ImageItem[] = [];
          for (const folder of folders) {
            const images = await listFolderImages(folder.name);
            allImages.push(...images);
          }
          setImages(allImages);
        } else {
          const folder = toFolderSlug(country);
          const list = await listFolderImages(folder);
          setImages(list);
        }
      } catch (e: any) {
        console.error("💥 Error loading images:", e);
        setError(e?.message || "Failed to load images");
        setImages([]);
      } finally {
        setLoading(false);
      }
    },
    [listFolderImages]
  );

  useEffect(() => {
    loadImages(activeCountry);
  }, [activeCountry, loadImages]);

  // ⭐ Star rating helper
  const renderRating = (rating: number = 5) => (
    <div className="flex items-center mt-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
            Client Reviews by Country
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse client testimonials and project showcases from around the world
          </p>
        </div>

        {/* Country Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {countries.map((country) => {
            const isActive = activeCountry === country;
            return (
              <button
                key={country}
                onClick={() => setActiveCountry(country)}
                className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#1098D5] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {country === "all" ? "All Reviews" : country}
              </button>
            );
          })}
        </div>

        {/* Dynamic Iframe Display */}
        <div style={{height: "600px"}}>
          {activeCountry === "Saudi Arabia" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/UeVc4JKEqGPGnRWAR82DhDZj?theme=gallery&assetNumber=3&displaySize=medium"
              title="arabia - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "Australia" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/QQ9ZQFzAP5SSqESz2Zta2zBi?theme=gallery&assetNumber=3&displaySize=medium"
              title="autralia - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "Bahrain" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/XZaJ1kLEtzi14ye7AmbNRTBF?theme=gallery&assetNumber=3&displaySize=medium"
              title="Bahrain - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "Belgium" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/LYH9PZsU6bj92Mauou4aUNV6?theme=gallery&assetNumber=3&displaySize=medium"
              title="Belgium - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "Canada" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/cQWcrNTbs9sYYHMQ4AuSv6pj?theme=gallery&assetNumber=3&displaySize=medium"
              title="canada - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "France" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/Vvwg6pJUC2EbEbNLtPjunQFy?theme=gallery&assetNumber=3&displaySize=medium"
              title="france - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "Germany" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/VqT2FeJ6dD58w9K7rcW845qa?theme=gallery&assetNumber=3&displaySize=medium"
              title="germany - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "Grenada" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/u3H26wVRUxnm3JiVmKcYh44x?theme=gallery&assetNumber=3&displaySize=medium"
              title="grenada - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "Gyana" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/pd7CMwU9c2vcdHeXk38H38LW?theme=gallery&assetNumber=3&displaySize=medium"
              title="Gyana - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "India" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/6B5bfQEZZF6udKim49uF8GZF?theme=gallery&assetNumber=3&displaySize=medium"
              title="india - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "Hong Kong" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/t29BSX2Bq2AVQBxiSyYnwt5a?theme=gallery&assetNumber=3&displaySize=medium"
              title="hong kong - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "Italy" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/Za6YrPgNw7KoxxFvjQPmcGut?theme=gallery&assetNumber=3&displaySize=medium"
              title="italy - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "Jordan" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/ERo91jFb9gGfeFSWr4wwr8yu?theme=gallery&assetNumber=3&displaySize=medium"
              title="Jordan - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "Netherlands" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/9ennUWyWaQpAEB5K9o8WqVA8?theme=gallery&assetNumber=3&displaySize=medium"
              title="Netherlands - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "Pakistan" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/qDgkw7FHLjBC9zTAZfEGNVzg?theme=gallery&assetNumber=3&displaySize=medium"
              title="Pakistan - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "Panama" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/1Z9xkWRMBdrPQ9KbtNXhBK7k?theme=gallery&assetNumber=3&displaySize=medium"
              title="panama - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "Poland" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/q8B5eT15CEEZdXSV6b5P121p?theme=gallery&assetNumber=3&displaySize=medium"
              title="poland - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "UAE" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/ZnuNvWgD7qGV1z56P8ecjHTF?theme=gallery&assetNumber=3&displaySize=medium"
              title="uae - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "UK" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/vgiq7RrKJ4L873881KPx9uQ9?theme=gallery&assetNumber=3&displaySize=medium"
              title="uk - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "USA" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/GXGzBHKyXsmVJ1PjA9oaDKhQ?theme=gallery&assetNumber=3&displaySize=medium"
              title="usa - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
          {activeCountry === "all" && (
            <iframe 
              src="https://playbook.com/e/orbitwelve/pJpt6353pPRUuH8nsRBCWx4J?theme=gallery&assetNumber=3&displaySize=medium"
              title="all - Playbook.com"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          )}
        </div>
      </div>
    </div>
  );
}
