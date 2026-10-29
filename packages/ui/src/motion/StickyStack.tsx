'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface StickyStackCardProps {
  children: React.ReactNode;
  index: number;
  total: number;
  topOffset?: number;
  className?: string;
}

export const StickyStackCard: React.FC<StickyStackCardProps> = ({
  children,
  index,
  topOffset = 90,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={`relative mb-8 ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      className={`sticky ${className}`}
      style={{
        top: `${topOffset + index * 24}px`,
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};
