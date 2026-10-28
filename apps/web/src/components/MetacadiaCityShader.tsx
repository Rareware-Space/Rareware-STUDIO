'use client';

import React, { useEffect, useRef } from 'react';

interface MetacadiaCityShaderProps {
  activeQuarter: 'arcade' | 'ai' | 'tournaments' | 'investor';
  className?: string;
}

export function MetacadiaCityShader({ activeQuarter, className = '' }: MetacadiaCityShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    const quarterColors = {
      arcade: { primary: '#00F5D4', secondary: '#22D3EE', rgb: '0, 245, 212' },
      ai: { primary: '#8B5CF6', secondary: '#A78BFA', rgb: '139, 92, 246' },
      tournaments: { primary: '#F59E0B', secondary: '#FBBF24', rgb: '245, 158, 11' },
      investor: { primary: '#3B82F6', secondary: '#60A5FA', rgb: '59, 130, 246' },
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 420;
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      time += 0.02;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const w = canvas.width;
      const h = canvas.height;
      const theme = quarterColors[activeQuarter] || quarterColors.arcade;

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
      horizonGlow.addColorStop(0, `rgba(${theme.rgb}, 0.35)`);
      horizonGlow.addColorStop(0.5, `rgba(${theme.rgb}, 0.08)`);
      horizonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, 0, w, h);

      // 3D Perspective Grid (Tron/Avark Cyber Floor)
      ctx.save();
      const vanishingX = w / 2 + mouseX * 60;
      const vanishingY = horizonY;

      ctx.strokeStyle = `rgba(${theme.rgb}, 0.22)`;
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
        const z = ((i + (time * 0.5) % 1) / lineCount);
        const y = vanishingY + Math.pow(z, 2.2) * (h - vanishingY);
        const alpha = Math.min(1, z * 1.5) * 0.28;

        ctx.strokeStyle = `rgba(${theme.rgb}, ${alpha})`;
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
        bGrad.addColorStop(0, `rgba(${theme.rgb}, 0.18)`);
        bGrad.addColorStop(1, 'rgba(9, 11, 16, 0.95)');
        ctx.fillStyle = bGrad;
        ctx.fillRect(bx, by, bw, bh);

        // Building Edge Highlights
        ctx.strokeStyle = `rgba(${theme.rgb}, 0.35)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, by, bw, bh);

        // Rooftop Beacon Antennas
        if (b % 2 === 0) {
          ctx.beginPath();
          ctx.moveTo(bx + bw / 2, by);
          ctx.lineTo(bx + bw / 2, by - 16);
          ctx.strokeStyle = theme.primary;
          ctx.stroke();

          // Pulsing Beacon Light
          const beaconAlpha = Math.abs(Math.sin(time * 3 + b));
          ctx.fillStyle = `rgba(${theme.rgb}, ${beaconAlpha})`;
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
        const px = ((Math.sin(p * 99 + time * 0.3) * 0.5 + 0.5) * w);
        const py = ((Math.cos(p * 33 + time * 0.2) * 0.5 + 0.5) * h);
        const pSize = (p % 3) + 1;
        const pAlpha = (Math.sin(time + p) * 0.5 + 0.5) * 0.6;

        ctx.fillStyle = `rgba(${theme.rgb}, ${pAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, [activeQuarter]);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-panel via-transparent to-transparent opacity-90" />
    </div>
  );
}
