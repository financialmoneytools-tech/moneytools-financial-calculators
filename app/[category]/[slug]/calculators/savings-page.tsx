'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateSavings } from '@/lib/calculators/savings';
import { formatCurrency } from '@/lib/utils/formatters';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function SavingsPage() {
  const [initial, setInitial] = useState('1000');
  const [monthly, setMonthly] = useState('200');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('10');

  const result = useMemo(() => {
    try {
      return calculateSavings({ initialDeposit: parseFloat(initial) || 0, monthlyContribution: parseFloat(monthly) || 0, annualRate: parseFloat(rate) || 0, years: parseInt(years) || 0 });
    } catch { return null; }
  }, [initial, monthly, rate, years]);

  const chartData = (result?.yearlyBreakdown ?? []).map((y) => ({
    year: `Yr ${y.year}`, Balance: Math.round(y.balance), Deposited: Math.round(y.totalDeposited), Interest: Math.round(y.totalInterest),
  }));

  return (
    <CalculatorPageWrapper
      slug="savings-calculator"
      formula="FV = PV(1+r)^n + PMT × [(1+r)^n - 1] / r"
      formulaExplanation="Where PV = initial deposit, r = monthly rate, n = total months, PMT = monthly contribution."
      workedExample={`Initial: $1,000 | Monthly: $200 | Rate: 5% | Years: 10\n\nTotal deposited: $25,000\nFinal balance: ~$32,364\nInterest earned: ~$7,364`}
      whenToUse="Use to project how regular savings deposits grow over time with compound interest."
      assumptions={['Rate is constant and compounds monthly.', 'Deposits are made consistently.', 'No withdrawals, taxes, or fees.']}
      commonMistakes={['Overestimating the savings rate — use your actual APY.', 'Not accounting for inflation\'s effect on purchasing power.']}
      faqs={[
        { question: 'What rate should I use?', answer: 'Use the APY offered by your savings account or CD. High-yield savings accounts may offer higher rates than traditional accounts.' },
        { question: 'How accurate is this?', answer: 'This gives a close estimate for fixed-rate accounts. Actual results may vary slightly due to the exact timing of deposits and compounding.' },
      ]}
    >
      <CalculatorShell
        title="Savings Calculator"
        description="Calculate how your savings grow with regular deposits and compound interest."
        inputs={<>
          <InputField label="Initial Deposit" value={initial} onChange={setInitial} prefix="$" min={0} />
          <InputField label="Monthly Contribution" value={monthly} onChange={setMonthly} prefix="$" min={0} />
          <InputField label="Annual Interest Rate (APY)" value={rate} onChange={setRate} suffix="%" step={0.1} />
          <InputField label="Years" value={years} onChange={setYears} min={0} max={50} />
        </>}
        results={<>
          <div className="space-y-3">
            <ResultCard label="Final Balance" value={formatCurrency(result?.finalBalance ?? 0)} primary />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Total Deposited" value={formatCurrency(result?.totalDeposited ?? 0)} />
              <ResultCard label="Interest Earned" value={formatCurrency(result?.totalInterest ?? 0)} />
            </div>
          </div>
          {chartData.length > 0 && (
            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} tickLine={false} interval="preserveStartEnd" />
                  <YAxis tick={{ fontSize: 10 }} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="Deposited" stackId="1" stroke="#a0aec0" fill="#a0aec0" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="Interest" stackId="1" stroke="#38a169" fill="#38a169" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </>}
      />
    </CalculatorPageWrapper>
  );
}
