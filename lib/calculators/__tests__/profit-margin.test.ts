import { describe, it, expect } from 'vitest';
import { calculateProfitMargin } from '../profit-margin';

describe('Profit Margin Calculator', () => {
  it('basic: revenue=100k, cogs=60k, opex=20k, other=5k', () => {
    const result = calculateProfitMargin({ revenue: 100000, cogs: 60000, operatingExpenses: 20000, otherExpenses: 5000 });
    expect(result.grossProfit).toBe(40000);
    expect(result.grossMargin).toBe(40);
    expect(result.operatingProfit).toBe(20000);
    expect(result.operatingMargin).toBe(20);
    expect(result.netProfit).toBe(15000);
    expect(result.netMargin).toBe(15);
  });

  it('negative margins are valid', () => {
    const result = calculateProfitMargin({ revenue: 10000, cogs: 12000, operatingExpenses: 0, otherExpenses: 0 });
    expect(result.grossMargin).toBe(-20);
  });

  it('throws on zero revenue', () => {
    expect(() => calculateProfitMargin({ revenue: 0, cogs: 0, operatingExpenses: 0, otherExpenses: 0 })).toThrow();
  });
});
