import { describe, it, expect } from 'vitest';
import { calculateSalary } from '../salary';

describe('Salary Calculator', () => {
  it('annual $52000, 40hr week, 52 weeks', () => {
    const result = calculateSalary({ amount: 52000, fromPeriod: 'annual', hoursPerWeek: 40, weeksPerYear: 52 });
    expect(result.annual).toBe(52000);
    expect(result.monthly).toBeCloseTo(4333.33, 1);
    expect(result.weekly).toBe(1000);
    expect(result.hourly).toBe(25);
    expect(result.biWeekly).toBe(2000);
    expect(result.daily).toBe(200); // 52000 / (5 * 52)
  });

  it('hourly $20 -> annual', () => {
    const result = calculateSalary({ amount: 20, fromPeriod: 'hourly', hoursPerWeek: 40, weeksPerYear: 52 });
    expect(result.annual).toBe(41600);
    expect(result.hourly).toBe(20);
  });

  it('monthly $5000 -> annual', () => {
    const result = calculateSalary({ amount: 5000, fromPeriod: 'monthly', hoursPerWeek: 40, weeksPerYear: 52 });
    expect(result.annual).toBe(60000);
  });

  it('throws on zero amount', () => {
    expect(() => calculateSalary({ amount: 0, fromPeriod: 'annual', hoursPerWeek: 40, weeksPerYear: 52 })).toThrow();
  });

  it('part-time: 20hr/week', () => {
    const result = calculateSalary({ amount: 15, fromPeriod: 'hourly', hoursPerWeek: 20, weeksPerYear: 52 });
    expect(result.annual).toBe(15600);
    expect(result.weekly).toBe(300);
  });
});
