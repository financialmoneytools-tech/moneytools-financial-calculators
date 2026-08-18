import { describe, it, expect } from 'vitest';
import { calculateMortgageAmortization } from '../mortgage-amortization';

describe('Mortgage Amortization Calculator', () => {
  it('without extra payments: $200k, 4%, 30yr', () => {
    const result = calculateMortgageAmortization({
      loanAmount: 200000, annualRate: 4, termYears: 30, extraMonthlyPayment: 0,
    });
    expect(result.regularMonthlyPayment).toBeCloseTo(954.83, 1);
    expect(result.payoffMonths).toBe(360);
    expect(result.monthsSaved).toBe(0);
    expect(result.interestSaved).toBeCloseTo(0, 0);
  });

  it('extra payments save time and interest', () => {
    const result = calculateMortgageAmortization({
      loanAmount: 200000, annualRate: 4, termYears: 30, extraMonthlyPayment: 200,
    });
    expect(result.payoffMonths).toBeLessThan(360);
    expect(result.monthsSaved).toBeGreaterThan(0);
    expect(result.interestSaved).toBeGreaterThan(0);
  });

  it('final balance is zero', () => {
    const result = calculateMortgageAmortization({
      loanAmount: 100000, annualRate: 5, termYears: 15, extraMonthlyPayment: 50,
    });
    const last = result.fullSchedule[result.fullSchedule.length - 1];
    expect(last.balance).toBeCloseTo(0, 2);
  });

  it('sum of interest matches totalInterest', () => {
    const result = calculateMortgageAmortization({
      loanAmount: 150000, annualRate: 3.5, termYears: 30, extraMonthlyPayment: 0,
    });
    const sumInterest = result.fullSchedule.reduce((s, r) => s + r.interest, 0);
    expect(sumInterest).toBeCloseTo(result.totalInterest, 0);
  });
});
