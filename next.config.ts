/*import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  
  /* config options here */
/*};

/*export default nextConfig;*/


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "up.yimg.com", // ✅ Allow images from this domain
      },
    ],
  },
};

export default nextConfig;







