"use client";

import { useState } from "react";
import SocialMediaManagement from "@/components/SocialMediaManagement";
import DigitalMarketing from "@/components/DigitalMarketing";
import AndroidAppDevelopment from "@/components/AndroidAppDevelopment";
import WebDevelopment from "@/components/WebDevelopment";
import GraphicDesigning from "@/components/GraphicDesigning";
import VideoEditing from "@/components/VideoEditing";
import AcademicResearchWriting from "@/components/AcademicResearchWriting";
import SEOManagement from "@/components/SEOManagement";
import LeadGeneration from "@/components/LeadGeneration";
import CybersecurityIntelligence from "@/components/CybersecurityIntelligence";
import InfrastructureOperations from "@/components/InfrastructureOperations";
import SecureDevelopment from "@/components/SecureDevelopment";

export default function ProjectsClient() {
  const [activeProject, setActiveProject] = useState("all");

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1f1f1f] via-[#2a2a2a] to-[#1f1f1f] py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
              Our
              <span className="bg-gradient-to-r from-[#1098D5] to-[#1098D5] bg-clip-text text-transparent">
                {" "}
                Projects
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-300 max-w-2xl mx-auto">
              Discover our portfolio of innovative solutions and successful
              projects that have transformed businesses across industries.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-[#1098D5] rounded-full animate-pulse" />
                <span className="text-sm font-medium">
                  Delivering Excellence
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our specialized project showcases and portfolio work
            </p>
          </div>

          {/* Project Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            <button 
              onClick={(e) => {
                e.preventDefault();
                setActiveProject("all");
              }}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 ${
                activeProject === "all" 
                  ? "bg-[#1098D5] text-white shadow-lg" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Projects
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setActiveProject("web");
              }}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 ${
                activeProject === "web" 
                  ? "bg-[#1098D5] text-white shadow-lg" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Web Development
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setActiveProject("android");
              }}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 ${
                activeProject === "android" 
                  ? "bg-[#1098D5] text-white shadow-lg" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Android App Development
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setActiveProject("digital");
              }}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 ${
                activeProject === "digital" 
                  ? "bg-[#1098D5] text-white shadow-lg" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Digital Marketing
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setActiveProject("graphic");
              }}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 ${
                activeProject === "graphic" 
                  ? "bg-[#1098D5] text-white shadow-lg" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Graphic Designing
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setActiveProject("video");
              }}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 ${
                activeProject === "video" 
                  ? "bg-[#1098D5] text-white shadow-lg" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Video Editing
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setActiveProject("academic");
              }}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 ${
                activeProject === "academic" 
                  ? "bg-[#1098D5] text-white shadow-lg" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Academic Research Writing
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setActiveProject("seo");
              }}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 ${
                activeProject === "seo" 
                  ? "bg-[#1098D5] text-white shadow-lg" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              SEO Management
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setActiveProject("lead");
              }}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 ${
                activeProject === "lead" 
                  ? "bg-[#1098D5] text-white shadow-lg" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Lead Generation
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setActiveProject("cyber");
              }}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 ${
                activeProject === "cyber" 
                  ? "bg-[#1098D5] text-white shadow-lg" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cybersecurity & Intelligence
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setActiveProject("infrastructure");
              }}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 ${
                activeProject === "infrastructure" 
                  ? "bg-[#1098D5] text-white shadow-lg" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Infrastructure & Operations
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setActiveProject("secure");
              }}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 ${
                activeProject === "secure" 
                  ? "bg-[#1098D5] text-white shadow-lg" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Secure Development
            </button>
          </div>

          {/* Projects Display */}
          <div className="grid grid-cols-1 gap-8">
            {activeProject === "all" && (
              <>
                <SocialMediaManagement />
                <DigitalMarketing />
                <AndroidAppDevelopment />
                <WebDevelopment />
                <GraphicDesigning />
                <VideoEditing />
                <AcademicResearchWriting />
                <SEOManagement />
                <LeadGeneration />
                <CybersecurityIntelligence />
                <InfrastructureOperations />
                <SecureDevelopment />
              </>
            )}
            {activeProject === "social" && <SocialMediaManagement />}
            {activeProject === "digital" && <DigitalMarketing />}
            {activeProject === "android" && <AndroidAppDevelopment />}
            {activeProject === "web" && <WebDevelopment />}
            {activeProject === "graphic" && <GraphicDesigning />}
            {activeProject === "video" && <VideoEditing />}
            {activeProject === "academic" && <AcademicResearchWriting />}
            {activeProject === "seo" && <SEOManagement />}
            {activeProject === "lead" && <LeadGeneration />}
            {activeProject === "cyber" && <CybersecurityIntelligence />}
            {activeProject === "infrastructure" && <InfrastructureOperations />}
            {activeProject === "secure" && <SecureDevelopment />}
          </div>
        </div>
      </div>
    </main>
  );
}
