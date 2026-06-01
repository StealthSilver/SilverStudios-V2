/**
 * @file HeroNavbar.tsx
 * @description Fixed site navbar — shared across the hero, scroll transition, and page.
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { GlassSurface } from "@/components/ui/GlassSurface";
import { LetterWaveLink } from "@/components/ui/LetterWaveLink";
import { NavExternalLinkArrow } from "@/components/ui/NavExternalLinkArrow";
import {
  isNavbarForegroundLight,
  useNavbarForegroundColor,
  useNavbarOverFooter,
} from "@/hooks/useNavbarScrollProgress";
import { siteConfig, siteNavLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

import {
  HERO_NAV_LINK_TYPOGRAPHY,
  HERO_NAVBAR_FIXED_POSITION,
  HERO_NAVBAR_FIXED_POSITION_FULL_BLEED,
  HERO_NAVBAR_MAX_WIDTH,
  HERO_VIDEO_CONTAINER_HIDDEN,
} from "./hero-styles";

// ——— Types ———

const NAV_RADIUS = "rounded-xl";

export interface HeroNavbarProps {
  className?: string;
}

// ——— Component ———

export default function HeroNavbar({ className }: HeroNavbarProps) {
  const foregroundColor = useNavbarForegroundColor();
  const navOverFooter = useNavbarOverFooter();
  const foregroundIsLight = useMemo(
    () => isNavbarForegroundLight(foregroundColor),
    [foregroundColor],
  );
  const lightLogoOpacity = foregroundIsLight ? 1 : 0;
  const darkLogoOpacity = foregroundIsLight ? 0 : 1;

  const positionClass = HERO_VIDEO_CONTAINER_HIDDEN
    ? HERO_NAVBAR_FIXED_POSITION_FULL_BLEED
    : HERO_NAVBAR_FIXED_POSITION;

  return (
    <GlassSurface
      as="header"
      variant="nav"
      navOverFooter={navOverFooter}
      className={cn(
        "mx-auto w-full shrink-0 overflow-hidden",
        HERO_NAVBAR_MAX_WIDTH,
        positionClass,
        NAV_RADIUS,
        className,
      )}
    >
      <nav
        aria-label="Primary"
        className="flex h-10 items-center justify-between px-4 sm:h-11 sm:px-5"
      >
          <Link
            href="/"
            className="flex h-full shrink-0 items-center"
            aria-label={siteConfig.name}
          >
            <span className="relative block h-5 sm:h-6">
              <Image
                src="/Logos/sitelogo-dark.svg"
                alt=""
                width={140}
                height={22}
                priority
                aria-hidden
                className="block h-5 w-auto transition-opacity duration-150 ease-linear sm:h-6"
                style={{ opacity: lightLogoOpacity }}
              />
              <Image
                src="/Logos/sitelogo-light.svg"
                alt=""
                width={140}
                height={22}
                priority
                aria-hidden
                className="absolute left-0 top-0 block h-5 w-auto transition-opacity duration-150 ease-linear sm:h-6"
                style={{ opacity: darkLogoOpacity }}
              />
            </span>
          </Link>

          <ul className="mt-0.5 flex h-full items-center gap-4 sm:mt-2 sm:gap-6">
            {siteNavLinks.map(({ label, href, external }) => (
              <li key={href} className="flex h-full items-center">
                <LetterWaveLink
                  href={href}
                  label={label}
                  variant="nav"
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  ariaLabel={external ? `${label} (opens in new tab)` : undefined}
                  style={{ color: foregroundColor }}
                  className={cn(
                    "flex items-center transition-[color] duration-150 ease-linear",
                    HERO_NAV_LINK_TYPOGRAPHY,
                    external && "group gap-1.5",
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
    </GlassSurface>
  );
}
