/**
 * CAGR Calculator Engine
 * CAGR = (endValue/startValue)^(1/years) - 1
 */

export interface CagrInput {
  startValue: number;
  endValue: number;
  years: number;
}

export interface CagrResult {
  cagr: number; // as percentage
  absoluteGrowth: number;
  absoluteGrowthPercent: number;
}

export function calculateCagr(input: CagrInput): CagrResult {
  const { startValue, endValue, years } = input;

  if (startValue <= 0) throw new Error('Start value must be positive');
  if (years <= 0) throw new Error('Years must be positive');
  if (endValue < 0) throw new Error('End value must be non-negative');

  const absoluteGrowth = endValue - startValue;
  const absoluteGrowthPercent = (absoluteGrowth / startValue) * 100;

  let cagr: number;
  if (endValue === 0) {
    cagr = -100;
  } else {
    cagr = (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
  }

  return {
    cagr,
    absoluteGrowth,
    absoluteGrowthPercent,
  };
}
