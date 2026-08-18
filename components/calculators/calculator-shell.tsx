'use client';

import { ReactNode } from 'react';

interface CalculatorShellProps {
  title: string;
  description: string;
  inputs: ReactNode;
  results: ReactNode;
}

export function CalculatorShell({ title, description, inputs, results }: CalculatorShellProps) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-display font-bold text-[#1e3a5f] tracking-tight mb-2">{title}</h1>
      <p className="text-slate-600 mb-8 max-w-2xl">{description}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-xl bg-white border border-slate-200 p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
          <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">Inputs</h2>
          {inputs}
        </div>
        <div className="rounded-xl bg-[#f7fafc] border border-slate-200 p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
          <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">Results</h2>
          {results}
        </div>
      </div>
    </div>
  );
}
