/**
 * Precision utilities for financial calculations.
 * NEVER round intermediate values — only round final display values.
 */

export function roundToDecimalPlaces(n: number, places: number): number {
  const factor = Math.pow(10, places);
  return Math.round((n ?? 0) * factor) / factor;
}

export function roundCurrency(n: number): number {
  return roundToDecimalPlaces(n, 2);
}

export function roundPercent(n: number, places: number = 2): number {
  return roundToDecimalPlaces(n, places);
}
