/**
 * @file HeroRotatingTagline.tsx
 * @description Cycles hero sub-lines — enter from below, hold, exit upward through a top blur.
 */

"use client";

import { useEffect, useState } from "react";

import type { CSSProperties } from "react";

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
  /** Replaces default `HERO_TAGLINE_FONT` (e.g. scroll-scrubbed color via `textStyle`). */
  fontClassName?: string;
  /** Applied to each rotating line (e.g. interpolated foreground on scroll). */
  textStyle?: CSSProperties;
}

const HOLD_MS = 3000;
const TRANSITION_MS = 700;

// ——— Component ———

export function HeroRotatingTagline({
  lines,
  className,
  fontClassName,
  textStyle,
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
    fontClassName ?? HERO_TAGLINE_FONT,
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
              style={textStyle}
            >
              {lines[index]}
            </p>
            <p
              key={`enter-${nextIndex}`}
              className={cn(taglineClassName, "animate-hero-tagline-in")}
              style={textStyle}
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
            style={textStyle}
          >
            {lines[index]}
          </p>
        )}
      </div>
    </div>
  );
}
