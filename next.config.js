/** @type {import('next').NextConfig} */
const nextConfig = {eslint: {
    ignoreDuringBuilds: true,
},images: {
    minimumCacheTTL: 60,
  },}

module.exports = nextConfig
