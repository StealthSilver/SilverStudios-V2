/**
 * @file hero-time.ts
 * @description Shared time-of-day helpers for hero gradient SSR + client sync.
 */

/** Fractional hour in local time (0–23.99). */
export function getFractionalHour(date: Date = new Date()): number {
  return (
    date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600
  );
}
