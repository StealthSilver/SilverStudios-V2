/**
 * @file logo-ticker.ts
 * @description Logo ticker section copy.
 */

import type { ClientLogo } from "@/types";

export const logoTickerContent = {
  headline:
    "We build transformative digital experiences for the world's leading brands by blending AI, design, and technology.",
  cta: "Let's add your name to the list",
  logos: [
    { name: "Sgrids", src: "/Logos/sgrids.svg", width: 3117, height: 724 },
    { name: "Serentia", src: "/Logos/serentia.png", width: 215, height: 37 },
    { name: "Meshspire", src: "/Logos/meshspire.svg", width: 251, height: 43 },
    {
      name: "Eighth Light",
      src: "/Logos/eighth-light.svg",
      width: 76,
      height: 48,
    },
    { name: "Brilliant", src: "/Logos/brilliant.svg", width: 114, height: 27 },
    { name: "Spardha", src: "/Logos/spardha.svg", width: 190, height: 42 },
  ] satisfies readonly ClientLogo[],
} as const;
