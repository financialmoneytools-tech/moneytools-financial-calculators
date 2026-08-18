/**
 * Savings Calculator Engine
 * FV = PV(1+r)^n + PMT × [(1+r)^n - 1] / r
 */

export interface SavingsInput {
  initialDeposit: number;
  monthlyContribution: number;
  annualRate: number;
  years: number;
}

export interface SavingsYearlyBreakdown {
  year: number;
  balance: number;
  totalDeposited: number;
  totalInterest: number;
}

export interface SavingsResult {
  finalBalance: number;
  totalDeposited: number;
  totalInterest: number;
  yearlyBreakdown: SavingsYearlyBreakdown[];
}

export function calculateSavings(input: SavingsInput): SavingsResult {
  const { initialDeposit, monthlyContribution, annualRate, years } = input;

  if (initialDeposit < 0) throw new Error('Initial deposit must be non-negative');
  if (years < 0) throw new Error('Years must be non-negative');

  const monthlyRate = annualRate / 100 / 12;
  const yearlyBreakdown: SavingsYearlyBreakdown[] = [];

  let balance = initialDeposit;
  let totalDeposited = initialDeposit;

  for (let year = 1; year <= years; year++) {
    for (let month = 0; month < 12; month++) {
      if (monthlyRate === 0) {
        balance += monthlyContribution;
      } else {
        balance = balance * (1 + monthlyRate) + monthlyContribution;
      }
      totalDeposited += monthlyContribution;
    }
    yearlyBreakdown.push({
      year,
      balance,
      totalDeposited,
      totalInterest: balance - totalDeposited,
    });
  }

  return {
    finalBalance: balance,
    totalDeposited,
    totalInterest: balance - totalDeposited,
    yearlyBreakdown,
  };
}
