import { describe, it, expect } from 'vitest';
import { calculateInvestment } from '../investment';

describe('Investment Calculator', () => {
  it('basic growth: $10000, $500/mo, 8%, 10yr', () => {
    const result = calculateInvestment({
      initialInvestment: 10000, monthlyContribution: 500,
      annualReturn: 8, years: 10, inflationRate: 0,
    });
    expect(result.futureValue).toBeGreaterThan(100000);
    expect(result.totalInvested).toBe(10000 + 500 * 12 * 10);
    expect(result.totalGrowth).toBeGreaterThan(0);
    expect(result.yearlyData).toHaveLength(10);
  });

  it('inflation adjustment reduces real value', () => {
    const result = calculateInvestment({
      initialInvestment: 10000, monthlyContribution: 0,
      annualReturn: 5, years: 10, inflationRate: 3,
    });
    expect(result.inflationAdjustedValue).toBeLessThan(result.futureValue);
    expect(result.inflationAdjustedValue).toBeGreaterThan(10000);
  });

  it('zero return with zero inflation', () => {
    const result = calculateInvestment({
      initialInvestment: 5000, monthlyContribution: 100,
      annualReturn: 0, years: 5, inflationRate: 0,
    });
    expect(result.futureValue).toBeCloseTo(5000 + 100 * 60, 0);
    expect(result.totalGrowth).toBeCloseTo(0, 0);
  });

  it('throws on negative years', () => {
    expect(() => calculateInvestment({
      initialInvestment: 1000, monthlyContribution: 0,
      annualReturn: 5, years: -1, inflationRate: 0,
    })).toThrow();
  });
});
