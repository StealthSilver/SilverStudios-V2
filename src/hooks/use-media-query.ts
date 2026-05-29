/**
 * @file use-media-query.ts
 * @description Client hook for responsive breakpoints — reference hooks template.
 */

"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, onStoreChange: () => void): () => void {
  const media = window.matchMedia(query);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getSnapshot(query: string): boolean {
  return window.matchMedia(query).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => subscribe(query, onStoreChange),
    () => getSnapshot(query),
    getServerSnapshot,
  );
}
