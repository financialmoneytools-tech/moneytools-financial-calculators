import { describe, it, expect } from 'vitest';
import { calculateApy, calculateAprFromApy } from '../apy';

describe('APY Calculator', () => {
  it('5% APR monthly compounding', () => {
    const result = calculateApy({ apr: 5, compoundingFrequency: 12 });
    // APY = (1 + 0.05/12)^12 - 1 = 5.116%
    expect(result.apy).toBeCloseTo(5.116, 2);
    expect(result.comparisonTable).toHaveLength(5);
  });

  it('APY increases with compounding frequency', () => {
    const annual = calculateApy({ apr: 10, compoundingFrequency: 1 });
    const monthly = calculateApy({ apr: 10, compoundingFrequency: 12 });
    const daily = calculateApy({ apr: 10, compoundingFrequency: 365 });
    expect(annual.apy).toBeLessThan(monthly.apy);
    expect(monthly.apy).toBeLessThan(daily.apy);
  });

  it('zero APR gives zero APY', () => {
    const result = calculateApy({ apr: 0, compoundingFrequency: 12 });
    expect(result.apy).toBeCloseTo(0, 4);
  });

  it('reverse: APY -> APR', () => {
    const result = calculateAprFromApy({ apy: 5.116, compoundingFrequency: 12 });
    expect(result.apr).toBeCloseTo(5, 1);
  });
});
