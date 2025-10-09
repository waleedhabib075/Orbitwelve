"use client";

import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Amir",
    role: "Senior Business Growth Manager",
  },
  {
    name: "Alhnouf",
    role: "Social Media Executive",
  },
  {
    name: "Christine",
    role: "People & Communications Manager",
  },
  {
    name: "Fadi",
    role: "Business Growth Director - Saudi Arabia",
  },
];

export default function TeamSection() {
  return (
    <section
      id="team"
      className="relative flex flex-col justify-center items-center w-full bg-gray-50 px-6 md:px-12 py-20"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 uppercase tracking-tight">
          Creative Minds
        </h1>
        <div className="w-20 h-1 bg-[#00aaff] mx-auto mt-4 rounded-full" />
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mt-6 uppercase">
          Our Leadership Team
        </h2>
        <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-relaxed">
          For years, we’ve been offering full-fledged digital marketing services to empower
          exceptional brands whilst ensuring client satisfaction.
        </p>
      </motion.div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex flex-col items-center text-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            {/* Gradient Avatar */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full mt-8 mb-4 bg-gradient-to-tr from-[#00aaff] to-[#0044ff] flex items-center justify-center text-white text-4xl font-bold shadow-inner group-hover:scale-105 transition-transform duration-300">
              {member.name.charAt(0)}
            </div>

            {/* Info */}
            <div className="px-4 pb-8">
              <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
