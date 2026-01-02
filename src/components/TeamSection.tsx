"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TeamSection() {
  const teamMembers = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "/team1.jpg",
      description: "Leading the vision and strategy of Orbitwelve with over 10 years of industry experience."
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      image: "/team2.jpg",
      description: "Driving technical innovation and ensuring excellence in all our development projects."
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      image: "/team3.jpg",
      description: "Specializing in secure development and cybersecurity solutions for enterprise clients."
    }
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our
            <span className="text-[#1098D5]"> Team</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The talented professionals behind Orbitwelve's success
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#1098D5] shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="object-cover"
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
