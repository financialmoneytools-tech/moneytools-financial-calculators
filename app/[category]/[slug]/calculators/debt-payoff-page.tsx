'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { SelectField } from '@/components/calculators/select-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateDebtPayoff, type DebtItem } from '@/lib/calculators/debt-payoff';
import { formatCurrency } from '@/lib/utils/formatters';
import { Plus, Trash2 } from 'lucide-react';

const defaultDebts: DebtItem[] = [
  { name: 'Credit Card', balance: 5000, rate: 18, minimumPayment: 150 },
  { name: 'Car Loan', balance: 10000, rate: 6, minimumPayment: 300 },
];

export function DebtPayoffPage() {
  const [debts, setDebts] = useState<DebtItem[]>(defaultDebts);
  const [extra, setExtra] = useState('200');
  const [strategy, setStrategy] = useState('avalanche');

  const updateDebt = (index: number, field: keyof DebtItem, value: string) => {
    setDebts(prev => {
      const next = [...prev];
      if (field === 'name') {
        next[index] = { ...next[index], name: value };
      } else {
        next[index] = { ...next[index], [field]: parseFloat(value) || 0 };
      }
      return next;
    });
  };

  const addDebt = () => {
    setDebts(prev => [...prev, { name: `Debt ${prev.length + 1}`, balance: 1000, rate: 10, minimumPayment: 50 }]);
  };

  const removeDebt = (index: number) => {
    setDebts(prev => prev.filter((_: DebtItem, i: number) => i !== index));
  };

  const result = useMemo(() => {
    try {
      if (debts.length === 0) return null;
      return calculateDebtPayoff({
        debts, extraPayment: parseFloat(extra) || 0,
        strategy: strategy as 'avalanche' | 'snowball',
      });
    } catch { return null; }
  }, [debts, extra, strategy]);

  return (
    <CalculatorPageWrapper
      slug="debt-payoff-calculator"
      formula="Avalanche: Pay minimums on all debts, apply extra to highest-rate debt first.\nSnowball: Pay minimums on all debts, apply extra to lowest-balance debt first."
      formulaExplanation="Both methods pay off all debts; avalanche minimizes total interest while snowball provides motivational quick wins by eliminating small balances first."
      workedExample={`Debts:\n- Credit Card: $5,000 at 18%, $150 min\n- Car Loan: $10,000 at 6%, $300 min\nExtra payment: $200/month\n\nAvalanche targets the credit card first (highest rate), then redirects all freed payments to the car loan.`}
      whenToUse="Use this calculator when you have multiple debts and want to create a strategic payoff plan. Compare both methods to choose what works best for your financial and psychological needs."
      assumptions={['Minimum payments and interest rates remain constant.', 'Extra payment is applied consistently every month.', 'Freed-up minimum payments from paid-off debts are redirected.']}
      commonMistakes={['Stopping extra payments after paying off one debt — redirect freed payments to the next debt.', 'Not accounting for minimum payments that don\'t cover interest on high-rate debts.']}
      faqs={[
        { question: 'Which method saves more money?', answer: 'The avalanche method (highest rate first) always saves more in total interest. The snowball method (lowest balance first) may keep motivation higher by providing quicker wins.' },
        { question: 'Should I use avalanche or snowball?', answer: 'If minimizing interest cost is your priority, use avalanche. If you need psychological wins to stay motivated, snowball can be more effective in practice.' },
      ]}
    >
      <CalculatorShell
        title="Debt Payoff Calculator"
        description="Compare avalanche and snowball methods to find the fastest debt payoff strategy."
        inputs={
          <div>
            {debts.map((debt: DebtItem, i: number) => (
              <div key={i} className="mb-4 p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <input
                    value={debt.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDebt(i, 'name', e.target.value)}
                    className="text-sm font-medium bg-transparent border-none outline-none text-[#1e3a5f]"
                  />
                  {debts.length > 1 && (
                    <button onClick={() => removeDebt(i)} className="text-slate-400 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div><label className="text-xs text-slate-500">Balance</label><input type="number" value={debt.balance} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDebt(i, 'balance', e.target.value)} className="w-full rounded border border-slate-300 px-2 py-1 text-xs font-mono" /></div>
                  <div><label className="text-xs text-slate-500">Rate %</label><input type="number" value={debt.rate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDebt(i, 'rate', e.target.value)} className="w-full rounded border border-slate-300 px-2 py-1 text-xs font-mono" /></div>
                  <div><label className="text-xs text-slate-500">Min PMT</label><input type="number" value={debt.minimumPayment} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDebt(i, 'minimumPayment', e.target.value)} className="w-full rounded border border-slate-300 px-2 py-1 text-xs font-mono" /></div>
                </div>
              </div>
            ))}
            <button onClick={addDebt} className="w-full rounded-lg border-2 border-dashed border-slate-300 py-2 text-sm text-slate-500 hover:border-[#3182ce] hover:text-[#3182ce] flex items-center justify-center gap-1 mb-4">
              <Plus className="h-4 w-4" /> Add Debt
            </button>
            <InputField label="Extra Monthly Payment" value={extra} onChange={setExtra} prefix="$" min={0} />
            <SelectField label="Payoff Strategy" value={strategy} onChange={setStrategy} options={[
              { value: 'avalanche', label: 'Avalanche (Highest Rate First)' },
              { value: 'snowball', label: 'Snowball (Lowest Balance First)' },
            ]} />
          </div>
        }
        results={
          <div className="space-y-3">
            <ResultCard label="Months to Debt-Free" value={`${result?.monthsToPayoff ?? 0} months`} primary />
            <ResultCard label="Total Interest Paid" value={formatCurrency(result?.totalInterestPaid ?? 0)} />
            {result?.payoffOrder && result.payoffOrder.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-[#1e3a5f] mb-2">Payoff Order</h3>
                <div className="space-y-2">
                  {result.payoffOrder.map((d, i: number) => (
                    <div key={i} className="flex justify-between text-xs p-2 rounded bg-white border border-slate-100">
                      <span className="font-medium">{d.name}</span>
                      <span className="text-slate-500">Month {d.payoffMonth} · {formatCurrency(d.interestPaid)} interest</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        }
      />
    </CalculatorPageWrapper>
  );
}
