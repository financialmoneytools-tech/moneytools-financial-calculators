'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateMortgage } from '@/lib/calculators/mortgage';
import { formatCurrency } from '@/lib/utils/formatters';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function MortgagePage() {
  const [price, setPrice] = useState('300000');
  const [downPct, setDownPct] = useState('20');
  const [rate, setRate] = useState('6');
  const [term, setTerm] = useState('30');
  const [tax, setTax] = useState('3600');
  const [ins, setIns] = useState('1200');
  const [pmi, setPmi] = useState('0');

  const result = useMemo(() => {
    try {
      return calculateMortgage({
        homePrice: parseFloat(price) || 0, downPaymentPercent: parseFloat(downPct) || 0,
        annualRate: parseFloat(rate) || 0, termYears: parseInt(term) || 1,
        propertyTaxAnnual: parseFloat(tax) || 0, homeInsuranceAnnual: parseFloat(ins) || 0,
        pmiMonthly: parseFloat(pmi) || 0,
      });
    } catch { return null; }
  }, [price, downPct, rate, term, tax, ins, pmi]);

  const pieData = result ? [
    { name: 'Principal & Interest', value: Math.round(result.monthlyPrincipalInterest) },
    { name: 'Property Tax', value: Math.round(result.monthlyPropertyTax) },
    { name: 'Insurance', value: Math.round(result.monthlyInsurance) },
    ...(result.monthlyPmi > 0 ? [{ name: 'PMI', value: Math.round(result.monthlyPmi) }] : []),
  ] : [];
  const COLORS = ['#3182ce', '#38a169', '#d69e2e', '#e53e3e'];

  return (
    <CalculatorPageWrapper
      slug="mortgage-calculator"
      formula="M = P × [r(1+r)^n] / [(1+r)^n - 1]"
      formulaExplanation="Where P = loan amount (home price - down payment), r = monthly rate, n = total months. Total monthly payment adds property tax, insurance, and PMI."
      workedExample={`Home Price: $300,000 | Down: 20% ($60,000) | Loan: $240,000\nRate: 6% | Term: 30yr | Tax: $3,600/yr | Insurance: $1,200/yr\n\nP&I: $1,438.92/mo\nTax: $300/mo | Insurance: $100/mo\nTotal: $1,838.92/mo`}
      whenToUse="Use when planning a home purchase to understand your full monthly housing cost, including principal, interest, taxes, insurance, and PMI."
      assumptions={['Fixed interest rate.', 'Property tax and insurance are estimated annual amounts.', 'PMI applies if down payment < 20%.']}
      commonMistakes={['Only looking at principal and interest — taxes and insurance add significant cost.', 'Forgetting PMI when putting less than 20% down.', 'Not factoring in maintenance, HOA fees, and other homeownership costs.']}
      faqs={[
        { question: 'What is PMI?', answer: 'Private Mortgage Insurance is typically required when your down payment is less than 20%. It protects the lender (not you) if you default. It can be removed once you reach 20% equity.' },
        { question: 'Should I put 20% down?', answer: 'A 20% down payment eliminates PMI and reduces your loan amount, but it is not always required. Weigh the savings against the opportunity cost of tying up capital.' },
      ]}
    >
      <CalculatorShell
        title="Mortgage Calculator"
        description="Estimate monthly mortgage payments including taxes, insurance, and PMI."
        inputs={
          <>
            <InputField label="Home Price" value={price} onChange={setPrice} prefix="$" min={0} />
            <InputField label="Down Payment" value={downPct} onChange={setDownPct} suffix="%" min={0} max={99} step={1} />
            <InputField label="Interest Rate" value={rate} onChange={setRate} suffix="%" step={0.125} />
            <InputField label="Loan Term (Years)" value={term} onChange={setTerm} min={1} max={40} />
            <InputField label="Annual Property Tax" value={tax} onChange={setTax} prefix="$" />
            <InputField label="Annual Home Insurance" value={ins} onChange={setIns} prefix="$" />
            <InputField label="Monthly PMI" value={pmi} onChange={setPmi} prefix="$" helperText="Set to 0 if down payment ≥ 20%" />
          </>
        }
        results={
          <>
            <div className="space-y-3">
              <ResultCard label="Total Monthly Payment" value={formatCurrency(result?.totalMonthlyPayment ?? 0)} primary />
              <div className="grid grid-cols-2 gap-3">
                <ResultCard label="Loan Amount" value={formatCurrency(result?.loanAmount ?? 0)} />
                <ResultCard label="Down Payment" value={formatCurrency(result?.downPaymentAmount ?? 0)} />
                <ResultCard label="P&I" value={formatCurrency(result?.monthlyPrincipalInterest ?? 0)} sublabel="per month" />
                <ResultCard label="Total Interest" value={formatCurrency(result?.totalInterest ?? 0)} sublabel="over loan life" />
              </div>
            </div>
            {pieData.length > 0 && (
              <div className="mt-6 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={65} dataKey="value" paddingAngle={2}>
                      {pieData.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        }
      />
    </CalculatorPageWrapper>
  );
}
