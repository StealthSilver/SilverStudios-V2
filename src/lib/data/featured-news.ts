/**
 * @file featured-news.ts
 * @description Featured News section copy.
 */

import type { FeaturedNewsContent } from "@/types/featured-news";

export const featuredNewsContent = {
  eyebrow: "IN THE NEWS",
  title: "Featured News",
  ctaLabel: "View All Coverage",
  ctaHref: "/proof/news",
  slides: [
    {
      id: "smart-grid-leadership",
      title: "Smart Grid Leadership",
      headline:
        "National outlets on India’s first grid-scale EMS and battery storage deployment",
      gradientClassName:
        "from-violet-600 via-fuchsia-500 to-amber-300",
    },
    {
      id: "energy-transition-spotlight",
      title: "Energy Transition Spotlight",
      headline:
        "Trade press on hybrid solar, wind, and BESS optimization at utility scale",
      gradientClassName: "from-cyan-500 via-sky-500 to-indigo-600",
    },
    {
      id: "innovation-in-the-news",
      title: "Innovation In The News",
      headline:
        "Commentary on forecasting, grid-code alignment, and renewable integration",
      gradientClassName: "from-emerald-500 via-teal-400 to-blue-500",
    },
    {
      id: "press-highlights",
      title: "Press Highlights",
      headline:
        "Profiles of analytics-led control rooms and performance across large portfolios",
      gradientClassName: "from-rose-500 via-orange-400 to-yellow-300",
    },
    {
      id: "powering-the-future",
      title: "Powering The Future",
      headline:
        "Features on peak demand, ancillary services, and market participation strategy",
      gradientClassName: "from-purple-600 via-blue-500 to-cyan-300",
    },
    {
      id: "sga-in-the-headlines",
      title: "SGA In The Headlines",
      headline:
        "Interviews on the clean-energy roadmap and SGA’s role behind major programs",
      gradientClassName: "from-lime-500 via-emerald-500 to-cyan-500",
    },
  ],
} satisfies FeaturedNewsContent;
