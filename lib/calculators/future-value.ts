/**
 * Future Value Calculator Engine
 * FV = PV × (1+r)^n + PMT × [(1+r)^n - 1] / r × (1+r if beginning)
 */

export interface FutureValueInput {
  presentValue: number;
  annualRate: number;
  years: number;
  periodicPayment: number;
  paymentFrequency: number; // payments per year
  paymentTiming: 'end' | 'beginning';
}

export interface FutureValueYearData {
  year: number;
  balance: number;
  contributions: number;
  growth: number;
}

export interface FutureValueResult {
  futureValue: number;
  totalContributions: number;
  totalGrowth: number;
  yearlyData: FutureValueYearData[];
}

export function calculateFutureValue(input: FutureValueInput): FutureValueResult {
  const { presentValue, annualRate, years, periodicPayment, paymentFrequency, paymentTiming } = input;

  if (years < 0) throw new Error('Years must be non-negative');
  if (paymentFrequency <= 0) throw new Error('Payment frequency must be positive');

  const ratePerPeriod = annualRate / 100 / paymentFrequency;
  const yearlyData: FutureValueYearData[] = [];

  let balance = presentValue;
  let totalContributions = presentValue;

  for (let year = 1; year <= years; year++) {
    for (let p = 0; p < paymentFrequency; p++) {
      if (ratePerPeriod === 0) {
        balance += periodicPayment;
      } else {
        if (paymentTiming === 'beginning') {
          balance += periodicPayment;
          balance *= (1 + ratePerPeriod);
        } else {
          balance *= (1 + ratePerPeriod);
          balance += periodicPayment;
        }
      }
    }
    totalContributions += periodicPayment * paymentFrequency;
    yearlyData.push({
      year,
      balance,
      contributions: totalContributions,
      growth: balance - totalContributions,
    });
  }

  return {
    futureValue: balance,
    totalContributions,
    totalGrowth: balance - totalContributions,
    yearlyData,
  };
}
