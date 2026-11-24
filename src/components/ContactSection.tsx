"use client";

import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import React, { useState } from "react";

// EmailJS sends from its own servers, which is what makes this work here: the
// site is a static export with no backend, and the host blocks outbound SMTP
// from PHP. These three values are public by design — the account is protected
// by the allowed-origins list configured in the EmailJS dashboard.
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    company: "", // honeypot — real users never see or fill this
  });

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  const services = [
    "Digital Consultancy",
    "Data & Analytics",
    "Social Media Marketing",
    "Web & App Development",
    "Search Marketing",
    "Paid Media",
    "Content Creation",
    "Branding",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSending) return;

    // Bots fill every field, including the hidden one. Say it worked and drop it.
    if (formData.company.trim() !== "") {
      setFormData({ name: "", email: "", phone: "", service: "", message: "", company: "" });
      setStatus({ type: "success", text: "Message sent successfully." });
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus({
        type: "error",
        text: "The contact form is not configured yet. Please email us directly.",
      });
      return;
    }

    setIsSending(true);
    setStatus(null);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        company: "",
      });
      setStatus({ type: "success", text: "Message sent successfully." });
    } catch (err) {
      const detail =
        typeof err === "object" && err !== null && "text" in err
          ? String((err as { text: unknown }).text)
          : "";
      setStatus({
        type: "error",
        text: detail || "Failed to send message. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex flex-col justify-center items-center w-full bg-gray-50 px-6 md:px-12 py-20"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 uppercase tracking-tight">
          Get In Touch
        </h2>

        <div className="w-20 h-1 bg-[#1098D5] mx-auto mt-4 rounded-full" />
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Have a project you’re interested in discussing with us? Fill out the
          form below — we’d love to talk!
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100 space-y-6"
      >
        {/* Honeypot: hidden from users, bots fill it and get silently dropped */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-[#1098D5] focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-[#1098D5] focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Phone + Service */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-[#1098D5] focus:outline-none"
              placeholder="+1 (234) 567-890"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Which service are you interested in?
            </label>
            <select
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-[#1098D5] focus:outline-none"
            >
              <option value="">Select a service...</option>
              {services.map((service, i) => (
                <option key={i} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-[#1098D5] focus:outline-none"
            placeholder="Tell us more about your project..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isSending}
            className="bg-[#1098D5] hover:bg-[#0d7fb3] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-md shadow-md transition-all duration-300"
          >
            {isSending ? "Sending..." : "Send Message"}
          </motion.button>
        </div>

        {status && (
          <div
            className={`text-center text-sm font-medium ${
              status.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.text}
          </div>
        )}
      </motion.form>
    </section>
  );
}
