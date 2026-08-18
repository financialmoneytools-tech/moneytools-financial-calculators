/**
 * ROI Calculator Engine
 * ROI = (netProfit / costOfInvestment) × 100
 * Annualized ROI = ((1 + ROI/100)^(1/years) - 1) × 100
 */

export interface RoiInput {
  initialInvestment: number;
  finalValue: number;
  years?: number;
}

export interface RoiResult {
  roi: number;
  annualizedRoi: number | null;
  netProfit: number;
  totalReturn: number;
}

export function calculateRoi(input: RoiInput): RoiResult {
  const { initialInvestment, finalValue, years } = input;

  if (initialInvestment <= 0) throw new Error('Initial investment must be positive');

  const netProfit = finalValue - initialInvestment;
  const roi = (netProfit / initialInvestment) * 100;

  let annualizedRoi: number | null = null;
  if (years !== undefined && years > 0) {
    if (finalValue <= 0) {
      annualizedRoi = -100;
    } else {
      annualizedRoi = (Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100;
    }
  }

  return {
    roi,
    annualizedRoi,
    netProfit,
    totalReturn: finalValue,
  };
}
