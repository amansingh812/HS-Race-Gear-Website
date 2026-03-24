/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect template blog pages to the real HS Race Gear blog
      {
        source: "/blog-list-01",
        destination: "/blog",
        permanent: true, // 301 redirect — passes SEO value
      },
      {
        source: "/blog-list-02",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog-grid-01",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog-grid-02",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog-single/:id",
        destination: "/blog",
        permanent: true,
      },
      // Redirect other stray template shop/product pages to real shop
      {
        source: "/shop-default",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/shop-filter-hidden",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/shop-filter-sidebar",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/shop-fullwidth",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/shop-left-sidebar",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/shop-right-sidebar",
        destination: "/shop",
        permanent: true,
      },
    ];
  },
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
