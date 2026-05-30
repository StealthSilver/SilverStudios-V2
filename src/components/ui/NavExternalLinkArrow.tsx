/**
 * @file NavExternalLinkArrow.tsx
 * @description Small arrow icon for external nav links on hover.
 */

export function NavExternalLinkArrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      fill="none"
      className="size-2.5 shrink-0"
    >
      <path
        d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
