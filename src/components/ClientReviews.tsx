"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Review {
  id: string;
  author: string;
  comment: string;
  position?: string;
}

interface ClientReviewsProps {
  reviews: Review[];
}

export default function ClientReviews({ reviews }: ClientReviewsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!reviews || reviews.length === 0) {
    return <div className="text-center py-20 text-gray-500">No reviews available</div>;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden relative">
      {/* Decorative Blur Circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-purple-100 rounded-full blur-3xl opacity-40" />

      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            💬 What Our Clients Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real feedback from our amazing clients around the world who trusted us with their brand vision.
          </p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto pb-8 hide-scrollbar -mx-4"
        >
          <div className="flex gap-6 px-4">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                whileHover={{ scale: 1.03, y: -5 }}
                className="flex-shrink-0 bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl shadow-md
                           w-[320px] md:w-[380px] p-6 text-left transition-all duration-500 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Header with Avatar */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-full border-2 border-blue-500 overflow-hidden shadow-sm">
                    <Image
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        review.author
                      )}&background=random`}
                      alt={review.author}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base md:text-lg">
                      {review.author}
                    </h3>
                    {review.position && (
                      <p className="text-sm text-gray-500">{review.position}</p>
                    )}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-gray-700 text-base leading-relaxed italic">
                  “{review.comment}”
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
