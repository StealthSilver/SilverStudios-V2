/**
 * @file HeroSection.tsx
 * @description Landing hero — reference section template (types → sub-components → default export).
 */

import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui";
import { heroContent } from "@/lib/data";
import { cn } from "@/lib/utils";

// ——— Types ———

interface HeroEyebrowProps {
  children: string;
  className?: string;
}

interface HeroActionsProps {
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  className?: string;
}

// ——— Local sub-components ———

function HeroEyebrow({ children, className }: HeroEyebrowProps) {
  return (
    <p
      className={cn(
        "text-xs font-medium uppercase tracking-[0.2em] text-foreground/60",
        className,
      )}
    >
      {children}
    </p>
  );
}

function HeroActions({ primary, secondary, className }: HeroActionsProps) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-center", className)}>
      <Link href={primary.href} className={buttonVariants("primary")}>
        {primary.label}
      </Link>
      <Link href={secondary.href} className={buttonVariants("secondary")}>
        {secondary.label}
      </Link>
    </div>
  );
}

// ——— Main section ———

export default function HeroSection() {
  const { eyebrow, title, description, primaryCta, secondaryCta } = heroContent;

  return (
    <section
      aria-labelledby="hero-title"
      className="flex flex-1 flex-col items-center justify-center px-6 py-24 sm:px-10 lg:py-32"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10 text-center">
        <Image
          src="/Logos/silverui-l.svg"
          alt=""
          width={48}
          height={48}
          priority
          className="dark:hidden"
        />
        <Image
          src="/Logos/silverui-d.svg"
          alt=""
          width={48}
          height={48}
          priority
          className="hidden dark:block"
        />

        <div className="flex flex-col gap-5">
          <HeroEyebrow>{eyebrow}</HeroEyebrow>
          <h1
            id="hero-title"
            className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-tight"
          >
            {title}
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-foreground/70">
            {description}
          </p>
        </div>

        <HeroActions primary={primaryCta} secondary={secondaryCta} />
      </div>
    </section>
  );
}
