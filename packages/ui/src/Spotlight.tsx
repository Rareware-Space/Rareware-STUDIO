'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface SpotlightProps {
  color?: string;
  size?: number;
  className?: string;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  color = 'rgba(0, 245, 212, 0.08)',
  size = 500,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 ${className}`}
      style={{
        background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 80%)`,
      }}
    />
  );
};
