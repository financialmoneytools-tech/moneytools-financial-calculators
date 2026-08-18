/**
 * Personal Loan Calculator Engine
 * Same amortization as loan + origination fee for effective APR
 */

export interface PersonalLoanInput {
  loanAmount: number;
  annualRate: number; // percentage
  termMonths: number;
  originationFee: number; // percentage of loan amount
}

export interface PersonalLoanAmortizationRow {
  paymentNumber: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface PersonalLoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  effectiveAPR: number;
  originationFeeAmount: number;
  amortizationSchedule: PersonalLoanAmortizationRow[];
}

export function calculatePersonalLoan(input: PersonalLoanInput): PersonalLoanResult {
  const { loanAmount, annualRate, termMonths, originationFee } = input;

  if (loanAmount <= 0) throw new Error('Loan amount must be positive');
  if (termMonths <= 0) throw new Error('Term must be positive');
  if (annualRate < 0) throw new Error('Rate must be non-negative');
  if (originationFee < 0) throw new Error('Origination fee must be non-negative');

  const r = annualRate / 100 / 12;
  const n = termMonths;

  let monthlyPayment: number;
  if (r === 0) {
    monthlyPayment = loanAmount / n;
  } else {
    monthlyPayment = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const originationFeeAmount = loanAmount * (originationFee / 100);
  const amortizationSchedule: PersonalLoanAmortizationRow[] = [];
  let balance = loanAmount;

  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    let principal: number;
    let payment: number;

    if (i === n) {
      principal = balance;
      payment = principal + interest;
    } else {
      payment = monthlyPayment;
      principal = payment - interest;
    }

    balance = Math.max(0, balance - principal);
    amortizationSchedule.push({ paymentNumber: i, payment, principal, interest, balance });
  }

  const totalPayment = amortizationSchedule.reduce((sum: number, row: PersonalLoanAmortizationRow) => sum + row.payment, 0);
  const totalInterest = totalPayment - loanAmount;

  // Calculate effective APR using Newton's method
  // The effective APR accounts for the origination fee
  // Net proceeds = loanAmount - originationFeeAmount
  // Solve: netProceeds = PMT * [(1 - (1+r')^(-n)) / r'] for r'
  const netProceeds = loanAmount - originationFeeAmount;
  let effectiveAPR = annualRate;

  if (originationFeeAmount > 0 && netProceeds > 0) {
    // Newton's method to find effective monthly rate
    let guess = r > 0 ? r * 1.1 : 0.005;
    for (let iter = 0; iter < 100; iter++) {
      const gn = Math.pow(1 + guess, n);
      const pv = monthlyPayment * (gn - 1) / (guess * gn);
      const dpv = monthlyPayment * ((gn - 1) / (guess * guess * gn) * -1 + n * Math.pow(1 + guess, n - 1) / (guess * gn) - n * Math.pow(1 + guess, n - 1) * (gn - 1) / (guess * gn * gn));
      const diff = pv - netProceeds;
      if (Math.abs(diff) < 0.0001) break;
      guess = guess - diff / dpv;
      if (guess <= 0) guess = 0.0001;
    }
    effectiveAPR = guess * 12 * 100;
  }

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    effectiveAPR,
    originationFeeAmount,
    amortizationSchedule,
  };
}
