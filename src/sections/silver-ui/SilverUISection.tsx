/**
 * @file SilverUISection.tsx
 * @description Silver UI showcase below Featured News.
 */

import { ScrollRevealWords } from "@/components/ui/ScrollRevealWords";
import { silverUiContent } from "@/lib/data/silver-ui";
import { cn } from "@/lib/utils";

import {
  SILVER_UI_INNER,
  SILVER_UI_SECTION,
  SILVER_UI_TITLE,
  SILVER_UI_TITLE_WRAP,
} from "./silver-ui-styles";
import { SilverUiShowcase } from "./SilverUiShowcase";

// ——— Main section ———

export default function SilverUISection() {
  return (
    <section
      id="silver-ui"
      aria-labelledby="silver-ui-title"
      className={cn(SILVER_UI_SECTION)}
    >
      <div className={cn(SILVER_UI_INNER)}>
        <div className={cn(SILVER_UI_TITLE_WRAP)}>
          <ScrollRevealWords
            id="silver-ui-title"
            text={silverUiContent.title}
            className={cn(SILVER_UI_TITLE)}
          />
        </div>

        <SilverUiShowcase content={silverUiContent} />
      </div>
    </section>
  );
}
