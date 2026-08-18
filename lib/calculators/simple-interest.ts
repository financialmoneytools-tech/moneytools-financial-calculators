/**
 * Simple Interest Calculator Engine
 * A = P(1 + rt)
 * Interest = P × r × t
 */

export interface SimpleInterestInput {
  principal: number;
  annualRate: number; // percentage
  years: number;
}

export interface SimpleInterestYearlyBreakdown {
  year: number;
  balance: number;
  interest: number;
}

export interface SimpleInterestResult {
  totalAmount: number;
  totalInterest: number;
  yearlyBreakdown: SimpleInterestYearlyBreakdown[];
}

export function calculateSimpleInterest(input: SimpleInterestInput): SimpleInterestResult {
  const { principal, annualRate, years } = input;

  if (principal < 0) throw new Error('Principal must be non-negative');
  if (years < 0) throw new Error('Years must be non-negative');

  const r = annualRate / 100;
  const totalInterest = principal * r * years;
  const totalAmount = principal + totalInterest;

  const yearlyBreakdown: SimpleInterestYearlyBreakdown[] = [];
  for (let year = 1; year <= years; year++) {
    const interest = principal * r * year;
    yearlyBreakdown.push({
      year,
      balance: principal + interest,
      interest,
    });
  }

  return { totalAmount, totalInterest, yearlyBreakdown };
}
