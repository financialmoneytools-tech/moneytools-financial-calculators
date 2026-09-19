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
    <CalculatorPageWrapper slug="markup-calculator">
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
