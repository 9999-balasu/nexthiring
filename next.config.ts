/*import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
/*};

/*export default nextConfig;*/



/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;






