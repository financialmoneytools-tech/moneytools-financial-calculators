'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateMortgageAmortization } from '@/lib/calculators/mortgage-amortization';
import { formatCurrency, formatNumber } from '@/lib/utils/formatters';

export function MortgageAmortizationPage() {
  const [amount, setAmount] = useState('200000');
  const [rate, setRate] = useState('4');
  const [term, setTerm] = useState('30');
  const [extra, setExtra] = useState('200');

  const result = useMemo(() => {
    try {
      return calculateMortgageAmortization({
        loanAmount: parseFloat(amount) || 0, annualRate: parseFloat(rate) || 0,
        termYears: parseInt(term) || 1, extraMonthlyPayment: parseFloat(extra) || 0,
      });
    } catch { return null; }
  }, [amount, rate, term, extra]);

  return (
    <CalculatorPageWrapper slug="mortgage-amortization-calculator">
      <CalculatorShell
        title="Mortgage Amortization Calculator"
        description="See how extra payments shorten your payoff time and reduce the total interest you pay."
        inputs={
          <>
            <InputField label="Loan Amount" value={amount} onChange={setAmount} prefix="$" min={0} />
            <InputField label="Interest Rate" value={rate} onChange={setRate} suffix="%" step={0.125} />
            <InputField label="Loan Term (Years)" value={term} onChange={setTerm} min={1} max={40} />
            <InputField label="Extra Monthly Payment" value={extra} onChange={setExtra} prefix="$" min={0} />
          </>
        }
        results={
          <div className="space-y-3">
            <ResultCard label="Monthly Payment" value={formatCurrency(result?.regularMonthlyPayment ?? 0)} primary sublabel="Principal & Interest" />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Payoff" value={`${formatNumber(result?.payoffMonths ?? 0)} mo`} />
              <ResultCard label="Months Saved" value={`${formatNumber(result?.monthsSaved ?? 0)} mo`} />
              <ResultCard label="Total Interest" value={formatCurrency(result?.totalInterest ?? 0)} />
              <ResultCard label="Interest Saved" value={formatCurrency(result?.interestSaved ?? 0)} />
            </div>
          </div>
        }
      />
    </CalculatorPageWrapper>
  );
}
