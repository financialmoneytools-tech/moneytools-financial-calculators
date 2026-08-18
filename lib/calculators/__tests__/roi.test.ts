import { describe, it, expect } from 'vitest';
import { calculateRoi } from '../roi';

describe('ROI Calculator', () => {
  it('basic ROI: invest $1000, get $1500', () => {
    const result = calculateRoi({ initialInvestment: 1000, finalValue: 1500 });
    expect(result.roi).toBe(50);
    expect(result.netProfit).toBe(500);
    expect(result.annualizedRoi).toBeNull();
  });

  it('annualized ROI: $10000 -> $15000 over 3 years', () => {
    const result = calculateRoi({ initialInvestment: 10000, finalValue: 15000, years: 3 });
    expect(result.roi).toBe(50);
    // (15000/10000)^(1/3) - 1 = 0.14471 = 14.47%
    expect(result.annualizedRoi).toBeCloseTo(14.47, 1);
  });

  it('negative ROI', () => {
    const result = calculateRoi({ initialInvestment: 1000, finalValue: 700 });
    expect(result.roi).toBe(-30);
    expect(result.netProfit).toBe(-300);
  });

  it('throws on zero investment', () => {
    expect(() => calculateRoi({ initialInvestment: 0, finalValue: 100 })).toThrow();
  });

  it('total loss annualized', () => {
    const result = calculateRoi({ initialInvestment: 1000, finalValue: 0, years: 2 });
    expect(result.annualizedRoi).toBe(-100);
  });
});
