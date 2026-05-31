/**
 * @file projects.ts
 * @description Projects section copy and featured work data.
 */

import type { ProjectsContent } from "@/types/projects";

export const projectsContent = {
  title: "FEATURED PROJECTS",
  ctaLabel: "VIEW ALL WORK",
  ctaHref: "#projects",
  projects: [
    {
      id: "8th-light",
      name: "8th Light",
      description:
        "Transforming challenges into scalable digital products for industry leaders",
      imageSrc: "/Hero_Mockups/8thlight.png",
      imageWidth: 1535,
      imageHeight: 1024,
      layout: { size: "small", align: "top" },
    },
    {
      id: "harit",
      name: "Harit",
      description:
        "Sustainable agriculture platform connecting farmers to modern supply chains",
      imageSrc: "/Hero_Mockups/Harit.png",
      imageWidth: 1600,
      imageHeight: 983,
      layout: { size: "medium", align: "bottom" },
    },
    {
      id: "meshspire",
      name: "Meshspire",
      description:
        "The most personalised learning platform for students and expert teachers",
      imageSrc: "/Hero_Mockups/meshspire.png",
      imageWidth: 1536,
      imageHeight: 1024,
      layout: { size: "large" },
    },
    {
      id: "sgrids",
      name: "Sgrids",
      description:
        "Smart solar grid management for a cleaner, more resilient energy future",
      imageSrc: "/Hero_Mockups/sgrids.png",
      imageWidth: 1654,
      imageHeight: 951,
      layout: { size: "small", align: "bottom" },
    },
    {
      id: "spardha",
      name: "Spardha",
      description:
        "AI-powered exam prep that helps students compete daily and rank higher",
      imageSrc: "/Hero_Mockups/spardha.png",
      imageWidth: 1536,
      imageHeight: 1024,
      layout: { size: "medium", align: "top" },
    },
    {
      id: "solx",
      name: "Solx",
      description:
        "Next-generation solar analytics and installation workflow tools",
      imageSrc: "/Hero_Mockups/Solx.png",
      imageWidth: 1601,
      imageHeight: 983,
      layout: { size: "large" },
    },
  ],
} satisfies ProjectsContent;
