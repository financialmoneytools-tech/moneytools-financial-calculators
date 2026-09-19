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
    <CalculatorPageWrapper slug="salary-calculator">
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
