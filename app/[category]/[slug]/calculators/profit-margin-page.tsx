'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateProfitMargin } from '@/lib/calculators/profit-margin';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function ProfitMarginPage() {
  const [revenue, setRevenue] = useState('100000');
  const [cogs, setCogs] = useState('60000');
  const [opex, setOpex] = useState('20000');
  const [other, setOther] = useState('5000');

  const result = useMemo(() => {
    try {
      return calculateProfitMargin({ revenue: parseFloat(revenue) || 0, cogs: parseFloat(cogs) || 0, operatingExpenses: parseFloat(opex) || 0, otherExpenses: parseFloat(other) || 0 });
    } catch { return null; }
  }, [revenue, cogs, opex, other]);

  const chartData = result ? [
    { name: 'Gross', margin: parseFloat(result.grossMargin.toFixed(1)) },
    { name: 'Operating', margin: parseFloat(result.operatingMargin.toFixed(1)) },
    { name: 'Net', margin: parseFloat(result.netMargin.toFixed(1)) },
  ] : [];

  return (
    <CalculatorPageWrapper slug="profit-margin-calculator">
      <CalculatorShell
        title="Profit Margin Calculator"
        description="Calculate gross, operating, and net profit margins from your revenue data."
        inputs={<>
          <InputField label="Revenue" value={revenue} onChange={setRevenue} prefix="$" min={0} />
          <InputField label="Cost of Goods Sold (COGS)" value={cogs} onChange={setCogs} prefix="$" min={0} />
          <InputField label="Operating Expenses" value={opex} onChange={setOpex} prefix="$" min={0} />
          <InputField label="Other Expenses" value={other} onChange={setOther} prefix="$" min={0} />
        </>}
        results={<>
          <div className="space-y-3">
            <ResultCard label="Net Profit" value={formatCurrency(result?.netProfit ?? 0)} primary sublabel={`${formatPercent(result?.netMargin ?? 0)} net margin`} />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Gross Profit" value={formatCurrency(result?.grossProfit ?? 0)} sublabel={formatPercent(result?.grossMargin ?? 0)} />
              <ResultCard label="Operating Profit" value={formatCurrency(result?.operatingProfit ?? 0)} sublabel={formatPercent(result?.operatingMargin ?? 0)} />
            </div>
          </div>
          {chartData.length > 0 && (
            <div className="mt-6 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 10 }} tickLine={false} domain={[0, 'auto']} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} tickLine={false} width={60} />
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <Bar dataKey="margin" fill="#3182ce" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>}
      />
    </CalculatorPageWrapper>
  );
}
