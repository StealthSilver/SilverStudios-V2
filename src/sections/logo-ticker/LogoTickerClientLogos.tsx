/**
 * @file LogoTickerClientLogos.tsx
 * @description Client logo grid — muted by default, full color on hover.
 */

import Image from "next/image";

import { cn } from "@/lib/utils";

import type { ClientLogo } from "@/types";

import {
  LOGO_TICKER_LOGO_GRID,
  LOGO_TICKER_LOGO_HEIGHT,
  LOGO_TICKER_LOGO_MAX_WIDTH,
} from "./logo-ticker-styles";

// ——— Types ———

interface LogoTickerClientLogosProps {
  logos: readonly ClientLogo[];
  className?: string;
}

// ——— Local sub-components ———

function ClientLogoMark({ logo }: { logo: ClientLogo }) {
  return (
    <div className={cn("logo-ticker-logo flex items-center", LOGO_TICKER_LOGO_HEIGHT)}>
      <Image
        alt={`${logo.name} logo`}
        className={cn(
          "logo-ticker-logo__image h-full w-auto object-contain object-left",
          LOGO_TICKER_LOGO_MAX_WIDTH,
        )}
        height={logo.height}
        src={logo.src}
        width={logo.width}
      />
    </div>
  );
}

// ——— Main component ———

export function LogoTickerClientLogos({
  logos,
  className,
}: LogoTickerClientLogosProps) {
  return (
    <ul
      aria-label="Client logos"
      className={cn(LOGO_TICKER_LOGO_GRID, className)}
    >
      {logos.map((logo) => (
        <li key={logo.name} className="flex min-w-0 items-center">
          <ClientLogoMark logo={logo} />
        </li>
      ))}
    </ul>
  );
}
