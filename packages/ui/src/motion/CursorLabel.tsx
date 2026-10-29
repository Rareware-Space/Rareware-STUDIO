'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const CursorLabel: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = (e.target as HTMLElement)?.closest('[data-cursor]');
      if (target) {
        setLabel(target.getAttribute('data-cursor'));
      } else {
        setLabel(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion || !label) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] px-3 py-1 rounded-full bg-teal text-void font-mono text-[11px] font-bold shadow-xl shadow-teal/30 -translate-x-1/2 -translate-y-1/2"
      animate={{ x: pos.x + 16, y: pos.y + 16 }}
      transition={{ type: 'spring', stiffness: 450, damping: 28, mass: 0.1 }}
    >
      {label}
    </motion.div>
  );
};
