/**
 * @file smooth-scroll.ts
 * @description Same-page hash scrolling with reduced-motion support.
 */

export function prefersReducedScrollMotion(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getSmoothScrollBehavior(): ScrollBehavior {
  return prefersReducedScrollMotion() ? "auto" : "smooth";
}

export function scrollToElement(element: HTMLElement): void {
  element.scrollIntoView({
    behavior: getSmoothScrollBehavior(),
    block: "start",
  });
}

/** Returns true when the element was scrolled into view. */
export function scrollToHash(hash: string): boolean {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  const id = decodeURIComponent(raw).trim();

  if (!id) {
    return false;
  }

  const target = document.getElementById(id);

  if (!target) {
    return false;
  }

  scrollToElement(target);
  return true;
}

/** Resolves in-page hash links (`#section` or `/#section`). */
export function parseSamePageHash(href: string): string | null {
  if (!href) {
    return null;
  }

  if (href.startsWith("#")) {
    return href === "#" ? null : href;
  }

  try {
    const url = new URL(href, window.location.href);

    if (url.origin !== window.location.origin) {
      return null;
    }

    const pathMatch =
      url.pathname === window.location.pathname ||
      (url.pathname === "/" && window.location.pathname === "/");

    if (!pathMatch || !url.hash || url.hash === "#") {
      return null;
    }

    return url.hash;
  } catch {
    return null;
  }
}
