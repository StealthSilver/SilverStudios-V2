/**
 * @file ScrollRevealGroup.tsx
 * @description Container that scroll-scrubs fade-in on `[data-scroll-reveal-word]` children.
 */

"use client";

import { useRef } from "react";

import {
  useScrollWordReveal,
  type ScrollRevealMode,
  type ScrollWordRevealOptions,
} from "@/hooks/useScrollWordReveal";
import { cn } from "@/lib/utils";

import type { HTMLAttributes } from "react";

export interface ScrollRevealGroupProps extends HTMLAttributes<HTMLDivElement> {
  enabled?: boolean;
  revealMode?: ScrollRevealMode;
  revealStartRatio?: number;
  revealEndRatio?: number;
  revealStaggerViewportRatio?: number;
}

export function ScrollRevealGroup({
  children,
  className,
  enabled = true,
  revealMode,
  revealStartRatio,
  revealEndRatio,
  revealStaggerViewportRatio,
  ...rest
}: ScrollRevealGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const revealOptions: ScrollWordRevealOptions = {
    mode: revealMode,
    startRatio: revealStartRatio,
    endRatio: revealEndRatio,
    staggerViewportRatio: revealStaggerViewportRatio,
  };

  useScrollWordReveal(containerRef, enabled, revealOptions);

  return (
    <div ref={containerRef} className={cn(className)} {...rest}>
      {children}
    </div>
  );
}
