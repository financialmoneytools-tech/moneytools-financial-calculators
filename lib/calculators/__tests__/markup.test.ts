import { describe, it, expect } from 'vitest';
import { calculateMarkup } from '../markup';

describe('Markup Calculator', () => {
  it('from selling price: cost=50, sell=75', () => {
    const result = calculateMarkup({ cost: 50, sellingPrice: 75 });
    expect(result.markup).toBe(50);
    expect(result.margin).toBeCloseTo(33.33, 1);
    expect(result.profit).toBe(25);
  });

  it('from markup percent: cost=100, 40% markup', () => {
    const result = calculateMarkup({ cost: 100, markupPercent: 40 });
    expect(result.sellingPrice).toBe(140);
    expect(result.profit).toBe(40);
    expect(result.margin).toBeCloseTo(28.57, 1);
  });

  it('throws on zero cost', () => {
    expect(() => calculateMarkup({ cost: 0, sellingPrice: 10 })).toThrow();
  });

  it('throws when neither selling price nor markup given', () => {
    expect(() => calculateMarkup({ cost: 50 })).toThrow();
  });
});
