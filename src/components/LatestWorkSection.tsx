"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface Project {
  id: string;
  name: string;
  imageUrl: string;
  category?: string;
}

interface LatestWorkSectionProps {
  projects: Project[];
}

const categories = ["All", "Websites", "Campaigns", "Landing Pages"];

export default function LatestWorkSection({ projects }: LatestWorkSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  if (!projects || projects.length === 0) {
    return <div className="text-center py-20 text-gray-500">No projects available</div>;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            ✨ Our Latest Work
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our recent projects that blend creativity, strategy, and technology
            to drive impactful results.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all duration-200 ${
                activeCategory === category
                  ? "bg-[#00aaff] text-white shadow-md scale-105"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:text-[#00aaff]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-700"
            >
              {/* Image container */}
              <div className="relative w-full h-[260px] sm:h-[300px] overflow-hidden">
                <motion.img
                  src={project.imageUrl}
                  alt={project.name}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-project.jpg";
                  }}
                  className="w-full h-full object-cover transition-transform duration-700"
                />

                {/* Dark glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

                {/* Text slide-up */}
                <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                  <h3 className="text-white text-xl font-semibold mb-2 tracking-wide">
                    {project.name}
                  </h3>
                  {project.category && (
                    <span className="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  )}
                </div>

                {/* “View Project” floating badge */}
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-700">
                  View Project →
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
