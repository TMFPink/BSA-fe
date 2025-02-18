export function formatCurrency(value: number, custom?: boolean): string {
  if (custom) {
    if (value >= 1000000000) {
      return value / 1000000000 + 'M';
    } else if (value >= 1000000) {
      return value / 1000000 + 'M';
    } else if (value >= 1000) {
      return value / 1000 + 'K';
    }
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Format number with dots
}
