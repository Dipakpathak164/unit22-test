/**
 * Formats integer price in paise into INR currency string.
 * Example: 129900 -> "₹1,299", 129950 -> "₹1,299.50"
 */
export function formatPaise(paise: number | null | undefined): string {
  if (paise === null || paise === undefined || isNaN(paise)) {
    return '₹0';
  }
  const rupees = paise / 100;
  const hasDecimals = paise % 100 !== 0;

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(rupees);
}
