import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

const nextConfig: NextConfig = {
  output: 'export',
  // Disable image optimization during export
  images: {
    unoptimized: true,
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
    ]
  },
  eslint: {
    // ✅ Don't block builds because of lint errors
    ignoreDuringBuilds: true,
  },
  webpack: (config: WebpackConfig, { isServer }: { isServer: boolean }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer && config.resolve) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          fs: false,
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
