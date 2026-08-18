'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { SelectField } from '@/components/calculators/select-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateSalary, type PayPeriod } from '@/lib/calculators/salary';
import { formatCurrency } from '@/lib/utils/formatters';

export function SalaryPage() {
  const [amount, setAmount] = useState('52000');
  const [period, setPeriod] = useState('annual');
  const [hours, setHours] = useState('40');
  const [weeks, setWeeks] = useState('52');

  const result = useMemo(() => {
    try {
      return calculateSalary({ amount: parseFloat(amount) || 0, fromPeriod: period as PayPeriod, hoursPerWeek: parseFloat(hours) || 40, weeksPerYear: parseFloat(weeks) || 52 });
    } catch { return null; }
  }, [amount, period, hours, weeks]);

  const rows: { label: string; key: keyof NonNullable<typeof result> }[] = [
    { label: 'Hourly', key: 'hourly' },
    { label: 'Daily', key: 'daily' },
    { label: 'Weekly', key: 'weekly' },
    { label: 'Bi-Weekly', key: 'biWeekly' },
    { label: 'Semi-Monthly', key: 'semiMonthly' },
    { label: 'Monthly', key: 'monthly' },
    { label: 'Annual', key: 'annual' },
  ];

  return (
    <CalculatorPageWrapper
      slug="salary-calculator"
      formula="Annual = Hourly × Hours/Week × Weeks/Year\nHourly = Annual / (Hours/Week × Weeks/Year)"
      formulaExplanation="Conversions use standard work year assumptions. Daily assumes hours/week ÷ 8 work days per week. Semi-monthly = 24 pay periods per year."
      workedExample={`Annual Salary: $52,000 | 40 hrs/week | 52 weeks/year\n\nHourly: $25.00\nDaily: $200.00\nWeekly: $1,000.00\nBi-Weekly: $2,000.00\nSemi-Monthly: $2,166.67\nMonthly: $4,333.33`}
      whenToUse="Use when comparing job offers with different pay structures, converting between hourly and salaried compensation, or budgeting based on pay frequency."
      assumptions={['Consistent hours worked per week.', 'All figures are gross (pre-tax).', 'Daily rate assumes standard work hours.', 'No overtime, bonuses, or benefits included.']}
      commonMistakes={['Forgetting that gross salary differs from take-home pay after taxes.', 'Not adjusting hours for part-time work.', 'Ignoring the value of benefits (health insurance, retirement matching, PTO) when comparing offers.']}
      faqs={[
        { question: 'Does this include taxes?', answer: 'No. All amounts shown are gross (pre-tax). Your take-home pay will be lower after federal, state, and local taxes, plus deductions.' },
        { question: 'What about overtime?', answer: 'This calculator assumes regular hours only. Overtime is typically paid at 1.5x the hourly rate in many jurisdictions.' },
        { question: 'How is daily rate calculated?', answer: 'Daily rate = Weekly rate / work days per week, where work days = hours per week / 8.' },
      ]}
    >
      <CalculatorShell
        title="Salary Calculator"
        description="Convert salary between hourly, weekly, monthly, and annual pay periods. All results are gross (pre-tax)."
        inputs={<>
          <InputField label="Amount" value={amount} onChange={setAmount} prefix="$" min={0} />
          <SelectField label="Pay Period" value={period} onChange={setPeriod} options={[
            { value: 'hourly', label: 'Hourly' }, { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' }, { value: 'biWeekly', label: 'Bi-Weekly' },
            { value: 'semiMonthly', label: 'Semi-Monthly' }, { value: 'monthly', label: 'Monthly' },
            { value: 'annual', label: 'Annual' },
          ]} />
          <InputField label="Hours per Week" value={hours} onChange={setHours} min={1} max={168} />
          <InputField label="Weeks per Year" value={weeks} onChange={setWeeks} min={1} max={52} />
        </>}
        results={
          <div className="space-y-2">
            {rows.map((row) => (
              <ResultCard
                key={row.key}
                label={row.label}
                value={formatCurrency(result?.[row.key] as number ?? 0)}
                primary={row.key === period}
              />
            ))}
          </div>
        }
      />
    </CalculatorPageWrapper>
  );
}
