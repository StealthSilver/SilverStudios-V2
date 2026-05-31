/**
 * @file services-styles.ts
 * @description Layout class strings for the services showcase section.
 */

/** Hide hover preview images on service rows (code kept for later). */
export const SERVICES_ITEM_MEDIA_HIDDEN = false;

/** Hide secondary labels beside each service (code kept for later). */
export const SERVICES_ITEM_SECONDARY_HIDDEN = false;

/** Hide the “See all” link below the list (code kept for later). */
export const SERVICES_SEE_ALL_HIDDEN = false;

export const SERVICES_SECTION =
  "relative bg-white px-4 py-24 sm:px-6 sm:py-32 md:px-9 md:py-40 lg:py-48";

export const SERVICES_INNER = "mx-auto flex w-full max-w-7xl flex-col";

export const SERVICES_EYEBROW =
  "w-full font-nav text-[11px] font-normal uppercase leading-none tracking-[0.06em] text-neutral-900 sm:text-xs";

export const SERVICES_LIST =
  "mt-10 flex w-full flex-col items-stretch gap-1 sm:mt-12 sm:gap-2 md:mt-14 md:gap-3";

export const SERVICES_ITEM =
  "group relative flex w-full cursor-default items-center justify-center py-3 sm:py-4 md:py-5 lg:py-6";

export const SERVICES_ITEM_INNER = "relative z-[2]";

export const SERVICES_ITEM_PRIMARY =
  "font-nav text-[2.75rem] font-bold uppercase leading-[0.88] tracking-[-0.04em] text-black sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem]";

export const SERVICES_ITEM_SECONDARY =
  "pointer-events-none absolute top-1/2 right-0 z-[2] hidden -translate-y-1/2 translate-x-[calc(100%+0.75rem)] font-nav text-[10px] font-normal uppercase leading-none tracking-[0.06em] text-neutral-500 transition-opacity duration-300 ease-out sm:block sm:text-[11px] sm:opacity-100 md:translate-x-[calc(100%+1rem)] md:group-hover:opacity-100";

export const SERVICES_ITEM_SECONDARY_MOBILE =
  "mt-2 font-nav text-[10px] font-normal uppercase leading-none tracking-[0.06em] text-neutral-500 sm:hidden";

export const SERVICES_ITEM_MEDIA =
  "pointer-events-none absolute top-1/2 left-0 z-[1] aspect-[4/3] w-[4.5rem] -translate-y-1/2 overflow-hidden rounded-lg opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 sm:w-[8.5rem] sm:rounded-xl md:w-[13rem] md:-translate-x-[calc(100%+1.25rem)] md:rounded-2xl lg:w-[16rem] xl:w-[18rem]";

export const SERVICES_ITEM_MEDIA_GRADIENT =
  "h-full w-full bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300";

export const SERVICES_SEE_ALL_WRAP = "mt-12 flex justify-center sm:mt-14 md:mt-16";

export const SERVICES_SEE_ALL =
  "group/cta inline-flex items-center gap-2 font-nav text-[11px] font-normal uppercase leading-none tracking-[0.06em] text-neutral-900 transition-colors duration-200 hover:text-neutral-600 sm:text-xs";

export const SERVICES_SEE_ALL_ARROW =
  "inline-block transition-transform duration-200 ease-out group-hover/cta:translate-x-0.5";
