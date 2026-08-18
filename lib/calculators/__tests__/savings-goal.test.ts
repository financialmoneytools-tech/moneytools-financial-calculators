import { describe, it, expect } from 'vitest';
import { calculateSavingsGoal } from '../savings-goal';

describe('Savings Goal Calculator', () => {
  it('basic: $50000 goal, $5000 saved, 5%, 10yr', () => {
    const result = calculateSavingsGoal({ goalAmount: 50000, currentSavings: 5000, annualRate: 5, years: 10 });
    expect(result.requiredMonthlySavings).toBeGreaterThan(0);
    expect(result.requiredMonthlySavings).toBeLessThan(500);
    expect(result.monthsToGoal).toBe(120);
  });

  it('zero rate', () => {
    const result = calculateSavingsGoal({ goalAmount: 12000, currentSavings: 0, annualRate: 0, years: 1 });
    expect(result.requiredMonthlySavings).toBeCloseTo(1000, 2);
  });

  it('already achieved goal', () => {
    const result = calculateSavingsGoal({ goalAmount: 1000, currentSavings: 5000, annualRate: 5, years: 5 });
    expect(result.requiredMonthlySavings).toBe(0);
  });

  it('throws on invalid inputs', () => {
    expect(() => calculateSavingsGoal({ goalAmount: 0, currentSavings: 0, annualRate: 0, years: 1 })).toThrow();
    expect(() => calculateSavingsGoal({ goalAmount: 1000, currentSavings: 0, annualRate: 0, years: 0 })).toThrow();
  });
});
