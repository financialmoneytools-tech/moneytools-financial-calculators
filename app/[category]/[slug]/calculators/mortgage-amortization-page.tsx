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
    <CalculatorPageWrapper
      slug="mortgage-amortization-calculator"
      formula="Standard amortization with extra payment applied to principal each month."
      formulaExplanation="Extra payments go directly to principal reduction, accelerating payoff and reducing total interest."
      workedExample={`Loan: $200,000 | Rate: 4% | Term: 30yr | Extra: $200/mo\n\nRegular payment: $954.83/mo\nWith $200 extra: pays off ~8 years early, saves ~$47,000 in interest.`}
      whenToUse="Use to see a full amortization schedule and to model the impact of making extra payments on your mortgage."
      assumptions={['Fixed rate.', 'Extra payments applied monthly.', 'No prepayment penalties.']}
      commonMistakes={['Assuming extra payments must be large — even small consistent extra payments save significant interest over time.', 'Not verifying that your lender applies extra payments to principal.']}
      faqs={[
        { question: 'How much can I save with extra payments?', answer: 'It depends on your rate, balance, and extra amount. Even $100/month extra on a $200,000 mortgage at 4% can save tens of thousands in interest and years off the loan.' },
        { question: 'Is it better to make extra payments or invest?', answer: 'Compare your mortgage rate to expected investment returns after taxes. If your mortgage rate is lower than your expected after-tax return, investing may yield more, but this depends on your risk tolerance and financial situation.' },
      ]}
    >
      <CalculatorShell
        title="Mortgage Amortization Calculator"
        description="View a complete amortization schedule and see how extra payments reduce your loan."
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
