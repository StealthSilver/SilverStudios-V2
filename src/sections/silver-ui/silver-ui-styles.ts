/**
 * @file silver-ui-styles.ts
 * @description Layout class strings for the Silver UI section.
 */

import { SECTION_HEADLINE } from "@/lib/section-headline-styles";

export const SILVER_UI_SECTION =
  "relative z-20 flex min-h-[70vh] flex-col justify-start bg-white px-5 py-24 sm:px-7 sm:py-28 md:px-8 md:py-32 lg:min-h-screen";

export const SILVER_UI_INNER = "mx-auto w-full max-w-7xl";

export const SILVER_UI_TITLE = SECTION_HEADLINE;

export const SILVER_UI_TITLE_WRAP = "mb-10 sm:mb-12 md:mb-14";

export const SILVER_UI_SHOWCASE_GRID =
  "grid w-full gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-stretch lg:gap-12 xl:gap-14";

export const SILVER_UI_CAROUSEL_WRAP =
  "flex w-full max-w-[46rem] flex-col items-start gap-3 sm:gap-4";

export const SILVER_UI_CAROUSEL_MAIN_FRAME =
  "relative aspect-[3/2] w-full overflow-hidden rounded-xl border border-neutral-200/90 bg-neutral-100 shadow-[0_16px_42px_rgba(0,0,0,0.16)] sm:rounded-2xl";

export const SILVER_UI_CAROUSEL_IMAGE_LAYER =
  "absolute inset-0 transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

export const SILVER_UI_CAROUSEL_IMAGE_LAYER_ACTIVE =
  "z-10 scale-100 opacity-100 blur-0";

export const SILVER_UI_CAROUSEL_IMAGE_LAYER_INACTIVE =
  "z-0 scale-[1.02] opacity-0 blur-[1px]";

export const SILVER_UI_CAROUSEL_DOTS_LIST =
  "mt-1 flex items-center justify-start gap-2 sm:gap-2.5";

export const SILVER_UI_CAROUSEL_DOT_BUTTON =
  "group relative h-2.5 w-7 overflow-hidden rounded-full border border-neutral-300/85 bg-neutral-200/70 transition-[border-color,transform,background-color] duration-300 ease-out hover:-translate-y-px hover:border-neutral-700/70 hover:bg-neutral-300/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/25 focus-visible:ring-offset-2";

export const SILVER_UI_CAROUSEL_DOT_BUTTON_ACTIVE =
  "border-neutral-900/70 bg-neutral-300/75";

export const SILVER_UI_CAROUSEL_DOT_PROGRESS =
  "absolute inset-0 origin-left rounded-full bg-neutral-900";

export const SILVER_UI_COPY_WRAP =
  "flex w-full flex-col items-start justify-between gap-10 lg:min-h-full lg:py-1";

export const SILVER_UI_COPY_LINE_STAGE =
  "relative min-h-[5rem] w-full max-w-[30ch] sm:min-h-[6rem] md:min-h-[6.75rem]";

export const SILVER_UI_COPY_LINE =
  "absolute inset-0 font-nav text-[1.35rem] leading-[1.28] tracking-tight text-neutral-900 transition-[opacity,transform,filter] duration-550 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-[1.6rem] md:text-[1.95rem] md:leading-[1.24]";

export const SILVER_UI_COPY_LINE_ACTIVE = "translate-y-0 opacity-100 blur-0";

export const SILVER_UI_COPY_LINE_INACTIVE =
  "translate-y-2 opacity-0 blur-[1.5px]";

export const SILVER_UI_CTA_WRAP =
  "mt-2 flex w-full justify-start sm:mt-4 md:mt-6";

export const SILVER_UI_CTA_LABEL =
  "font-nav text-xs font-normal uppercase leading-none tracking-[0.06em] sm:text-sm md:text-base";

export const SILVER_UI_CTA_BUTTON =
  "inline-flex h-11 min-w-[13rem] items-center justify-center rounded-full px-12 font-bold text-white transition-[color,background-color] duration-300 ease-in-out hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:h-12 sm:min-w-[14.5rem] sm:px-14 md:h-[3.25rem] md:min-w-[16rem] md:px-16";
