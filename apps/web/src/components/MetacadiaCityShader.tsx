'use client';

import React, { useEffect, useRef } from 'react';

export type MetacadiaQuarter = 'arcade' | 'ai' | 'tournaments' | 'investor';

interface MetacadiaCityShaderProps {
  activeQuarter: MetacadiaQuarter;
  className?: string;
}

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

interface QuarterTheme {
  primaryRGB: ColorRGB;
  secondaryRGB: ColorRGB;
  primaryHex: string;
  secondaryHex: string;
}

const QUARTER_THEMES: Record<MetacadiaQuarter, QuarterTheme> = {
  arcade: {
    primaryRGB: { r: 0, g: 245, b: 212 }, // #00F5D4 Teal
    secondaryRGB: { r: 34, g: 211, b: 238 }, // #22D3EE Cyan
    primaryHex: '#00F5D4',
    secondaryHex: '#22D3EE',
  },
  ai: {
    primaryRGB: { r: 139, g: 92, b: 246 }, // #8B5CF6 Violet
    secondaryRGB: { r: 167, g: 139, b: 250 }, // #A78BFA Light Violet
    primaryHex: '#8B5CF6',
    secondaryHex: '#A78BFA',
  },
  tournaments: {
    primaryRGB: { r: 245, g: 158, b: 11 }, // #F59E0B Amber
    secondaryRGB: { r: 251, g: 191, b: 36 }, // #FBBF24 Gold
    primaryHex: '#F59E0B',
    secondaryHex: '#FBBF24',
  },
  investor: {
    primaryRGB: { r: 59, g: 130, b: 246 }, // #3B82F6 Blue
    secondaryRGB: { r: 96, g: 165, b: 250 }, // #60A5FA Light Blue
    primaryHex: '#3B82F6',
    secondaryHex: '#60A5FA',
  },
};

