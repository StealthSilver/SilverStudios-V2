/**
 * @file HeroSection.tsx
 * @description Landing hero — full-viewport neutral container with top navbar.
 */

import Image from "next/image";
import Link from "next/link";

import { siteConfig, siteNavLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { SiteNavLink } from "@/types";

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
          "flex h-11 items-center justify-between px-4 sm:h-12 sm:px-5",
          NAV_RADIUS,
          "bg-white",
        )}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label={siteName}
        >
          <Image
            src="/Logos/sitelogo-light.svg"
            alt={siteName}
            width={140}
            height={22}
            priority
            className="h-5 w-auto sm:h-6"
          />
        </Link>

        <ul className="flex items-center gap-4 sm:gap-6">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-nav text-[11px] font-light uppercase tracking-[0.12em] text-neutral-950 transition-opacity hover:opacity-70 sm:text-xs"
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

// ——— Main section ———

export default function HeroSection() {
  return (
    <section aria-label="Hero" className="box-border flex h-dvh bg-white p-6 sm:p-8 md:p-9">
      <HeroContainer>
        <HeroNavbar links={siteNavLinks} siteName={siteConfig.name} />
      </HeroContainer>
    </section>
  );
}
