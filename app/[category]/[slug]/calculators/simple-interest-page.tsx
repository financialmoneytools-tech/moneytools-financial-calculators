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
    <CalculatorPageWrapper slug="simple-interest-calculator">
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
