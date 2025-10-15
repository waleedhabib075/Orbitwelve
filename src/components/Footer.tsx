"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-white py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center text-center space-y-6"
      >
        {/* Logo */}
        <img
          src="/footerlogo.png" // 👈 Replace this with your logo file path
          alt="Footer Logo"
          width={200}
          height={200}
        />

        {/* Tagline */}
        <p className="text-black text-lg font-medium max-w-md leading-relaxed">
          We help brands speak human in a <span className="text-[#00aaff] font-semibold">DIGITAL WORLD</span>
        </p>

        {/* Social Icons */}
        <div className="flex space-x-5 mt-4">
          <a
            href="#"
            aria-label="Facebook"
            className="p-3 rounded-full bg-gray-800 hover:bg-[#00aaff] transition-all duration-300"
          >
            <FaFacebookF size={18} />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="p-3 rounded-full bg-gray-800 hover:bg-[#00aaff] transition-all duration-300"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="p-3 rounded-full bg-gray-800 hover:bg-[#00aaff] transition-all duration-300"
          >
            <FaLinkedinIn size={18} />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="p-3 rounded-full bg-gray-800 hover:bg-[#00aaff] transition-all duration-300"
          >
            <FaTwitter size={18} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} Orbit Twelve. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
