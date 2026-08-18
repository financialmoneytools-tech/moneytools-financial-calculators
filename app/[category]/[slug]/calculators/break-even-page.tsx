'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateBreakEven } from '@/lib/calculators/break-even';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils/formatters';

export function BreakEvenPage() {
  const [fixed, setFixed] = useState('10000');
  const [variable, setVariable] = useState('20');
  const [price, setPrice] = useState('50');
  const [target, setTarget] = useState('5000');

  const result = useMemo(() => {
    try {
      return calculateBreakEven({ fixedCosts: parseFloat(fixed) || 0, variableCostPerUnit: parseFloat(variable) || 0, pricePerUnit: parseFloat(price) || 0, targetProfit: parseFloat(target) || undefined });
    } catch { return null; }
  }, [fixed, variable, price, target]);

  return (
    <CalculatorPageWrapper
      slug="break-even-calculator"
      formula="Break-Even Units = Fixed Costs / (Price - Variable Cost per Unit)"
      formulaExplanation="The contribution margin per unit (Price - Variable Cost) is the amount each sale contributes toward covering fixed costs. Divide total fixed costs by this margin to find the break-even volume."
      workedExample={`Fixed Costs: $10,000 | Variable Cost: $20/unit | Price: $50/unit\n\nContribution Margin: $30/unit\nBreak-Even: 10,000 / 30 = 333.3 units\nBreak-Even Revenue: 333.3 × $50 = $16,667`}
      whenToUse="Use when planning a new product, evaluating pricing strategies, or determining the minimum sales volume needed to avoid losses."
      assumptions={['Costs are clearly separable into fixed and variable.', 'Price and costs are constant regardless of volume.', 'All units produced are sold.']}
      commonMistakes={['Not including all fixed costs (rent, salaries, subscriptions, etc.).', 'Confusing total cost with variable cost per unit.']}
      faqs={[
        { question: 'What is contribution margin?', answer: 'The amount each unit sold contributes toward covering fixed costs: Selling Price minus Variable Cost per Unit.' },
        { question: 'What if my variable cost exceeds price?', answer: 'You lose money on every unit sold and cannot break even. You must either raise prices or reduce variable costs.' },
      ]}
    >
      <CalculatorShell
        title="Break-Even Calculator"
        description="Find the sales volume needed to cover costs and start earning profit."
        inputs={<>
          <InputField label="Fixed Costs" value={fixed} onChange={setFixed} prefix="$" min={0} />
          <InputField label="Variable Cost per Unit" value={variable} onChange={setVariable} prefix="$" min={0} />
          <InputField label="Price per Unit" value={price} onChange={setPrice} prefix="$" min={0} />
          <InputField label="Target Profit (Optional)" value={target} onChange={setTarget} prefix="$" min={0} helperText="Units needed to reach this profit" />
        </>}
        results={
          <div className="space-y-3">
            <ResultCard label="Break-Even Units" value={formatNumber(result?.breakEvenUnits ?? 0, 1)} primary />
            <ResultCard label="Break-Even Revenue" value={formatCurrency(result?.breakEvenRevenue ?? 0)} />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Contribution Margin" value={formatCurrency(result?.contributionMargin ?? 0)} sublabel="per unit" />
              <ResultCard label="CM Ratio" value={formatPercent(result?.contributionMarginRatio ?? 0)} />
            </div>
            {result?.unitsForTargetProfit != null && (
              <ResultCard label="Units for Target Profit" value={formatNumber(result.unitsForTargetProfit, 1)} sublabel={`Revenue: ${formatCurrency(result.revenueForTargetProfit ?? 0)}`} />
            )}
          </div>
        }
      />
    </CalculatorPageWrapper>
  );
}
