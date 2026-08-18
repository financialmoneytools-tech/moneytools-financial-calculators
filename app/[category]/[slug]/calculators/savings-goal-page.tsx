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
    <CalculatorPageWrapper
      slug="savings-goal-calculator"
      formula="PMT = (FV - PV(1+r)^n) × r / [(1+r)^n - 1]"
      formulaExplanation="Solves for the required monthly deposit to grow current savings to the goal amount at the given rate over the specified period."
      workedExample={`Goal: $50,000 | Current: $5,000 | Rate: 5% | Time: 10yr\n\nRequired monthly savings: ~$268/month`}
      whenToUse="Use when you have a specific savings target (emergency fund, down payment, vacation) and want to know how much to set aside each month."
      assumptions={['Rate is constant.', 'Contributions are consistent.', 'No withdrawals.']}
      commonMistakes={['Setting an unrealistically high rate assumption.', 'Not adjusting the goal for inflation if the target is many years away.']}
      faqs={[
        { question: 'What if I already have enough?', answer: 'If your current savings plus projected interest already exceed the goal, the calculator shows $0 required monthly savings.' },
      ]}
    >
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
