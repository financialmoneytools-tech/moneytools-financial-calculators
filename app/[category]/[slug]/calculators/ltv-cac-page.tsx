'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateLtvCac } from '@/lib/calculators/ltv-cac';
import { formatCurrency, formatNumber } from '@/lib/utils/formatters';

export function LtvCacPage() {
  const [aov, setAov] = useState('100');
  const [freq, setFreq] = useState('4');
  const [margin, setMargin] = useState('60');
  const [churn, setChurn] = useState('20');
  const [spend, setSpend] = useState('10000');
  const [customers, setCustomers] = useState('100');

  const result = useMemo(() => {
    try {
      return calculateLtvCac({ averageOrderValue: parseFloat(aov) || 0, purchaseFrequency: parseFloat(freq) || 0, grossMarginPercent: parseFloat(margin) || 0, churnRate: parseFloat(churn) || 0, marketingSpend: parseFloat(spend) || 0, newCustomers: parseInt(customers) || 0 });
    } catch { return null; }
  }, [aov, freq, margin, churn, spend, customers]);

  return (
    <CalculatorPageWrapper
      slug="ltv-cac-calculator"
      formula="LTV = (AOV × Frequency × Gross Margin%) / Churn Rate\nCAC = Marketing Spend / New Customers\nRatio = LTV / CAC"
      formulaExplanation="LTV estimates the total gross profit from a customer over their lifetime. CAC is the average cost to acquire one customer. The ratio shows how efficiently you acquire customers."
      workedExample={`AOV: $100 | Frequency: 4x/year | Margin: 60% | Churn: 20%\nMarketing: $10,000 | New Customers: 100\n\nLTV = (100 × 4 × 0.60) / 0.20 = $1,200\nCAC = $10,000 / 100 = $100\nLTV:CAC = 12:1 (Healthy)`}
      whenToUse="Use to evaluate customer acquisition efficiency for subscription businesses, SaaS, e-commerce, or any business with repeat purchases."
      assumptions={['AOV, frequency, and margin are averages.', 'Churn is annual.', 'All marketing spend is for acquisition.']}
      commonMistakes={['Using revenue instead of gross profit for LTV.', 'Not including all acquisition costs in CAC.', 'Ignoring that LTV assumptions change over time.']}
      faqs={[
        { question: 'What is a good LTV:CAC ratio?', answer: 'A ratio of 3:1 or higher is generally considered healthy. Below 1:1 means you spend more to acquire customers than they generate in profit.' },
        { question: 'What is payback period?', answer: 'How many months it takes for a customer to generate enough gross profit to cover their acquisition cost.' },
      ]}
    >
      <CalculatorShell
        title="LTV:CAC Calculator"
        description="Calculate customer lifetime value, acquisition cost, and the LTV:CAC ratio."
        inputs={<>
          <InputField label="Average Order Value" value={aov} onChange={setAov} prefix="$" min={0} />
          <InputField label="Purchase Frequency (per year)" value={freq} onChange={setFreq} min={0} step={0.5} />
          <InputField label="Gross Margin" value={margin} onChange={setMargin} suffix="%" min={1} max={100} />
          <InputField label="Annual Churn Rate" value={churn} onChange={setChurn} suffix="%" min={1} max={100} />
          <InputField label="Total Marketing Spend" value={spend} onChange={setSpend} prefix="$" min={0} />
          <InputField label="New Customers Acquired" value={customers} onChange={setCustomers} min={1} />
        </>}
        results={
          <div className="space-y-3">
            <ResultCard label="LTV:CAC Ratio" value={`${(result?.ltvCacRatio ?? 0).toFixed(1)}:1`} primary />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Customer LTV" value={formatCurrency(result?.ltv ?? 0)} />
              <ResultCard label="CAC" value={formatCurrency(result?.cac ?? 0)} />
            </div>
            <ResultCard label="Payback Period" value={`${formatNumber(result?.paybackPeriodMonths ?? 0, 1)} months`} />
            {result?.interpretation && (
              <div className="mt-3 p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-600">
                {result.interpretation}
              </div>
            )}
          </div>
        }
      />
    </CalculatorPageWrapper>
  );
}
