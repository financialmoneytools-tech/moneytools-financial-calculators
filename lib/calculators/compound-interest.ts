/**
 * Compound Interest Calculator Engine
 * Formula: A = P(1 + r/n)^(nt) + PMT × [(1 + r/n)^(nt) - 1] / (r/n)
 * For beginning-of-period: multiply contribution FV by (1 + r/n)
 */

export interface CompoundInterestInput {
  principal: number;
  annualRate: number; // as percentage, e.g. 5 for 5%
  years: number;
  compoundingFrequency: number; // 1, 2, 4, 12, 365
  monthlyContribution: number;
  contributionTiming: 'end' | 'beginning';
}

export interface YearlyBreakdown {
  year: number;
  balance: number;
  contributions: number;
  interest: number;
}

export interface CompoundInterestResult {
  finalAmount: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: YearlyBreakdown[];
}

export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestResult {
  const { principal, annualRate, years, compoundingFrequency, monthlyContribution, contributionTiming } = input;

  if (years < 0) throw new Error('Years must be non-negative');
  if (principal < 0) throw new Error('Principal must be non-negative');
  if (compoundingFrequency <= 0) throw new Error('Compounding frequency must be positive');

  const r = annualRate / 100;
  const n = compoundingFrequency;
  const periodsPerYear = n;
  // Convert monthly contribution to per-compounding-period contribution
  // monthlyContribution is per month, so annual contribution = monthlyContribution * 12
  // contribution per period = (monthlyContribution * 12) / n
  const contributionPerPeriod = (monthlyContribution * 12) / n;

  const yearlyBreakdown: YearlyBreakdown[] = [];
  let balance = principal;
  let totalContributions = principal;

  if (years === 0) {
    return {
      finalAmount: principal,
      totalContributions: principal,
      totalInterest: 0,
      yearlyBreakdown: [{ year: 0, balance: principal, contributions: principal, interest: 0 }],
    };
  }

  for (let year = 1; year <= years; year++) {
    const startBalance = balance;
    for (let period = 0; period < periodsPerYear; period++) {
      if (r === 0) {
        // Zero interest: just add contributions
        balance += contributionPerPeriod;
      } else {
        const ratePerPeriod = r / n;
        if (contributionTiming === 'beginning') {
          balance += contributionPerPeriod;
          balance *= (1 + ratePerPeriod);
        } else {
          balance *= (1 + ratePerPeriod);
          balance += contributionPerPeriod;
        }
      }
    }
    const yearContributions = contributionPerPeriod * periodsPerYear;
    totalContributions += yearContributions;
    const yearInterest = balance - startBalance - yearContributions;
    yearlyBreakdown.push({
      year,
      balance,
      contributions: totalContributions,
      interest: balance - totalContributions,
    });
  }

  return {
    finalAmount: balance,
    totalContributions,
    totalInterest: balance - totalContributions,
    yearlyBreakdown,
  };
}
