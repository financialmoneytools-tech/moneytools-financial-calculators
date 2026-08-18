/**
 * Mortgage Amortization Calculator Engine
 * Full amortization with extra payment support
 */

export interface MortgageAmortizationInput {
  loanAmount: number;
  annualRate: number; // percentage
  termYears: number;
  extraMonthlyPayment: number;
}

export interface FullAmortizationRow {
  paymentNumber: number;
  payment: number;
  principal: number;
  interest: number;
  extraPayment: number;
  balance: number;
}

export interface MortgageAmortizationResult {
  regularMonthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  payoffMonths: number;
  monthsSaved: number;
  interestSaved: number;
  fullSchedule: FullAmortizationRow[];
}

export function calculateMortgageAmortization(input: MortgageAmortizationInput): MortgageAmortizationResult {
  const { loanAmount, annualRate, termYears, extraMonthlyPayment } = input;

  if (loanAmount <= 0) throw new Error('Loan amount must be positive');
  if (termYears <= 0) throw new Error('Term must be positive');
  if (annualRate < 0) throw new Error('Rate must be non-negative');
  if (extraMonthlyPayment < 0) throw new Error('Extra payment must be non-negative');

  const n = termYears * 12;
  const r = annualRate / 100 / 12;

  let regularPayment: number;
  if (r === 0) {
    regularPayment = loanAmount / n;
  } else {
    regularPayment = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  // Calculate without extra payments first (for comparison)
  let totalInterestWithout = 0;
  {
    let bal = loanAmount;
    for (let i = 0; i < n; i++) {
      const interest = bal * r;
      totalInterestWithout += interest;
      const principal = regularPayment - interest;
      bal -= principal;
    }
  }

  // Calculate with extra payments
  const fullSchedule: FullAmortizationRow[] = [];
  let balance = loanAmount;
  let totalInterest = 0;
  let totalPayment = 0;
  let paymentNum = 0;

  while (balance > 0.005 && paymentNum < n * 2) { // safety limit
    paymentNum++;
    const interest = balance * r;
    totalInterest += interest;

    let principal = regularPayment - interest;
    let extra = extraMonthlyPayment;

    // Last payment adjustment
    if (principal + extra >= balance) {
      principal = balance;
      extra = 0;
      const payment = principal + interest;
      totalPayment += payment;
      fullSchedule.push({
        paymentNumber: paymentNum,
        payment,
        principal,
        interest,
        extraPayment: 0,
        balance: 0,
      });
      balance = 0;
    } else {
      if (principal + extra > balance) {
        extra = balance - principal;
      }
      balance -= (principal + extra);
      const payment = regularPayment + extra;
      totalPayment += payment;
      fullSchedule.push({
        paymentNumber: paymentNum,
        payment,
        principal,
        interest,
        extraPayment: extra,
        balance: Math.max(0, balance),
      });
    }
  }

  return {
    regularMonthlyPayment: regularPayment,
    totalPayment,
    totalInterest,
    payoffMonths: paymentNum,
    monthsSaved: n - paymentNum,
    interestSaved: totalInterestWithout - totalInterest,
    fullSchedule,
  };
}
