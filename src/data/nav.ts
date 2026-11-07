export interface NavItem {
  label: string;
  href: string;
}

/** Header links. The site is one page for now, so they point at its sections. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Approach", href: "/#approach" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];
