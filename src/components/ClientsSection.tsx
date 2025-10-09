"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ClientsSection() {
  // Dummy logo placeholders (you can replace these with actual logos later)
  const clients = [
    { name: "TechNova" },
    { name: "AeroWorks" },
    { name: "BluePeak" },
    { name: "DataEdge" },
    { name: "CloudForge" },
    { name: "NextWave" },
    { name: "Visionary" },
    { name: "InnoCore" },
    { name: "Brandify" },
    { name: "CyberNest" },
  ];

  return (
    <section
      id="clients"
      className="relative bg-white py-24 overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-12 px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-tight">
          Our Clients
        </h2>
        <div className="w-16 h-1 bg-[#00aaff] mx-auto mt-3 rounded-full" />
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          Trusted by global brands and forward-thinking companies across industries.
        </p>
      </div>

      {/* Auto-scroll section */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex space-x-12 md:space-x-20"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            ease: "linear",
            duration: 30,
            repeat: Infinity,
          }}
        >
          {/* Repeat logos twice for infinite effect */}
          {[...clients, ...clients].map((client, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex flex-col items-center justify-center text-center min-w-[140px] md:min-w-[180px]"
            >
              {/* Placeholder logo circle */}
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#00aaff] to-[#0077cc] rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg md:text-xl">
                  {client.name.charAt(0)}
                </span>
              </div>
              <p className="mt-3 text-sm md:text-base font-medium text-gray-700">
                {client.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
