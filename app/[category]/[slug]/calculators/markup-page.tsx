'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateMarkup } from '@/lib/calculators/markup';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';

export function MarkupPage() {
  const [cost, setCost] = useState('50');
  const [selling, setSelling] = useState('75');

  const result = useMemo(() => {
    try { return calculateMarkup({ cost: parseFloat(cost) || 0, sellingPrice: parseFloat(selling) || undefined }); }
    catch { return null; }
  }, [cost, selling]);

  return (
    <CalculatorPageWrapper
      slug="markup-calculator"
      formula="Markup = (Selling Price - Cost) / Cost × 100\nMargin = (Selling Price - Cost) / Selling Price × 100"
      formulaExplanation="Markup is based on cost; margin is based on selling price. A 50% markup is equivalent to a 33.3% margin."
      workedExample={`Cost: $50 | Selling Price: $75\n\nMarkup = ($75 - $50) / $50 × 100 = 50%\nMargin = ($75 - $50) / $75 × 100 = 33.3%\nProfit: $25`}
      whenToUse="Use to set prices, understand the relationship between markup and margin, or convert between the two."
      assumptions={['Single product pricing.', 'No volume discounts or variable pricing.']}
      commonMistakes={['Confusing markup with margin — a 50% markup is NOT a 50% margin.', 'Setting markup too low to cover overhead costs.']}
      faqs={[
        { question: 'What is the difference between markup and margin?', answer: 'Markup is the percentage increase over cost. Margin is the percentage of the selling price that is profit. They use different denominators.' },
        { question: 'How do I convert markup to margin?', answer: 'Margin = Markup / (1 + Markup). For example, 50% markup = 50 / 150 = 33.3% margin.' },
      ]}
    >
      <CalculatorShell
        title="Markup Calculator"
        description="Calculate markup percentage, profit margin, and selling price from cost."
        inputs={<>
          <InputField label="Cost" value={cost} onChange={setCost} prefix="$" min={0} />
          <InputField label="Selling Price" value={selling} onChange={setSelling} prefix="$" min={0} />
        </>}
        results={
          <div className="space-y-3">
            <ResultCard label="Markup" value={formatPercent(result?.markup ?? 0)} primary />
            <ResultCard label="Profit Margin" value={formatPercent(result?.margin ?? 0)} />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Profit" value={formatCurrency(result?.profit ?? 0)} />
              <ResultCard label="Selling Price" value={formatCurrency(result?.sellingPrice ?? 0)} />
            </div>
          </div>
        }
      />
    </CalculatorPageWrapper>
  );
}
