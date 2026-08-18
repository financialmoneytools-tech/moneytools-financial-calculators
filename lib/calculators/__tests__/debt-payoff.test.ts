import { describe, it, expect } from 'vitest';
import { calculateDebtPayoff } from '../debt-payoff';

describe('Debt Payoff Calculator', () => {
  const debts = [
    { name: 'Credit Card', balance: 5000, rate: 18, minimumPayment: 150 },
    { name: 'Car Loan', balance: 10000, rate: 6, minimumPayment: 300 },
    { name: 'Student Loan', balance: 20000, rate: 4.5, minimumPayment: 250 },
  ];

  it('avalanche pays off highest rate first', () => {
    const result = calculateDebtPayoff({ debts, extraPayment: 200, strategy: 'avalanche' });
    expect(result.payoffOrder[0].name).toBe('Credit Card');
    expect(result.monthsToPayoff).toBeGreaterThan(0);
    expect(result.totalInterestPaid).toBeGreaterThan(0);
  });

  it('snowball pays off lowest balance first', () => {
    const result = calculateDebtPayoff({ debts, extraPayment: 200, strategy: 'snowball' });
    expect(result.payoffOrder[0].name).toBe('Credit Card');
  });

  it('avalanche saves more interest than snowball', () => {
    const avalanche = calculateDebtPayoff({ debts, extraPayment: 200, strategy: 'avalanche' });
    const snowball = calculateDebtPayoff({ debts, extraPayment: 200, strategy: 'snowball' });
    expect(avalanche.totalInterestPaid).toBeLessThanOrEqual(snowball.totalInterestPaid + 1);
  });

  it('single debt', () => {
    const result = calculateDebtPayoff({
      debts: [{ name: 'Loan', balance: 1000, rate: 10, minimumPayment: 100 }],
      extraPayment: 0, strategy: 'avalanche',
    });
    expect(result.monthsToPayoff).toBeGreaterThan(0);
    expect(result.monthsToPayoff).toBeLessThan(15); // ~11 months
  });

  it('throws on empty debts', () => {
    expect(() => calculateDebtPayoff({ debts: [], extraPayment: 0, strategy: 'avalanche' })).toThrow();
  });
});
