/**
 * @file footer.ts
 * @description Footer section copy and navigation columns.
 */

import type { FooterSocialLink, SiteNavLink } from "@/types";

export const footerContent = {
  primaryColumn: [
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Blogs", href: "#blog" },
  ] satisfies readonly SiteNavLink[],
  secondaryColumn: [
    {
      label: "Silver UI",
      href: "https://silver-ui.vercel.app/",
      external: true,
    },
    { label: "Workflow", href: "#workflow" },
    { label: "Contact", href: "#contact" },
  ] satisfies readonly SiteNavLink[],
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
      href: "https://www.instagram.com/",
      icon: "instagram",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/",
      icon: "linkedin",
    },
    {
      label: "X",
      href: "https://x.com/",
      icon: "x",
    },
    {
      label: "Dribbble",
      href: "https://dribbble.com/",
      icon: "dribbble",
    },
    {
      label: "Figma",
      href: "https://www.figma.com/",
      icon: "figma",
    },
    {
      label: "GitHub",
      href: "https://github.com/",
      icon: "github",
    },
  ] satisfies readonly FooterSocialLink[],
} as const;
