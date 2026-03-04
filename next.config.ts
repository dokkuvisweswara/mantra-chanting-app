import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dishstorage.akamaized.net",
      },
      {
        protocol: "https",
        hostname: "dclkcq4v0w4d8.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "dish-arg.akamaized.net",
      },
    ],
  },
};

export default nextConfig;
