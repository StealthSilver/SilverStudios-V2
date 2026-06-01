/**
 * @file services.ts
 * @description Services section copy — Studio Namma home services list.
 */

import type { ServicesContent } from "@/types/services";

export const servicesContent = {
  title: "OUR SERVICES",
  defaultImageSrc: "/Services/default.png",
  items: [
    {
      id: "branding",
      primary: "Branding",
      secondary: "",
      imageSrc: "/Services/services1.png",
    },
    {
      id: "development",
      primary: "Development",
      secondary: "",
      imageSrc: "/Services/services2.png",
    },
    {
      id: "digital-products",
      primary: "Digital Products",
      secondary: "",
      imageSrc: "/Services/services3.png",
    },
    {
      id: "ui-ux",
      primary: "UI/UX Design",
      secondary: "",
      imageSrc: "/Services/services4.png",
    },
    {
      id: "websites",
      primary: "Websites",
      secondary: "",
      imageSrc: "/Services/services5.png",
    },
    {
      id: "content-seo",
      primary: "Content & SEO",
      secondary: "",
      imageSrc: "/Services/services6.png",
    },
  ],
  seeAllLabel: "VIEW ALL SERVICES",
  seeAllHref: "#services",
} satisfies ServicesContent;
