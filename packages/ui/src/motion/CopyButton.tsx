'use client';

import React, { useState } from 'react';

export interface CopyButtonProps {
  textToCopy: string;
  defaultLabel?: string;
  copiedLabel?: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  defaultLabel = 'Copy email',
  copiedLabel = 'Copied ✓',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`relative inline-flex items-center justify-center font-mono text-xs transition-all duration-300 ${
        copied ? 'bg-teal text-void border-teal font-bold' : ''
      } ${className}`}
    >
      <span className="transition-transform duration-200">
        {copied ? copiedLabel : defaultLabel}
      </span>
    </button>
  );
};
