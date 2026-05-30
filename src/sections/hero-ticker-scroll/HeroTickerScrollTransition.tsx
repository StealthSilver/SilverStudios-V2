/**
 * @file HeroTickerScrollTransition.tsx
 * @description Hero fade on scroll — ticker follows normal document flow below.
 */

"use client";

import { useEffect, useRef, useState } from "react";

import { useScrollProgress } from "@/hooks/useScrollProgress";

import HeroSection from "../hero/HeroSection";
import LogoTickerSection from "../logo-ticker/LogoTickerSection";

// ——— Helpers ———

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

// ——— Main section ———

export default function HeroTickerScrollTransition() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isEnhanced, setIsEnhanced] = useState(false);

  useEffect(() => {
    setIsEnhanced(true);
  }, []);

  const progress = useScrollProgress(heroRef, isEnhanced);

  const heroBgOpacity = isEnhanced ? 1 - progress : 1;
  const heroContentOpacity = isEnhanced ? clamp(1 - progress / 0.6, 0, 1) : 1;

  return (
    <>
      <div ref={heroRef}>
        <HeroSection
          showNavbar={false}
          gradientOpacity={heroBgOpacity}
          contentOpacity={heroContentOpacity}
        />
      </div>
      <LogoTickerSection />
    </>
  );
}
