import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  images: {
    unoptimized: true, // 👈 required for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/api/**",
      },
      {
        protocol: "https",
        hostname: "*.tile.openstreetmap.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.playbook.com",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // 👈 optional but good for deployment
  },
  webpack: (config: WebpackConfig, { isServer }: { isServer: boolean }) => {
    if (!isServer && config.resolve) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          fs: false, // 👈 disable node fs on client
          net: false,
          tls: false,
        },
      };
    }
    
    // Handle Sanity Studio modules and ESM compatibility
    if (config.module && config.module.rules) {
      config.module.rules.push({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      });
    }
    
    // Ignore certain modules that cause issues with static export
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
      };
    }
    
    return config;
  },
};

export default nextConfig;
