/**
 * APY Calculator Engine
 * APY = (1 + APR/n)^n - 1
 * Reverse: APR = n × ((1 + APY)^(1/n) - 1)
 */

export interface ApyInput {
  apr: number; // percentage
  compoundingFrequency: number;
}

export interface ApyComparisonRow {
  frequency: string;
  frequencyValue: number;
  apy: number;
}

export interface ApyResult {
  apy: number;
  comparisonTable: ApyComparisonRow[];
}

export interface ApyReverseInput {
  apy: number; // percentage
  compoundingFrequency: number;
}

export interface ApyReverseResult {
  apr: number;
}

export function calculateApy(input: ApyInput): ApyResult {
  const { apr, compoundingFrequency } = input;

  if (compoundingFrequency <= 0) throw new Error('Compounding frequency must be positive');

  const rate = apr / 100;
  const apy = (Math.pow(1 + rate / compoundingFrequency, compoundingFrequency) - 1) * 100;

  const frequencies = [
    { frequency: 'Annually', frequencyValue: 1 },
    { frequency: 'Semi-Annually', frequencyValue: 2 },
    { frequency: 'Quarterly', frequencyValue: 4 },
    { frequency: 'Monthly', frequencyValue: 12 },
    { frequency: 'Daily', frequencyValue: 365 },
  ];

  const comparisonTable: ApyComparisonRow[] = frequencies.map((f) => ({
    ...f,
    apy: (Math.pow(1 + rate / f.frequencyValue, f.frequencyValue) - 1) * 100,
  }));

  return { apy, comparisonTable };
}

export function calculateAprFromApy(input: ApyReverseInput): ApyReverseResult {
  const { apy, compoundingFrequency } = input;

  if (compoundingFrequency <= 0) throw new Error('Compounding frequency must be positive');

  const apyDecimal = apy / 100;
  const apr = compoundingFrequency * (Math.pow(1 + apyDecimal, 1 / compoundingFrequency) - 1) * 100;

  return { apr };
}
