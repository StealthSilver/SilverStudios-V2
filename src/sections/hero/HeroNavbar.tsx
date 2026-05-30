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
import {
  mixNavbarForeground,
  useNavbarScrollProgress,
} from "@/hooks/useNavbarScrollProgress";
import { siteConfig, siteNavLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

import {
  HERO_NAV_LINK_TYPOGRAPHY,
  HERO_NAVBAR_FIXED_POSITION,
  HERO_NAVBAR_FIXED_POSITION_FULL_BLEED,
  HERO_VIDEO_CONTAINER_HIDDEN,
} from "./hero-styles";

// ——— Types ———

const NAV_RADIUS = "rounded-xl";

export interface HeroNavbarProps {
  className?: string;
}

// ——— Component ———

export default function HeroNavbar({ className }: HeroNavbarProps) {
  const scrollProgress = useNavbarScrollProgress();
  const foregroundColor = useMemo(
    () => mixNavbarForeground(scrollProgress),
    [scrollProgress],
  );
  const lightLogoOpacity = 1 - scrollProgress;
  const darkLogoOpacity = scrollProgress;

  const positionClass = HERO_VIDEO_CONTAINER_HIDDEN
    ? HERO_NAVBAR_FIXED_POSITION_FULL_BLEED
    : HERO_NAVBAR_FIXED_POSITION;

  return (
    <header
      className={cn(
        "relative mx-auto w-full max-w-5xl shrink-0",
        positionClass,
        className,
      )}
    >
      <GlassSurface className={NAV_RADIUS}>
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
            {siteNavLinks.map(({ label, href }) => (
              <li key={href} className="flex h-full items-center">
                <LetterWaveLink
                  href={href}
                  label={label}
                  variant="nav"
                  style={{ color: foregroundColor }}
                  className={cn(
                    "flex items-center transition-[color] duration-150 ease-linear",
                    HERO_NAV_LINK_TYPOGRAPHY,
                  )}
                />
              </li>
            ))}
          </ul>
        </nav>
      </GlassSurface>
    </header>
  );
}
