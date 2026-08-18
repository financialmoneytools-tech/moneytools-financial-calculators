/**
 * Mortgage Calculator Engine
 * M = P × [r(1+r)^n] / [(1+r)^n - 1]
 * Includes property tax, insurance, PMI
 */

export interface MortgageInput {
  homePrice: number;
  downPaymentPercent: number; // percentage
  annualRate: number; // percentage
  termYears: number;
  propertyTaxAnnual: number;
  homeInsuranceAnnual: number;
  pmiMonthly: number; // 0 if not applicable
}

export interface MortgageAmortizationRow {
  paymentNumber: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  equity: number;
}

export interface MortgageResult {
  loanAmount: number;
  downPaymentAmount: number;
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyPmi: number;
  totalMonthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: MortgageAmortizationRow[];
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const { homePrice, downPaymentPercent, annualRate, termYears, propertyTaxAnnual, homeInsuranceAnnual, pmiMonthly } = input;

  if (homePrice <= 0) throw new Error('Home price must be positive');
  if (termYears <= 0) throw new Error('Term must be positive');
  if (annualRate < 0) throw new Error('Rate must be non-negative');
  if (downPaymentPercent < 0 || downPaymentPercent >= 100) throw new Error('Down payment must be 0-99%');

  const downPaymentAmount = homePrice * (downPaymentPercent / 100);
  const loanAmount = homePrice - downPaymentAmount;
  const n = termYears * 12;
  const r = annualRate / 100 / 12;

  let monthlyPI: number;
  if (r === 0) {
    monthlyPI = loanAmount / n;
  } else {
    monthlyPI = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const monthlyPropertyTax = propertyTaxAnnual / 12;
  const monthlyInsurance = homeInsuranceAnnual / 12;

  const amortizationSchedule: MortgageAmortizationRow[] = [];
  let balance = loanAmount;

  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    let principal: number;
    let payment: number;

    if (i === n) {
      principal = balance;
      payment = principal + interest;
    } else {
      payment = monthlyPI;
      principal = payment - interest;
    }

    balance = Math.max(0, balance - principal);
    const equity = homePrice - balance;

    amortizationSchedule.push({
      paymentNumber: i,
      payment,
      principal,
      interest,
      balance,
      equity,
    });
  }

  const totalPayment = amortizationSchedule.reduce((sum: number, row: MortgageAmortizationRow) => sum + row.payment, 0);
  const totalInterest = totalPayment - loanAmount;

  // PMI applies until equity > 20%
  const pmiThreshold = homePrice * 0.80;
  let monthlyPmi = downPaymentPercent >= 20 ? 0 : pmiMonthly;

  const totalMonthlyPayment = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyPmi;

  return {
    loanAmount,
    downPaymentAmount,
    monthlyPrincipalInterest: monthlyPI,
    monthlyPropertyTax,
    monthlyInsurance,
    monthlyPmi,
    totalMonthlyPayment,
    totalPayment: totalPayment + (monthlyPropertyTax + monthlyInsurance) * n,
    totalInterest,
    amortizationSchedule,
  };
}
