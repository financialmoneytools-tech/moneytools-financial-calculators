import { describe, it, expect } from 'vitest';
import { calculateFutureValue } from '../future-value';

describe('Future Value Calculator', () => {
  it('lump sum: $10000, 6%, 10yr, no payments', () => {
    const result = calculateFutureValue({
      presentValue: 10000, annualRate: 6, years: 10,
      periodicPayment: 0, paymentFrequency: 12, paymentTiming: 'end',
    });
    // 10000 * (1.005)^120 = 18193.97
    expect(result.futureValue).toBeCloseTo(18193.97, -1);
  });

  it('with monthly payments: $0 PV, $500/mo, 8%, 20yr', () => {
    const result = calculateFutureValue({
      presentValue: 0, annualRate: 8, years: 20,
      periodicPayment: 500, paymentFrequency: 12, paymentTiming: 'end',
    });
    expect(result.futureValue).toBeGreaterThan(250000);
    expect(result.totalContributions).toBe(500 * 12 * 20);
  });

  it('beginning of period yields more', () => {
    const end = calculateFutureValue({
      presentValue: 0, annualRate: 6, years: 10,
      periodicPayment: 100, paymentFrequency: 12, paymentTiming: 'end',
    });
    const beg = calculateFutureValue({
      presentValue: 0, annualRate: 6, years: 10,
      periodicPayment: 100, paymentFrequency: 12, paymentTiming: 'beginning',
    });
    expect(beg.futureValue).toBeGreaterThan(end.futureValue);
  });

  it('zero rate', () => {
    const result = calculateFutureValue({
      presentValue: 1000, annualRate: 0, years: 5,
      periodicPayment: 100, paymentFrequency: 12, paymentTiming: 'end',
    });
    expect(result.futureValue).toBeCloseTo(1000 + 100 * 60, 2);
  });
});
