/**
 * Profit Margin Calculator Engine
 */

export interface ProfitMarginInput {
  revenue: number;
  cogs: number;
  operatingExpenses: number;
  otherExpenses: number;
}

export interface ProfitMarginResult {
  grossProfit: number;
  grossMargin: number;
  operatingProfit: number;
  operatingMargin: number;
  netProfit: number;
  netMargin: number;
}

export function calculateProfitMargin(input: ProfitMarginInput): ProfitMarginResult {
  const { revenue, cogs, operatingExpenses, otherExpenses } = input;

  if (revenue <= 0) throw new Error('Revenue must be positive');

  const grossProfit = revenue - cogs;
  const grossMargin = (grossProfit / revenue) * 100;

  const operatingProfit = grossProfit - operatingExpenses;
  const operatingMargin = (operatingProfit / revenue) * 100;

  const netProfit = operatingProfit - otherExpenses;
  const netMargin = (netProfit / revenue) * 100;

  return {
    grossProfit,
    grossMargin,
    operatingProfit,
    operatingMargin,
    netProfit,
    netMargin,
  };
}
