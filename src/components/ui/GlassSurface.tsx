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

export interface GlassSurfaceProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  shadow?: boolean;
}

export function GlassSurface({
  as: Component = "div",
  className,
  children,
  shadow = true,
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
        "glass-surface relative isolate [&>*]:relative [&>*]:z-10",
        shadow && GLASS_SURFACE_SHADOW,
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
