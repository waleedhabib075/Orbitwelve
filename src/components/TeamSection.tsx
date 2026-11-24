"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Syed Ghazi",
      role: "Founder",
      image: "/ghazi.png",
      description: "Syed Ghazi is the Founder of Oribitwelve, leading the company’s marketing, social media, and creative direction with a strong focus on brand growth and impactful digital outreach."
    },
    {
      name: "Maryam hassny",
      role: "CEO & Co-Founder",
      image: "/manager.jpeg",
      description: "Syeda Maryam Hassny is the CEO and Co-Founder of Oribitwelve, leading its vision and growth through innovation, creativity, and results-driven digital solutions."
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 flex w-full flex-col items-center text-center"
        >
          <h2 className="mb-4 w-full text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Meet Our
            <span className="text-[#1098D5]"> Team</span>
          </h2>
          <p className="w-full max-w-2xl text-center leading-relaxed text-gray-600">
            The talented professionals behind Orbitwelve's success
          </p>
        </motion.div>

        {/* Team Grid — 2 cols centered (was 3 cols with empty column) */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-10 md:gap-x-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex w-full flex-col items-center text-center"
            >
              <div className="relative mb-6 flex w-full justify-center">
                <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-[#1098D5] shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {member.name}
              </h3>
              
              <p className="text-[#1098D5] font-medium mb-3">
                {member.role}
              </p>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
