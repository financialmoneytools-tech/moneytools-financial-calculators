/**
 * ROAS Calculator Engine
 * ROAS = Revenue / Ad Spend
 */

export interface RoasInput {
  adSpend: number;
  revenue: number;
  grossMarginPercent: number;
}

export interface RoasResult {
  roas: number;
  breakEvenRoas: number;
  profit: number;
  roi: number;
  costPerDollarRevenue: number;
}

export function calculateRoas(input: RoasInput): RoasResult {
  const { adSpend, revenue, grossMarginPercent } = input;

  if (adSpend <= 0) throw new Error('Ad spend must be positive');
  if (grossMarginPercent <= 0 || grossMarginPercent > 100) throw new Error('Gross margin must be between 0 and 100');

  const roas = revenue / adSpend;
  const breakEvenRoas = 1 / (grossMarginPercent / 100);
  const grossProfit = revenue * (grossMarginPercent / 100);
  const profit = grossProfit - adSpend;
  const roi = (profit / adSpend) * 100;
  const costPerDollarRevenue = adSpend / (revenue || 1);

  return {
    roas,
    breakEvenRoas,
    profit,
    roi,
    costPerDollarRevenue,
  };
}
