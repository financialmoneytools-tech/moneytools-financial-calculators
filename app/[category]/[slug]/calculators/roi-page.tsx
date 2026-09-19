'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateRoi } from '@/lib/calculators/roi';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';

export function RoiPage() {
  const [investment, setInvestment] = useState('10000');
  const [finalValue, setFinalValue] = useState('15000');
  const [years, setYears] = useState('3');

  const result = useMemo(() => {
    try {
      return calculateRoi({
        initialInvestment: parseFloat(investment) || 0,
        finalValue: parseFloat(finalValue) || 0,
        years: parseFloat(years) || undefined,
      });
    } catch { return null; }
  }, [investment, finalValue, years]);

  return (
    <CalculatorPageWrapper slug="roi-calculator">
      <CalculatorShell
        title="ROI Calculator"
        description="Calculate the return on investment and annualized ROI for any investment."
        inputs={
          <>
            <InputField label="Initial Investment" value={investment} onChange={setInvestment} prefix="$" min={0} />
            <InputField label="Final Value" value={finalValue} onChange={setFinalValue} prefix="$" />
            <InputField label="Time Period (Years)" value={years} onChange={setYears} min={0} step={0.5} helperText="Leave at 0 for total ROI only" />
          </>
        }
        results={
          <div className="space-y-3">
            <ResultCard label="Total ROI" value={formatPercent(result?.roi ?? 0)} primary />
            {result?.annualizedRoi !== null && result?.annualizedRoi !== undefined && (
              <ResultCard label="Annualized ROI" value={formatPercent(result.annualizedRoi)} />
            )}
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Net Profit" value={formatCurrency(result?.netProfit ?? 0)} />
              <ResultCard label="Total Return" value={formatCurrency(result?.totalReturn ?? 0)} />
            </div>
          </div>
        }
      />
    </CalculatorPageWrapper>
  );
}
