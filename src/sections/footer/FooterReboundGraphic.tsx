/**
 * @file FooterReboundGraphic.tsx
 * @description Sui-style rebound SVG — blue towers and dotted guides revealed on overscroll.
 */

"use client";

import { useId } from "react";

import { FOOTER_REBOUND_BLUE } from "@/lib/footer-overscroll";
import { cn } from "@/lib/utils";

import { FOOTER_REBOUND_GRAPHIC } from "./footer-styles";

export interface FooterReboundGraphicProps {
  scale: number;
  className?: string;
}

export default function FooterReboundGraphic({
  scale,
  className,
}: FooterReboundGraphicProps) {
  const uid = useId().replace(/:/g, "");
  const gradient1 = `footer-rebound-g1-${uid}`;
  const gradient2 = `footer-rebound-g2-${uid}`;
  const gradient3 = `footer-rebound-g3-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1481 535"
      fill="none"
      aria-hidden
      className={cn(FOOTER_REBOUND_GRAPHIC, className)}
      style={{
        color: FOOTER_REBOUND_BLUE,
        transform: `scaleY(${scale})`,
        transformOrigin: "center bottom",
      }}
    >
      <defs>
        <linearGradient
          id={gradient1}
          x1="0%"
          y1="0%"
          x2="0"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" stopOpacity="0" offset="0%" />
          <stop stopColor="#FFFFFF" stopOpacity="1" offset="100%" />
        </linearGradient>
        <linearGradient
          id={gradient2}
          x1="0%"
          y1="20%"
          x2="0"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" stopOpacity="0" offset="0%" />
          <stop stopColor="#FFFFFF" stopOpacity="1" offset="100%" />
        </linearGradient>
        <linearGradient
          id={gradient3}
          x1="0%"
          y1="40%"
          x2="0"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" stopOpacity="0" offset="0%" />
          <stop stopColor="#FFFFFF" stopOpacity="1" offset="100%" />
        </linearGradient>
      </defs>

      <g className="footer-rebound-blocks">
        <path
          opacity="0.8"
          d="M634.196 152.52H846.378V535.131H634.196V222.52Z"
          fill="currentColor"
        />
        <path
          opacity="0.8"
          d="M423 221.6H635V535H423V277Z"
          fill="currentColor"
        />
        <path
          opacity="0.6"
          d="M211.583 284.416H423.765V535.131H211.583V330.52Z"
          fill="currentColor"
        />
        <path
          opacity="0.4"
          d="M0.275879 355.52H212.458V535.131H0.275879V402.52Z"
          fill="currentColor"
        />
        <path
          opacity="0.8"
          d="M1058.23 221.6H846.052V535.131H1058.23V276.52Z"
          fill="currentColor"
        />
        <path
          opacity="0.6"
          d="M1269.54 284.416H1057.36V535.131H1269.54V330.52Z"
          fill="currentColor"
        />
        <path
          opacity="0.4"
          d="M1480.85 355.52H1268.67V535.131H1480.85V402.52Z"
          fill="currentColor"
        />
      </g>

      <g className="footer-rebound-dots">
        <path
          d="M1269.54 238.676L1269.54 541.232"
          stroke={`url(#${gradient3})`}
          strokeWidth="2"
          strokeDasharray="2 10"
        />
        <path
          d="M1058.23 156.064V541.232"
          stroke={`url(#${gradient2})`}
          strokeWidth="2"
          strokeDasharray="2 10"
          fill="none"
        />
        <path
          d="M846.928 0.597656V541.232"
          stroke={`url(#${gradient1})`}
          strokeWidth="2"
          strokeDasharray="2 10"
          fill="none"
        />
        <path
          d="M635.621 0.597656V541.232"
          stroke={`url(#${gradient1})`}
          strokeWidth="2"
          strokeDasharray="2 10"
        />
        <path
          d="M424.314 156.064V541.232"
          stroke={`url(#${gradient2})`}
          strokeWidth="2"
          strokeDasharray="2 10"
        />
        <path
          d="M213.007 238.676L213.007 541.232"
          stroke={`url(#${gradient3})`}
          strokeWidth="2"
          strokeDasharray="2 10"
        />
      </g>
    </svg>
  );
}
