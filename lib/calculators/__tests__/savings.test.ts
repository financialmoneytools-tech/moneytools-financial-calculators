import { describe, it, expect } from 'vitest';
import { calculateSavings } from '../savings';

describe('Savings Calculator', () => {
  it('basic: $1000 initial, $200/mo, 5%, 10yr', () => {
    const result = calculateSavings({ initialDeposit: 1000, monthlyContribution: 200, annualRate: 5, years: 10 });
    expect(result.totalDeposited).toBe(1000 + 200 * 120);
    expect(result.finalBalance).toBeGreaterThan(result.totalDeposited);
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.yearlyBreakdown).toHaveLength(10);
  });

  it('zero rate: linear growth', () => {
    const result = calculateSavings({ initialDeposit: 500, monthlyContribution: 100, annualRate: 0, years: 5 });
    expect(result.finalBalance).toBeCloseTo(500 + 100 * 60, 2);
    expect(result.totalInterest).toBeCloseTo(0, 2);
  });

  it('no contributions', () => {
    const result = calculateSavings({ initialDeposit: 10000, monthlyContribution: 0, annualRate: 4, years: 5 });
    expect(result.totalDeposited).toBe(10000);
    expect(result.finalBalance).toBeGreaterThan(10000);
  });
});