export function MetacadiaCityShader({ activeQuarter, className = '' }: MetacadiaCityShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeQuarterRef = useRef<MetacadiaQuarter>(activeQuarter);

  // Keep quarter ref in sync without tearing down the canvas rendering context
  useEffect(() => {
    activeQuarterRef.current = activeQuarter;
  }, [activeQuarter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    // High-DPI / Retina devicePixelRatio scaling
    const dpr = typeof window !== 'undefined' ? Math.max(1, Math.min(3, window.devicePixelRatio || 1)) : 1;
    let cssWidth = 0;
    let cssHeight = 0;

    // Smooth RGB color lerping state
    const initialTheme = QUARTER_THEMES[activeQuarter] || QUARTER_THEMES.arcade;
    const currentPrimary: ColorRGB = { ...initialTheme.primaryRGB };
    const currentSecondary: ColorRGB = { ...initialTheme.secondaryRGB };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      cssWidth = parent.clientWidth || 800;
      cssHeight = parent.clientHeight || 420;

      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
    };

    resize();
    window.addEventListener('resize', resize);

    const resizeObserver = typeof ResizeObserver !== 'undefined' && canvas.parentElement
      ? new ResizeObserver(() => resize())
      : null;
    if (resizeObserver && canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const render = () => {
      time += 0.02;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Color lerp calculation
      const targetTheme = QUARTER_THEMES[activeQuarterRef.current] || QUARTER_THEMES.arcade;
      const lerpSpeed = 0.06; // Buttery smooth ~300ms transition between quarters

      currentPrimary.r += (targetTheme.primaryRGB.r - currentPrimary.r) * lerpSpeed;
      currentPrimary.g += (targetTheme.primaryRGB.g - currentPrimary.g) * lerpSpeed;
      currentPrimary.b += (targetTheme.primaryRGB.b - currentPrimary.b) * lerpSpeed;

      currentSecondary.r += (targetTheme.secondaryRGB.r - currentSecondary.r) * lerpSpeed;
      currentSecondary.g += (targetTheme.secondaryRGB.g - currentSecondary.g) * lerpSpeed;
      currentSecondary.b += (targetTheme.secondaryRGB.b - currentSecondary.b) * lerpSpeed;

      const prR = Math.round(currentPrimary.r);
      const prG = Math.round(currentPrimary.g);
      const prB = Math.round(currentPrimary.b);
      const primaryRgb = `${prR}, ${prG}, ${prB}`;
      const primaryCss = `rgb(${primaryRgb})`;

      const secR = Math.round(currentSecondary.r);
      const secG = Math.round(currentSecondary.g);
      const secB = Math.round(currentSecondary.b);
      const secondaryRgb = `${secR}, ${secG}, ${secB}`;

      const w = cssWidth;
      const h = cssHeight;

      ctx.save();
      // Apply Retina scaling transform
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Deep atmospheric background
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, 'rgba(5, 6, 8, 0.95)');
      skyGrad.addColorStop(0.5, 'rgba(14, 18, 26, 0.85)');
      skyGrad.addColorStop(1, 'rgba(9, 11, 16, 0.95)');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Distant Horizon Glow
      const horizonY = h * 0.55;
      const horizonGlow = ctx.createRadialGradient(
        w / 2 + mouseX * 80,
        horizonY,
        10,
        w / 2,
        horizonY,
        w * 0.65
      );
      horizonGlow.addColorStop(0, `rgba(${primaryRgb}, 0.35)`);
      horizonGlow.addColorStop(0.5, `rgba(${primaryRgb}, 0.08)`);
      horizonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, 0, w, h);

      // 3D Perspective Grid (Tron/Avark Cyber Floor)
      ctx.save();
      const vanishingX = w / 2 + mouseX * 60;
      const vanishingY = horizonY;

      ctx.strokeStyle = `rgba(${primaryRgb}, 0.22)`;
      ctx.lineWidth = 1;

      // Perspective Rays radiating from vanishing point
      const rayCount = 28;
      for (let i = 0; i <= rayCount; i++) {
        const spread = (i / rayCount - 0.5) * w * 2.8;
        ctx.beginPath();
        ctx.moveTo(vanishingX, vanishingY);
        ctx.lineTo(vanishingX + spread, h);
        ctx.stroke();
      }

      // Moving Horizontal Lines (depth simulation)
      const lineCount = 14;
      for (let i = 1; i <= lineCount; i++) {
        const z = (i + ((time * 0.5) % 1)) / lineCount;
        const y = vanishingY + Math.pow(z, 2.2) * (h - vanishingY);
        const alpha = Math.min(1, z * 1.5) * 0.28;

        ctx.strokeStyle = `rgba(${primaryRgb}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.restore();

      // Stylized 3D City Skyline Monoliths (Metacadia Towers)
      const buildingCount = 18;
      ctx.save();
      for (let b = 0; b < buildingCount; b++) {
        const bx = (b / buildingCount) * w * 1.1 - w * 0.05 + mouseX * 25 * (b % 3 === 0 ? 1 : -0.5);
        const bw = (w / buildingCount) * 0.72;
        const seedHeight = Math.sin(b * 12.5) * 0.5 + 0.5;
        const bh = 50 + seedHeight * (h * 0.38);
        const by = horizonY - bh;

        // Building Facet Gradient
        const bGrad = ctx.createLinearGradient(bx, by, bx + bw, by + bh);
        bGrad.addColorStop(0, `rgba(${primaryRgb}, 0.18)`);
        bGrad.addColorStop(1, 'rgba(9, 11, 16, 0.95)');
        ctx.fillStyle = bGrad;
        ctx.fillRect(bx, by, bw, bh);

        // Building Edge Highlights (Secondary Lerped Tint)
        ctx.strokeStyle = `rgba(${secondaryRgb}, 0.35)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, by, bw, bh);

        // Rooftop Beacon Antennas
        if (b % 2 === 0) {
          ctx.beginPath();
          ctx.moveTo(bx + bw / 2, by);
          ctx.lineTo(bx + bw / 2, by - 16);
          ctx.strokeStyle = primaryCss;
          ctx.stroke();

          // Pulsing Beacon Light
          const beaconAlpha = Math.abs(Math.sin(time * 3 + b));
          ctx.fillStyle = `rgba(${primaryRgb}, ${beaconAlpha})`;
          ctx.beginPath();
          ctx.arc(bx + bw / 2, by - 16, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // Floating Cyber Dust / Energy Particles
      ctx.save();
      const particleCount = 45;
      for (let p = 0; p < particleCount; p++) {
        const px = (Math.sin(p * 99 + time * 0.3) * 0.5 + 0.5) * w;
        const py = (Math.cos(p * 33 + time * 0.2) * 0.5 + 0.5) * h;
        const pSize = (p % 3) + 1;
        const pAlpha = (Math.sin(time + p) * 0.5 + 0.5) * 0.6;

        ctx.fillStyle = `rgba(${primaryRgb}, ${pAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.restore(); // Restore Retina transform matrix

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-panel via-transparent to-transparent opacity-90" />
    </div>
  );
}
