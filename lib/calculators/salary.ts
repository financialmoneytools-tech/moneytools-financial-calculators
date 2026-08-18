/**
 * Salary Calculator Engine
 * Convert between pay periods. Gross (pre-tax) only.
 */

export type PayPeriod = 'hourly' | 'daily' | 'weekly' | 'biWeekly' | 'semiMonthly' | 'monthly' | 'annual';

export interface SalaryInput {
  amount: number;
  fromPeriod: PayPeriod;
  hoursPerWeek: number;
  weeksPerYear: number;
}

export interface SalaryResult {
  hourly: number;
  daily: number;
  weekly: number;
  biWeekly: number;
  semiMonthly: number;
  monthly: number;
  annual: number;
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const { amount, fromPeriod, hoursPerWeek, weeksPerYear } = input;

  if (amount <= 0) throw new Error('Amount must be positive');
  if (hoursPerWeek <= 0) throw new Error('Hours per week must be positive');
  if (weeksPerYear <= 0) throw new Error('Weeks per year must be positive');

  const hoursPerYear = hoursPerWeek * weeksPerYear;
  const workDaysPerWeek = hoursPerWeek / 8; // assuming 8hr days

  // First convert to annual
  let annual: number;
  switch (fromPeriod) {
    case 'hourly':
      annual = amount * hoursPerYear;
      break;
    case 'daily':
      annual = amount * workDaysPerWeek * weeksPerYear;
      break;
    case 'weekly':
      annual = amount * weeksPerYear;
      break;
    case 'biWeekly':
      annual = amount * (weeksPerYear / 2);
      break;
    case 'semiMonthly':
      annual = amount * 24; // 2 per month
      break;
    case 'monthly':
      annual = amount * 12;
      break;
    case 'annual':
      annual = amount;
      break;
    default:
      throw new Error('Invalid pay period');
  }

  return {
    hourly: annual / hoursPerYear,
    daily: annual / (workDaysPerWeek * weeksPerYear),
    weekly: annual / weeksPerYear,
    biWeekly: annual / (weeksPerYear / 2),
    semiMonthly: annual / 24,
    monthly: annual / 12,
    annual,
  };
}
