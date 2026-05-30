/**
 * @file ScrollRevealWords.tsx
 * @description Word-by-word scroll reveal — fade and de-blur on enter (scrubbed).
 */

"use client";

import { useRef } from "react";

import { useScrollWordReveal } from "@/hooks/useScrollWordReveal";
import { cn } from "@/lib/utils";

import type { HTMLAttributes } from "react";

export interface ScrollRevealWordsProps extends HTMLAttributes<HTMLParagraphElement> {
  text: string;
}

function splitWordTokens(text: string): string[] {
  return text.split(/(\s+)/).filter((token) => token.length > 0);
}

function isWhitespace(token: string): boolean {
  return /^\s+$/.test(token);
}

export function ScrollRevealWords({
  className,
  text,
  ...rest
}: ScrollRevealWordsProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useScrollWordReveal(containerRef);

  const tokens = splitWordTokens(text);

  return (
    <p ref={containerRef} className={cn(className)} {...rest}>
      {tokens.map((token, index) =>
        isWhitespace(token) ? (
          token
        ) : (
          <span
            key={`${token}-${index}`}
            className="scroll-reveal-word"
            data-scroll-reveal-word=""
          >
            {token}
          </span>
        ),
      )}
    </p>
  );
}
