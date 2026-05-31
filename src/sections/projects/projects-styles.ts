/**
 * @file projects-styles.ts
 * @description Layout class strings for the projects showcase section.
 */

export const PROJECTS_SECTION =
  "relative bg-white px-4 py-32 sm:px-6 sm:py-44 md:px-9 md:py-56 lg:py-72";

export const PROJECTS_INNER = "mx-auto w-full max-w-7xl";

export const PROJECTS_TITLE =
  "font-display text-3xl font-normal tracking-tight text-black sm:text-4xl md:text-5xl lg:text-[3.25rem]";

export const PROJECTS_GRID =
  "mt-4 grid grid-cols-1 gap-x-6 gap-y-56 sm:mt-5 sm:gap-x-8 sm:gap-y-72 md:mt-6 md:grid-cols-2 md:gap-x-10 md:gap-y-0 lg:mt-8 lg:gap-x-12";

export const PROJECTS_COLUMN = "flex flex-col";

/** Space between consecutive cards in a column (margin, not flex gap). */
export const PROJECTS_CARD_STACK =
  "[&:not(:last-child)]:mb-56 sm:[&:not(:last-child)]:mb-72 md:[&:not(:last-child)]:mb-[22rem] lg:[&:not(:last-child)]:mb-[30rem] xl:[&:not(:last-child)]:mb-[38rem]";

export const PROJECTS_COLUMN_RIGHT =
  "md:pt-[clamp(18rem,44vw,34rem)]";

export const PROJECT_CARD =
  "project-card group block w-full py-14 text-left sm:py-20 md:py-24 lg:py-32 xl:py-40";

/** Extra offset above the Harit card in the staggered right column. */
export const PROJECT_CARD_HARIT =
  "mt-16 sm:mt-20 md:mt-28 lg:mt-36 xl:mt-44";

export const PROJECT_CARD_MEDIA =
  "project-card__media relative aspect-[4/3] w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl";

export const PROJECT_CARD_CAPTION =
  "mt-6 max-w-[36rem] font-sans text-base leading-snug tracking-tight text-black sm:mt-7 sm:text-lg md:mt-8 md:text-xl";

export const PROJECT_CARD_NAME =
  "font-semibold transition-opacity duration-300 group-hover:opacity-70";

export const PROJECT_CARD_DESCRIPTION =
  "font-normal text-neutral-700 transition-opacity duration-300 group-hover:text-black";
