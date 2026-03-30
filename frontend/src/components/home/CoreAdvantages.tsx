'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Clock, Globe, Lock, type LucideIcon } from 'lucide-react';
import type { MappedCoreAdv } from '@/lib/mapHomePage';
import type { CoreAdvCardIcon } from '@/lib/homePageDefaults';
import { HOME_CORE_ADV_DEFAULTS } from '@/lib/homePageDefaults';

const CARD_ICON: Record<CoreAdvCardIcon, LucideIcon> = {
  clock: Clock,
  lock: Lock,
  globe: Globe,
};

const ICON_FALLBACK: CoreAdvCardIcon[] = ['clock', 'lock', 'globe'];

const PARALLAX_SECTION_FACTOR = 0.18;
const PARALLAX_SCROLL_FACTOR = 0.1;

/** 與 ProductOverview 卡片呼應，略加統一陰影與圓角 */
const cardSurfaceClass =
  'group flex h-full min-h-[280px] flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_2px_16px_rgba(15,23,42,0.04)] ring-1 ring-slate-900/[0.03] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-slate-300/90 hover:shadow-[0_12px_36px_rgba(32,39,168,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:p-7';

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
    <div className="flex min-w-0 flex-col items-center justify-center px-2 py-2 text-center sm:px-3 md:px-4">
      <p className="flex flex-wrap items-baseline justify-center gap-x-1">
        <span className="text-2xl font-bold tabular-nums tracking-tight text-[#2027a8] md:text-3xl lg:text-4xl lg:leading-none">
          {stat.prefix}
          {display}
          {stat.suffix}
        </span>
        {stat.unit ? (
          <span className="text-xs font-semibold text-slate-500 md:text-sm">{stat.unit}</span>
        ) : null}
      </p>
      <p className="mt-2.5 max-w-[10rem] text-[11px] font-medium leading-snug tracking-wide text-slate-600 sm:max-w-none md:text-xs">
        {stat.label}
      </p>
    </div>
  );
}

export default function CoreAdvantages({ data }: Props) {
  const s: MappedCoreAdv = data ?? (HOME_CORE_ADV_DEFAULTS as MappedCoreAdv);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setActive(true);
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const update = () => {
      const el = sectionRef.current;
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      if (el) {
        const rect = el.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const delta = sectionCenter - vh / 2;
        setParallaxY(delta * PARALLAX_SECTION_FACTOR + scrollY * PARALLAX_SCROLL_FACTOR);
      } else {
        setParallaxY(scrollY * PARALLAX_SCROLL_FACTOR);
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-white text-slate-900">
      {/* 單層柔和視差：避免多層漸層搶眼 */}
      <div
        className="pointer-events-none absolute -left-[18%] -right-[18%] -top-[25%] bottom-[-10%] will-change-transform"
        style={{
          transform: `translate3d(0, ${parallaxY}px, 0) scale(1.04)`,
        }}
        aria-hidden
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fafbfc_0%,#ffffff_45%,#f8fafc_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-10%,rgba(236,238,254,0.5),transparent_58%)]" />
      </div>

      <div className="relative z-10">
        {/* 與 ProductOverview 對齊：home-shell + 相近區塊節奏 */}
        <div className="home-shell pt-8 pb-10 md:pt-10 md:pb-12 lg:pt-11">
          <header className="flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div>
              {s.moduleLabel ? <p className="home-kicker">{s.moduleLabel}</p> : null}
              <h2 className={`home-h2 ${s.moduleLabel ? 'mt-2' : ''}`}>
                <span className="text-slate-900">{s.titleZh}</span>
                {s.titleEn ? <span className="home-h2-en ml-2 sm:ml-3">{s.titleEn}</span> : null}
              </h2>
            </div>
            {s.introText ? <p className="home-intro max-w-md sm:text-right">{s.introText}</p> : null}
          </header>

          {/* 數據：獨立圓角帶，與下方卡片區分層級 */}
          <div className="mt-8 md:mt-10">
            <div className="rounded-2xl bg-gradient-to-b from-slate-50/95 to-white p-5 shadow-sm ring-1 ring-slate-200/60 md:p-7 lg:p-8">
              <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-y-8 lg:grid-cols-5 lg:gap-x-2 lg:gap-y-0">
                {s.stats.map((stat, i) => (
                  <StatItem key={`${stat.label}-${i}`} stat={stat} active={active} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 三卡：與上方同寬、網格對齊 Module 03 */}
        <div className="home-shell pb-16 pt-8 md:pb-20 md:pt-10">
          <ul className="grid list-none grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {s.cards.map((card, i) => {
              const iconId = card.icon ?? ICON_FALLBACK[i % ICON_FALLBACK.length];
              const Icon = CARD_ICON[iconId];
              const inner = (
                <>
                  <div className="relative mb-5 inline-flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl bg-gradient-to-br from-brand-faint to-slate-50 ring-1 ring-slate-200/70">
                    <div
                      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    >
                      <span className="core-adv-shimmer absolute inset-0 rounded-2xl" />
                    </div>
                    <Icon
                      className="relative z-10 h-8 w-8 text-brand-primary transition-transform duration-300 ease-out group-hover:scale-110"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-slate-900 md:text-[1.125rem]">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 md:text-[15px]">{card.desc}</p>
                </>
              );
              const key = `${card.title}-${i}`;
              if (card.href) {
                return (
                  <li key={key} className="min-h-0">
                    <Link
                      href={card.href}
                      className={`${cardSurfaceClass} block cursor-pointer no-underline`}
                      aria-label={`${card.title}：前往详情`}
                    >
                      {inner}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={key} className="min-h-0">
                  <article className={cardSurfaceClass}>{inner}</article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
