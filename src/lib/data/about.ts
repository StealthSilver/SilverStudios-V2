/**
 * @file about.ts
 * @description About section copy.
 */

import type { AboutContent } from "@/types";

export const aboutContent = {
  headline: "WE ARE",
  paragraphs: [
    "an emerging creative studio, specialising in functional design and creative storytelling.",
    "We build transformative digital experiences for the world's leading brands by blending AI, design, and technology.",
  ],
  logos: [
    { name: "Brilliant", src: "/Logos/brilliant.svg", width: 114, height: 27 },
    {
      name: "Eighth Light",
      src: "/Logos/eighth-light.svg",
      width: 76,
      height: 48,
    },
    { name: "Meshspire", src: "/Logos/meshspire.svg", width: 251, height: 43 },
    { name: "Serentia", src: "/Logos/serentia.png", width: 215, height: 37 },
    { name: "Sgrids", src: "/Logos/sgrids.svg", width: 3117, height: 724 },
    { name: "Spardha", src: "/Logos/spardha.svg", width: 190, height: 42 },
  ],
  ctaLabel: "JOIN THE LIST",
} satisfies AboutContent;
