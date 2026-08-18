import { describe, it, expect } from 'vitest';
import { calculateRoas } from '../roas';

describe('ROAS Calculator', () => {
  it('basic: spend=1000, revenue=4000, margin=50%', () => {
    const result = calculateRoas({ adSpend: 1000, revenue: 4000, grossMarginPercent: 50 });
    expect(result.roas).toBe(4);
    expect(result.breakEvenRoas).toBe(2);
    expect(result.profit).toBe(1000); // 4000*0.5 - 1000
    expect(result.roi).toBe(100);
  });

  it('unprofitable ad spend', () => {
    const result = calculateRoas({ adSpend: 5000, revenue: 3000, grossMarginPercent: 40 });
    expect(result.roas).toBeCloseTo(0.6, 2);
    expect(result.profit).toBeLessThan(0);
  });

  it('throws on zero ad spend', () => {
    expect(() => calculateRoas({ adSpend: 0, revenue: 1000, grossMarginPercent: 50 })).toThrow();
  });
});
