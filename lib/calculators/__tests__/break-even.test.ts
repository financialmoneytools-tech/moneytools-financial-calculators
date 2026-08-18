import { describe, it, expect } from 'vitest';
import { calculateBreakEven } from '../break-even';

describe('Break-Even Calculator', () => {
  it('basic: fixed=10000, var=20, price=50', () => {
    const result = calculateBreakEven({ fixedCosts: 10000, variableCostPerUnit: 20, pricePerUnit: 50 });
    expect(result.breakEvenUnits).toBeCloseTo(333.33, 1);
    expect(result.contributionMargin).toBe(30);
    expect(result.contributionMarginRatio).toBe(60);
    expect(result.breakEvenRevenue).toBeCloseTo(16666.67, 0);
  });

  it('with target profit', () => {
    const result = calculateBreakEven({ fixedCosts: 10000, variableCostPerUnit: 20, pricePerUnit: 50, targetProfit: 5000 });
    expect(result.unitsForTargetProfit).toBeCloseTo(500, 1);
  });

  it('throws when price <= variable cost', () => {
    expect(() => calculateBreakEven({ fixedCosts: 1000, variableCostPerUnit: 50, pricePerUnit: 50 })).toThrow();
  });

  it('zero fixed costs = zero break even', () => {
    const result = calculateBreakEven({ fixedCosts: 0, variableCostPerUnit: 10, pricePerUnit: 25 });
    expect(result.breakEvenUnits).toBe(0);
  });
});
