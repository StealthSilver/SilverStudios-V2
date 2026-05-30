/**
 * @file FooterNavColumns.tsx
 * @description Footer nav columns — navbar link styles and letter-wave hover.
 */

"use client";

import { LetterWaveLink } from "@/components/ui/LetterWaveLink";
import { NavExternalLinkArrow } from "@/components/ui/NavExternalLinkArrow";
import { footerContent } from "@/lib/data/footer";
import { cn } from "@/lib/utils";
import type { SiteNavLink } from "@/types";

import {
  FOOTER_NAV_COLUMN,
  FOOTER_NAV_GRID,
  FOOTER_NAV_ITEM,
  FOOTER_NAV_LINK,
  FOOTER_NAV_LINK_TYPOGRAPHY,
  FOOTER_NAV_LIST,
} from "./footer-styles";

// ——— Types ———

interface FooterNavColumnProps {
  links: readonly SiteNavLink[];
  ariaLabel: string;
}

const FOOTER_LINK_COLOR = "rgb(255 255 255)";

// ——— Local sub-components ———

function FooterNavColumn({ links, ariaLabel }: FooterNavColumnProps) {
  return (
    <nav aria-label={ariaLabel} className={cn(FOOTER_NAV_COLUMN)}>
      <ul className={cn(FOOTER_NAV_LIST)}>
        {links.map(({ label, href, external }) => (
          <li key={href} className={cn(FOOTER_NAV_ITEM)}>
            <LetterWaveLink
              href={href}
              label={label}
              variant="nav"
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              ariaLabel={external ? `${label} (opens in new tab)` : undefined}
              style={{ color: FOOTER_LINK_COLOR }}
              className={cn(
                FOOTER_NAV_LINK,
                "transition-[color] duration-150 ease-linear",
                FOOTER_NAV_LINK_TYPOGRAPHY,
                external && "group flex-row-reverse gap-1.5",
              )}
              suffix={
                external ? (
                  <span className="inline-flex opacity-0 transition-[opacity,transform] duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:opacity-100 motion-reduce:transform-none [&_svg]:size-3 sm:[&_svg]:size-3.5">
                    <NavExternalLinkArrow />
                  </span>
                ) : undefined
              }
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ——— Main section ———

export default function FooterNavColumns() {
  const { primaryColumn, secondaryColumn } = footerContent;

  return (
    <div className={cn(FOOTER_NAV_GRID)}>
      <FooterNavColumn links={primaryColumn} ariaLabel="Footer primary" />
      <FooterNavColumn links={secondaryColumn} ariaLabel="Footer secondary" />
    </div>
  );
}
