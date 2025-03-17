import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
//eslint-disable-next-line
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cocktails.solvro.pl",
      },
    ],
  },
};
export default nextConfig;
