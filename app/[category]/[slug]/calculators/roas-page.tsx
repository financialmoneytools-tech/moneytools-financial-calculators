'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateRoas } from '@/lib/calculators/roas';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';

export function RoasPage() {
  const [spend, setSpend] = useState('1000');
  const [revenue, setRevenue] = useState('4000');
  const [margin, setMargin] = useState('50');

  const result = useMemo(() => {
    try { return calculateRoas({ adSpend: parseFloat(spend) || 0, revenue: parseFloat(revenue) || 0, grossMarginPercent: parseFloat(margin) || 0 }); }
    catch { return null; }
  }, [spend, revenue, margin]);

  return (
    <CalculatorPageWrapper
      slug="roas-calculator"
      formula="ROAS = Revenue / Ad Spend\nBreak-Even ROAS = 1 / Gross Margin %"
      formulaExplanation="ROAS measures revenue generated per dollar of ad spend. Break-even ROAS tells you the minimum ROAS needed to cover product costs."
      workedExample={`Ad Spend: $1,000 | Revenue: $4,000 | Gross Margin: 50%\n\nROAS: 4.0x\nBreak-Even ROAS: 2.0x\nProfit: $4,000 × 50% - $1,000 = $1,000\nROI: 100%`}
      whenToUse="Use to evaluate the profitability of advertising campaigns. Compare ROAS against your break-even ROAS to determine if ads are profitable."
      assumptions={['All revenue is attributable to the ad spend.', 'Gross margin is consistent.']}
      commonMistakes={['Looking at ROAS without considering gross margin.', 'Not accounting for customer acquisition costs beyond ad spend.']}
      faqs={[
        { question: 'What is a good ROAS?', answer: 'It depends on your gross margin. A ROAS above your break-even ROAS is profitable. For 50% margins, a ROAS above 2x is profitable.' },
        { question: 'How is ROAS different from ROI?', answer: 'ROAS measures revenue per ad dollar. ROI measures profit per ad dollar, accounting for product costs.' },
      ]}
    >
      <CalculatorShell
        title="ROAS Calculator"
        description="Calculate return on ad spend and determine if your advertising is profitable."
        inputs={<>
          <InputField label="Ad Spend" value={spend} onChange={setSpend} prefix="$" min={0} />
          <InputField label="Revenue from Ads" value={revenue} onChange={setRevenue} prefix="$" min={0} />
          <InputField label="Gross Margin" value={margin} onChange={setMargin} suffix="%" min={1} max={100} />
        </>}
        results={
          <div className="space-y-3">
            <ResultCard label="ROAS" value={`${(result?.roas ?? 0).toFixed(2)}x`} primary />
            <ResultCard label="Break-Even ROAS" value={`${(result?.breakEvenRoas ?? 0).toFixed(2)}x`} sublabel={`You need at least this to be profitable`} />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Profit" value={formatCurrency(result?.profit ?? 0)} />
              <ResultCard label="ROI" value={formatPercent(result?.roi ?? 0)} />
            </div>
          </div>
        }
      />
    </CalculatorPageWrapper>
  );
}
