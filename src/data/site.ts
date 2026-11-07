/**
 * Contact details. `null` means the company has not supplied the value yet: the site renders
 * it in the pending (TBD) register and never invents a real-looking stand-in (see PRODUCT.md).
 */
export const CONTACT_INFO: {
  email: string | null;
  phone: string | null;
  hours: string | null;
  serviceArea: string;
} = {
  email: null,
  phone: null,
  hours: null,
  serviceArea: "Texas and clients across the US",
};

/** Year shown in the footer, in US Central Time. */
export function currentYear(): number {
  return Number(
    new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", year: "numeric" }).format(new Date()),
  );
}
