"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: "#about", label: "ABOUT" },
    { href: "#services", label: "SERVICES" },
    { href: "/clients", label: "REVIEWS" },
    // { href: "/projects", label: "WORK" },
    // { href: "#team", label: "TEAM" },
    // { href: "/blog", label: "BLOG" },
    // { href: "#careers", label: "CAREERS" },
    { href: "#contact", label: "CONTACT" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-[#1f1f1f]/80 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/headerLogo.png"
            width={180}
            height={100}
            alt="Orbtwelve"
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center space-x-8   text-sm font-medium tracking-wide">
          {navLinks.map(({ href, label }) => (
            <li key={label}>
              <Link href={href} className="relative group transition-colors">
                <span className="hover:text-[#00aaff]">{label}</span>
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#00aaff] transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right CTA Buttons */}

        {/* <button
            className="bg-[#1098D5] text-white text-sm font-semibold 
                       px-5 py-2  shadow-md hover:shadow-lg hover:scale-[1.03] 
                       transition-all duration-300 focus:ring-2 focus:ring-[#00aaff]/50 focus:outline-none"
          >
            DOWNLOAD PROFILE
          </button> */}

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center p-2 hover:bg-white/10 transition"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu (Framer Motion Animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#1f1f1f]/95 backdrop-blur-md border-t border-white/10 px-6 pb-6"
          >
            <ul className="flex flex-col space-y-4 mt-4 text-sm font-medium">
              {navLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="block py-1 hover:text-[#00aaff] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile CTA Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              {/* <button
                className="w-3/4 bg-[#1098D5] text-white text-sm font-semibold 
                           px-5 py-2  shadow-md hover:shadow-lg hover:scale-[1.02] 
                           transition-all duration-300 focus:ring-2 focus:ring-[#00aaff]/50 focus:outline-none"
              >
                DOWNLOAD PROFILE
              </button> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
