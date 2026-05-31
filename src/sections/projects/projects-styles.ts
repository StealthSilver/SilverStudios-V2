/**
 * @file projects-styles.ts
 * @description Layout class strings for the projects showcase section (Clay-style work grid).
 */

import { SECTION_HEADLINE } from "@/lib/section-headline-styles";

export const PROJECTS_SECTION =
  "relative z-40 bg-white px-5 py-28 sm:px-7 sm:py-36 md:px-8 md:py-44 lg:py-52";

export const PROJECTS_INNER = "mx-auto w-full max-w-[88rem]";

export const PROJECTS_TITLE = SECTION_HEADLINE;

/** Space between the section headline and the work grid. */
export const PROJECTS_TITLE_WRAP =
  "mb-24 sm:mb-28 md:mb-32 lg:mb-36 xl:mb-40";

/** Asymmetric flex-wrap grid inspired by Ramotion's projects rhythm. */
export const PROJECTS_GRID =
  "flex flex-wrap items-start gap-x-6 gap-y-20 sm:gap-x-8 sm:gap-y-24 md:gap-x-10 md:gap-y-28 lg:gap-x-12 lg:gap-y-32 xl:gap-x-14 xl:gap-y-36";

export const PROJECT_CARD =
  "project-card group flex w-full flex-col text-left";

export const PROJECT_CARD_WIDTH_SMALL =
  "md:w-[calc(40%-1rem)] lg:w-[calc(40%-1.25rem)] xl:w-[calc(38%-1.5rem)]";

export const PROJECT_CARD_WIDTH_MEDIUM =
  "md:w-[calc(54%-1rem)] lg:w-[calc(54%-1.25rem)] xl:w-[calc(56%-1.5rem)]";

export const PROJECT_CARD_WIDTH_LARGE = "md:mx-auto md:w-[90%]";

/** Pushes paired cards down to mimic Clay's bottom-aligned rows. */
export const PROJECT_CARD_ALIGN_BOTTOM =
  "md:pt-28 lg:pt-36 xl:pt-44";

export const PROJECT_CARD_MEDIA =
  "project-card__media relative w-full overflow-hidden rounded-lg bg-neutral-100 sm:rounded-xl";

export const PROJECT_CARD_MEDIA_SMALL =
  "aspect-[3/4] min-h-[16rem] sm:min-h-[19rem] md:min-h-[21rem] lg:min-h-[24rem] xl:min-h-[27rem]";

export const PROJECT_CARD_MEDIA_MEDIUM =
  "aspect-[5/6] min-h-[18rem] sm:min-h-[22rem] md:min-h-[26rem] lg:min-h-[30rem] xl:min-h-[34rem]";

export const PROJECT_CARD_MEDIA_LARGE =
  "aspect-[21/10] min-h-[14rem] sm:min-h-[17rem] md:min-h-[20rem] lg:min-h-[24rem] xl:min-h-[28rem]";

export const PROJECT_CARD_COPY = "mt-5 flex flex-col gap-1.5 sm:mt-6 md:mt-7";

export const PROJECT_CARD_NAME =
  "font-sans text-lg font-semibold leading-snug tracking-tight text-neutral-950 sm:text-xl";

export const PROJECT_CARD_DESCRIPTION =
  "max-w-md overflow-hidden font-sans text-sm font-medium leading-relaxed text-neutral-600 opacity-0 max-h-0 translate-y-1 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:max-h-28 group-hover:translate-y-0 group-hover:text-neutral-900 group-focus-within:opacity-100 group-focus-within:max-h-28 group-focus-within:translate-y-0 sm:text-[0.9375rem]";
