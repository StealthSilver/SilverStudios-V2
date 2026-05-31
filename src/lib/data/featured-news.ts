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
      id: "smart-grid-leadership",
      headline:
        "Design press on Silver Studios’ brand and product work for a climate-tech leader—one system across web, product, and investor touchpoints.",
      gradientClassName: "from-violet-600 via-fuchsia-500 to-amber-300",
    },
    {
      id: "energy-transition-spotlight",
      headline:
        "Trade coverage of our AI-informed studio workflow that accelerated a global SaaS launch without sacrificing craft or narrative clarity.",
      gradientClassName: "from-cyan-500 via-sky-500 to-indigo-600",
    },
    {
      id: "innovation-in-the-news",
      headline:
        "Outlets highlight how we helped a fintech scale from MVP to Series B with a unified design language, design system, and marketing site.",
      gradientClassName: "from-emerald-500 via-teal-400 to-blue-500",
    },
    {
      id: "press-highlights",
      headline:
        "Awwwards and industry blogs profile an immersive web experience we built for a renewable-energy portfolio—strategy, UI, and motion in sync.",
      gradientClassName: "from-rose-500 via-orange-400 to-yellow-300",
    },
    {
      id: "powering-the-future",
      headline:
        "Features on Silver Studios’ integrated model: functional design, creative storytelling, and engineering under one roof for world-leading brands.",
      gradientClassName: "from-purple-600 via-blue-500 to-cyan-300",
    },
    {
      id: "sga-in-the-headlines",
      headline:
        "Interviews on blending AI, design, and technology to build transformative digital experiences—and what that means for the next decade of client work.",
      gradientClassName: "from-lime-500 via-emerald-500 to-cyan-500",
    },
  ],
} satisfies FeaturedNewsContent;
