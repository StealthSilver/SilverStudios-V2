/**
 * @file featured-news-styles.ts
 * @description Layout class strings for the Featured News section.
 */

import { SECTION_HEADLINE } from "@/lib/section-headline-styles";

export const FEATURED_NEWS_SECTION =
  "relative z-10 bg-white px-5 pt-20 pb-16 sm:px-7 sm:pt-24 sm:pb-20 md:px-8 md:pt-28 md:pb-24";

export const FEATURED_NEWS_INNER = "mx-auto flex w-full max-w-7xl flex-col";

export const FEATURED_NEWS_TITLE = SECTION_HEADLINE;

/** Space between the section headline and the carousel. */
export const FEATURED_NEWS_TITLE_WRAP =
  "mb-16 sm:mb-20 md:mb-24";

export const FEATURED_NEWS_CAROUSEL_WRAP = "flex w-full flex-col";

export const FEATURED_NEWS_HEADLINE =
  "mt-6 max-w-[min(100%,54rem)] font-nav text-lg font-normal leading-snug tracking-tight text-neutral-900 sm:mt-8 sm:text-xl md:mt-9 md:text-2xl lg:leading-[1.25]";

export const FEATURED_NEWS_CTA_LABEL =
  "font-nav text-xs font-normal uppercase leading-none tracking-[0.06em] sm:text-sm md:text-base";

/** Matches About / Services / Projects pill CTAs. */
export const FEATURED_NEWS_CTA_BUTTON =
  "inline-flex h-11 min-w-[13rem] items-center justify-center rounded-full px-12 font-bold text-white transition-[color,background-color] duration-300 ease-in-out hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:h-12 sm:min-w-[14.5rem] sm:px-14 md:h-[3.25rem] md:min-w-[16rem] md:px-16";

export const FEATURED_NEWS_CAROUSEL_TRACK = "w-full min-w-0";

export const FEATURED_NEWS_CAROUSEL_LIST =
  "flex w-full min-w-0 flex-row gap-2 sm:gap-3";

/**
 * Min widths for collapsed cards — even step down by priority (distance 1 = widest).
 * Each level is ~0.5rem narrower than the previous.
 */
export const FEATURED_NEWS_CARD_MIN_WIDTH: Record<number, string> = {
  1: "min-w-10 sm:min-w-11",
  2: "min-w-9 sm:min-w-10",
  3: "min-w-8 sm:min-w-9",
  4: "min-w-7 sm:min-w-8",
  5: "min-w-6 sm:min-w-7",
};

export const FEATURED_NEWS_CARD =
  "h-[350px] min-w-0 shrink grow basis-0 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-[390px] md:h-[440px]";

export const FEATURED_NEWS_CONTROL =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white font-nav text-lg font-normal text-neutral-800 transition-colors duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/25 focus-visible:ring-offset-2";
