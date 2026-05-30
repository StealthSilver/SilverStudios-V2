/**
 * @file HeroRotatingTagline.tsx
 * @description Cycles hero sub-lines with smooth enter-from-bottom / exit-to-top motion.
 */

"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

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

  const taglineClassName =
    "absolute whitespace-nowrap font-editorial text-2xl font-extralight italic text-white sm:text-3xl md:text-4xl lg:text-5xl";

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "relative flex h-10 w-full items-center justify-center overflow-hidden sm:h-12 md:h-14 lg:h-16",
        className,
      )}
    >
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
  );
}
