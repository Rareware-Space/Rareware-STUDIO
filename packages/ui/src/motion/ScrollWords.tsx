'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export interface ScrollWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

export const ScrollWords: React.FC<ScrollWordsProps> = ({
  text,
  className = '',
  wordClassName = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 45%'],
  });

  if (shouldReduceMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={containerRef} className={`flex flex-wrap gap-x-[0.3em] gap-y-1 ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.22, 1]);

        return (
          <motion.span
            key={i}
            style={{ opacity }}
            className={`inline-block transition-colors ${wordClassName}`}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};
