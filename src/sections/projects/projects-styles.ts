/**
 * @file projects-styles.ts
 * @description Layout class strings for the projects showcase section (Clay-style work grid).
 */

import { SECTION_HEADLINE } from "@/lib/section-headline-styles";

export const PROJECTS_SECTION =
  "relative bg-white px-5 py-24 sm:px-7 sm:py-32 md:px-8 md:py-40 lg:py-48";

export const PROJECTS_INNER = "mx-auto w-full max-w-7xl";

export const PROJECTS_TITLE = SECTION_HEADLINE;

/** Space between the section headline and the work grid. */
export const PROJECTS_TITLE_WRAP =
  "mb-20 sm:mb-24 md:mb-28 lg:mb-32 xl:mb-36";

/** Flex-wrap masonry inspired by clay.global/work. */
export const PROJECTS_GRID =
  "flex flex-wrap items-start gap-x-6 gap-y-14 sm:gap-x-8 sm:gap-y-16 md:gap-y-20 lg:gap-y-24";

export const PROJECT_CARD =
  "project-card group flex w-full flex-col text-left";

export const PROJECT_CARD_WIDTH_SMALL =
  "md:w-[calc(50%-1rem)] lg:w-[calc(50%-1.25rem)]";

export const PROJECT_CARD_WIDTH_MEDIUM =
  "md:w-[calc(50%-1rem)] lg:w-[calc(50%-1.25rem)]";

export const PROJECT_CARD_WIDTH_LARGE = "md:w-full";

/** Pushes paired cards down to mimic Clay's bottom-aligned rows. */
export const PROJECT_CARD_ALIGN_BOTTOM =
  "md:pt-20 lg:pt-28 xl:pt-36";

export const PROJECT_CARD_MEDIA =
  "project-card__media relative w-full overflow-hidden rounded-lg bg-neutral-100 sm:rounded-xl";

export const PROJECT_CARD_MEDIA_SMALL =
  "aspect-[5/6] min-h-[18rem] sm:min-h-[20rem] md:min-h-[22rem] lg:min-h-[26rem]";

export const PROJECT_CARD_MEDIA_MEDIUM =
  "aspect-[4/5] min-h-[22rem] sm:min-h-[24rem] md:min-h-[28rem] lg:min-h-[32rem]";

export const PROJECT_CARD_MEDIA_LARGE =
  "aspect-[16/10] min-h-[16rem] sm:min-h-[18rem] md:min-h-[22rem] lg:min-h-[26rem] xl:min-h-[30rem]";

export const PROJECT_CARD_COPY = "mt-5 flex flex-col gap-1.5 sm:mt-6 md:mt-7";

export const PROJECT_CARD_NAME =
  "font-sans text-lg font-semibold leading-snug tracking-tight text-neutral-950 sm:text-xl";

export const PROJECT_CARD_DESCRIPTION =
  "max-w-md font-sans text-sm font-medium leading-relaxed text-neutral-600 transition-colors duration-300 group-hover:text-neutral-900 sm:text-[0.9375rem]";
