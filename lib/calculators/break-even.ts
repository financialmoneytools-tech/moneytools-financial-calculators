/**
 * Break-Even Calculator Engine
 * Break-even units = Fixed Costs / (Price - Variable Cost per Unit)
 */

export interface BreakEvenInput {
  fixedCosts: number;
  variableCostPerUnit: number;
  pricePerUnit: number;
  targetProfit?: number;
}

export interface BreakEvenResult {
  breakEvenUnits: number;
  breakEvenRevenue: number;
  contributionMargin: number;
  contributionMarginRatio: number;
  unitsForTargetProfit: number | null;
  revenueForTargetProfit: number | null;
}

export function calculateBreakEven(input: BreakEvenInput): BreakEvenResult {
  const { fixedCosts, variableCostPerUnit, pricePerUnit, targetProfit } = input;

  if (pricePerUnit <= 0) throw new Error('Price per unit must be positive');
  if (fixedCosts < 0) throw new Error('Fixed costs must be non-negative');
  if (variableCostPerUnit < 0) throw new Error('Variable cost must be non-negative');

  const contributionMargin = pricePerUnit - variableCostPerUnit;
  if (contributionMargin <= 0) throw new Error('Price must exceed variable cost per unit');

  const contributionMarginRatio = (contributionMargin / pricePerUnit) * 100;
  const breakEvenUnits = fixedCosts / contributionMargin;
  const breakEvenRevenue = breakEvenUnits * pricePerUnit;

  let unitsForTargetProfit: number | null = null;
  let revenueForTargetProfit: number | null = null;
  if (targetProfit !== undefined && targetProfit > 0) {
    unitsForTargetProfit = (fixedCosts + targetProfit) / contributionMargin;
    revenueForTargetProfit = unitsForTargetProfit * pricePerUnit;
  }

  return {
    breakEvenUnits,
    breakEvenRevenue,
    contributionMargin,
    contributionMarginRatio,
    unitsForTargetProfit,
    revenueForTargetProfit,
  };
}
