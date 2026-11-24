"use client";

import { motion } from "framer-motion";

export default function PurposeSection() {
  return (
    <section
      id="purpose"
      className="relative flex flex-col justify-center items-center w-full bg-gradient-to-b from-white to-gray-50 px-6 md:px-12 py-24 text-center"
    >
      {/* Purpose Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mb-20"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-tight">
          OUR PURPOSE
        </h2>
        <div className="w-16 h-1 bg-[#1098D5] mx-auto mt-3 rounded-full" />
        <p className="mt-6 text-gray-700 leading-relaxed text-base md:text-lg">
          Empowering our clients to achieve sustainable digital growth through
          creativity, intelligence, and security. At Orbitwelve, every project
          is designed to shape the future of digital excellence, where
          innovation meets trust.
        </p>
      </motion.div>

      {/* Vision + Mission */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl p-8"
        >
          <div className="bg-[#1098D5]/10 text-[#1098D5] font-bold px-4 py-1 rounded-full text-xs uppercase mb-4">
            OUR VISION
          </div>

          <p className="text-gray-700 leading-relaxed text-sm md:text-base max-w-md">
            To shape the future of digital excellence through innovation,
            integrity, and intelligent data.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl p-8"
        >
          <div className="bg-[#1098D5]/10 text-[#1098D5] font-bold px-4 py-1 rounded-full text-xs uppercase mb-4">
            OUR MISSION
          </div>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base max-w-md">
            To empower people, organizations, and systems through secure and
            scalable digital transformation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
