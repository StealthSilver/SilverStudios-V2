/**
 * @file ServicesSectionReveal.tsx
 * @description Services block with unified section scroll reveal (headline, list, CTA).
 */

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";

import { GlassSurface } from "@/components/ui/GlassSurface";
import { LetterWaveLink } from "@/components/ui/LetterWaveLink";
import { ScrollRevealGroup } from "@/components/ui/ScrollRevealGroup";
import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/types/services";

import { ServiceListItem } from "./ServiceListItem";
import {
  SERVICES_CTA_BUTTON,
  SERVICES_CTA_LABEL,
  SERVICES_CTA_WRAP,
  SERVICES_HEADLINE,
  SERVICES_HEADLINE_WRAP,
  SERVICES_IMAGE_LIVE_LINE,
  SERVICES_IMAGE_MOBILE_STAGE,
  SERVICES_IMAGE_PANEL,
  SERVICES_IMAGE_STAGE,
  SERVICES_INNER,
  SERVICES_LIST,
  SERVICES_SCROLL_REVEAL_END_RATIO,
  SERVICES_SCROLL_REVEAL_START_RATIO,
} from "./services-styles";

const SERVICES_SCROLL_REVEAL_ITEM =
  "scroll-reveal-word flex h-full w-full items-center justify-center";

const SERVICES_TITLE_WORD =
  "scroll-reveal-word inline-block";

const SERVICES_HOVER_DEBOUNCE_MS = 110;
const SERVICES_IMAGE_TRANSITION_MS = 550;

function splitWordTokens(text: string): string[] {
  return text.split(/(\s+)/).filter((token) => token.length > 0);
}

function isWhitespace(token: string): boolean {
  return /^\s+$/.test(token);
}

interface ServicesSectionRevealProps {
  title: string;
  defaultImageSrc: string;
  items: readonly ServiceItem[];
  seeAllLabel: string;
  seeAllHref: string;
}

type TransitionDirection = "up" | "down";

interface TransitionState {
  from: string | null;
  to: string | null;
  direction: TransitionDirection;
}

function resolveServiceImageSrc(
  serviceId: string | null,
  items: readonly ServiceItem[],
  defaultImageSrc: string,
): string {
  if (serviceId === null) {
    return defaultImageSrc;
  }

  const item = items.find((entry) => entry.id === serviceId);
  return item?.imageSrc ?? defaultImageSrc;
}

interface TitleTokenSegment {
  key: string;
  token: string;
  revealIndex: number | null;
}

