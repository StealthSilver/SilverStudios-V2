/**
 * @file FooterSocialLinks.tsx
 * @description Footer social icons — dark footer glass matching the navbar, silver border on hover.
 */

"use client";

import {
  FaDribbble,
  FaFigma,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { GlassSurface } from "@/components/ui/GlassSurface";
import { footerContent } from "@/lib/data/footer";
import { cn } from "@/lib/utils";
import type { FooterSocialIcon } from "@/types";

import { FOOTER_SOCIAL_BUTTON, FOOTER_SOCIAL_LIST } from "./footer-styles";

// ——— Types ———

type SocialIconComponent = typeof FaInstagram;

const SOCIAL_ICONS: Record<FooterSocialIcon, SocialIconComponent> = {
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  dribbble: FaDribbble,
  figma: FaFigma,
  github: FaGithub,
};

// ——— Main section ———

export default function FooterSocialLinks() {
  const { socialLinks } = footerContent;

  return (
    <ul className={cn(FOOTER_SOCIAL_LIST)}>
      {socialLinks.map(({ label, href, icon, external }) => {
        const Icon = SOCIAL_ICONS[icon];

        return (
          <li key={icon}>
            <GlassSurface variant="footer" className={cn(FOOTER_SOCIAL_BUTTON)}>
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={
                  external ? `${label} (opens in new tab)` : label
                }
                className="flex size-full items-center justify-center"
              >
                <Icon className="size-4 sm:size-[1.125rem]" aria-hidden />
              </a>
            </GlassSurface>
          </li>
        );
      })}
    </ul>
  );
}
