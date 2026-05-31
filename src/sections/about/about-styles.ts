/**
 * @file about-styles.ts
 * @description Layout and typography for the about section.
 */

/** Horizontal inset matches {@link HERO_NAVBAR_FIXED_POSITION_FULL_BLEED} (left-5 / sm:7 / md:8). */
export const ABOUT_SECTION =
  "relative z-40 flex min-h-screen flex-col justify-center bg-white px-5 py-24 sm:px-7 sm:py-28 md:px-8 md:py-32";

export const ABOUT_INNER = "mx-auto w-full max-w-7xl";

import { SECTION_HEADLINE } from "@/lib/section-headline-styles";

export const ABOUT_HEADLINE = SECTION_HEADLINE;

export const ABOUT_BODY =
  "font-nav text-lg font-normal leading-snug tracking-tight text-neutral-900 sm:text-xl md:text-2xl lg:text-3xl lg:leading-[1.25]";

export const ABOUT_BODY_STACK =
  "mt-8 flex max-w-4xl flex-col gap-6 sm:mt-10 sm:gap-8 md:mt-12 md:gap-10 lg:max-w-5xl";

export const ABOUT_LOGO_TICKER =
  "mt-20 w-full max-w-7xl py-6 sm:py-8 md:py-10";

export const ABOUT_LOGO_TICKER_ROW =
  "flex w-full flex-nowrap items-center justify-between gap-8 overflow-x-auto pb-4 pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-10 md:gap-12";

export const ABOUT_LOGO_TICKER_ITEM =
  "flex h-14 w-36 shrink-0 items-center justify-center bg-white px-4 py-3 sm:h-16 sm:w-40 md:w-44";

export const ABOUT_LOGO_TICKER_IMAGE =
  "h-full w-full cursor-pointer object-contain";

export const ABOUT_CTA_WRAP = "mt-12 flex w-full justify-start";

export const ABOUT_CTA_BUTTON =
  "inline-flex h-9 min-w-[10.5rem] items-center justify-center rounded-full px-10 font-bold text-white transition-[color,background-color] duration-300 ease-in-out hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
