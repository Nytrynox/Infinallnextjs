/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'source.unsplash.com',
      'plus.unsplash.com'
    ],
  },
  // Supabase/Edge config
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
