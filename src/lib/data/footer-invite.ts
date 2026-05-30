/**
 * @file footer-invite.ts
 * @description Copy for the projects-to-footer scroll invite transition.
 */

import type { SiteNavLink } from "@/types";

export const footerInviteContent = {
  intro: "We are really excited to hear",
  pillars: ["Your Idea.", "Your Story.", "Your Vision."] as const,
  cta: {
    label: "Let's talk",
    href: "mailto:hello@silverstudios.art",
  } satisfies SiteNavLink,
} as const;

/** Extra viewport heights of scroll runway (sticky panel stays fixed while scrubbing). */
export const FOOTER_INVITE_SCROLL_RUNWAY_VH = 80;

/** Khufu-style scale at scroll start (grows to 1 through the scrub). */
export const FOOTER_INVITE_MIN_CONTENT_SCALE = 0.68;

export const FOOTER_INVITE_MIN_CTA_SCALE = 0.78;
