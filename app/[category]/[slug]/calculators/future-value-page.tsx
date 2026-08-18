'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { SelectField } from '@/components/calculators/select-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateFutureValue } from '@/lib/calculators/future-value';
import { formatCurrency } from '@/lib/utils/formatters';

export function FutureValuePage() {
  const [pv, setPv] = useState('10000');
  const [rate, setRate] = useState('6');
  const [years, setYears] = useState('10');
  const [pmt, setPmt] = useState('200');
  const [freq, setFreq] = useState('12');
  const [timing, setTiming] = useState('end');

  const result = useMemo(() => {
    try {
      return calculateFutureValue({ presentValue: parseFloat(pv) || 0, annualRate: parseFloat(rate) || 0, years: parseInt(years) || 0, periodicPayment: parseFloat(pmt) || 0, paymentFrequency: parseInt(freq) || 12, paymentTiming: timing as 'end' | 'beginning' });
    } catch { return null; }
  }, [pv, rate, years, pmt, freq, timing]);

  return (
    <CalculatorPageWrapper
      slug="future-value-calculator"
      formula="FV = PV × (1+r)^n + PMT × [(1+r)^n - 1] / r"
      formulaExplanation="For beginning-of-period payments, multiply the annuity portion by (1+r). r = rate per period, n = total periods."
      workedExample={`Present Value: $10,000 | Rate: 6% | Years: 10\nMonthly payment: $200 (end of period)\n\nFV of lump sum: ~$18,194\nFV of payments: ~$32,776\nTotal: ~$50,970`}
      whenToUse="Use when you want to know the future value of current assets plus periodic investments over time."
      assumptions={['Constant rate.', 'Regular payments.', 'No taxes or fees.']}
      commonMistakes={['Confusing payment frequency with compounding frequency.', 'Not matching payment timing (beginning vs end of period) to your actual situation.']}
      faqs={[
        { question: 'What is the time value of money?', answer: 'Money today is worth more than the same amount in the future due to its earning potential. Future value calculations quantify this difference.' },
      ]}
    >
      <CalculatorShell
        title="Future Value Calculator"
        description="Calculate the future value of an investment or savings plan with periodic payments."
        inputs={<>
          <InputField label="Present Value" value={pv} onChange={setPv} prefix="$" min={0} />
          <InputField label="Annual Rate" value={rate} onChange={setRate} suffix="%" step={0.1} />
          <InputField label="Years" value={years} onChange={setYears} min={0} max={50} />
          <InputField label="Periodic Payment" value={pmt} onChange={setPmt} prefix="$" />
          <SelectField label="Payment Frequency" value={freq} onChange={setFreq} options={[
            { value: '1', label: 'Annually' }, { value: '4', label: 'Quarterly' }, { value: '12', label: 'Monthly' },
          ]} />
          <SelectField label="Payment Timing" value={timing} onChange={setTiming} options={[
            { value: 'end', label: 'End of Period' }, { value: 'beginning', label: 'Beginning of Period' },
          ]} />
        </>}
        results={
          <div className="space-y-3">
            <ResultCard label="Future Value" value={formatCurrency(result?.futureValue ?? 0)} primary />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Total Contributions" value={formatCurrency(result?.totalContributions ?? 0)} />
              <ResultCard label="Total Growth" value={formatCurrency(result?.totalGrowth ?? 0)} />
            </div>
          </div>
        }
      />
    </CalculatorPageWrapper>
  );
}
