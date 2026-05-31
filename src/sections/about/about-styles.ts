/**
 * @file about-styles.ts
 * @description Layout and typography for the about section.
 */

/** Horizontal inset matches {@link HERO_NAVBAR_FIXED_POSITION_FULL_BLEED} (left-5 / sm:7 / md:8). */
export const ABOUT_SECTION =
  "flex min-h-screen flex-col justify-center bg-white px-5 py-24 sm:px-7 sm:py-28 md:px-8 md:py-32";

export const ABOUT_INNER = "mx-auto w-full max-w-7xl";

import { SECTION_HEADLINE } from "@/lib/section-headline-styles";

export const ABOUT_HEADLINE = SECTION_HEADLINE;

export const ABOUT_BODY =
  "font-nav text-xl font-normal leading-snug tracking-tight text-neutral-900 sm:text-2xl md:text-3xl lg:text-4xl lg:leading-[1.2]";

export const ABOUT_BODY_STACK =
  "mt-8 flex max-w-4xl flex-col gap-6 sm:mt-10 sm:gap-8 md:mt-12 md:gap-10 lg:max-w-5xl";
