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
  eslint: {
    // ✅ Don’t block builds because of lint errors
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
