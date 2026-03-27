'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDownCircle } from 'lucide-react';
import type { MappedCoreAdv } from '@/lib/mapHomePage';
import { HOME_CORE_ADV_DEFAULTS } from '@/lib/homePageDefaults';

type StatShape = {
  target: number;
  prefix?: string;
  suffix?: string;
  unit: string;
  label: string;
  format?: 'int' | 'comma';
};

type Props = {
  data?: MappedCoreAdv;
};

/** 與 Hero 一致：背景位移約為捲動量的 1/5 */
const PARALLAX_BG_FACTOR = 0.2;

function formatStatValue(n: number, format?: 'int' | 'comma') {
  if (format === 'comma') return n.toLocaleString('en-US');
  return String(Math.floor(n));
}

function useCountUp(target: number, durationMs: number, active: boolean, format?: 'int' | 'comma') {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf = 0;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / durationMs, 1);
      const ease = 1 - (1 - p) ** 3;
      const current = target * ease;
      if (format === 'comma') {
        setValue(Math.round(current));
      } else {
        setValue(Math.floor(current));
      }
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, durationMs, format, target]);

  return value;
}

function StatItem({
  stat,
  active,
}: {
  stat: StatShape;
  active: boolean;
}) {
  const n = useCountUp(stat.target, 1800, active, stat.format);
  const display = formatStatValue(n, stat.format);

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center border-white/10 px-1 py-1 text-center text-white sm:border-r sm:last:border-r-0 md:px-3">
      <p className="flex flex-wrap items-baseline justify-center gap-x-1.5">
        <span className="text-2xl font-extrabold tabular-nums tracking-tight drop-shadow-sm md:text-4xl lg:text-[2.75rem] lg:leading-none">
          {stat.prefix}
          {display}
          {stat.suffix}
        </span>
        {stat.unit ? (
          <span className="text-[11px] font-medium text-white/90 md:text-sm lg:text-base">{stat.unit}</span>
        ) : null}
      </p>
      <p className="mt-2 max-w-[9.5rem] text-[9px] font-semibold uppercase leading-snug tracking-[0.06em] text-white/85 sm:max-w-[11rem] md:max-w-none md:text-[11px]">
        {stat.label}
      </p>
    </div>
  );
}

export default function CoreAdvantages({ data }: Props) {
  const s = data ?? HOME_CORE_ADV_DEFAULTS;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);
  const [bgOffsetY, setBgOffsetY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setBgOffsetY(window.scrollY * PARALLAX_BG_FACTOR);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setActive(true);
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2027a8]">{s.moduleLabel}</p>
            <h2 className="mt-2 flex flex-wrap items-baseline gap-x-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              <span>{s.titleZh}</span>
              <span className="text-base font-medium text-slate-500 md:text-lg">{s.titleEn}</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-500">{s.introText}</p>
        </div>
      </div>

      <div className="mt-6 flex h-[600px] w-full flex-col overflow-hidden">
        {/* 第一層 200px：全寬（不受 max-width 裁切）+ 背景視差 */}
        <div className="relative left-1/2 w-screen max-w-[100vw] shrink-0 -translate-x-1/2">
          <div className="relative h-[200px] overflow-hidden">
            <div
              className="absolute inset-0 will-change-transform"
              style={{
                transform: `translate3d(0, ${bgOffsetY}px, 0) scale(1.1)`,
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${(s.statStripBackgroundUrl || HOME_CORE_ADV_DEFAULTS.statStripBackgroundUrl).replace(/'/g, "\\'")}')`,
                }}
                aria-hidden
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a]/92 via-[#1e40af]/85 to-slate-900/78" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_120%,rgba(15,23,42,0.35),transparent_50%)]" aria-hidden />
            <div className="relative z-10 flex h-full w-full flex-row items-center justify-between gap-1 px-3 py-4 sm:gap-2 sm:px-8 md:gap-3 lg:px-14">
              {s.stats.map((stat, i) => (
                <StatItem key={`${stat.label}-${i}`} stat={stat} active={active} />
              ))}
            </div>
          </div>
        </div>

        {/* 第二層：剩餘高度約 400px（內容區維持 max-width） */}
        <div className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 items-center justify-center overflow-y-auto bg-slate-50/50 px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid w-full max-w-6xl grid-cols-2 gap-4 gap-y-8 sm:gap-6 lg:grid-cols-3 lg:gap-x-[130px] lg:gap-y-0">
            {s.cards.map((card) => (
              <article
                key={card.title}
                className="group flex flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/[0.04] transition-all duration-300 ease-out hover:-translate-y-[5px] hover:border-slate-300/90 hover:bg-[#f8f8f9] hover:shadow-[0_16px_40px_rgba(15,23,42,0.1)] sm:p-7"
              >
                <div className="relative mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-inner ring-1 ring-slate-200/80">
                  <div
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  >
                    <span className="core-adv-shimmer absolute inset-0 rounded-2xl" />
                  </div>
                  <ArrowDownCircle
                    className="relative z-10 h-9 w-9 text-violet-600 transition-transform duration-300 ease-out group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-[15px]">{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
