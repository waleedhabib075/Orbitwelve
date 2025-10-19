"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Review {
  id: string;
  author: string;
  comment: string;
  position?: string;
  rating?: number;
}

interface ClientReviewsProps {
  reviews: Review[];
}

export default function ClientReviews({ reviews }: ClientReviewsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!reviews || reviews.length === 0) {
    return <div className="text-center py-20 text-gray-500">No reviews available</div>;
  }

  // Function to render star rating
  const renderRating = (rating: number = 5) => {
    return (
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-14 h-14 rounded-full bg-blue-100 flex-shrink-0 overflow-hidden">
                <Image
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    review.author
                  )}&background=1098D5&color=fff`}
                  alt={review.author}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {review.author}
                </h3>
                {review.position && (
                  <p className="text-sm text-gray-500">{review.position}</p>
                )}
                {renderRating(review.rating)}
              </div>
            </div>
            <p className="text-gray-700 italic relative pl-4 border-l-2 border-blue-500">
              "{review.comment}"
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
