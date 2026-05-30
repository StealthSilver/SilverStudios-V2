/**
 * @file HeroRotatingTagline.tsx
 * @description Cycles hero sub-lines with smooth enter-from-bottom / exit-to-top motion.
 */

"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import {
  HERO_TAGLINE_FONT,
  HERO_TAGLINE_SIZE,
} from "./hero-styles";

// ——— Types ———

type TaglinePhase = "enter" | "hold" | "exit";

interface HeroRotatingTaglineProps {
  lines: readonly string[];
  className?: string;
}

const HOLD_MS = 1500;
const TRANSITION_MS = 550;

// ——— Component ———

export function HeroRotatingTagline({
  lines,
  className,
}: HeroRotatingTaglineProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<TaglinePhase>("enter");

  const lineCount = lines.length;
  const nextIndex = lineCount > 0 ? (index + 1) % lineCount : 0;

  useEffect(() => {
    if (lineCount === 0) {
      return;
    }

    if (phase === "enter") {
      const timer = window.setTimeout(() => setPhase("hold"), TRANSITION_MS);
      return () => window.clearTimeout(timer);
    }

    if (phase === "hold") {
      const timer = window.setTimeout(() => setPhase("exit"), HOLD_MS);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % lineCount);
      setPhase("hold");
    }, TRANSITION_MS);

    return () => window.clearTimeout(timer);
  }, [lineCount, phase]);

  if (lineCount === 0) {
    return null;
  }

  const taglineClassName = cn(
    "absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-center tracking-tight",
    HERO_TAGLINE_FONT,
  );

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "relative w-full overflow-hidden text-center",
        HERO_TAGLINE_SIZE,
        className,
      )}
    >
      <div className="relative min-h-[1.15em] w-full">
        {phase === "exit" ? (
          <>
            <p
              key={`exit-${index}`}
              className={cn(taglineClassName, "animate-hero-tagline-out")}
            >
              {lines[index]}
            </p>
            <p
              key={`enter-${nextIndex}`}
              className={cn(taglineClassName, "animate-hero-tagline-in")}
            >
              {lines[nextIndex]}
            </p>
          </>
        ) : (
          <p
            key={`line-${index}`}
            className={cn(
              taglineClassName,
              phase === "enter" && "animate-hero-tagline-in",
            )}
          >
            {lines[index]}
          </p>
        )}
      </div>
    </div>
  );
}
