'use client';

import { useEffect, useState } from 'react';

export default function Clock() {
  const [time, setTime] = useState<{ hour: string; minute: string; period: string } | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const update = () => {
      const parts = formatter.formatToParts(new Date());
      const hour = parts.find((p) => p.type === 'hour')?.value ?? '';
      const minute = parts.find((p) => p.type === 'minute')?.value ?? '';
      const period = parts.find((p) => p.type === 'dayPeriod')?.value ?? '';
      setTime({ hour, minute, period });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return <div className="fixed left-5 top-5 z-20 text-sm font-medium tabular-nums text-white text-shadow" />;

  return (
    <div className="fixed left-5 top-5 z-20 text-sm font-medium tabular-nums text-white text-shadow font-mono">
      {time.hour}
      <span className="animate-[blink_1s_step-end_infinite]">:</span>
      {time.minute}
      <span className="ml-1.5 text-white/70">{time.period}</span>
    </div>
  );
}
