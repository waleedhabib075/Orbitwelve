"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const categories = ["All", "Apps", "Campaigns", "Landing Pages", "Social Media", "Websites"];

const works = [
  { id: 1, title: "Mobile Banking App", category: "Apps" },
  { id: 2, title: "Restaurant Campaign", category: "Campaigns" },
  { id: 3, title: "Tesla Ad", category: "Campaigns" },
  { id: 4, title: "Educational Website", category: "Websites" },
  { id: 5, title: "Travel App", category: "Apps" },
  { id: 6, title: "Coffee Landing Page", category: "Landing Pages" },
  { id: 7, title: "Social Media Posts", category: "Social Media" },
  { id: 8, title: "Car Campaign", category: "Campaigns" },
  { id: 9, title: "Brand Website", category: "Websites" },
];

export default function LatestWorkSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredWorks =
    activeCategory === "All"
      ? works
      : works.filter((work) => work.category === activeCategory);

  // A few subtle gradient color backgrounds for placeholder “images”
  const gradients = [
    "from-[#00aaff] to-[#0077cc]",
    "from-[#ff7b00] to-[#ffbb00]",
    "from-[#9b5de5] to-[#f15bb5]",
    "from-[#00b4d8] to-[#0077b6]",
    "from-[#ff4d6d] to-[#c9184a]",
    "from-[#4caf50] to-[#2e7d32]",
  ];

  return (
    <section id="work" className="bg-white py-24 px-6 md:px-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-tight">
          Latest Work
        </h2>
        <div className="w-16 h-1 bg-[#00aaff] mx-auto mt-3 rounded-full" />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mt-10 text-sm md:text-base">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeCategory === cat
                  ? "bg-[#00aaff] text-white border-[#00aaff]"
                  : "text-gray-700 border-gray-300 hover:bg-[#00aaff]/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Works Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {filteredWorks.map((work, index) => (
          <motion.div
            key={work.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`relative group overflow-hidden rounded-lg shadow-lg bg-gradient-to-br ${
              gradients[index % gradients.length]
            } flex items-center justify-center h-64`}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
            <h3 className="text-white text-lg md:text-xl font-semibold z-10 px-4 text-center">
              {work.title}
            </h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
