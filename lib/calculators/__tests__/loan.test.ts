import { describe, it, expect } from 'vitest';
import { calculateLoan } from '../loan';

describe('Loan Calculator', () => {
  it('standard: $200000, 4%, 30yr', () => {
    const result = calculateLoan({ loanAmount: 200000, annualRate: 4, termYears: 30 });
    expect(result.monthlyPayment).toBeCloseTo(954.83, 1);
    // Verify first amortization row
    const row1 = result.amortizationSchedule[0];
    expect(row1.interest).toBeCloseTo(666.67, 1);
    expect(row1.principal).toBeCloseTo(288.16, 0);
    // Verify final balance is 0
    const lastRow = result.amortizationSchedule[result.amortizationSchedule.length - 1];
    expect(lastRow.balance).toBeCloseTo(0, 2);
  });

  it('total interest = totalPayment - loanAmount', () => {
    const result = calculateLoan({ loanAmount: 100000, annualRate: 5, termYears: 15 });
    expect(result.totalInterest).toBeCloseTo(result.totalPayment - 100000, 1);
  });

  it('amortization sum of interest matches total', () => {
    const result = calculateLoan({ loanAmount: 50000, annualRate: 6, termYears: 5 });
    const sumInterest = result.amortizationSchedule.reduce((s, r) => s + r.interest, 0);
    expect(sumInterest).toBeCloseTo(result.totalInterest, 1);
  });

  it('zero interest rate', () => {
    const result = calculateLoan({ loanAmount: 12000, annualRate: 0, termYears: 1 });
    expect(result.monthlyPayment).toBeCloseTo(1000, 2);
    expect(result.totalInterest).toBeCloseTo(0, 2);
  });

  it('throws on zero amount', () => {
    expect(() => calculateLoan({ loanAmount: 0, annualRate: 5, termYears: 5 })).toThrow();
  });

  it('large loan: $1M, 30yr', () => {
    const result = calculateLoan({ loanAmount: 1000000, annualRate: 6.5, termYears: 30 });
    expect(result.monthlyPayment).toBeCloseTo(6320.68, 0);
    expect(result.amortizationSchedule).toHaveLength(360);
  });
});
