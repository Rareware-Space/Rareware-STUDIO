import React from 'react';

export interface BentoCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: 'teal' | 'amber' | 'violet' | 'blue' | 'orange' | 'lime' | 'gray';
  children?: React.ReactNode;
  footer?: React.ReactNode;
  accentHex?: string;
  className?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  title,
  subtitle,
  badge,
  badgeVariant: _badgeVariant,
  children,
  footer,
  accentHex = '#00F5D4',
  className = '',
}) => {
  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-panel p-6 transition-all duration-300 hover:border-white/20 hover:shadow-2xl ${className}`}
      style={{
        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.04)',
      }}
    >
      {/* Subtle Ambient Hover Glow */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
        style={{ backgroundColor: accentHex }}
      />

      <div>
        <div className="flex items-center justify-between gap-2">
          {badge && (
            <span
              className="inline-flex items-center rounded-md px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase border"
              style={{
                color: accentHex,
                borderColor: `${accentHex}40`,
                backgroundColor: `${accentHex}15`,
              }}
            >
              {badge}
            </span>
          )}
        </div>

        <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-white group-hover:text-white">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-4">{children}</div>}
      </div>

      {footer && <div className="mt-6 border-t border-white/5 pt-4">{footer}</div>}
    </div>
  );
};
