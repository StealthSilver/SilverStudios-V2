/**
 * @file FooterInviteCta.tsx
 * @description “Let’s talk” CTA with gooey left→right fill (idle → enter → hold → exit).
 */

"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type TransitionEvent,
} from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

import { HERO_NAV_LINK_TYPOGRAPHY } from "../hero/hero-styles";
import { FOOTER_INVITE_CTA } from "./footer-invite-styles";

const GOOEY_MS = 550;

type GooeyPhase = "idle" | "enter" | "hold" | "exit";

export interface FooterInviteCtaProps {
  href: string;
  label: string;
  outlineColor: string;
}

export function FooterInviteCta({
  href,
  label,
  outlineColor,
}: FooterInviteCtaProps) {
  const gooFilterId = useId().replace(/:/g, "");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [phase, setPhase] = useState<GooeyPhase>("idle");
  const [labelInverted, setLabelInverted] = useState(false);
  const hoveringRef = useRef(false);
  const sweepRef = useRef<HTMLSpanElement>(null);
  const phaseRef = useRef<GooeyPhase>("idle");

  const chars = useMemo(() => [...label], [label]);

  const setPhaseSafe = useCallback((next: GooeyPhase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const scheduleEnter = useCallback(() => {
    setPhaseSafe("idle");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhaseSafe("enter");
      });
    });
  }, [setPhaseSafe]);

  const scheduleExit = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhaseSafe("exit");
      });
    });
  }, [setPhaseSafe]);

  const handlePointerEnter = useCallback(() => {
    hoveringRef.current = true;
    setLabelInverted(true);
    const current = phaseRef.current;
    if (current === "enter" || current === "hold") {
      return;
    }
    scheduleEnter();
  }, [scheduleEnter]);

  const handlePointerLeave = useCallback(() => {
    hoveringRef.current = false;
    setLabelInverted(false);
    if (phaseRef.current === "hold") {
      scheduleExit();
    }
  }, [scheduleExit]);

  const advanceAfterEnter = useCallback(() => {
    setPhaseSafe(hoveringRef.current ? "hold" : "exit");
  }, [setPhaseSafe]);

  const advanceAfterExit = useCallback(() => {
    setPhaseSafe("idle");
  }, [setPhaseSafe]);

  const handleSweepTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLSpanElement>) => {
      if (prefersReducedMotion) {
        return;
      }
      if (event.propertyName !== "transform") {
        return;
      }
      if (event.target !== sweepRef.current) {
        return;
      }

      const current = phaseRef.current;
      if (current === "enter") {
        advanceAfterEnter();
      } else if (current === "exit") {
        advanceAfterExit();
      }
    },
    [prefersReducedMotion, advanceAfterEnter, advanceAfterExit],
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (phase !== "enter" && phase !== "exit") {
      return;
    }

    const onTimeout = () => {
      if (phaseRef.current === "enter") {
        advanceAfterEnter();
      } else if (phaseRef.current === "exit") {
        advanceAfterExit();
      }
    };

    const timer = window.setTimeout(onTimeout, GOOEY_MS + 80);
    return () => window.clearTimeout(timer);
  }, [phase, prefersReducedMotion, advanceAfterEnter, advanceAfterExit]);

  useEffect(() => {
    if (!prefersReducedMotion) {
      return;
    }

    if (phase === "enter") {
      const timer = window.setTimeout(advanceAfterEnter, 0);
      return () => window.clearTimeout(timer);
    }

    if (phase === "exit") {
      const timer = window.setTimeout(advanceAfterExit, 0);
      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [phase, prefersReducedMotion, advanceAfterEnter, advanceAfterExit]);

  return (
    <Link
      href={href}
      className={cn(
        FOOTER_INVITE_CTA,
        HERO_NAV_LINK_TYPOGRAPHY,
        "letter-wave",
      )}
      data-gooey-phase={phase}
      data-gooey-lit={labelInverted ? "true" : "false"}
      aria-label={label}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      onFocus={handlePointerEnter}
      onBlur={handlePointerLeave}
      style={{ outlineColor }}
    >
      <svg
        className="pointer-events-none absolute size-0 overflow-hidden"
        aria-hidden
      >
        <defs>
          <filter
            id={gooFilterId}
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="4"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <span className="footer-invite-cta__gooey" aria-hidden>
        <span
          className="footer-invite-cta__gooey-inner"
          style={{ filter: `url(#${gooFilterId})` }}
        >
          <span
            ref={sweepRef}
            className="footer-invite-cta__gooey-sweep"
            onTransitionEnd={handleSweepTransitionEnd}
          />
          <span className="footer-invite-cta__gooey-cap" />
        </span>
      </span>

      <span aria-hidden className="footer-invite-cta__label relative z-10">
        <span className="relative inline-flex whitespace-nowrap">
          <span className="invisible select-none whitespace-nowrap">{label}</span>
          <span className="letter-wave__track absolute left-0 top-1/2 inline-flex -translate-y-1/2 whitespace-nowrap">
            {chars.map((ch, i) => (
              <span
                key={`${label}-${i}-${ch}`}
                className="letter-wave__char"
                style={{ animationDelay: `${i * 12}ms` }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </span>
        </span>
      </span>
    </Link>
  );
}
