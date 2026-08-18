import { describe, it, expect } from 'vitest';
import { calculateSimpleInterest } from '../simple-interest';

describe('Simple Interest Calculator', () => {
  it('basic: P=10000, r=5%, t=3yr', () => {
    const result = calculateSimpleInterest({ principal: 10000, annualRate: 5, years: 3 });
    expect(result.totalInterest).toBe(1500);
    expect(result.totalAmount).toBe(11500);
    expect(result.yearlyBreakdown).toHaveLength(3);
    expect(result.yearlyBreakdown[0].interest).toBeCloseTo(500, 2);
  });

  it('zero rate', () => {
    const result = calculateSimpleInterest({ principal: 5000, annualRate: 0, years: 10 });
    expect(result.totalInterest).toBe(0);
    expect(result.totalAmount).toBe(5000);
  });

  it('zero principal', () => {
    const result = calculateSimpleInterest({ principal: 0, annualRate: 5, years: 5 });
    expect(result.totalAmount).toBe(0);
  });

  it('throws on negative principal', () => {
    expect(() => calculateSimpleInterest({ principal: -100, annualRate: 5, years: 5 })).toThrow();
  });
});
