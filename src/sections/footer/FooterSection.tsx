/**
 * @file FooterSection.tsx
 * @description Full-viewport footer — nav links and bottom bar anchored to the base.
 */

"use client";

import { cn } from "@/lib/utils";

import FooterBottomBar from "./FooterBottomBar";
import FooterContactBlock from "./FooterContactBlock";
import FooterNavColumns from "./FooterNavColumns";
import { FOOTER_LOWER, FOOTER_MAX_WIDTH, FOOTER_PRE_BOTTOM } from "./footer-styles";

// ——— Main section ———

export default function FooterSection() {
  return (
    <footer
      id="contact"
      aria-label="Site footer"
      className={cn(
        "bg-black px-4 pt-10 pb-0 text-white sm:px-6 sm:pt-12 sm:pb-0 md:px-9 md:pt-14 md:pb-1",
      )}
    >
      <div className={cn(FOOTER_MAX_WIDTH, FOOTER_LOWER)}>
        <div className={cn(FOOTER_PRE_BOTTOM)}>
          <FooterContactBlock />
          <FooterNavColumns />
        </div>
        <FooterBottomBar />
      </div>
    </footer>
  );
}
