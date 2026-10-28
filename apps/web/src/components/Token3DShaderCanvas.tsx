'use client';

import React, { useEffect, useRef } from 'react';

interface Token3DShaderProps {
  className?: string;
  size?: number;
}

export function Token3DShaderCanvas({ className = '', size = 320 }: Token3DShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let angle = 0;
    let tiltX = 0;
    let tiltY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      targetTiltX = Math.max(-0.6, Math.min(0.6, x));
      targetTiltY = Math.max(-0.6, Math.min(0.6, y));
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      scrollSpeed = Math.min(0.08, delta * 0.002);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.38;

      ctx.clearRect(0, 0, w, h);

      // Smooth lerp tilt
      tiltX += (targetTiltX - tiltX) * 0.08;
      tiltY += (targetTiltY - tiltY) * 0.08;

      // Base rotation + scroll acceleration
      angle += 0.015 + scrollSpeed;
      scrollSpeed *= 0.94; // friction decay

      // 3D perspective projection parameters
      const cosA = Math.cos(angle + tiltX);
      const pitch = tiltY * 0.45;

      // Background ambient bloom
      const ambientGlow = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.6);
      ambientGlow.addColorStop(0, 'rgba(0, 245, 212, 0.22)');
      ambientGlow.addColorStop(0.4, 'rgba(139, 92, 246, 0.14)');
      ambientGlow.addColorStop(0.8, 'rgba(245, 158, 11, 0.04)');
      ambientGlow.addColorStop(1, 'rgba(5, 6, 8, 0)');
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, w, h);

      // Outer Iridescent Orbit Rings
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, 0.4 + Math.abs(pitch));
      ctx.rotate(angle * 0.5);

      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.25, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 14]);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.45, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 20]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Draw 3D Coin Body (Cylinder extrusion slices)
      const slices = 16;
      const thickness = radius * 0.24 * Math.abs(cosA);

      for (let i = slices; i >= 0; i--) {
        const offset = (i / slices - 0.5) * thickness;
        const sliceX = cx + offset * (cosA >= 0 ? 1 : -1);
        const sliceScale = Math.abs(cosA);

        ctx.save();
        ctx.translate(sliceX, cy + pitch * radius * 0.3);
        ctx.scale(Math.max(0.12, sliceScale), 1);

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);

        if (i === 0 || i === slices) {
          // Token Face - Metallic Iridescent Chrome Gradient
          const faceGrad = ctx.createLinearGradient(-radius, -radius, radius, radius);
          const colorShift = Math.sin(angle * 0.8) * 0.5 + 0.5;

          if (colorShift > 0.5) {
            faceGrad.addColorStop(0, '#00F5D4'); // Teal
            faceGrad.addColorStop(0.35, '#22D3EE'); // Cyan
            faceGrad.addColorStop(0.7, '#8B5CF6'); // Violet
            faceGrad.addColorStop(1, '#090B10'); // Obsidian
          } else {
            faceGrad.addColorStop(0, '#8B5CF6'); // Violet
            faceGrad.addColorStop(0.4, '#F59E0B'); // Amber
            faceGrad.addColorStop(0.75, '#00F5D4'); // Teal
            faceGrad.addColorStop(1, '#050608'); // Void
          }

          ctx.fillStyle = faceGrad;
          ctx.fill();

          // Beveled rim
          ctx.lineWidth = 4;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.stroke();

          // High-Tech Cyber Circuit Emblem in Center
          ctx.save();
          ctx.rotate(angle * 0.2);
          ctx.beginPath();
          // Inner hexagon
          for (let s = 0; s < 6; s++) {
            const hAng = (s * Math.PI) / 3;
            const hx = Math.cos(hAng) * radius * 0.45;
            const hy = Math.sin(hAng) * radius * 0.45;
            if (s === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.fillStyle = 'rgba(5, 6, 8, 0.85)';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#00F5D4';
          ctx.stroke();

          // Letter 'M' / 'R' Symbol in center
          ctx.font = `bold ${Math.round(radius * 0.35)}px Syne, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText('M', 0, 0);
          ctx.restore();
        } else {
          // Rim extrusion edges with metallic reflection
          const rimGrad = ctx.createLinearGradient(0, -radius, 0, radius);
          rimGrad.addColorStop(0, '#00F5D4');
          rimGrad.addColorStop(0.5, '#171A24');
          rimGrad.addColorStop(1, '#8B5CF6');
          ctx.fillStyle = rimGrad;
          ctx.fill();
        }

        ctx.restore();
      }

      // Specular Glare / Flash Ray
      const glareGrad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
      glareGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      glareGrad.addColorStop(0.5, `rgba(255, 255, 255, ${Math.abs(Math.sin(angle)) * 0.4})`);
      glareGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glareGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.05, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="max-w-full h-auto drop-shadow-[0_20px_50px_rgba(0,245,212,0.2)]"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    </div>
  );
}
