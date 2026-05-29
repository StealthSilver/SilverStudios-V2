/**
 * @file Button.tsx
 * @description Composable button primitive — reference UI component template.
 */

import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-background hover:opacity-90 focus-visible:ring-foreground/30",
  secondary:
    "border border-foreground/15 bg-transparent text-foreground hover:bg-foreground/5 focus-visible:ring-foreground/20",
  ghost:
    "bg-transparent text-foreground hover:bg-foreground/5 focus-visible:ring-foreground/15",
};

const BASE_STYLES =
  "inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const DEFAULT_VARIANT: ButtonVariant = "primary";

/** Shared class string for links or other elements styled as buttons. */
export function buttonVariants(variant: ButtonVariant = DEFAULT_VARIANT): string {
  return cn(BASE_STYLES, VARIANT_STYLES[variant]);
}

export function Button({
  className,
  variant = DEFAULT_VARIANT,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants(variant), className)}
      {...rest}
    />
  );
}
