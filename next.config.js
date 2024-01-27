/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      { hostname: "xiexuntwvmedvyxokvvf.supabase.co" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "picsum.photos" },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
