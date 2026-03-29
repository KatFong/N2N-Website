'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { TradingSolutionFeatureRow, TradingSolutionFooterCta } from '@/lib/tradingSolutionContent';
import { tsContentMax, tsSectionPadX, tsSectionPadY } from '@/lib/tradingSolutionLayout';
import TradingSolutionDashboardMock from '@/components/trading-solution/TradingSolutionDashboardMock';

function TradingSolutionCtaBanner({ cta }: { cta: TradingSolutionFooterCta }) {
  return (
    <div
      className="relative left-1/2 mt-0 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden border-t border-white/20"
      aria-labelledby="trading-solution-cta-heading"
    >
      <div className="trading-solution-hero-bg absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/25 via-transparent to-slate-950/40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/[0.12] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-indigo-300/25 blur-3xl"
        aria-hidden
      />

      <div
        className={`relative z-10 mx-auto ${tsContentMax} ${tsSectionPadX} py-16 md:py-20 lg:py-28`}
      >
        <div className="mx-auto max-w-lg text-center md:max-w-2xl">
          {cta.kicker?.trim() ? (
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/60 md:text-xs">
              {cta.kicker}
            </p>
          ) : null}
          <h2
            id="trading-solution-cta-heading"
            className={`text-balance text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl lg:text-[2rem] lg:leading-snug ${cta.kicker?.trim() ? 'mt-4' : ''}`}
          >
            {cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-white/78 md:text-base md:leading-relaxed">
            {cta.description}
          </p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:mt-10">
            <Link
              href={cta.buttonHref}
              className="group inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-brand-primary shadow-[0_16px_48px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-[0_22px_56px_rgba(0,0,0,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:min-w-[220px]"
            >
              {cta.buttonLabel}
              <ArrowRight
                className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </Link>
            {cta.footnote?.trim() ? <p className="text-xs text-white/45">{cta.footnote}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

/** 8 组图文：统一间距（行动堆叠 / 桌面栏距 / 标题↔条列） */
const featureRowGridGap =
  'gap-12 lg:gap-x-20 lg:gap-y-8 xl:gap-x-24 2xl:gap-x-[6.5rem]';

export default function TradingSolutionFeatureRows({
  rows,
  footerCta,
}: {
  rows: TradingSolutionFeatureRow[];
  footerCta: TradingSolutionFooterCta;
}) {
  return (
    <section className="border-t border-slate-100 bg-white" aria-label="产品能力展示">
      <div className={`${tsContentMax} ${tsSectionPadX}`}>
        {rows.map((row, index) => (
          <FeatureRow key={`${index}-${row.title}`} row={row} index={index} />
        ))}
      </div>
      <TradingSolutionCtaBanner cta={footerCta} />
    </section>
  );
}

function FeatureRow({
  row,
  index,
}: {
  row: TradingSolutionFeatureRow;
  index: number;
}) {
  const odd = index % 2 === 0;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setVisible(true);
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const textCol = odd ? 'lg:col-start-2' : 'lg:col-start-1';
  const mockCol = odd ? 'lg:col-start-1' : 'lg:col-start-2';

  return (
    <article
      ref={ref}
      data-visible={visible ? 'true' : 'false'}
      className={`ts-feature-row border-b border-slate-100 last:border-b-0 ${tsSectionPadY}`}
      style={
        {
          ['--ts-media-x' as string]: odd ? '-44px' : '44px',
          ['--ts-text-x' as string]: odd ? '44px' : '-44px',
        } as CSSProperties
      }
    >
      {/*
        手机：标题 → 图 → 条列
        桌面：图片 lg:row-span-2 与「标题 + 条列」整栏并排垂直置中（对齐参考稿）
      */}
      <div
        className={`grid grid-cols-1 lg:items-center ${featureRowGridGap} ${
          odd
            ? 'lg:grid-cols-[minmax(220px,32%)_minmax(0,1fr)]'
            : 'lg:grid-cols-[minmax(0,1fr)_minmax(220px,32%)]'
        }`}
      >
        <h2
          className={`ts-slide-title col-start-1 row-start-1 text-[1.375rem] font-bold leading-snug tracking-tight text-slate-900 md:text-[1.65rem] lg:text-[1.75rem] ${textCol} lg:row-start-1`}
        >
          {row.title}
        </h2>

        <div
          className={`ts-slide-media col-start-1 row-start-2 flex justify-center lg:justify-end ${mockCol} lg:row-span-2 lg:row-start-1 ${odd ? '' : 'lg:justify-start'}`}
        >
          <div className="w-full max-w-[min(100%,420px)] drop-shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
            <TradingSolutionDashboardMock variant={row.variant} />
          </div>
        </div>

        <div
          className={`ts-slide-text col-start-1 row-start-3 flex min-w-0 flex-col gap-8 ${textCol} lg:row-start-2`}
        >
          <ul className="list-none space-y-5 md:space-y-6">
            {row.lines.map((line, i) => (
              <li key={i} className="flex gap-4 text-[0.9375rem] leading-[1.75] text-slate-700 md:text-base md:leading-[1.8]">
                <span
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-600"
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          {row.moreLabel && row.moreHref ? (
            <Link
              href={row.moreHref}
              className="w-fit text-sm font-semibold text-brand-primary transition hover:underline"
            >
              {row.moreLabel} &gt;
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
