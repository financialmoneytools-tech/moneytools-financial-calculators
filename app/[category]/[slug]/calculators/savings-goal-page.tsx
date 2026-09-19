'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateSavingsGoal } from '@/lib/calculators/savings-goal';
import { formatCurrency } from '@/lib/utils/formatters';

export function SavingsGoalPage() {
  const [goal, setGoal] = useState('50000');
  const [current, setCurrent] = useState('5000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('10');

  const result = useMemo(() => {
    try {
      return calculateSavingsGoal({ goalAmount: parseFloat(goal) || 0, currentSavings: parseFloat(current) || 0, annualRate: parseFloat(rate) || 0, years: parseFloat(years) || 0 });
    } catch { return null; }
  }, [goal, current, rate, years]);

  return (
    <CalculatorPageWrapper slug="savings-goal-calculator">
      <CalculatorShell
        title="Savings Goal Calculator"
        description="Find out how much to save each month to reach your financial goal."
        inputs={<>
          <InputField label="Goal Amount" value={goal} onChange={setGoal} prefix="$" min={0} />
          <InputField label="Current Savings" value={current} onChange={setCurrent} prefix="$" min={0} />
          <InputField label="Annual Interest Rate" value={rate} onChange={setRate} suffix="%" step={0.1} />
          <InputField label="Time to Goal (Years)" value={years} onChange={setYears} min={1} max={50} />
        </>}
        results={
          <div className="space-y-3">
            <ResultCard label="Required Monthly Savings" value={formatCurrency(result?.requiredMonthlySavings ?? 0)} primary />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Total Contributions" value={formatCurrency(result?.totalContributions ?? 0)} />
              <ResultCard label="Interest Earned" value={formatCurrency(result?.totalInterest ?? 0)} />
            </div>
            <ResultCard label="Months to Goal" value={`${result?.monthsToGoal ?? 0} months`} />
          </div>
        }
      />
    </CalculatorPageWrapper>
  );
}
