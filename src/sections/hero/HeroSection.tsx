/**
 * @file HeroSection.tsx
 * @description Landing hero — full-viewport neutral container with top navbar.
 */

import { GlassSurface } from "@/components/ui/GlassSurface";
import { LetterWaveLink } from "@/components/ui/LetterWaveLink";
import HeroGradientBackground, {
  HeroGradientTimeProvider,
} from "@/components/HeroGradientBackground";
import { heroContent } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { HeroBackgroundSlide, SiteNavLink } from "@/types";

import { HeroScrollGlowLayers } from "./HeroAmbientGlow";
import { HeroBackgroundSlideshow } from "./HeroBackgroundSlideshow";
import HeroNavbar from "./HeroNavbar";
import { HeroScrollTrap } from "./HeroScrollTrap";
import { HeroRotatingTagline } from "./HeroRotatingTagline";
import { HeroSectionGate } from "./HeroSectionGate";
import {
  HERO_HEADLINE_FONT,
  HERO_NAV_LINK_TYPOGRAPHY,
  HERO_TITLE_SIZE,
  HERO_VIDEO_CONTAINER_HIDDEN,
} from "./hero-styles";

// ——— Types ———

const HERO_RADIUS = "rounded-3xl";

interface HeroContainerProps {
  backgroundSlides: readonly HeroBackgroundSlide[];
  className?: string;
  children?: React.ReactNode;
  initialHeroHour: number;
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
      className="pointer-events-none absolute inset-0 bg-black/55"
    />
  );
}

function HeroBackgroundStack({
  slides,
}: {
  slides: readonly HeroBackgroundSlide[];
}) {
  if (HERO_VIDEO_CONTAINER_HIDDEN) {
    return null;
  }

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
  initialHeroHour,
}: HeroContainerProps) {
  return (
    <HeroGradientTimeProvider initialHour={initialHeroHour}>
      <div
        className={cn(
          "relative flex min-h-0 flex-1 flex-col",
          HERO_VIDEO_CONTAINER_HIDDEN && "min-h-full w-full",
          !HERO_VIDEO_CONTAINER_HIDDEN && HERO_RADIUS,
          !HERO_VIDEO_CONTAINER_HIDDEN && "bg-neutral-950",
          className,
        )}
      >
        {HERO_VIDEO_CONTAINER_HIDDEN && (
          <HeroGradientBackground initialHour={initialHeroHour} />
        )}
        <HeroBackgroundStack slides={backgroundSlides} />

        <div
          className="relative flex min-h-0 w-full flex-1 flex-col px-4 sm:px-6 md:px-9"
          style={{ zIndex: 20 }}
        >
          {children}
        </div>

        <HeroScrollGlowLayers enabled={HERO_VIDEO_CONTAINER_HIDDEN} />
      </div>
    </HeroGradientTimeProvider>
  );
}

function HeroHeadline({ children, className }: HeroHeadlineProps) {
  return (
    <h1
      className={cn(
        "shrink-0 whitespace-nowrap text-white",
        HERO_HEADLINE_FONT,
        HERO_TITLE_SIZE,
        className,
      )}
    >
      {children}
    </h1>
  );
}

function HeroCtaRow({
  primary,
  secondary,
}: {
  primary: SiteNavLink;
  secondary: SiteNavLink;
}) {
  const ctaTransition =
    "transition-[color,background-color] duration-300 ease-in-out";

  return (
    <div className="mt-4 flex shrink-0 flex-row flex-wrap items-center justify-center gap-3 sm:mt-5 sm:gap-4">
      <GlassSurface className="inline-flex rounded-full">
        <LetterWaveLink
          href={primary.href}
          label={primary.label}
          className={cn(
            HERO_NAV_LINK_TYPOGRAPHY,
            ctaTransition,
            "inline-flex h-9 min-w-[10.5rem] items-center justify-center rounded-full px-10 font-bold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          )}
        />
      </GlassSurface>
      <LetterWaveLink
        href={secondary.href}
        label={secondary.label}
        className={cn(
          HERO_NAV_LINK_TYPOGRAPHY,
          ctaTransition,
          "group inline-flex h-9 items-center gap-1.5 px-2 text-white/75 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        )}
        suffix={
          <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">
            →
          </span>
        }
      />
    </div>
  );
}

// ——— Main section ———

interface HeroSectionProps {
  showNavbar?: boolean;
  initialHeroHour: number;
}

export default function HeroSection({
  showNavbar = true,
  initialHeroHour,
}: HeroSectionProps) {
  const { title, rotatingLines, backgroundSlides, primaryCta, secondaryCta } =
    heroContent;

  const heroSection = (
    <section
      aria-label="Hero"
      className={cn(
        "relative box-border flex flex-col overflow-hidden",
        HERO_VIDEO_CONTAINER_HIDDEN
          ? "sticky top-0 p-0"
          : "min-h-dvh bg-white p-6 sm:p-8 md:p-9",
      )}
      style={HERO_VIDEO_CONTAINER_HIDDEN ? { height: "100vh" } : undefined}
    >
      <HeroContainer
        backgroundSlides={backgroundSlides}
        className="min-h-0 flex-1"
        initialHeroHour={initialHeroHour}
      >
        <div className="relative flex w-full shrink-0 flex-col items-center justify-start pt-32 sm:pt-36 md:pt-40">
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <HeroHeadline>{title}</HeroHeadline>
            <HeroRotatingTagline lines={rotatingLines} />
            <HeroCtaRow primary={primaryCta} secondary={secondaryCta} />
          </div>
        </div>
      </HeroContainer>
    </section>
  );

  return (
    <HeroSectionGate slides={backgroundSlides}>
      {showNavbar && <HeroNavbar />}
      {HERO_VIDEO_CONTAINER_HIDDEN ? (
        <HeroScrollTrap>{heroSection}</HeroScrollTrap>
      ) : (
        heroSection
      )}
    </HeroSectionGate>
  );
}
