/**
 * @file logo-ticker-styles.ts
 * @description Shared Tailwind class strings for logo ticker layout and typography.
 */

/** Temporarily hide the logo ticker on the page (code kept for later). */
export const LOGO_TICKER_SECTION_HIDDEN = true;

export const LOGO_TICKER_SECTION =
  "flex min-h-screen flex-col items-center bg-white px-4 py-12 sm:px-6 sm:py-14 md:px-9 md:py-16";

export const LOGO_TICKER_HEADLINE =
  "mx-auto max-w-2xl text-center font-display text-2xl font-normal leading-snug tracking-tight text-neutral-900 sm:max-w-3xl sm:text-3xl md:max-w-4xl md:text-4xl";

export const LOGO_TICKER_HEADLINE_OFFSET = "pt-[14vh] sm:pt-[16vh] md:pt-[18vh]";

export const LOGO_TICKER_BODY =
  "mt-14 flex w-full max-w-6xl flex-col items-center gap-14 sm:mt-16 sm:gap-16 md:mt-20 md:max-w-7xl";

export const LOGO_TICKER_CTA =
  "text-center font-display text-lg font-normal leading-snug tracking-tight text-neutral-900 sm:text-xl md:text-2xl";

export const LOGO_TICKER_LOGO_HEIGHT = "h-11 sm:h-12 md:h-14 lg:h-16";

export const LOGO_TICKER_LOGO_MAX_WIDTH =
  "max-w-[9rem] sm:max-w-[10rem] md:max-w-[11rem] lg:max-w-[12rem]";

export const LOGO_TICKER_LOGO_ROWS =
  "mx-auto flex w-full max-w-5xl flex-col gap-y-16 py-10 sm:max-w-6xl sm:gap-y-20 sm:py-12 md:max-w-7xl md:gap-y-24 md:py-16";

export const LOGO_TICKER_LOGO_ROW =
  "grid w-full grid-cols-2 items-center justify-items-center gap-x-14 gap-y-14 sm:grid-cols-4 sm:gap-x-20 sm:gap-y-16 md:gap-x-24 md:gap-y-20 lg:gap-x-28";

export const LOGO_TICKER_LOGO_CELL =
  "flex w-full items-center justify-center";

export const LOGO_TICKER_LOGO_ROW_TWO_BUTTON =
  "col-span-2 col-start-1 row-start-2 flex w-full items-center justify-center sm:col-span-2 sm:col-start-2 sm:row-start-1";

export const LOGO_TICKER_LOGO_ROW_TWO_BRILLIANT =
  "col-start-1 row-start-1";

export const LOGO_TICKER_LOGO_ROW_TWO_SPARDHA =
  "col-start-2 row-start-1 sm:col-start-4";

export const LOGO_TICKER_PRIMARY_CTA =
  "inline-flex h-11 min-w-[12rem] items-center justify-center rounded-full bg-neutral-950 px-12 text-xs font-bold text-white transition-colors duration-300 ease-in-out hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950/30 focus-visible:ring-offset-2 sm:h-12 sm:min-w-[13rem] sm:px-14 sm:text-sm md:h-[3.25rem] md:min-w-[14rem]";
