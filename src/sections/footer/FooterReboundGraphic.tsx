/**
 * @file FooterReboundGraphic.tsx
 * @description Sui-style stepped rebound graphic with dotted dividers and noise.
 */

"use client";

import { cn } from "@/lib/utils";

import { FOOTER_REBOUND_GRAPHIC } from "./footer-styles";

export interface FooterReboundGraphicProps {
  scale: number;
  progress: number;
  pullPx: number;
  className?: string;
}

const REBOUND_BLOCK_PATHS = [
  "M634.196 152.52H846.378V535.131H634.196V222.52Z",
  "M423 221.6H635V535H423V277Z",
  "M211.583 284.416H423.765V535.131H211.583V330.52Z",
  "M0.275879 355.52H212.458V535.131H0.275879V402.52Z",
  "M1058.23 221.6H846.052V535.131H1058.23V276.52Z",
  "M1269.54 284.416H1057.36V535.131H1269.54V330.52Z",
  "M1480.85 355.52H1268.67V535.131H1480.85V402.52Z",
] as const;

const REBOUND_BLOCK_OPACITY = [0.8, 0.8, 0.6, 0.4, 0.8, 0.6, 0.4] as const;

const REBOUND_BAR_COLOR_STOPS = [
  { top: "#d9f6ff", mid: "#5ab8ef", base: "#0058b5" },
  { top: "#c9f1ff", mid: "#4eace7", base: "#0053ac" },
  { top: "#bfeeff", mid: "#44a4e1", base: "#004fa4" },
  { top: "#def8ff", mid: "#67c1f4", base: "#005fbe" },
  { top: "#b8ebff", mid: "#3f9fdc", base: "#004b9d" },
  { top: "#cdf3ff", mid: "#55b2ea", base: "#0057b2" },
  { top: "#b1e7ff", mid: "#3998d7", base: "#004792" },
] as const;

const REBOUND_DOT_PATHS = [
  { d: "M1269.54 238.676L1269.54 535", gradientId: "strokeGradient3" },
  { d: "M1058.23 156.064V535", gradientId: "strokeGradient2" },
  { d: "M846.928 0.597656V535", gradientId: "strokeGradient1" },
  { d: "M635.621 0.597656V535", gradientId: "strokeGradient1" },
  { d: "M424.314 156.064V535", gradientId: "strokeGradient2" },
  { d: "M213.007 238.676L213.007 535", gradientId: "strokeGradient3" },
] as const;

const EDGE_NOISE_TEXTURE_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.08' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.95'/%3E%3C/svg%3E";

