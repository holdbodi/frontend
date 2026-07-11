export function formatNaira(amount: number | string): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  if (Number.isNaN(value)) return "₦0";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-NG").format(value);
}

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
