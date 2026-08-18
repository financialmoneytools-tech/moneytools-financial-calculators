/**
 * Investment Calculator Engine
 * Growth with optional inflation adjustment
 */

export interface InvestmentInput {
  initialInvestment: number;
  monthlyContribution: number;
  annualReturn: number; // percentage
  years: number;
  inflationRate: number; // percentage
}

export interface InvestmentYearData {
  year: number;
  balance: number;
  totalInvested: number;
  growth: number;
  inflationAdjustedBalance: number;
}

export interface InvestmentResult {
  futureValue: number;
  totalInvested: number;
  totalGrowth: number;
  inflationAdjustedValue: number;
  yearlyData: InvestmentYearData[];
}

export function calculateInvestment(input: InvestmentInput): InvestmentResult {
  const { initialInvestment, monthlyContribution, annualReturn, years, inflationRate } = input;

  if (years < 0) throw new Error('Years must be non-negative');
  if (initialInvestment < 0) throw new Error('Initial investment must be non-negative');

  const monthlyRate = annualReturn / 100 / 12;
  const monthlyInflation = inflationRate / 100 / 12;
  const yearlyData: InvestmentYearData[] = [];

  let balance = initialInvestment;
  let inflationAdjusted = initialInvestment;
  let totalInvested = initialInvestment;

  for (let year = 1; year <= years; year++) {
    for (let month = 0; month < 12; month++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      inflationAdjusted = inflationAdjusted * (1 + monthlyRate - monthlyInflation) + monthlyContribution;
      totalInvested += monthlyContribution;
    }
    // More accurate inflation adjustment
    const realReturn = annualReturn === 0 && inflationRate === 0 ? 0 :
      ((1 + annualReturn / 100) / (1 + inflationRate / 100) - 1);
    const inflationFactor = Math.pow(1 + inflationRate / 100, year);
    const adjustedValue = balance / inflationFactor;

    yearlyData.push({
      year,
      balance,
      totalInvested,
      growth: balance - totalInvested,
      inflationAdjustedBalance: adjustedValue,
    });
  }

  const finalInflationFactor = Math.pow(1 + inflationRate / 100, years);

  return {
    futureValue: balance,
    totalInvested,
    totalGrowth: balance - totalInvested,
    inflationAdjustedValue: years === 0 ? initialInvestment : balance / finalInflationFactor,
    yearlyData,
  };
}
