import { describe, it, expect } from 'vitest';
import { calculateCagr } from '../cagr';

describe('CAGR Calculator', () => {
  it('basic: $10000 -> $20000 over 5 years', () => {
    const result = calculateCagr({ startValue: 10000, endValue: 20000, years: 5 });
    // (20000/10000)^(1/5) - 1 = 14.87%
    expect(result.cagr).toBeCloseTo(14.87, 1);
    expect(result.absoluteGrowth).toBe(10000);
    expect(result.absoluteGrowthPercent).toBe(100);
  });

  it('no growth', () => {
    const result = calculateCagr({ startValue: 5000, endValue: 5000, years: 3 });
    expect(result.cagr).toBeCloseTo(0, 4);
  });

  it('decline', () => {
    const result = calculateCagr({ startValue: 10000, endValue: 5000, years: 2 });
    expect(result.cagr).toBeLessThan(0);
  });

  it('end value zero', () => {
    const result = calculateCagr({ startValue: 1000, endValue: 0, years: 5 });
    expect(result.cagr).toBe(-100);
  });

  it('throws on zero start value', () => {
    expect(() => calculateCagr({ startValue: 0, endValue: 1000, years: 5 })).toThrow();
  });

  it('throws on zero years', () => {
    expect(() => calculateCagr({ startValue: 1000, endValue: 2000, years: 0 })).toThrow();
  });
});
