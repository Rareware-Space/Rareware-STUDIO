import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'emerald' | 'amber' | 'violet' | 'magenta' | 'indigo' | 'blue' | 'cyan' | 'orange' | 'lime' | 'gray';
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

const variantStyles: Record<string, string> = {
  teal: 'bg-teal/10 border-teal/30 text-teal',
  emerald: 'bg-emerald/10 border-emerald/30 text-emerald',
  amber: 'bg-amber/10 border-amber/30 text-amber',
  violet: 'bg-violet/10 border-violet/30 text-violet',
  magenta: 'bg-magenta/10 border-magenta/30 text-magenta',
  indigo: 'bg-indigo/10 border-indigo/30 text-indigo',
  blue: 'bg-blue/10 border-blue/30 text-blue',
  cyan: 'bg-cyan/10 border-cyan/30 text-cyan',
  orange: 'bg-orange/10 border-orange/30 text-orange',
  lime: 'bg-lime/10 border-lime/30 text-lime',
  gray: 'bg-white/5 border-white/10 text-gray-300',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'teal',
  size = 'sm',
  pulse = false,
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3.5 py-1 text-xs';
  const colorClass = variantStyles[variant] || variantStyles.teal;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-medium tracking-wide uppercase ${sizeClasses} ${colorClass} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {children}
    </span>
  );
};
