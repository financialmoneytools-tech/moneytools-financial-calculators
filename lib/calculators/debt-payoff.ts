/**
 * Debt Payoff Calculator Engine
 * Supports avalanche (highest rate first) and snowball (lowest balance first)
 */

export interface DebtItem {
  name: string;
  balance: number;
  rate: number; // annual percentage
  minimumPayment: number;
}

export interface DebtPayoffInput {
  debts: DebtItem[];
  extraPayment: number;
  strategy: 'avalanche' | 'snowball';
}

export interface DebtPayoffSummary {
  name: string;
  originalBalance: number;
  interestPaid: number;
  payoffMonth: number;
}

export interface DebtPayoffResult {
  payoffOrder: DebtPayoffSummary[];
  totalInterestPaid: number;
  monthsToPayoff: number;
  totalPaid: number;
}

export function calculateDebtPayoff(input: DebtPayoffInput): DebtPayoffResult {
  const { debts, extraPayment, strategy } = input;

  if (debts.length === 0) throw new Error('At least one debt is required');
  if (extraPayment < 0) throw new Error('Extra payment must be non-negative');

  // Validate minimum payments cover interest
  for (const debt of debts) {
    if (debt.balance <= 0) throw new Error(`Debt "${debt.name}" balance must be positive`);
    if (debt.minimumPayment <= 0) throw new Error(`Debt "${debt.name}" minimum payment must be positive`);
    const monthlyInterest = debt.balance * (debt.rate / 100 / 12);
    if (debt.minimumPayment < monthlyInterest && debt.rate > 0) {
      throw new Error(`Debt "${debt.name}" minimum payment does not cover interest`);
    }
  }

  // Sort debts based on strategy
  const sortedIndices = debts.map((_: DebtItem, i: number) => i);
  if (strategy === 'avalanche') {
    sortedIndices.sort((a: number, b: number) => debts[b].rate - debts[a].rate);
  } else {
    sortedIndices.sort((a: number, b: number) => debts[a].balance - debts[b].balance);
  }

  // Track state
  const balances = debts.map((d: DebtItem) => d.balance);
  const interestPaid = debts.map(() => 0);
  const payoffMonths = debts.map(() => 0);
  const totalPaidPerDebt = debts.map(() => 0);

  let month = 0;
  const MAX_MONTHS = 600; // 50 year safety limit

  while (balances.some((b: number) => b > 0.005) && month < MAX_MONTHS) {
    month++;

    // Apply interest to all debts
    for (let i = 0; i < debts.length; i++) {
      if (balances[i] <= 0.005) continue;
      const monthlyInterest = balances[i] * (debts[i].rate / 100 / 12);
      interestPaid[i] += monthlyInterest;
      balances[i] += monthlyInterest;
    }

    // Apply minimum payments
    let availableExtra = extraPayment;
    for (let i = 0; i < debts.length; i++) {
      if (balances[i] <= 0.005) {
        // Freed-up minimum gets added to extra
        availableExtra += debts[i].minimumPayment;
        continue;
      }
      const payment = Math.min(debts[i].minimumPayment, balances[i]);
      balances[i] -= payment;
      totalPaidPerDebt[i] += payment;
      if (balances[i] <= 0.005) {
        balances[i] = 0;
        payoffMonths[i] = month;
        availableExtra += debts[i].minimumPayment - payment;
      }
    }

    // Apply extra payment to priority debt
    for (const idx of sortedIndices) {
      if (balances[idx] <= 0.005 || availableExtra <= 0) continue;
      const extra = Math.min(availableExtra, balances[idx]);
      balances[idx] -= extra;
      totalPaidPerDebt[idx] += extra;
      availableExtra -= extra;
      if (balances[idx] <= 0.005) {
        balances[idx] = 0;
        payoffMonths[idx] = month;
      }
    }
  }

  const payoffOrder: DebtPayoffSummary[] = sortedIndices.map((idx: number) => ({
    name: debts[idx].name,
    originalBalance: debts[idx].balance,
    interestPaid: interestPaid[idx],
    payoffMonth: payoffMonths[idx],
  }));

  return {
    payoffOrder,
    totalInterestPaid: interestPaid.reduce((sum: number, v: number) => sum + v, 0),
    monthsToPayoff: Math.max(...payoffMonths),
    totalPaid: totalPaidPerDebt.reduce((sum: number, v: number) => sum + v, 0),
  };
}
