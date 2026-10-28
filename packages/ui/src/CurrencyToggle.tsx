'use client';

import React from 'react';
import { CurrencyMode } from './types';

export interface CurrencyToggleProps {
  mode: CurrencyMode;
  onChange: (mode: CurrencyMode) => void;
  className?: string;
}

export const CurrencyToggle: React.FC<CurrencyToggleProps> = ({
  mode,
  onChange,
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center rounded-xl border border-white/10 bg-panel p-1 font-mono text-xs ${className}`}
    >
      <button
        type="button"
        onClick={() => onChange('USD')}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition ${
          mode === 'USD'
            ? 'bg-white/15 text-white shadow-sm'
            : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <span>USD ($)</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('CRYPTO')}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition ${
          mode === 'CRYPTO'
            ? 'bg-teal/20 text-teal border border-teal/40 shadow-sm'
            : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <span className="h-2 w-2 rounded-full bg-teal" />
        <span>BNB / USDT</span>
      </button>
    </div>
  );
};

export function formatPrice(
  usdAmount: number,
  mode: CurrencyMode,
  bnbRate: number = 600
): { display: string; subtext: string } {
  if (mode === 'USD') {
    return {
      display: `$${usdAmount.toLocaleString('en-US')}`,
      subtext: 'Billed in USD via Safe / Wire',
    };
  }

  const bnbEquivalent = (usdAmount / bnbRate).toFixed(2);
  return {
    display: `${bnbEquivalent} BNB / ${usdAmount.toLocaleString()} USDT`,
    subtext: 'BSC (56/97) 18-Dec Safe Direct',
  };
}
