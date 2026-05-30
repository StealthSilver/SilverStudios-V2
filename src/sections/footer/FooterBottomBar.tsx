/**
 * @file FooterBottomBar.tsx
 * @description Footer bottom row — privacy, location, and social links.
 */

"use client";

import { LetterWaveLink } from "@/components/ui/LetterWaveLink";
import { footerContent } from "@/lib/data/footer";
import { cn } from "@/lib/utils";

import { HERO_NAV_LINK_TYPOGRAPHY } from "../hero/hero-styles";

import FooterSocialLinks from "./FooterSocialLinks";
import { FOOTER_BOTTOM, FOOTER_BOTTOM_LEFT } from "./footer-styles";

// ——— Main section ———

const FOOTER_LINK_COLOR = "rgb(255 255 255)";

export default function FooterBottomBar() {
  const { privacyPolicy, locationLine } = footerContent;

  return (
    <div className={cn(FOOTER_BOTTOM)}>
      <div className={cn(FOOTER_BOTTOM_LEFT)}>
        <LetterWaveLink
          href={privacyPolicy.href}
          label={privacyPolicy.label}
          variant="nav"
          style={{ color: FOOTER_LINK_COLOR }}
          className={cn(
            "flex items-center transition-[color] duration-150 ease-linear",
            HERO_NAV_LINK_TYPOGRAPHY,
          )}
        />
        <span className={cn(HERO_NAV_LINK_TYPOGRAPHY, "text-white")}>
          {locationLine}
        </span>
      </div>

      <FooterSocialLinks />
    </div>
  );
}
