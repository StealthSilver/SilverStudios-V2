/**
 * @file HeroSection.tsx
 * @description Landing hero — full-viewport neutral container with top navbar.
 */

import Image from "next/image";
import Link from "next/link";

import { heroContent, siteConfig, siteNavLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { HeroBackgroundSlide, SiteNavLink } from "@/types";

import { HeroBackgroundSlideshow } from "./HeroBackgroundSlideshow";
import { HeroRotatingTagline } from "./HeroRotatingTagline";
import { HeroSectionGate } from "./HeroSectionGate";
import { HERO_TITLE_SIZE } from "./hero-styles";

// ——— Types ———

const HERO_RADIUS = "rounded-3xl";
const NAV_RADIUS = "rounded-xl";

interface HeroContainerProps {
  backgroundSlides: readonly HeroBackgroundSlide[];
  className?: string;
  children?: React.ReactNode;
}

interface HeroNavbarProps {
  links: SiteNavLink[];
  siteName: string;
  className?: string;
}

interface HeroHeadlineProps {
  children: string;
  className?: string;
}

// ——— Local sub-components ———

function HeroBackgroundOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-black/45"
    />
  );
}

function HeroBackgroundStack({
  slides,
}: {
  slides: readonly HeroBackgroundSlide[];
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 isolate overflow-hidden"
    >
      <HeroBackgroundSlideshow slides={slides} className="absolute inset-0" />
      <HeroBackgroundOverlay />
    </div>
  );
}

function HeroContainer({
  backgroundSlides,
  className,
  children,
}: HeroContainerProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-0 flex-1 flex-col overflow-hidden",
        HERO_RADIUS,
        "bg-neutral-950",
        className,
      )}
    >
      <HeroBackgroundStack slides={backgroundSlides} />

      <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col items-center px-4 pt-3 sm:px-6 sm:pt-4 md:px-9 md:pt-6">
        {children}
      </div>
    </div>
  );
}

function HeroNavbar({ links, siteName, className }: HeroNavbarProps) {
  return (
    <header className={cn("w-full max-w-5xl shrink-0", className)}>
      <nav
        aria-label="Primary"
        className={cn(
          "flex h-10 items-center justify-between px-4 sm:h-11 sm:px-5",
          NAV_RADIUS,
          "bg-white",
        )}
      >
        <Link
          href="/"
          className="flex h-full shrink-0 items-center"
          aria-label={siteName}
        >
          <Image
            src="/Logos/sitelogo-light.svg"
            alt={siteName}
            width={140}
            height={22}
            priority
            className="block h-5 w-auto sm:h-6"
          />
        </Link>

        <ul className="mt-0.5 flex h-full items-center gap-4 sm:mt-2 sm:gap-6">
          {links.map(({ label, href }) => (
            <li key={href} className="flex h-full items-center">
              <Link
                href={href}
                className="flex items-center font-nav text-[11px] font-normal uppercase leading-none tracking-[0.06em] text-neutral-950 transition-opacity hover:opacity-70 sm:text-xs"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function HeroHeadline({ children, className }: HeroHeadlineProps) {
  return (
    <h1
      className={cn(
        "shrink-0 whitespace-nowrap text-center font-display font-normal tracking-tight text-white",
        HERO_TITLE_SIZE,
        className,
      )}
    >
      {children}
    </h1>
  );
}

// ——— Main section ———

export default function HeroSection() {
  const { title, rotatingLines, backgroundSlides } = heroContent;

  return (
    <HeroSectionGate slides={backgroundSlides}>
      <section aria-label="Hero" className="box-border flex h-dvh bg-white p-6 sm:p-8 md:p-9">
        <HeroContainer backgroundSlides={backgroundSlides}>
          <HeroNavbar links={siteNavLinks} siteName={siteConfig.name} />
          <div className="flex min-h-0 w-full flex-1 items-center justify-center">
            <div className="-translate-y-28 flex flex-col items-center gap-3 sm:gap-4">
              <HeroHeadline>{title}</HeroHeadline>
              <HeroRotatingTagline lines={rotatingLines} />
            </div>
          </div>
        </HeroContainer>
      </section>
    </HeroSectionGate>
  );
}
