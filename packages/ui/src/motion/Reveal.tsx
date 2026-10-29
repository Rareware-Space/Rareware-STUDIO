'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MOTION_TOKENS } from './tokens';

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  duration = MOTION_TOKENS.durations.reveal,
  yOffset = 24,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={MOTION_TOKENS.inViewDefaults}
      transition={{
        duration,
        delay,
        ease: MOTION_TOKENS.easeOut,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
