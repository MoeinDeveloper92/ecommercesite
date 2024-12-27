//for formatting the curerncy we utlize a native JS library
export function formatCurrency(
  amount: number,
  currencyCode: string = 'GBP'
): string {
  try {
    return Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currencyCode.toUpperCase(),
    }).format(amount);
  } catch (error) {
    console.error('Invalid Currency');
    return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`;
  }
}
