/**
 * @file featured-news.ts
 * @description Featured News section copy.
 */

import type { FeaturedNewsContent } from "@/types/featured-news";

export const featuredNewsContent = {
  eyebrow: "IN THE NEWS",
  title: "FEATURED NEWS",
  ctaLabel: "VIEW ALL COVERAGE",
  ctaHref: "/proof/news",
  slides: [
    {
      id: "social-instagram-linkedin",
      headline:
        "We are active on Instagram and LinkedIn, check us out there.",
      imageSrc: "/News/news3.png",
      imageAlt: "Silver Studios on Instagram and LinkedIn",
    },
    {
      id: "silverstudios-art-launch",
      headline:
        "We Dumped our old page to welcome a new one. Launching silverstudios.art.",
      imageSrc: "/News/news1.png",
      imageAlt: "Silver Studios website relaunch",
    },
    {
      id: "silver-ui-launch",
      headline:
        "Launching Silver UI. The inhouse Ui library for Templates, Blocks and more.",
      imageSrc: "/News/news2.png",
      imageAlt: "Silver UI library launch",
    },
    {
      id: "dribbble-github",
      headline:
        "We share our work on Dribble and Github frequently, check out our work there.",
      imageSrc: "/News/news4.png",
      imageAlt: "Silver Studios work on Dribbble and GitHub",
    },
    {
      id: "levender-ai-partnership",
      headline:
        "We partnered with Levender AI. We love their brand and we are gonna help them with their story.",
      imageSrc: "/News/news5.png",
      imageAlt: "Silver Studios partnership with Levender AI",
    },
  ],
} satisfies FeaturedNewsContent;
