/**
 * @file HeroSection.tsx
 * @description Landing hero — full-viewport neutral container with top navbar.
 */

import Image from "next/image";
import Link from "next/link";

import { heroContent, siteConfig, siteNavLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { SiteNavLink } from "@/types";

import { HeroRotatingTagline } from "./HeroRotatingTagline";
import { HERO_TITLE_SIZE } from "./hero-styles";

// ——— Types ———

const HERO_RADIUS = "rounded-3xl";
const NAV_RADIUS = "rounded-xl";

interface HeroContainerProps {
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

function HeroContainer({ className, children }: HeroContainerProps) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col items-center px-4 pt-3 sm:px-6 sm:pt-4 md:px-9 md:pt-6",
        HERO_RADIUS,
        "bg-neutral-950",
        className,
      )}
    >
      {children}
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
  const { title, rotatingLines } = heroContent;

  return (
    <section aria-label="Hero" className="box-border flex h-dvh bg-white p-6 sm:p-8 md:p-9">
      <HeroContainer>
        <HeroNavbar links={siteNavLinks} siteName={siteConfig.name} />
        <div className="flex min-h-0 w-full flex-1 items-center justify-center">
          <div className="-translate-y-28 flex flex-col items-center gap-3 sm:gap-4">
            <HeroHeadline>{title}</HeroHeadline>
            <HeroRotatingTagline lines={rotatingLines} />
          </div>
        </div>
      </HeroContainer>
    </section>
  );
}
