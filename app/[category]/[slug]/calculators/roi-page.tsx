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
    <CalculatorPageWrapper
      slug="roi-calculator"
      formula="ROI = (Net Profit / Cost of Investment) × 100"
      formulaExplanation="Net Profit = Final Value - Initial Investment. Annualized ROI = ((Final Value / Initial Investment)^(1/years) - 1) × 100, which normalizes returns over time."
      workedExample={`Investment: $10,000\nFinal Value: $15,000\nTime: 3 years\n\nROI = ($15,000 - $10,000) / $10,000 × 100 = 50%\nAnnualized ROI = (15000/10000)^(1/3) - 1 = 14.47%`}
      whenToUse="Use this calculator to evaluate the return on any investment, project, or business decision. Annualized ROI is especially useful when comparing investments held for different time periods."
      assumptions={['Returns are realized (not unrealized gains).', 'No additional costs or fees beyond the initial investment.', 'Time period is measured in years for annualization.']}
      commonMistakes={['Comparing ROI of investments with different time horizons without annualizing.', 'Ignoring fees, taxes, or opportunity costs.', 'Using ROI for investments with irregular cash flows (use IRR instead).']}
      faqs={[
        { question: 'What is a good ROI?', answer: 'There is no universal answer. It depends on the risk, time period, and alternatives available. Compare ROI against relevant benchmarks for your specific context.' },
        { question: 'What is annualized ROI?', answer: 'Annualized ROI normalizes the return to a per-year basis, making it possible to compare investments held for different time periods.' },
        { question: 'Is ROI the same as CAGR?', answer: 'Annualized ROI and CAGR use the same formula. ROI can also be expressed as a total (non-annualized) percentage.' },
      ]}
    >
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
