import type { NextConfig } from "next";

const apiBaseName = (process.env.NEXT_PUBLIC_API_BASENAME ?? "")
  .trim()
  .replace(/\/$/, "");

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tpuqajccekhicnmlosod.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/screenshots/**',
        search: '',
      },
    ],
  },
  async rewrites() {
    if (!apiBaseName) return [];
    return [
      {
        source: "/api/backend/:path*",
        destination: `${apiBaseName}/:path*`,
      },
    ];
  },
};

export default nextConfig;
