/**
 * @file services.ts
 * @description Services section copy — Studio Namma home services list.
 */

import type { ServicesContent } from "@/types/services";

export const servicesContent = {
  title: "Services",
  items: [
    { id: "branding", primary: "branding", secondary: "Identity" },
    { id: "webflow", primary: "Webflow", secondary: "Integration" },
    { id: "ui-ux", primary: "UI/UX Design", secondary: "Wireframes" },
    { id: "gsap", primary: "GSAP animations", secondary: "Transitions" },
    { id: "advertising", primary: "advertising", secondary: "Creative Ads" },
    { id: "seo", primary: "SEO & Content", secondary: "Ranking" },
  ],
  seeAllLabel: "See all",
  seeAllHref: "#contact",
} satisfies ServicesContent;
