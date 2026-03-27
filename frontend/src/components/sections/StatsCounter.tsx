'use client';

import { useEffect, useRef, useState } from 'react';
import { StatItem } from '@/lib/strapi';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const DEFAULT_STATS: Stat[] = [
  { value: 15, suffix: '+', label: 'Years', description: 'Years of Experience' },
  { value: 20, suffix: '+', label: 'Countries', description: 'Global Presence' },
  { value: 500, suffix: '+', label: 'Partners', description: 'Business Partners' },
  { value: 2, suffix: 'B+', label: 'USD', description: 'Transactions Processed' },
  { value: 55000, suffix: '+', label: 'Clients', description: 'Satisfied Clients' },
];

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);

  return count;
}

function StatItemComponent({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCountUp(stat.value, 1800, active);

  return (
    <div className="text-center group">
      <div className="flex items-end justify-center gap-0.5">
        <span className="text-5xl md:text-6xl font-bold text-white tabular-nums leading-none">
          {count.toLocaleString()}
        </span>
        <span className="text-2xl md:text-3xl font-bold text-blue-300 mb-1">{stat.suffix}</span>
      </div>
      <div className="mt-2 text-sm font-medium text-blue-200 uppercase tracking-widest">
        {stat.label}
      </div>
      <div className="mt-1 text-xs text-blue-300/60">{stat.description}</div>
    </div>
  );
}

interface StatsCounterProps {
  cmsStats?: StatItem[];
  title?: string;
}

export default function StatsCounter({ cmsStats, title }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const stats: Stat[] =
    cmsStats && cmsStats.length > 0
      ? cmsStats.map((s) => ({
          value: s.value,
          suffix: s.suffix || '+',
          label: s.label,
          description: s.description || '',
        }))
      : DEFAULT_STATS;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 py-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <p className="text-center text-blue-200 text-sm font-semibold uppercase tracking-widest mb-8">
            {title}
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-4">
          {stats.map((stat) => (
            <StatItemComponent key={stat.label} stat={stat} active={active} />
          ))}
        </div>
      </div>
    </div>
  );
}