export function ServicesSectionReveal({
  title,
  defaultImageSrc,
  items,
  seeAllLabel,
  seeAllHref,
}: ServicesSectionRevealProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const hoverDebounceRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const animationStartRef = useRef<number | null>(null);
  const previousIntentIndexRef = useRef<number>(-1);

  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [transitionState, setTransitionState] = useState<TransitionState | null>(
    null,
  );

  const itemIds = useMemo(() => items.map((item) => item.id), [items]);
  const itemIndexById = useMemo(() => {
    return new Map(itemIds.map((id, index) => [id, index]));
  }, [itemIds]);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const titleTokens = useMemo(() => splitWordTokens(title), [title]);
  const titleSegments = useMemo(() => {
    return titleTokens.map<TitleTokenSegment>((token, index) => {
      if (isWhitespace(token)) {
        return {
          key: `${token}-${index}`,
          token,
          revealIndex: null,
        };
      }

      const revealIndex =
        titleTokens.slice(0, index + 1).filter((part) => !isWhitespace(part))
          .length - 1;
      return {
        key: `${token}-${index}`,
        token,
        revealIndex,
      };
    });
  }, [titleTokens]);
  const listRevealStart = useMemo(() => {
    return titleSegments.reduce((count, segment) => {
      return segment.revealIndex === null ? count : count + 1;
    }, 0);
  }, [titleSegments]);
  const ctaRevealIndex = listRevealStart + items.length;

  useEffect(() => {
    const section = contentRef.current?.closest("section");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (hoverDebounceRef.current !== null) {
        window.clearTimeout(hoverDebounceRef.current);
      }
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const runImageTransition = useCallback(
    (nextServiceId: string | null, direction: TransitionDirection) => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationStartRef.current = null;
      setTransitionProgress(0);
      setTransitionState({
        from: activeServiceId,
        to: nextServiceId,
        direction,
      });

      const animate = (timestamp: number): void => {
        if (animationStartRef.current === null) {
          animationStartRef.current = timestamp;
        }

        const elapsed = timestamp - animationStartRef.current;
        const progress = Math.min(1, elapsed / SERVICES_IMAGE_TRANSITION_MS);
        setTransitionProgress(progress);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
          return;
        }

        setTransitionState(null);
        setTransitionProgress(0);
        setActiveServiceId(nextServiceId);
        animationFrameRef.current = null;
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [activeServiceId],
  );

  const switchToServiceId = useCallback(
    (id: string) => {
      const nextIndex = itemIndexById.get(id);
      if (nextIndex === undefined) return;

      if (hoverDebounceRef.current !== null) {
        window.clearTimeout(hoverDebounceRef.current);
      }

      hoverDebounceRef.current = window.setTimeout(() => {
        const previousIntent = previousIntentIndexRef.current;
        previousIntentIndexRef.current = nextIndex;
        if (id === activeServiceId) return;

        const direction: TransitionDirection =
          nextIndex > previousIntent ? "down" : "up";
        runImageTransition(id, direction);
      }, SERVICES_HOVER_DEBOUNCE_MS);
    },
    [activeServiceId, itemIndexById, runImageTransition],
  );

  const resetToDefaultImage = useCallback(() => {
    if (hoverDebounceRef.current !== null) {
      window.clearTimeout(hoverDebounceRef.current);
      hoverDebounceRef.current = null;
    }

    if (activeServiceId === null) return;

    const currentIndex = itemIndexById.get(activeServiceId) ?? 0;
    const direction: TransitionDirection =
      currentIndex > previousIntentIndexRef.current ? "up" : "down";
    previousIntentIndexRef.current = -1;
    runImageTransition(null, direction);
  }, [activeServiceId, itemIndexById, runImageTransition]);

  const fromServiceId = transitionState?.from ?? activeServiceId;
  const toServiceId = transitionState?.to ?? activeServiceId;
  const fromImageSrc = resolveServiceImageSrc(
    fromServiceId,
    items,
    defaultImageSrc,
  );
  const toImageSrc = resolveServiceImageSrc(toServiceId, items, defaultImageSrc);

  const seamTopPercent =
    transitionState?.direction === "down"
      ? transitionProgress * 100
      : (1 - transitionProgress) * 100;

  const nextLayerClipPath =
    transitionState?.direction === "down"
      ? `inset(0 0 ${Math.max(0, 100 - transitionProgress * 100)}% 0)`
      : `inset(${Math.max(0, 100 - transitionProgress * 100)}% 0 0 0)`;

  return (
    <>
      {isSectionVisible && (
        <aside className={cn(SERVICES_IMAGE_PANEL)} aria-hidden>
          <div className={cn(SERVICES_IMAGE_STAGE)}>
            <Image
              src={fromImageSrc}
              alt=""
              fill
              sizes="40vw"
              priority
              className="object-cover"
            />
            {transitionState && (
              <>
                <div
                  className="absolute inset-0 z-[2]"
                  style={{ clipPath: nextLayerClipPath }}
                >
                  <Image
                    src={toImageSrc}
                    alt=""
                    fill
                    sizes="40vw"
                    className="object-cover"
                  />
                </div>
                <div
                  className={cn(SERVICES_IMAGE_LIVE_LINE)}
                  style={{ top: `${seamTopPercent}%` }}
                />
              </>
            )}
          </div>
        </aside>
      )}

      <div ref={contentRef}>
        <ScrollRevealGroup
          className={cn(SERVICES_INNER)}
          revealMode="section"
          revealStartRatio={SERVICES_SCROLL_REVEAL_START_RATIO}
          revealEndRatio={SERVICES_SCROLL_REVEAL_END_RATIO}
        >
          <p
            id="services-title"
            className={cn(SERVICES_HEADLINE, SERVICES_HEADLINE_WRAP)}
          >
            {titleSegments.map((segment) => {
              if (segment.revealIndex === null) {
                return segment.token;
              }

              return (
                <span
                  key={segment.key}
                  className={SERVICES_TITLE_WORD}
                  data-scroll-reveal-word=""
                  data-scroll-reveal-index={segment.revealIndex}
                >
                  {segment.token}
                </span>
              );
            })}
          </p>

          <ul className={cn(SERVICES_LIST)} onMouseLeave={resetToDefaultImage}>
            {items.map((item, index) => (
              <ServiceListItem
                key={item.id}
                item={item}
                scrollRevealIndex={listRevealStart + index}
                onHoverStart={switchToServiceId}
                onTap={switchToServiceId}
              />
            ))}
          </ul>

          <div className={cn(SERVICES_IMAGE_MOBILE_STAGE)} aria-hidden>
            <div className={cn(SERVICES_IMAGE_STAGE)}>
              <Image
                src={fromImageSrc}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              {transitionState && (
                <>
                  <div
                    className="absolute inset-0 z-[2]"
                    style={{ clipPath: nextLayerClipPath }}
                  >
                    <Image
                      src={toImageSrc}
                      alt=""
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <div
                    className={cn(SERVICES_IMAGE_LIVE_LINE)}
                    style={{ top: `${seamTopPercent}%` }}
                  />
                </>
              )}
            </div>
          </div>

          <div className={cn(SERVICES_CTA_WRAP)}>
            <div
              className={SERVICES_SCROLL_REVEAL_ITEM}
              data-scroll-reveal-word=""
              data-scroll-reveal-index={ctaRevealIndex}
            >
              <GlassSurface className="inline-flex rounded-full bg-neutral-950">
                <LetterWaveLink
                  href={seeAllHref}
                  label={seeAllLabel}
                  className={cn(SERVICES_CTA_LABEL, SERVICES_CTA_BUTTON)}
                />
              </GlassSurface>
            </div>
          </div>
        </ScrollRevealGroup>
      </div>
    </>
  );
}
