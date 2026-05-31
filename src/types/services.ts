/**
 * @file services.ts
 * @description Types for the services showcase section.
 */

export interface ServiceItem {
  id: string;
  primary: string;
  secondary: string;
}

export interface ServicesContent {
  title: string;
  items: readonly ServiceItem[];
  seeAllLabel: string;
  seeAllHref: string;
}
