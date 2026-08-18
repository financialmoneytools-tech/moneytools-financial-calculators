/**
 * Loan Calculator Engine
 * M = P × [r(1+r)^n] / [(1+r)^n - 1]
 */

export interface LoanInput {
  loanAmount: number;
  annualRate: number; // percentage
  termYears: number;
}

export interface AmortizationRow {
  paymentNumber: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationRow[];
}

export function calculateLoan(input: LoanInput): LoanResult {
  const { loanAmount, annualRate, termYears } = input;

  if (loanAmount <= 0) throw new Error('Loan amount must be positive');
  if (termYears <= 0) throw new Error('Term must be positive');
  if (annualRate < 0) throw new Error('Rate must be non-negative');

  const n = termYears * 12;
  const r = annualRate / 100 / 12;

  let monthlyPayment: number;
  if (r === 0) {
    monthlyPayment = loanAmount / n;
  } else {
    monthlyPayment = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const amortizationSchedule: AmortizationRow[] = [];
  let balance = loanAmount;

  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    let principal: number;
    let payment: number;

    if (i === n) {
      // Final payment reconciliation
      principal = balance;
      payment = principal + interest;
    } else {
      payment = monthlyPayment;
      principal = payment - interest;
    }

    balance = Math.max(0, balance - principal);

    amortizationSchedule.push({
      paymentNumber: i,
      payment,
      principal,
      interest,
      balance,
    });
  }

  const totalPayment = amortizationSchedule.reduce((sum: number, row: AmortizationRow) => sum + row.payment, 0);
  const totalInterest = totalPayment - loanAmount;

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    amortizationSchedule,
  };
}
