/**
 * @file FooterReboundGraphic.tsx
 * @description Sui-style footer rebound graphic revealed during bottom overscroll.
 */

"use client";

import { useEffect, useMemo, useState } from "react";

import { getFractionalHour } from "@/lib/hero-time";
import { cn } from "@/lib/utils";

import { FOOTER_REBOUND_GRAPHIC } from "./footer-styles";

export interface FooterReboundGraphicProps {
  scale: number;
  progress: number;
  pullPx: number;
  className?: string;
}

interface GradientKeyframe {
  hour: number;
  stops: [string, string, string, string];
}

const HERO_GRADIENT_KEYFRAMES: readonly GradientKeyframe[] = [
  { hour: 5, stops: ["#1a1535", "#2e2050", "#3d2d6e", "#2a1f4a"] },
  { hour: 7, stops: ["#c4785a", "#d9907a", "#a0b4cc", "#7898b8"] },
  { hour: 9, stops: ["#8eb0f0", "#5278dc", "#2e52c8", "#122a94"] },
  { hour: 12, stops: ["#c8ddf0", "#a8c8e8", "#d4e8f5", "#b0d0ea"] },
  { hour: 14, stops: ["#b8b0d0", "#9a90be", "#7a88b0", "#6070a0"] },
  { hour: 17, stops: ["#d4a882", "#c8907a", "#b07868", "#8a5848"] },
  { hour: 19, stops: ["#8a6070", "#6a5080", "#504070", "#3a2c5a"] },
  { hour: 22, stops: ["#141824", "#1a2030", "#1e1a2e", "#141020"] },
] as const;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function lerpColor(a: string, b: string, t: number): string {
  const from = hexToRgb(a);
  const to = hexToRgb(b);
  const clamped = clamp(t, 0, 1);

  const r = Math.round(from.r + (to.r - from.r) * clamped);
  const g = Math.round(from.g + (to.g - from.g) * clamped);
  const bChannel = Math.round(from.b + (to.b - from.b) * clamped);

  return `#${[r, g, bChannel]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

function withAlpha(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}

function getInterpolatedHeroStops(hour: number): [string, string, string, string] {
  const keyframes = HERO_GRADIENT_KEYFRAMES;
  const count = keyframes.length;
  let normalizedHour = hour;

  for (let index = 0; index < count; index += 1) {
    const current = keyframes[index];
    const next = keyframes[(index + 1) % count];
    const startHour = current.hour;
    let endHour = next.hour;

    if (index === count - 1) {
      endHour += 24;
      if (normalizedHour < keyframes[0].hour) {
        normalizedHour += 24;
      }
    }

    if (normalizedHour >= startHour && normalizedHour < endHour) {
      const t = (normalizedHour - startHour) / (endHour - startHour);
      return current.stops.map((stop, stopIndex) =>
        lerpColor(stop, next.stops[stopIndex], t),
      ) as [string, string, string, string];
    }
  }

  return [...keyframes[0].stops];
}

export default function FooterReboundGraphic({
  scale,
  progress,
  pullPx,
  className,
}: FooterReboundGraphicProps) {
  const [hour, setHour] = useState<number | null>(null);

  useEffect(() => {
    const syncHour = () =>
      setHour(Math.round(getFractionalHour() * 60) / 60);

    syncHour();
    const interval = window.setInterval(syncHour, 1000);
    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const resolvedHour = hour ?? 12;

  const [stopA, stopB, stopC, stopD] = useMemo(
    () => getInterpolatedHeroStops(resolvedHour),
    [resolvedHour],
  );
  const reveal = clamp(pullPx / 22, 0, 1);
  const opacity = reveal * clamp(0.72 + progress * 0.32, 0, 1);
  const visualScale = 0.22 + scale * 0.78;
  const yOffset = (1 - reveal) * 7;
  const haloOpacity = clamp(progress * 0.54, 0, 0.54);
  const grainOpacity = clamp(progress * 0.2, 0, 0.2);
  const circleRadius = "96vmax";
  const centerBelow = "74vmax";
  const gradientCenter = `50% calc(100% + ${centerBelow})`;
  const gradient = `radial-gradient(circle ${circleRadius} at ${gradientCenter}, ${withAlpha(stopD, 0)} 0%, ${withAlpha(stopA, 0.06)} 52%, ${withAlpha(stopB, 0.32)} 76%, ${withAlpha(stopC, 0.14)} 86%, ${withAlpha(stopD, 0)} 100%)`;
  const diffusion = `radial-gradient(circle ${circleRadius} at ${gradientCenter}, ${withAlpha(stopD, 0)} 0%, ${withAlpha(stopA, 0.04)} 58%, ${withAlpha(stopB, 0.14)} 80%, ${withAlpha(stopD, 0)} 100%), repeating-radial-gradient(circle at ${gradientCenter}, rgba(255, 255, 255, 0.2) 0 1px, rgba(255, 255, 255, 0) 1px 4px)`;

  return (
    <div
      aria-hidden
      className={cn(FOOTER_REBOUND_GRAPHIC, className)}
      style={{
        opacity,
        transform: `translate3d(0, ${yOffset}px, 0) scale(${visualScale})`,
        transformOrigin: "center bottom",
      }}
    >
      <div
        suppressHydrationWarning
        className="absolute inset-x-0 bottom-0 h-full w-full"
        style={{
          backgroundImage: gradient,
          filter: "blur(18px) saturate(108%)",
          transition: "background-image 0.8s ease",
          opacity: haloOpacity,
        }}
      />
      <div
        suppressHydrationWarning
        className="absolute inset-x-0 bottom-0 h-full w-full"
        style={{
          backgroundImage: diffusion,
          backgroundSize: "100% 100%, 16px 16px",
          mixBlendMode: "screen",
          filter: "blur(1.5px) contrast(130%)",
          transition: "background-image 0.8s ease",
          opacity: grainOpacity,
        }}
      />
    </div>
  );
}
