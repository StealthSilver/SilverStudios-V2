/**
 * @file HeroScrollTrap.tsx
 * @description 200vh scroll trap — pins the hero while scroll progress drives the glow.
 */

"use client";

import { createContext, useRef, type ReactNode, type RefObject } from "react";

// ——— Context ———

export const HeroScrollTrapContext =
  createContext<RefObject<HTMLDivElement | null> | null>(null);

// ——— Types ———

interface HeroScrollTrapProps {
  children: ReactNode;
}

// ——— Component ———

export function HeroScrollTrap({ children }: HeroScrollTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <HeroScrollTrapContext.Provider value={containerRef}>
      <div ref={containerRef} className="h-[200vh]">
        {children}
      </div>
    </HeroScrollTrapContext.Provider>
  );
}
