/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/api/**",
      },
    ],
  },
  // ✅ Explicitly disable Turbopack for production builds
  experimental: {
    turbo: false,
  },
};

module.exports = nextConfig;
