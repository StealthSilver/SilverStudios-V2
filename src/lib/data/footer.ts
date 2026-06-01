/**
 * @file footer.ts
 * @description Footer section copy and navigation columns.
 */

import type { FooterSocialLink, SiteNavLink } from "@/types";

import {
  footerNavPrimaryLinks,
  footerNavSecondaryLinks,
} from "./site";

export const footerContent = {
  primaryColumn: footerNavPrimaryLinks satisfies readonly SiteNavLink[],
  secondaryColumn: footerNavSecondaryLinks satisfies readonly SiteNavLink[],
  privacyPolicy: {
    label: "Privacy Policy",
    href: "#privacy",
  } satisfies SiteNavLink,
  locationLine: "Bengaluru, 2026",
  contactEmail: "hello@silverstudios.art",
  contactEmailHref: "mailto:hello@silverstudios.art",
  contactPhone: "+91 7204374716",
  contactPhoneHref: "tel:+917204374716",
  socialLinks: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/silverstudios.art?igsh=dGVyN2xhOHd0bHFu",
      icon: "instagram",
      external: true,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/silver-studios-art",
      icon: "linkedin",
      external: true,
    },
    {
      label: "X",
      href: "/",
      icon: "x",
    },
    {
      label: "Dribbble",
      href: "/",
      icon: "dribbble",
    },
    {
      label: "Figma",
      href: "/",
      icon: "figma",
    },
    {
      label: "GitHub",
      href: "/",
      icon: "github",
    },
  ] satisfies readonly FooterSocialLink[],
} as const;
