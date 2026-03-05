/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow Next.js to optimize images from any HTTPS source
    // (product images stored in MongoDB can come from any CDN)
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http",  hostname: "**" },
    ],
    // Serve WebP/AVIF for smaller file sizes and faster load times
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 30 days
    minimumCacheTTL: 2592000,
  },
};

export default nextConfig;
