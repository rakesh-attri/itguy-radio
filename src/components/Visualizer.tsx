'use client';

import { useEffect, useRef, useCallback } from 'react';

interface VisualizerProps {
  isPlaying: boolean;
  barCount?: number;
}

export default function Visualizer({ isPlaying, barCount = 24 }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const barsRef = useRef<number[]>(new Array(barCount).fill(0));
  const targetsRef = useRef<number[]>(new Array(barCount).fill(0));
  const lastBeatRef = useRef(0);

  const generateTargets = useCallback(() => {
    const now = Date.now();
    const beatInterval = 280;
    if (now - lastBeatRef.current < beatInterval) return;
    lastBeatRef.current = now;

    for (let i = 0; i < barCount; i++) {
      const base = Math.random() * 0.4;
      const mid = Math.random() * 0.5;
      const high = Math.random() * 0.3;
      const pattern = Math.sin(Date.now() / 200 + i * 0.5);
      targetsRef.current[i] = base + mid * Math.abs(pattern) + high * Math.random();
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

    if (isPlaying) {
      generateTargets();
    }

    for (let i = 0; i < barCount; i++) {
      const target = isPlaying ? targetsRef.current[i] : 0.05;
      const speed = isPlaying ? 0.18 : 0.08;
      barsRef.current[i] += (target - barsRef.current[i]) * speed;
    }

    ctx.clearRect(0, 0, width, height);

    const barWidth = Math.max(2, (width / barCount) * 0.6);
    const gap = (width - barWidth * barCount) / (barCount - 1);
    const maxHeight = height * 0.9;

    for (let i = 0; i < barCount; i++) {
      const barHeight = Math.max(2, barsRef.current[i] * maxHeight);
      const x = i * (barWidth + gap);
      const y = height - barHeight;

      const gradient = ctx.createLinearGradient(x, height, x, y);
      gradient.addColorStop(0, 'rgba(0, 161, 224, 0.9)');
      gradient.addColorStop(0.5, 'rgba(0, 112, 210, 0.8)');
      gradient.addColorStop(1, 'rgba(124, 58, 237, 0.7)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 1);
      ctx.fill();
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPlaying, barCount, generateTargets]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="h-8 w-full"
      style={{ imageRendering: 'auto' }}
    />
  );
}
