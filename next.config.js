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
};

module.exports = nextConfig;
