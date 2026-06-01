/**
 * @file services-styles.ts
 * @description Layout class strings for the services showcase section.
 */

import { SECTION_HEADLINE } from "@/lib/section-headline-styles";

/**
 * Section-scrubbed reveal window — finishes while the block is still in view
 * so the headline and CTA stay on screen together.
 */
export const SERVICES_SCROLL_REVEAL_START_RATIO = 0.92;
export const SERVICES_SCROLL_REVEAL_END_RATIO = 0.14;

/** Hide hover preview images on service rows (code kept for later). */
export const SERVICES_ITEM_MEDIA_HIDDEN = true;

/** Hide secondary labels beside each service (code kept for later). */
export const SERVICES_ITEM_SECONDARY_HIDDEN = true;

export const SERVICES_SECTION =
  "relative bg-white px-4 py-20 sm:px-6 sm:py-24 md:px-9 md:py-32 lg:py-36";

export const SERVICES_INNER = "mx-auto flex w-full max-w-7xl flex-col";

export const SERVICES_IMAGE_PANEL =
  "pointer-events-none fixed inset-y-0 right-0 z-30 hidden h-screen w-[42vw] min-w-[26rem] max-w-[42rem] lg:block";

export const SERVICES_IMAGE_STAGE = "relative h-full w-full overflow-hidden";

export const SERVICES_IMAGE_MOBILE_STAGE =
  "relative mt-8 h-[50vh] w-full overflow-hidden lg:hidden";

export const SERVICES_IMAGE_LIVE_LINE =
  "pointer-events-none absolute left-0 z-[3] h-px w-full bg-white/95 shadow-[0_0_10px_rgba(255,255,255,0.35)]";

export const SERVICES_HEADLINE = SECTION_HEADLINE;

/** Space between the section headline and the services list. */
export const SERVICES_HEADLINE_WRAP =
  "mb-10 sm:mb-12 md:mb-14 lg:mb-16";

export const SERVICES_EYEBROW =
  "w-full font-nav text-[11px] font-normal uppercase leading-none tracking-[0.06em] text-neutral-900 sm:text-xs";

export const SERVICES_LIST =
  "flex w-full flex-col items-start gap-0";

export const SERVICES_ITEM =
  "group relative flex w-full cursor-default items-center justify-start py-0";

export const SERVICES_ITEM_INNER = "relative z-[2] text-left";

export const SERVICES_ITEM_PRIMARY =
  "font-nav text-xl font-normal leading-tight tracking-[-0.02em] text-neutral-950 sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem]";

export const SERVICES_ITEM_SECONDARY =
  "pointer-events-none absolute top-1/2 right-0 z-[2] hidden -translate-y-1/2 translate-x-[calc(100%+0.75rem)] font-nav text-[10px] font-normal uppercase leading-none tracking-[0.06em] text-neutral-500 transition-opacity duration-300 ease-out sm:block sm:text-[11px] sm:opacity-100 md:translate-x-[calc(100%+1rem)] md:group-hover:opacity-100";

export const SERVICES_ITEM_SECONDARY_MOBILE =
  "mt-2 font-nav text-[10px] font-normal uppercase leading-none tracking-[0.06em] text-neutral-500 sm:hidden";

export const SERVICES_ITEM_MEDIA =
  "pointer-events-none absolute top-1/2 left-0 z-[1] aspect-[4/3] w-[4.5rem] -translate-y-1/2 overflow-hidden rounded-lg opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 sm:w-[8.5rem] sm:rounded-xl md:w-[13rem] md:-translate-x-[calc(100%+1.25rem)] md:rounded-2xl lg:w-[16rem] xl:w-[18rem]";

export const SERVICES_ITEM_MEDIA_GRADIENT =
  "h-full w-full bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300";

export const SERVICES_CTA_WRAP =
  "mt-12 flex w-full justify-start sm:mt-14 md:mt-16";

export const SERVICES_CTA_LABEL =
  "font-nav text-xs font-normal uppercase leading-none tracking-[0.06em] sm:text-sm md:text-base";

/** Matches About section pill size. */
export const SERVICES_CTA_BUTTON =
  "inline-flex h-11 min-w-[13rem] items-center justify-center rounded-full px-12 font-bold text-white transition-[color,background-color] duration-300 ease-in-out hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:h-12 sm:min-w-[14.5rem] sm:px-14 md:h-[3.25rem] md:min-w-[16rem] md:px-16";
