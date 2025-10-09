"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const locations = [
  { name: "United States", top: "38%", left: "22%" },
  { name: "Saudi Arabia", top: "38%", left: "55%" },
  { name: "United Arab Emirates", top: "42%", left: "57%" },
  { name: "Egypt", top: "42%", left: "52%" },
  { name: "India", top: "48%", left: "62%" },
  { name: "South Africa", top: "75%", left: "50%" },
  { name: "Australia", top: "78%", left: "80%" },
];

export default function FindUsSection() {
  return (
    <section
      id="find-us"
      className="relative flex flex-col items-center justify-center w-full bg-white py-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 uppercase tracking-tight">
          How to Find Us
        </h2>
        <div className="w-20 h-1 bg-[#00aaff] mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Map Container */}
      <div className="relative w-full max-w-6xl aspect-[16/9] mx-auto bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
        {/* SVG World Map */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2000px-World_map_-_low_resolution.svg.png"
          alt="World Map"
          className="absolute inset-0 w-full h-full object-contain opacity-90"
        />

        {/* Highlighted Countries */}
        {locations.map((loc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: loc.top, left: loc.left }}
          >
            <div className="relative">
              <MapPin
                className="text-[#00aaff] drop-shadow-md"
                size={28}
                strokeWidth={2.5}
              />
              <div className="absolute left-1/2 top-6 -translate-x-1/2 bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded shadow-md">
                {loc.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Message */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-gray-700 mt-10 text-center text-sm md:text-base max-w-2xl"
      >
        Have a project you're interested in discussing with us?{" "}
        <span className="font-semibold text-[#00aaff]">Drop us a line below</span>, we’d love to talk.
      </motion.p>
    </section>
  );
}
