'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateLoan } from '@/lib/calculators/loan';
import { formatCurrency } from '@/lib/utils/formatters';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function LoanPage() {
  const [amount, setAmount] = useState('200000');
  const [rate, setRate] = useState('5');
  const [term, setTerm] = useState('15');

  const result = useMemo(() => {
    try {
      return calculateLoan({ loanAmount: parseFloat(amount) || 0, annualRate: parseFloat(rate) || 0, termYears: parseInt(term) || 1 });
    } catch { return null; }
  }, [amount, rate, term]);

  const pieData = result ? [
    { name: 'Principal', value: Math.round(parseFloat(amount) || 0) },
    { name: 'Interest', value: Math.round(result.totalInterest) },
  ] : [];

  return (
    <CalculatorPageWrapper slug="loan-calculator">
      <CalculatorShell
        title="Loan Calculator"
        description="Calculate monthly payments and total interest for any fixed-rate loan."
        inputs={
          <>
            <InputField label="Loan Amount" value={amount} onChange={setAmount} prefix="$" min={0} />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} suffix="%" step={0.1} />
            <InputField label="Loan Term (Years)" value={term} onChange={setTerm} min={1} max={40} />
          </>
        }
        results={
          <>
            <div className="space-y-3">
              <ResultCard label="Monthly Payment" value={formatCurrency(result?.monthlyPayment ?? 0)} primary />
              <div className="grid grid-cols-2 gap-3">
                <ResultCard label="Total Payment" value={formatCurrency(result?.totalPayment ?? 0)} />
                <ResultCard label="Total Interest" value={formatCurrency(result?.totalInterest ?? 0)} />
              </div>
            </div>
            {pieData.length > 0 && (
              <div className="mt-6 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={2}>
                      <Cell fill="#3182ce" />
                      <Cell fill="#e53e3e" />
                    </Pie>
                    <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        }
      />
    </CalculatorPageWrapper>
  );
}
