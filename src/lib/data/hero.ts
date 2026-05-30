/**
 * @file hero.ts
 * @description Hero section copy and CTA labels.
 */

import type { HeroContent } from "@/types";

export const heroContent: HeroContent = {
  eyebrow: "Silver Studios",
  title: "We Craft The Finest",
  rotatingLines: [
    "Designs.",
    "Stories.",
    "Brands.",
    "Experiences.",
  ],
  backgroundSlides: [
    {
      src: "/Hero_Mockups/meshspire.png",
      alt: "Meshspire project mockup",
    },
    {
      src: "/Hero_Mockups/Harit.png",
      alt: "Harit plantation monitoring project mockup",
      version: 2,
    },
    {
      src: "/Hero_Mockups/8thlight.png",
      alt: "8th Light project mockup",
    },
    {
      src: "/Hero_Mockups/Solx.png",
      alt: "Solx project mockup",
    },
    {
      src: "/Hero_Mockups/spardha.png",
      alt: "Spardha project mockup",
    },
    {
      src: "/Hero_Mockups/sgrids.png",
      alt: "Sgrids project mockup",
    },
  ],
  description:
    "We partner with teams to shape brand, product, and motion — from first sketch to shipped interface.",
  primaryCta: {
    label: "Start a project",
    href: "mailto:hello@silverstudios.com",
  },
  secondaryCta: {
    label: "View work",
    href: "#work",
  },
};
