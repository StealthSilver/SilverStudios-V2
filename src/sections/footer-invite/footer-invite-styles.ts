/**
 * @file footer-invite-styles.ts
 * @description Layout class strings for the footer invite transition.
 */

export const FOOTER_INVITE_STICKY =
  "sticky top-0 z-10 flex h-screen flex-col items-center justify-end px-4 pb-16 sm:px-6 sm:pb-20 md:px-9 md:pb-24";

export const FOOTER_INVITE_CONTENT =
  "flex w-full max-w-5xl flex-col items-center gap-2 sm:gap-2.5";

export const FOOTER_INVITE_CTA_WRAP = "mt-0";

/** “Let’s talk” pill — white at rest so the black gooey sweep reads on every scroll position. */
export const FOOTER_INVITE_CTA =
  "footer-invite-cta relative isolate inline-flex h-11 min-w-[10.5rem] shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-full border border-transparent bg-white px-10 font-bold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

/** Intro + rotating tagline — slightly below hero scale. */
export const FOOTER_INVITE_HEADLINE_SIZE =
  "text-4xl sm:text-5xl md:text-6xl lg:text-7xl";

/** Rotating tagline sizing for this section — matches intro; no extra vertical padding. */
export const FOOTER_INVITE_TAGLINE_SIZE = `${FOOTER_INVITE_HEADLINE_SIZE} py-0`;
