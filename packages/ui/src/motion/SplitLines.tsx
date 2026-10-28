'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MOTION_TOKENS } from './tokens';

export interface SplitLinesProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
}

export const SplitLines: React.FC<SplitLinesProps> = ({
  lines,
  className = '',
  lineClassName = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className}>
        {lines.map((line, idx) => (
          <div key={idx} className={lineClassName}>
            {line}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {lines.map((line, idx) => (
        <div key={idx} className="overflow-hidden leading-[1.06]">
          <motion.div
            initial={{ y: '115%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: MOTION_TOKENS.durations.hero,
              delay: idx * 0.08,
              ease: MOTION_TOKENS.easeOut,
            }}
            className={lineClassName}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
};
