import { describe, it, expect } from 'vitest';
import { calculatePersonalLoan } from '../personal-loan';

describe('Personal Loan Calculator', () => {
  it('basic: $15000, 8%, 36mo, 0% fee', () => {
    const result = calculatePersonalLoan({ loanAmount: 15000, annualRate: 8, termMonths: 36, originationFee: 0 });
    expect(result.monthlyPayment).toBeCloseTo(470.05, 0);
    expect(result.effectiveAPR).toBeCloseTo(8, 0);
  });

  it('with origination fee increases effective APR', () => {
    const result = calculatePersonalLoan({ loanAmount: 15000, annualRate: 8, termMonths: 36, originationFee: 3 });
    expect(result.originationFeeAmount).toBeCloseTo(450, 2);
    expect(result.effectiveAPR).toBeGreaterThan(8);
  });

  it('zero interest', () => {
    const result = calculatePersonalLoan({ loanAmount: 6000, annualRate: 0, termMonths: 12, originationFee: 0 });
    expect(result.monthlyPayment).toBeCloseTo(500, 2);
  });

  it('final balance is zero', () => {
    const result = calculatePersonalLoan({ loanAmount: 10000, annualRate: 10, termMonths: 24, originationFee: 2 });
    const last = result.amortizationSchedule[result.amortizationSchedule.length - 1];
    expect(last.balance).toBeCloseTo(0, 2);
  });
});
