'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { SelectField } from '@/components/calculators/select-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateCompoundInterest } from '@/lib/calculators/compound-interest';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';
import { DollarSign, TrendingUp, Percent } from 'lucide-react';
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('recharts').then(m => m.AreaChart), { ssr: false });
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function CompoundInterestPage() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('10');
  const [frequency, setFrequency] = useState('12');
  const [contribution, setContribution] = useState('100');
  const [timing, setTiming] = useState('end');

  const result = useMemo(() => {
    try {
      return calculateCompoundInterest({
        principal: parseFloat(principal) || 0,
        annualRate: parseFloat(rate) || 0,
        years: parseInt(years) || 0,
        compoundingFrequency: parseInt(frequency) || 12,
        monthlyContribution: parseFloat(contribution) || 0,
        contributionTiming: timing as 'end' | 'beginning',
      });
    } catch { return null; }
  }, [principal, rate, years, frequency, contribution, timing]);

  const chartData = (result?.yearlyBreakdown ?? []).map((y) => ({
    year: `Year ${y.year}`,
    Balance: Math.round(y.balance),
    Contributions: Math.round(y.contributions),
    Interest: Math.round(y.interest),
  }));

  return (
    <CalculatorPageWrapper slug="compound-interest-calculator">
      <CalculatorShell
        title="Compound Interest Calculator"
        description="See how your money grows over time with compound interest and regular contributions."
        inputs={
          <>
            <InputField label="Initial Principal" value={principal} onChange={setPrincipal} prefix="$" min={0} />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} suffix="%" min={0} step={0.1} />
            <InputField label="Years" value={years} onChange={setYears} min={0} max={50} />
            <SelectField label="Compounding Frequency" value={frequency} onChange={setFrequency} options={[
              { value: '1', label: 'Annually' },
              { value: '2', label: 'Semi-Annually' },
              { value: '4', label: 'Quarterly' },
              { value: '12', label: 'Monthly' },
              { value: '365', label: 'Daily' },
            ]} />
            <InputField label="Monthly Contribution" value={contribution} onChange={setContribution} prefix="$" min={0} />
            <SelectField label="Contribution Timing" value={timing} onChange={setTiming} options={[
              { value: 'end', label: 'End of Period' },
              { value: 'beginning', label: 'Beginning of Period' },
            ]} />
          </>
        }
        results={
          <>
            <div className="space-y-3">
              <ResultCard label="Final Amount" value={formatCurrency(result?.finalAmount ?? 0)} primary />
              <div className="grid grid-cols-2 gap-3">
                <ResultCard label="Total Contributions" value={formatCurrency(result?.totalContributions ?? 0)} icon={<DollarSign className="h-3.5 w-3.5 text-slate-400" />} />
                <ResultCard label="Total Interest" value={formatCurrency(result?.totalInterest ?? 0)} icon={<TrendingUp className="h-3.5 w-3.5 text-green-500" />} />
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
                    <Area type="monotone" dataKey="Contributions" stackId="1" stroke="#3182ce" fill="#3182ce" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="Interest" stackId="1" stroke="#38a169" fill="#38a169" fillOpacity={0.3} />
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
