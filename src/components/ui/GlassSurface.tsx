/**
 * @file GlassSurface.tsx
 * @description Frosted glass panel with a cursor-local silver border highlight on hover.
 */

"use client";

import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  useCallback,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

export const GLASS_SURFACE_SHADOW =
  "shadow-[0_4px_24px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.45)]";

export const GLASS_SURFACE_NAV_SHADOW =
  "shadow-[0_8px_40px_rgba(0,0,0,0.14),inset_0_1px_0_0_rgba(255,255,255,0.55),inset_0_-1px_0_0_rgba(255,255,255,0.12)]";

/** Tailwind utilities — backdrop-* in @layer CSS is stripped by Tailwind v4. */
export const GLASS_SURFACE_FROST =
  "border border-white/[0.08] bg-white/[0.18] backdrop-blur-[40px] backdrop-saturate-150";

export const GLASS_SURFACE_NAV_FROST =
  "border border-white/45 bg-white/35 backdrop-blur-[80px] backdrop-saturate-[180%] [transform:translateZ(0)]";

/** Footer navbar + social chips — dark fill, subtle border, top inset highlight via {@link GLASS_SURFACE_SHADOW}. */
export const GLASS_SURFACE_FOOTER_FROST =
  "border border-white/[0.08] bg-neutral-900/60 backdrop-blur-[80px] backdrop-saturate-[140%] [transform:translateZ(0)]";

export type GlassSurfaceVariant = "default" | "nav" | "footer";

export interface GlassSurfaceProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  shadow?: boolean;
  variant?: GlassSurfaceVariant;
  /** Darker frosted fill for the nav bar over the site footer. */
  navOverFooter?: boolean;
}

export function GlassSurface({
  as: Component = "div",
  className,
  children,
  shadow = true,
  variant = "default",
  navOverFooter = false,
  style,
  onMouseMove,
  onMouseLeave,
  ...rest
}: GlassSurfaceProps) {
  const ref = useRef<HTMLElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      setSpotlight({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      });
      onMouseMove?.(event);
    },
    [onMouseMove],
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setSpotlight((prev) => ({ ...prev, active: false }));
      onMouseLeave?.(event);
    },
    [onMouseLeave],
  );

  const spotlightStyle = {
    ...style,
    "--spotlight-x": `${spotlight.x}px`,
    "--spotlight-y": `${spotlight.y}px`,
    "--spotlight-opacity": spotlight.active ? 1 : 0,
  } as CSSProperties;

  return (
    <Component
      ref={ref}
      className={cn(
        "glass-surface relative [&>*]:relative [&>*]:z-10",
        variant === "nav" ? "glass-surface-nav" : "isolate",
        variant === "footer" || (variant === "nav" && navOverFooter)
          ? GLASS_SURFACE_FOOTER_FROST
          : variant === "nav"
            ? GLASS_SURFACE_NAV_FROST
            : GLASS_SURFACE_FROST,
        shadow &&
          (variant === "footer" || (variant === "nav" && navOverFooter)
            ? GLASS_SURFACE_SHADOW
            : variant === "nav"
              ? GLASS_SURFACE_NAV_SHADOW
              : GLASS_SURFACE_SHADOW),
        className,
      )}
      style={spotlightStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </Component>
  );
}
