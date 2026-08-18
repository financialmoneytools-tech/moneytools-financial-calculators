import { describe, it, expect } from 'vitest';
import { calculateCompoundInterest } from '../compound-interest';

describe('Compound Interest Calculator', () => {
  it('standard case: P=10000, r=5%, n=12, t=10yr, PMT=0', () => {
    const result = calculateCompoundInterest({
      principal: 10000, annualRate: 5, years: 10,
      compoundingFrequency: 12, monthlyContribution: 0, contributionTiming: 'end',
    });
    // A = 10000 * (1 + 0.05/12)^(12*10) = 16470.09
    expect(result.finalAmount).toBeCloseTo(16470.09, 1);
    expect(result.totalContributions).toBe(10000);
    expect(result.totalInterest).toBeCloseTo(6470.09, 1);
    expect(result.yearlyBreakdown).toHaveLength(10);
  });

  it('with monthly contributions: P=5000, r=7%, n=12, t=20yr, PMT=200', () => {
    const result = calculateCompoundInterest({
      principal: 5000, annualRate: 7, years: 20,
      compoundingFrequency: 12, monthlyContribution: 200, contributionTiming: 'end',
    });
    // FV_principal = 5000*(1+0.07/12)^240 = ~20321.37
    // FV_annuity = 200 * [(1+0.07/12)^240 - 1] / (0.07/12) = ~104185.57
    // Total ~ 124506.94
    expect(result.finalAmount).toBeCloseTo(124379.03, -1); // within $10
    expect(result.totalContributions).toBe(5000 + 200 * 12 * 20);
  });

  it('zero interest rate', () => {
    const result = calculateCompoundInterest({
      principal: 10000, annualRate: 0, years: 5,
      compoundingFrequency: 12, monthlyContribution: 100, contributionTiming: 'end',
    });
    expect(result.finalAmount).toBeCloseTo(10000 + 100 * 12 * 5, 2);
    expect(result.totalInterest).toBeCloseTo(0, 2);
  });

  it('zero years returns principal', () => {
    const result = calculateCompoundInterest({
      principal: 5000, annualRate: 10, years: 0,
      compoundingFrequency: 12, monthlyContribution: 500, contributionTiming: 'end',
    });
    expect(result.finalAmount).toBe(5000);
    expect(result.totalInterest).toBe(0);
  });

  it('beginning-of-period contributions yield more', () => {
    const end = calculateCompoundInterest({
      principal: 0, annualRate: 6, years: 10,
      compoundingFrequency: 12, monthlyContribution: 100, contributionTiming: 'end',
    });
    const beg = calculateCompoundInterest({
      principal: 0, annualRate: 6, years: 10,
      compoundingFrequency: 12, monthlyContribution: 100, contributionTiming: 'beginning',
    });
    expect(beg.finalAmount).toBeGreaterThan(end.finalAmount);
  });

  it('annual compounding: P=1000, r=10%, t=3yr', () => {
    const result = calculateCompoundInterest({
      principal: 1000, annualRate: 10, years: 3,
      compoundingFrequency: 1, monthlyContribution: 0, contributionTiming: 'end',
    });
    // 1000 * 1.1^3 = 1331
    expect(result.finalAmount).toBeCloseTo(1331, 2);
  });

  it('throws on negative years', () => {
    expect(() => calculateCompoundInterest({
      principal: 1000, annualRate: 5, years: -1,
      compoundingFrequency: 12, monthlyContribution: 0, contributionTiming: 'end',
    })).toThrow();
  });

  it('large values: P=$1M, 50yr', () => {
    const result = calculateCompoundInterest({
      principal: 1000000, annualRate: 8, years: 50,
      compoundingFrequency: 12, monthlyContribution: 0, contributionTiming: 'end',
    });
    expect(result.finalAmount).toBeGreaterThan(40000000);
    expect(result.yearlyBreakdown).toHaveLength(50);
  });
});
