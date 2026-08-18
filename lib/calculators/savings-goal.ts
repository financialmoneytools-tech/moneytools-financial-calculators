/**
 * Savings Goal Calculator Engine
 * Solve for required monthly contribution: PMT = (FV - PV(1+r)^n) × r / [(1+r)^n - 1]
 */

export interface SavingsGoalInput {
  goalAmount: number;
  currentSavings: number;
  annualRate: number;
  years: number;
}

export interface SavingsGoalResult {
  requiredMonthlySavings: number;
  totalContributions: number;
  totalInterest: number;
  monthsToGoal: number;
}

export function calculateSavingsGoal(input: SavingsGoalInput): SavingsGoalResult {
  const { goalAmount, currentSavings, annualRate, years } = input;

  if (goalAmount <= 0) throw new Error('Goal amount must be positive');
  if (years <= 0) throw new Error('Years must be positive');
  if (currentSavings < 0) throw new Error('Current savings must be non-negative');

  const r = annualRate / 100 / 12;
  const n = years * 12;

  let requiredMonthlySavings: number;

  if (r === 0) {
    requiredMonthlySavings = (goalAmount - currentSavings) / n;
  } else {
    const fvCurrent = currentSavings * Math.pow(1 + r, n);
    const remaining = goalAmount - fvCurrent;
    if (remaining <= 0) {
      requiredMonthlySavings = 0;
    } else {
      requiredMonthlySavings = remaining * r / (Math.pow(1 + r, n) - 1);
    }
  }

  requiredMonthlySavings = Math.max(0, requiredMonthlySavings);
  const totalContributions = currentSavings + requiredMonthlySavings * n;
  const totalInterest = goalAmount - totalContributions;

  return {
    requiredMonthlySavings,
    totalContributions,
    totalInterest: Math.max(0, totalInterest),
    monthsToGoal: n,
  };
}
