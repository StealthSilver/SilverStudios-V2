/**
 * @file AboutSection.tsx
 * @description Studio introduction — fantasy.co-style scroll-scrubbed word reveal.
 */

import { ScrollRevealWords } from "@/components/ui/ScrollRevealWords";
import { aboutContent } from "@/lib/data/about";
import { cn } from "@/lib/utils";

import {
  ABOUT_BODY,
  ABOUT_BODY_STACK,
  ABOUT_HEADLINE,
  ABOUT_INNER,
  ABOUT_SECTION,
} from "./about-styles";

// ——— Main section ———

export default function AboutSection() {
  const { headline, paragraphs } = aboutContent;

  return (
    <section
      id="about"
      aria-labelledby="about-headline"
      className={cn(ABOUT_SECTION)}
    >
      <div className={cn(ABOUT_INNER)}>
        <ScrollRevealWords
          id="about-headline"
          text={headline}
          className={cn(ABOUT_HEADLINE)}
        />

        <div className={cn(ABOUT_BODY_STACK)}>
          {paragraphs.map((paragraph) => (
            <ScrollRevealWords
              key={paragraph}
              text={paragraph}
              className={cn(ABOUT_BODY)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
