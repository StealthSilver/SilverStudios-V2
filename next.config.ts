import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/Hero_Mockups/**",
      },
      {
        pathname: "/Logos/**",
        search: "",
      },
      {
        pathname: "/icon.svg",
        search: "",
      },
    ],
  },
};

export default nextConfig;
