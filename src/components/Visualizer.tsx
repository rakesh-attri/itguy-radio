'use client';

import { useEffect, useRef, useCallback } from 'react';

interface VisualizerProps {
  barCount?: number;
}

export default function Visualizer({ barCount = 48 }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const barsRef = useRef<number[]>(new Array(barCount).fill(0));
  const targetsRef = useRef<number[]>(new Array(barCount).fill(0));
  const lastBeatRef = useRef(0);

  const generateTargets = useCallback(() => {
    const now = Date.now();
    const beatInterval = 260;
    if (now - lastBeatRef.current < beatInterval) return;
    lastBeatRef.current = now;

    for (let i = 0; i < barCount; i++) {
      const center = barCount / 2;
      const distFromCenter = Math.abs(i - center) / center;
      const centerBoost = 1 - distFromCenter * 0.4;

      const bassRange = i < barCount * 0.25;
      const midRange = i >= barCount * 0.25 && i < barCount * 0.65;

      let base;
      if (bassRange) {
        base = (0.4 + Math.random() * 0.6) * centerBoost;
      } else if (midRange) {
        base = (0.25 + Math.random() * 0.55) * centerBoost;
      } else {
        base = (0.15 + Math.random() * 0.35) * centerBoost;
      }

      const pulse = Math.sin(now / 180 + i * 0.4) * 0.15;
      targetsRef.current[i] = Math.min(1, Math.max(0.05, base + pulse));
    }
  }, [barCount]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    generateTargets();

    for (let i = 0; i < barCount; i++) {
      const target = targetsRef.current[i];
      barsRef.current[i] += (target - barsRef.current[i]) * 0.12;
    }

    ctx.clearRect(0, 0, width, height);

    const barWidth = Math.max(1.5, (width / barCount) * 0.5);
    const gap = (width - barWidth * barCount) / (barCount - 1);
    const maxHeight = height * 0.85;

    for (let i = 0; i < barCount; i++) {
      const barHeight = Math.max(1.5, barsRef.current[i] * maxHeight);
      const x = i * (barWidth + gap);
      const y = (height - barHeight) / 2;

      const gradient = ctx.createLinearGradient(x, y + barHeight, x, y);
      gradient.addColorStop(0, 'rgba(0, 161, 224, 0.6)');
      gradient.addColorStop(0.5, 'rgba(0, 112, 210, 0.5)');
      gradient.addColorStop(1, 'rgba(124, 58, 237, 0.4)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 0.8);
      ctx.fill();
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [barCount, generateTargets]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        className="h-14 sm:h-18 w-full opacity-60"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  );
}
