'use client';

import { ReactNode } from 'react';

interface ResultCardProps {
  label: string;
  value: string;
  sublabel?: string;
  primary?: boolean;
  icon?: ReactNode;
}

export function ResultCard({ label, value, sublabel, primary, icon }: ResultCardProps) {
  return (
    <div
      className={`rounded-lg p-4 ${
        primary
          ? 'bg-[#1e3a5f] text-white'
          : 'bg-white border border-slate-200'
      }`}
      style={{ boxShadow: primary ? 'none' : 'var(--shadow-sm)' }}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className={`text-xs font-medium uppercase tracking-wider ${
          primary ? 'text-blue-200' : 'text-slate-500'
        }`}>
          {label}
        </span>
      </div>
      <div className={`text-2xl font-bold font-mono tabular-nums ${
        primary ? 'text-white' : 'text-[#1e3a5f]'
      }`}>
        {value}
      </div>
      {sublabel && (
        <div className={`text-xs mt-1 ${primary ? 'text-blue-200' : 'text-slate-400'}`}>
          {sublabel}
        </div>
      )}
    </div>
  );
}
