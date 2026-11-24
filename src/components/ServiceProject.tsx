"use client";

import { motion } from "framer-motion";

interface ServiceProjectProps {
  title: string;
  description: string;
  iframeSrc: string;
  iframeTitle: string;
}

export default function ServiceProject({ title, description, iframeSrc, iframeTitle }: ServiceProjectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <div style={{height: "600px"}}>
          <iframe 
            src={iframeSrc}
            title={iframeTitle}
            sandbox="allow-same-origin allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </motion.div>
  );
}
