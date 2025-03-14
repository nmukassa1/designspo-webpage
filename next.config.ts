import type { NextConfig } from "next";

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
};

export default nextConfig;
