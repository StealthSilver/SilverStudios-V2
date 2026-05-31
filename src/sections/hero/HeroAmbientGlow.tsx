/**
 * @file HeroAmbientGlow.tsx
 * @description Bottom-center semicircle glow — expands with scroll trap progress to white out the hero.
 */

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useContext, useSyncExternalStore } from "react";

import { HeroScrollTrapContext } from "./HeroScrollTrap";

// ——— Types ———

interface HeroScrollGlowLayersProps {
  /** When false, scroll-driven glow is omitted (e.g. slideshow card mode). */
  enabled?: boolean;
}

// ——— Component ———

export function HeroScrollGlowLayers({ enabled = true }: HeroScrollGlowLayersProps) {
  const containerRef = useContext(HeroScrollTrapContext);
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const { scrollYProgress } = useScroll({
    target: containerRef ?? undefined,
    offset: ["start start", "end start"],
  });

  // 200vh trap + end-start reaches 0.5 when the sticky hero unlocks — remap to a full 0→1 hero cycle.
  const heroScrollProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  const glowWidth = useTransform(heroScrollProgress, [0, 1], [700, 5000]);
  const glowHeight = useTransform(heroScrollProgress, [0, 1], [350, 5000]);
  const glowOpacity = useTransform(heroScrollProgress, [0, 0.25, 1], [0.28, 0.75, 1]);
  const glowBlur = useTransform(heroScrollProgress, [0, 0.5, 1], [38, 25, 10]);
  const blurFilter = useTransform(glowBlur, (v) => `blur(${v}px)`);
  const overlayOpacity = useTransform(heroScrollProgress, [0.65, 1], [0, 1]);

  if (!enabled || !isMounted || containerRef == null) {
    return null;
  }

  return (
    <>
      {/* Layer A: Rising sun glow — z-index 25 */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          x: "-50%",
          width: glowWidth,
          height: glowHeight,
          opacity: glowOpacity,
          filter: blurFilter,
          background:
            "radial-gradient(ellipse at center bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.5) 35%, rgba(255, 255, 255, 0) 70%)",
          borderRadius: "50%",
          transformOrigin: "bottom center",
          pointerEvents: "none",
          zIndex: 25,
        }}
      />

      {/* Layer B: Full white overlay — z-index 26 */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255, 255, 255, 1)",
          opacity: overlayOpacity,
          pointerEvents: "none",
          zIndex: 26,
        }}
      />
    </>
  );
}
