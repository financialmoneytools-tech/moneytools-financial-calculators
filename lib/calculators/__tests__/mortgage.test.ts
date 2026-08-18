import { describe, it, expect } from 'vitest';
import { calculateMortgage } from '../mortgage';

describe('Mortgage Calculator', () => {
  it('basic: $300k home, 20% down, 6%, 30yr', () => {
    const result = calculateMortgage({
      homePrice: 300000, downPaymentPercent: 20, annualRate: 6,
      termYears: 30, propertyTaxAnnual: 3600, homeInsuranceAnnual: 1200, pmiMonthly: 0,
    });
    expect(result.loanAmount).toBe(240000);
    expect(result.downPaymentAmount).toBe(60000);
    expect(result.monthlyPrincipalInterest).toBeCloseTo(1438.92, 0);
    expect(result.totalMonthlyPayment).toBeCloseTo(1438.92 + 300 + 100, 0);
  });

  it('PMI applies when down < 20%', () => {
    const result = calculateMortgage({
      homePrice: 200000, downPaymentPercent: 10, annualRate: 5,
      termYears: 30, propertyTaxAnnual: 2400, homeInsuranceAnnual: 1200, pmiMonthly: 100,
    });
    expect(result.monthlyPmi).toBe(100);
    expect(result.totalMonthlyPayment).toBeGreaterThan(result.monthlyPrincipalInterest);
  });

  it('no PMI when 20% or more down', () => {
    const result = calculateMortgage({
      homePrice: 200000, downPaymentPercent: 25, annualRate: 5,
      termYears: 30, propertyTaxAnnual: 0, homeInsuranceAnnual: 0, pmiMonthly: 100,
    });
    expect(result.monthlyPmi).toBe(0);
  });

  it('final balance is zero', () => {
    const result = calculateMortgage({
      homePrice: 200000, downPaymentPercent: 20, annualRate: 4,
      termYears: 30, propertyTaxAnnual: 0, homeInsuranceAnnual: 0, pmiMonthly: 0,
    });
    const last = result.amortizationSchedule[result.amortizationSchedule.length - 1];
    expect(last.balance).toBeCloseTo(0, 2);
  });

  it('throws on invalid home price', () => {
    expect(() => calculateMortgage({
      homePrice: 0, downPaymentPercent: 20, annualRate: 4,
      termYears: 30, propertyTaxAnnual: 0, homeInsuranceAnnual: 0, pmiMonthly: 0,
    })).toThrow();
  });
});
