import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Cursor's embedded browser injects data-cursor-ref before hydration, which spams the dev terminal.
    browserDebugInfoInTerminal: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    localPatterns: [
      {
        pathname: "/Hero_Mockups/**",
      },
      {
        pathname: "/Images/**",
      },
      {
        pathname: "/Logos/**",
        search: "",
      },
      {
        pathname: "/Services/**",
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
