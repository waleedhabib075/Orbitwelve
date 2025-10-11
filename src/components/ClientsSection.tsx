"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Client {
  id: string;
  name: string;
  logoUrl: string;
}

interface ClientsSectionProps {
  clients: Client[];
}

export default function ClientsSection({ clients }: ClientsSectionProps) {
  if (!clients || clients.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No clients available
      </div>
    );
  }

  return (
    <section
      id="clients"
      className="relative bg-gradient-to-b from-white to-gray-50 py-24 overflow-hidden"
    >
      {/* Decorative Blurs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-[#00aaff]/20 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-blue-200 rounded-full blur-3xl opacity-30" />

      {/* Header */}
      <div className="relative text-center mb-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight uppercase"
        >
          Our Clients
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-20 h-1 bg-[#00aaff] mx-auto mt-4 rounded-full origin-left"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-gray-600 max-w-2xl mx-auto text-base md:text-lg"
        >
          Trusted by global brands and forward-thinking companies across industries.
        </motion.p>
      </div>

      {/* Auto-Scrolling Logos */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex space-x-12 md:space-x-20"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity,
          }}
        >
          {[...clients, ...clients].map((client, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex flex-col items-center justify-center text-center min-w-[140px] md:min-w-[180px]"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center hover:shadow-xl hover:scale-105 transition-all duration-300">
                <Image
                  src={client.logoUrl || "/placeholder-logo.png"}
                  alt={client.name}
                  width={96}
                  height={96}
                  className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  unoptimized
                />
              </div>
              <p className="mt-4 text-sm md:text-base font-medium text-gray-700">
                {client.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
