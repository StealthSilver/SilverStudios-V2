/**
 * @file FooterContactBlock.tsx
 * @description Footer contact email and phone — bottom left above the divider.
 */

"use client";

import Link from "next/link";

import { LetterWaveLink } from "@/components/ui/LetterWaveLink";
import { footerContent } from "@/lib/data/footer";
import { cn } from "@/lib/utils";

import {
  FOOTER_CONTACT_BLOCK,
  FOOTER_CONTACT_LINK,
  FOOTER_NAV_LINK,
} from "./footer-styles";

// ——— Main section ———

const FOOTER_LINK_COLOR = "rgb(255 255 255)";

export default function FooterContactBlock() {
  const { contactEmail, contactEmailHref, contactPhone, contactPhoneHref } =
    footerContent;

  return (
    <address className={cn(FOOTER_CONTACT_BLOCK, "not-italic")}>
      <LetterWaveLink
        href={contactEmailHref}
        label={contactEmail}
        variant="nav"
        style={{ color: FOOTER_LINK_COLOR }}
        className={cn(
          FOOTER_NAV_LINK,
          FOOTER_CONTACT_LINK,
        )}
      />
      <Link href={contactPhoneHref} className={cn(FOOTER_CONTACT_LINK)}>
        {contactPhone}
      </Link>
    </address>
  );
}
