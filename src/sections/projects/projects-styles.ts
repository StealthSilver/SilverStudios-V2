/**
 * @file projects-styles.ts
 * @description Layout class strings for the projects showcase section (Clay-style work grid).
 */

import { SECTION_HEADLINE } from "@/lib/section-headline-styles";

export const PROJECTS_SECTION =
  "relative z-40 bg-white px-5 py-24 sm:px-7 sm:py-32 md:px-8 md:py-40 lg:py-48";

export const PROJECTS_INNER = "mx-auto w-full max-w-7xl";

export const PROJECTS_TITLE = SECTION_HEADLINE;

/** Space between the section headline and the work grid. */
export const PROJECTS_TITLE_WRAP =
  "mb-20 sm:mb-24 md:mb-28 lg:mb-32 xl:mb-36";

/** Alternating left/right project rhythm with anchored rows. */
export const PROJECTS_GRID =
  "flex w-full flex-col gap-y-12 sm:gap-y-14 md:gap-y-16 lg:gap-y-20 [&>li]:flex [&>li]:w-full [&>li:nth-child(1)]:justify-start [&>li:nth-child(1)_[data-project-card]]:max-w-[20rem] sm:[&>li:nth-child(1)_[data-project-card]]:max-w-[25rem] md:[&>li:nth-child(1)_[data-project-card]]:max-w-[29rem] lg:[&>li:nth-child(1)_[data-project-card]]:max-w-[32rem] [&>li:nth-child(1)_.project-card__media]:min-h-[24rem] sm:[&>li:nth-child(1)_.project-card__media]:min-h-[30rem] md:[&>li:nth-child(1)_.project-card__media]:min-h-[35rem] lg:[&>li:nth-child(1)_.project-card__media]:min-h-[40rem] [&>li:nth-child(2)]:justify-end [&>li:nth-child(2)]:-mt-[18rem] sm:[&>li:nth-child(2)]:-mt-[22rem] md:[&>li:nth-child(2)]:-mt-[25rem] lg:[&>li:nth-child(2)]:-mt-[28.5rem] [&>li:nth-child(3)]:mt-12 [&>li:nth-child(3)]:justify-start sm:[&>li:nth-child(3)]:mt-16 md:[&>li:nth-child(3)]:mt-20 lg:[&>li:nth-child(3)]:mt-28 [&>li:nth-child(4)]:justify-end [&>li:nth-child(5)]:justify-start [&>li:nth-child(5)]:-mt-[30rem] sm:[&>li:nth-child(5)]:-mt-[36rem] md:[&>li:nth-child(5)]:-mt-[40rem] lg:[&>li:nth-child(5)]:-mt-[44rem] [&>li:nth-child(6)]:mt-12 [&>li:nth-child(6)]:justify-end sm:[&>li:nth-child(6)]:mt-16 md:[&>li:nth-child(6)]:mt-20 lg:[&>li:nth-child(6)]:mt-28";

export const PROJECT_CARD =
  "project-card group flex w-full flex-col text-left";

export const PROJECT_CARD_WIDTH_SMALL =
  "w-full max-w-[23rem] sm:max-w-[29rem] md:max-w-[33rem] lg:max-w-[36rem]";

export const PROJECT_CARD_WIDTH_MEDIUM =
  "w-full max-w-[23rem] sm:max-w-[29rem] md:max-w-[33rem] lg:max-w-[36rem]";

export const PROJECT_CARD_WIDTH_LARGE =
  "w-full max-w-[36rem] sm:max-w-[50rem] md:max-w-[64rem] lg:max-w-[72rem]";

/** Pushes paired cards down to mimic Clay's bottom-aligned rows. */
export const PROJECT_CARD_ALIGN_BOTTOM = "";

export const PROJECT_CARD_MEDIA =
  "project-card__media relative w-full overflow-hidden rounded-none bg-neutral-100";

export const PROJECT_CARD_MEDIA_SMALL =
  "aspect-[4/5] min-h-[28rem] sm:min-h-[35rem] md:min-h-[40rem] lg:min-h-[45rem]";

export const PROJECT_CARD_MEDIA_MEDIUM =
  "aspect-[3/4] min-h-[35rem] sm:min-h-[43rem] md:min-h-[49rem] lg:min-h-[54rem]";

export const PROJECT_CARD_MEDIA_LARGE =
  "aspect-[16/8] min-h-[20rem] sm:min-h-[26rem] md:min-h-[32rem] lg:min-h-[38rem]";

export const PROJECT_CARD_COPY = "mt-5 flex flex-col gap-1.5 sm:mt-6 md:mt-7";

export const PROJECT_CARD_NAME =
  "font-nav text-xl font-bold leading-snug tracking-tight text-neutral-950 sm:text-2xl md:text-[1.75rem]";

export const PROJECT_CARD_DESCRIPTION =
  "max-w-md overflow-hidden font-nav text-base font-normal leading-relaxed tracking-tight text-neutral-600 opacity-0 max-h-0 translate-y-1 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:max-h-32 group-hover:translate-y-0 group-hover:text-neutral-900 group-focus-within:opacity-100 group-focus-within:max-h-32 group-focus-within:translate-y-0 sm:text-[1.0625rem]";

export const PROJECTS_CTA_WRAP =
  "mt-14 flex w-full justify-start sm:mt-16 md:mt-20";

export const PROJECTS_CTA_LABEL =
  "font-nav text-xs font-normal uppercase leading-none tracking-[0.06em] sm:text-sm md:text-base";

/** Matches About / Services pill size. */
export const PROJECTS_CTA_BUTTON =
  "inline-flex h-11 min-w-[13rem] items-center justify-center rounded-full px-12 font-bold text-white transition-[color,background-color] duration-300 ease-in-out hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:h-12 sm:min-w-[14.5rem] sm:px-14 md:h-[3.25rem] md:min-w-[16rem] md:px-16";
