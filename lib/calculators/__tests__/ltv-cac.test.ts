import { describe, it, expect } from 'vitest';
import { calculateLtvCac } from '../ltv-cac';

describe('LTV:CAC Calculator', () => {
  it('healthy ratio', () => {
    const result = calculateLtvCac({
      averageOrderValue: 100, purchaseFrequency: 4,
      grossMarginPercent: 60, churnRate: 20,
      marketingSpend: 10000, newCustomers: 100,
    });
    // LTV = (100 * 4 * 0.60) / 0.20 = 1200
    // CAC = 10000 / 100 = 100
    expect(result.ltv).toBeCloseTo(1200, 0);
    expect(result.cac).toBe(100);
    expect(result.ltvCacRatio).toBeCloseTo(12, 0);
    expect(result.interpretation).toContain('Healthy');
  });

  it('warning ratio', () => {
    const result = calculateLtvCac({
      averageOrderValue: 50, purchaseFrequency: 2,
      grossMarginPercent: 30, churnRate: 50,
      marketingSpend: 50000, newCustomers: 100,
    });
    // LTV = (50 * 2 * 0.30) / 0.50 = 60
    // CAC = 500
    expect(result.ltvCacRatio).toBeLessThan(1);
    expect(result.interpretation).toContain('Warning');
  });

  it('throws on zero customers', () => {
    expect(() => calculateLtvCac({
      averageOrderValue: 100, purchaseFrequency: 4,
      grossMarginPercent: 60, churnRate: 20,
      marketingSpend: 10000, newCustomers: 0,
    })).toThrow();
  });
});
