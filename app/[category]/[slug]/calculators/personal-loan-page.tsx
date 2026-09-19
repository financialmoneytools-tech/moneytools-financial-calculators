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
    <CalculatorPageWrapper slug="personal-loan-calculator">
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