const BAR_NOISE_TEXTURE_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.95'/%3E%3C/svg%3E";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export default function FooterReboundGraphic({
  scale,
  progress,
  pullPx,
  className,
}: FooterReboundGraphicProps) {
  const reveal = clamp(pullPx / 22, 0, 1);
  const opacity = reveal * clamp(0.72 + progress * 0.28, 0, 1);
  const visualScale = 0.18 + scale * 0.82;
  const yOffset = (1 - reveal) * 7;
  const glowOpacity = clamp(0.26 + progress * 0.42, 0, 0.68);
  const bloomOpacity = clamp(0.2 + progress * 0.36, 0, 0.56);
  const noiseOpacity = clamp(0.22 + progress * 0.34, 0.2, 0.56);
  const edgeBlendOpacity = clamp(0.42 + progress * 0.2, 0.42, 0.62);
  const edgeNoiseOpacity = clamp(0.22 + progress * 0.14, 0.22, 0.38);
  const barNoiseOpacity = clamp(0.18 + progress * 0.18, 0.18, 0.36);

  return (
    <div
      aria-hidden
      className={cn(FOOTER_REBOUND_GRAPHIC, className)}
      style={{
        opacity,
        transform: `translate3d(0, ${yOffset}px, 0) scale(${visualScale})`,
        transformOrigin: "center bottom",
        maskImage:
          "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.95) 8%, rgba(0,0,0,1) 16%, rgba(0,0,0,1) 84%, rgba(0,0,0,0.95) 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 64%, rgba(0,0,0,0.44) 82%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.95) 8%, rgba(0,0,0,1) 16%, rgba(0,0,0,1) 84%, rgba(0,0,0,0.95) 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 64%, rgba(0,0,0,0.44) 82%, transparent 100%)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-full w-full"
        style={{
          backgroundImage:
            "radial-gradient(92% 160% at 50% 106%, rgba(138, 198, 255, 0.58) 0%, rgba(81, 158, 255, 0.42) 26%, rgba(43, 112, 224, 0.28) 46%, rgba(19, 52, 124, 0.14) 62%, rgba(2, 8, 22, 0) 100%)",
          filter: "blur(18px) saturate(132%)",
          opacity: glowOpacity,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-full w-full"
        style={{
          backgroundImage:
            "radial-gradient(70% 120% at 50% 102%, rgba(84, 164, 255, 0.38) 0%, rgba(33, 108, 228, 0.24) 44%, rgba(0, 0, 0, 0) 100%)",
          filter: "blur(22px) saturate(138%)",
          mixBlendMode: "screen",
          opacity: bloomOpacity,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-full w-full text-[#7ea6e0]"
      >
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 1481 535"
          preserveAspectRatio="none"
          role="presentation"
        >
          <defs>
            <linearGradient id="strokeGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop stopColor="#FFFFFF" stopOpacity="0" offset="0%" />
              <stop stopColor="#FFFFFF" stopOpacity="1" offset="100%" />
            </linearGradient>
            <linearGradient id="strokeGradient2" x1="0%" y1="20%" x2="0%" y2="100%">
              <stop stopColor="#FFFFFF" stopOpacity="0" offset="0%" />
              <stop stopColor="#FFFFFF" stopOpacity="1" offset="100%" />
            </linearGradient>
            <linearGradient id="strokeGradient3" x1="0%" y1="40%" x2="0%" y2="100%">
              <stop stopColor="#FFFFFF" stopOpacity="0" offset="0%" />
              <stop stopColor="#FFFFFF" stopOpacity="1" offset="100%" />
            </linearGradient>
            {REBOUND_BAR_COLOR_STOPS.map((bar, index) => (
              <linearGradient
                key={`barSeaGradient-${index}`}
                id={`barSeaGradient${index}`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop stopColor={bar.top} offset="0%" />
                <stop stopColor={bar.mid} offset="46%" />
                <stop stopColor={bar.base} offset="100%" />
              </linearGradient>
            ))}
            <linearGradient id="barSheenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop stopColor="#ffffff" stopOpacity="0.3" offset="0%" />
              <stop stopColor="#b6ecff" stopOpacity="0.12" offset="42%" />
              <stop stopColor="#6fd2ff" stopOpacity="0.08" offset="72%" />
              <stop stopColor="#2d8cdd" stopOpacity="0.04" offset="100%" />
            </linearGradient>
            <mask id="barNoiseMask">
              <rect x="0" y="0" width="1481" height="535" fill="black" />
              {REBOUND_BLOCK_PATHS.map((path) => (
                <path key={`bar-mask-${path}`} d={path} fill="white" />
              ))}
            </mask>
          </defs>
          <g>
            {REBOUND_BLOCK_PATHS.map((path, index) => (
              <path
                key={path}
                d={path}
                fill={`url(#barSeaGradient${index})`}
                opacity={REBOUND_BLOCK_OPACITY[index]}
              />
            ))}
          </g>
          <g>
            {REBOUND_BLOCK_PATHS.map((path) => (
              <path
                key={`bar-sheen-${path}`}
                d={path}
                fill="url(#barSheenGradient)"
                opacity="0.52"
              />
            ))}
          </g>
          <image
            href={BAR_NOISE_TEXTURE_DATA_URI}
            x="0"
            y="0"
            width="1481"
            height="535"
            preserveAspectRatio="none"
            mask="url(#barNoiseMask)"
            opacity={barNoiseOpacity}
          />
          <g>
            {REBOUND_DOT_PATHS.map((line) => (
              <path
                key={line.d}
                d={line.d}
                fill="none"
                stroke={`url(#${line.gradientId})`}
                strokeWidth="2"
                strokeDasharray="2 10"
              />
            ))}
          </g>
        </svg>
      </div>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-full w-full"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 28%, rgba(255, 255, 255, 0.2) 0 0.8px, transparent 1px), radial-gradient(circle at 67% 43%, rgba(255, 255, 255, 0.18) 0 0.8px, transparent 1px), radial-gradient(circle at 81% 73%, rgba(255, 255, 255, 0.16) 0 0.9px, transparent 1px), radial-gradient(circle at 34% 62%, rgba(255, 255, 255, 0.17) 0 0.7px, transparent 1px), radial-gradient(circle at 55% 15%, rgba(255, 255, 255, 0.14) 0 0.7px, transparent 1px)",
          backgroundSize: "3px 3px, 4px 4px, 3px 3px, 5px 5px, 4px 4px",
          backgroundPosition: "0 0, 1px 1px, 2px 0, 0 2px, 1px 3px",
          mixBlendMode: "soft-light",
          filter: "blur(0.7px) contrast(128%) saturate(130%)",
          opacity: noiseOpacity,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundImage: `url("${EDGE_NOISE_TEXTURE_DATA_URI}")`,
          backgroundSize: "180px 180px",
          backgroundRepeat: "repeat",
          mixBlendMode: "soft-light",
          filter: "blur(1.35px) contrast(150%) saturate(128%)",
          opacity: edgeNoiseOpacity,
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 14%, rgba(0,0,0,0) 86%, rgba(0,0,0,1) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 24%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 14%, rgba(0,0,0,0) 86%, rgba(0,0,0,1) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 24%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.96) 0%, rgba(0, 0, 0, 0.64) 7%, rgba(0, 0, 0, 0.16) 16%, rgba(0, 0, 0, 0) 26%, rgba(0, 0, 0, 0) 74%, rgba(0, 0, 0, 0.16) 84%, rgba(0, 0, 0, 0.64) 93%, rgba(0, 0, 0, 0.96) 100%), linear-gradient(to bottom, rgba(0, 0, 0, 0.96) 0%, rgba(0, 0, 0, 0.52) 11%, rgba(0, 0, 0, 0.14) 24%, rgba(0, 0, 0, 0) 40%)",
          filter: "blur(6px)",
          opacity: edgeBlendOpacity,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-full w-full"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.78) 14%, rgba(0, 0, 0, 0.42) 33%, rgba(0, 0, 0, 0.12) 57%, rgba(0, 0, 0, 0) 78%)",
          filter: "blur(5px)",
        }}
      />
    </div>
  );
}
