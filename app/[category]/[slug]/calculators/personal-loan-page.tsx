'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculatePersonalLoan } from '@/lib/calculators/personal-loan';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';

export function PersonalLoanPage() {
  const [amount, setAmount] = useState('15000');
  const [rate, setRate] = useState('8');
  const [months, setMonths] = useState('36');
  const [fee, setFee] = useState('3');

  const result = useMemo(() => {
    try {
      return calculatePersonalLoan({ loanAmount: parseFloat(amount) || 0, annualRate: parseFloat(rate) || 0, termMonths: parseInt(months) || 1, originationFee: parseFloat(fee) || 0 });
    } catch { return null; }
  }, [amount, rate, months, fee]);

  return (
    <CalculatorPageWrapper
      slug="personal-loan-calculator"
      formula="M = P × [r(1+r)^n] / [(1+r)^n - 1]"
      formulaExplanation="Same as a standard loan formula. The effective APR is calculated by finding the rate that makes the present value of payments equal to the net proceeds (loan amount minus origination fee)."
      workedExample={`Loan: $15,000 | Rate: 8% | Term: 36 months | Fee: 3%\n\nMonthly payment: $470.05\nOrigination fee: $450\nNet proceeds: $14,550\nEffective APR: ~9.9% (higher than stated rate due to fee)`}
      whenToUse="Use when comparing personal loan offers from different lenders. The effective APR accounts for origination fees, giving a true cost comparison."
      assumptions={['Fixed rate.', 'Origination fee deducted from proceeds upfront.', 'No prepayment penalties.']}
      commonMistakes={['Comparing loans by interest rate alone — always check the effective APR including fees.', 'Not accounting for the origination fee reducing your actual loan proceeds.']}
      faqs={[
        { question: 'What is an origination fee?', answer: 'A one-time fee charged by the lender, typically 1-8% of the loan amount, deducted from your loan proceeds before disbursement.' },
        { question: 'Why is effective APR higher than the stated rate?', answer: 'Because you receive less money (after the fee is deducted) but make payments on the full loan amount. This makes the true cost of borrowing higher.' },
      ]}
    >
      <CalculatorShell
        title="Personal Loan Calculator"
        description="Estimate personal loan payments including origination fees and effective APR."
        inputs={
          <>
            <InputField label="Loan Amount" value={amount} onChange={setAmount} prefix="$" min={0} />
            <InputField label="Interest Rate (APR)" value={rate} onChange={setRate} suffix="%" step={0.1} />
            <InputField label="Loan Term (Months)" value={months} onChange={setMonths} min={1} max={84} />
            <InputField label="Origination Fee" value={fee} onChange={setFee} suffix="%" step={0.5} helperText="Deducted from loan proceeds" />
          </>
        }
        results={
          <div className="space-y-3">
            <ResultCard label="Monthly Payment" value={formatCurrency(result?.monthlyPayment ?? 0)} primary />
            <ResultCard label="Effective APR" value={formatPercent(result?.effectiveAPR ?? 0)} sublabel="True cost including fees" />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Total Interest" value={formatCurrency(result?.totalInterest ?? 0)} />
              <ResultCard label="Origination Fee" value={formatCurrency(result?.originationFeeAmount ?? 0)} />
            </div>
            <ResultCard label="Total Cost" value={formatCurrency((result?.totalInterest ?? 0) + (result?.originationFeeAmount ?? 0))} sublabel="Interest + Fee" />
          </div>
        }
      />
    </CalculatorPageWrapper>
  );
}
