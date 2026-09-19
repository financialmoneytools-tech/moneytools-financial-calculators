'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateInvestment } from '@/lib/calculators/investment';
import { formatCurrency } from '@/lib/utils/formatters';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function InvestmentPage() {
  const [initial, setInitial] = useState('10000');
  const [monthly, setMonthly] = useState('500');
  const [returnRate, setReturnRate] = useState('8');
  const [years, setYears] = useState('20');
  const [inflation, setInflation] = useState('3');

  const result = useMemo(() => {
    try {
      return calculateInvestment({
        initialInvestment: parseFloat(initial) || 0,
        monthlyContribution: parseFloat(monthly) || 0,
        annualReturn: parseFloat(returnRate) || 0,
        years: parseInt(years) || 0,
        inflationRate: parseFloat(inflation) || 0,
      });
    } catch { return null; }
  }, [initial, monthly, returnRate, years, inflation]);

  const chartData = (result?.yearlyData ?? []).map((y) => ({
    year: `Yr ${y.year}`,
    'Nominal Value': Math.round(y.balance),
    'Inflation-Adjusted': Math.round(y.inflationAdjustedBalance),
    'Total Invested': Math.round(y.totalInvested),
  }));

  return (
    <CalculatorPageWrapper slug="investment-calculator">
      <CalculatorShell
        title="Investment Calculator"
        description="Project the future value of investments with inflation-adjusted returns."
        inputs={
          <>
            <InputField label="Initial Investment" value={initial} onChange={setInitial} prefix="$" min={0} />
            <InputField label="Monthly Contribution" value={monthly} onChange={setMonthly} prefix="$" min={0} />
            <InputField label="Expected Annual Return" value={returnRate} onChange={setReturnRate} suffix="%" step={0.1} />
            <InputField label="Investment Period (Years)" value={years} onChange={setYears} min={1} max={50} />
            <InputField label="Expected Inflation Rate" value={inflation} onChange={setInflation} suffix="%" step={0.1} />
          </>
        }
        results={
          <>
            <div className="space-y-3">
              <ResultCard label="Future Value (Nominal)" value={formatCurrency(result?.futureValue ?? 0)} primary />
              <ResultCard label="Inflation-Adjusted Value" value={formatCurrency(result?.inflationAdjustedValue ?? 0)} sublabel="In today's purchasing power" />
              <div className="grid grid-cols-2 gap-3">
                <ResultCard label="Total Invested" value={formatCurrency(result?.totalInvested ?? 0)} />
                <ResultCard label="Total Growth" value={formatCurrency(result?.totalGrowth ?? 0)} />
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
                    <Area type="monotone" dataKey="Nominal Value" stroke="#3182ce" fill="#3182ce" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="Inflation-Adjusted" stroke="#38a169" fill="#38a169" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="Total Invested" stroke="#a0aec0" fill="#a0aec0" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        }
      />
    </CalculatorPageWrapper>
  );
}
