/**
 * @file FooterSection.tsx
 * @description Full-viewport footer — nav links and bottom bar anchored to the base.
 */

import { cn } from "@/lib/utils";

import FooterBottomBar from "./FooterBottomBar";
import FooterContactBlock from "./FooterContactBlock";
import FooterNavColumns from "./FooterNavColumns";
import { FOOTER_LOWER, FOOTER_PRE_BOTTOM } from "./footer-styles";

// ——— Main section ———

export default function FooterSection() {
  return (
    <footer
      id="contact"
      aria-label="Site footer"
      className={cn(
        "bg-black px-4 py-10 text-white sm:px-6 sm:py-12 md:px-9 md:py-14",
      )}
    >
      <div className={cn(FOOTER_LOWER)}>
        <div className={cn(FOOTER_PRE_BOTTOM)}>
          <FooterContactBlock />
          <FooterNavColumns />
        </div>
        <FooterBottomBar />
      </div>
    </footer>
  );
}
