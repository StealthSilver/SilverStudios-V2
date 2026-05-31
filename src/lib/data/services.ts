/**
 * @file services.ts
 * @description Services section copy — Studio Namma home services list.
 */

import type { ServicesContent } from "@/types/services";

export const servicesContent = {
  title: "OUR SERVICES",
  items: [
    { id: "branding", primary: "Branding", secondary: "" },
    { id: "development", primary: "Development", secondary: "" },
    { id: "digital-products", primary: "Digital Products", secondary: "" },
    { id: "ui-ux", primary: "UI/UX Design", secondary: "" },
    { id: "websites", primary: "Websites", secondary: "" },
    { id: "content-seo", primary: "Content & SEO", secondary: "" },
  ],
  seeAllLabel: "VIEW ALL SERVICES",
  seeAllHref: "#services",
} satisfies ServicesContent;
