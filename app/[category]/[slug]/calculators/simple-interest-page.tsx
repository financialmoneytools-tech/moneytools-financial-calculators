'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateSimpleInterest } from '@/lib/calculators/simple-interest';
import { formatCurrency } from '@/lib/utils/formatters';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function SimpleInterestPage() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('5');

  const result = useMemo(() => {
    try {
      return calculateSimpleInterest({ principal: parseFloat(principal) || 0, annualRate: parseFloat(rate) || 0, years: parseInt(years) || 0 });
    } catch { return null; }
  }, [principal, rate, years]);

  const chartData = (result?.yearlyBreakdown ?? []).map((y) => ({
    year: `Year ${y.year}`,
    Balance: Math.round(y.balance),
    Interest: Math.round(y.interest),
  }));

  return (
    <CalculatorPageWrapper
      slug="simple-interest-calculator"
      formula="A = P(1 + rt) &nbsp;|&nbsp; Interest = P × r × t"
      formulaExplanation="Where P = principal, r = annual rate (decimal), t = time in years. Unlike compound interest, simple interest is calculated only on the original principal."
      workedExample={`Principal: $10,000\nRate: 5% per year\nTime: 3 years\n\nInterest = $10,000 × 0.05 × 3 = $1,500\nTotal: $10,000 + $1,500 = $11,500`}
      whenToUse="Use simple interest for short-term loans, auto loans (simple interest type), and scenarios where interest does not compound."
      assumptions={['Interest rate is constant.', 'Interest does not compound.', 'No fees or taxes.']}
      commonMistakes={['Using simple interest for long-term projections where compound interest applies.', 'Confusing simple interest with compound interest — compounding always yields more over time.']}
      faqs={[
        { question: 'When is simple interest used in real life?', answer: 'Simple interest is common in auto loans, some personal loans, and short-term borrowing. Savings accounts and most investments use compound interest.' },
        { question: 'Is simple interest always less than compound interest?', answer: 'For the same rate and time period (>1 compounding period), yes. Compound interest earns interest on interest, while simple interest is calculated only on the original amount.' },
      ]}
    >
      <CalculatorShell
        title="Simple Interest Calculator"
        description="Calculate interest earned using the simple interest formula."
        inputs={
          <>
            <InputField label="Principal" value={principal} onChange={setPrincipal} prefix="$" min={0} />
            <InputField label="Annual Rate" value={rate} onChange={setRate} suffix="%" step={0.1} />
            <InputField label="Time (Years)" value={years} onChange={setYears} min={0} />
          </>
        }
        results={
          <>
            <div className="space-y-3">
              <ResultCard label="Total Amount" value={formatCurrency(result?.totalAmount ?? 0)} primary />
              <ResultCard label="Total Interest" value={formatCurrency(result?.totalInterest ?? 0)} />
            </div>
            {chartData.length > 0 && (
              <div className="mt-6 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="year" tick={{ fontSize: 10 }} tickLine={false} />
                    <YAxis tick={{ fontSize: 10 }} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 11 }} />
                    <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="Interest" fill="#38a169" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        }
      />
    </CalculatorPageWrapper>
  );
}
