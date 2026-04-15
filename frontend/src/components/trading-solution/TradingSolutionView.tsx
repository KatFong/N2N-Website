'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  AlarmClock,
  ArrowRight,
  Brain,
  Clock,
  HardDrive,
  Headphones,
  LineChart,
  Plug,
  Shield,
  ShieldCheck,
  Sparkles,
  TabletSmartphone,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import TradingSolutionFeatureRows from '@/components/trading-solution/TradingSolutionFeatureRows';
import type {
  TradingSolutionFeatureRow,
  TradingSolutionFooterCta,
  TradingSolutionGridIconId,
  TradingSolutionGridItem,
} from '@/lib/tradingSolutionContent';
import type { TradingSolutionSpotlightView } from '@/lib/mapTradingSolutionPage';
import { tsContentMax, tsSectionInner, tsSectionInnerCompact } from '@/lib/tradingSolutionLayout';

const GRID_ICONS: Record<TradingSolutionGridIconId, LucideIcon> = {
  clock: Clock,
  chart: LineChart,
  mobile: TabletSmartphone,
  custom: Wrench,
  api: Plug,
  security: ShieldCheck,
  shield: Shield,
  brain: Brain,
  arrow: ArrowRight,
  alarm: AlarmClock,
  harddrive: HardDrive,
  headphones: Headphones,
};

function GridIconMark({ iconId }: { iconId: TradingSolutionGridIconId }) {
  if (iconId === 'brain') {
    return (
      <div className="relative flex h-7 w-7 items-center justify-center" aria-hidden>
        <Brain className="h-6 w-6" strokeWidth={1.5} />
        <Sparkles className="absolute -right-1 -top-0.5 h-3.5 w-3.5 text-sky-600" strokeWidth={2} />
      </div>
    );
  }
  const Icon = GRID_ICONS[iconId];
  return <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden />;
}

function GridCard({ item, noBullet = false }: { item: TradingSolutionGridItem; noBullet?: boolean }) {
  const showBullet = !noBullet && item.lines.length > 1;
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-faint text-brand-primary">
        <GridIconMark iconId={item.iconId} />
      </div>
      <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
      <ul className="mt-2 list-none space-y-2">
        {item.lines.map((line, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
            {showBullet ? <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-primary/70" aria-hidden /> : null}
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const primaryBtnClass =
  'inline-flex w-fit items-center justify-center rounded-lg bg-brand-primary px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary';

type Props = {
  hero: { title: string; subtitle: string };
  spotlight: TradingSolutionSpotlightView;
  sixGrid: TradingSolutionGridItem[];
  gridSectionCta: { label: string; href: string };
  footerCta: TradingSolutionFooterCta;
  featureRows: TradingSolutionFeatureRow[];
};

export default function TradingSolutionView({
  hero,
  spotlight,
  sixGrid,
  gridSectionCta,
  footerCta,
  featureRows,
}: Props) {
  const six = sixGrid;
  const isVasPage =
    hero.title.includes('VAS') ||
    hero.title.includes('虚拟资产') ||
    hero.subtitle.includes('Virtual Asset');
  const isSmp5Page = hero.title.includes('SMP5') || hero.title.includes('股市宝') || hero.subtitle.includes('SMP5');
  const isMpsPage =
    hero.title.includes('MPS') || hero.title.includes('Master Picks') || hero.title.includes('选股策略');
  const isServerHostingPage =
    hero.title.includes('服务器托管') ||
    hero.title.includes('Server Hosting') ||
    hero.subtitle.includes('Leased Line');
  const smp5QuickLinks = [
    { label: 'Windows版下载', href: '/contact' },
    { label: 'Mac版下载', href: '/contact' },
    { label: '移动版下载', href: '/contact' },
    { label: '产品功能详情', href: '/smp5' },
    { label: '帮助文档', href: '/contact' },
  ] as const;

  return (
    <div className="bg-white text-slate-900">
      {/* 全宽 Hero：蓝底渐层动效 + 淡入标题 + 标题 hover 放大 */}
      <section className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden">
        <div className="trading-solution-hero-bg absolute inset-0" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/10" aria-hidden />
        <div className={`relative mx-auto max-w-3xl text-center ${tsSectionInner}`}>
          <h1 className="trading-hero-line-1 inline-block origin-center text-3xl font-bold tracking-tight text-white drop-shadow-md transition-transform duration-300 ease-out will-change-transform hover:scale-105 md:text-4xl lg:text-5xl">
            {hero.title}
          </h1>
          <p className="trading-hero-line-2 mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-200/95 md:text-lg">
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* 左图右文 + 了解更多 */}
      <section>
        <div className={`${tsContentMax} ${tsSectionInnerCompact}`}>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative order-2 aspect-[4/3] w-full lg:order-1">
              <Image
                src={spotlight.imageSrc}
                alt=""
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="order-1 space-y-5 lg:order-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{spotlight.title}</h2>
              {spotlight.tagline.trim() ? (
                <p className="text-base font-medium text-slate-800 md:text-lg">{spotlight.tagline}</p>
              ) : null}
              {spotlight.coreHighlights && spotlight.coreHighlights.length > 0 ? (
                <div className="space-y-3 pt-1">
                  {(() => {
                    const label =
                      spotlight.highlightsHeading !== undefined
                        ? spotlight.highlightsHeading
                        : '核心特点：';
                    return label ? (
                      <p className="text-sm font-semibold text-slate-900 md:text-base">{label}</p>
                    ) : null;
                  })()}
                  <ul className="list-none space-y-2.5 pl-5 text-sm leading-relaxed text-slate-600 md:pl-7 md:text-base">
                    {spotlight.coreHighlights.map((line, i) => {
                      const isHeadingLine = /[：:]$/.test(line.trim());
                      const normalLines = spotlight.coreHighlights.filter((v) => !/[：:]$/.test(v.trim()));
                      const showBullet = !isHeadingLine && normalLines.length > 1;
                      return (
                        <li key={i} className="flex gap-2.5">
                          {showBullet ? (
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-primary/70" aria-hidden />
                          ) : null}
                          <span className={isHeadingLine ? 'font-semibold text-slate-800' : ''}>{line}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
              {spotlight.paragraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-slate-600 md:text-base">
                  {p}
                </p>
              ))}
              <Link href={spotlight.ctaHref} className={`${primaryBtnClass} mt-2`}>
                {spotlight.ctaLabel}
              </Link>
            </div>
          </div>
          {isSmp5Page ? (
            <div className="mt-8 border-t border-slate-200/80 pt-5">
              <div className="grid grid-cols-2 gap-2 text-center sm:grid-cols-5 sm:gap-3">
                {smp5QuickLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex min-h-14 items-center justify-center rounded-md bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 md:min-h-16 md:px-5 md:text-base"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* 能力网格：6 项为 3×2；5 项桌面单行均分；4 项为 1×4；移动端统一单列 */}
      <section className="border-t border-slate-200 bg-slate-50/80">
        <div className={`${tsContentMax} ${tsSectionInner}`}>
          <div className="mb-10 text-center md:mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">技术优势</h2>
          </div>
          <div
            className={`grid gap-10 md:gap-12 ${
              six.length > 4
                ? six.length === 5
                  ? 'grid-cols-1 md:grid-cols-5'
                  : 'grid-cols-1 md:grid-cols-3'
                : six.length === 4
                  ? 'grid-cols-1 lg:grid-cols-4'
                  : 'grid-cols-1'
            }`}
          >
            {six.map((item, i) => (
              <div key={`${item.title}-${i}`} className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
                <GridCard item={item} noBullet={isVasPage} />
              </div>
            ))}
          </div>
          <div className="mt-12 flex w-full justify-center md:mt-14">
            <Link href={gridSectionCta.href} className={primaryBtnClass}>
              {gridSectionCta.label}
            </Link>
          </div>
        </div>
      </section>

      <TradingSolutionFeatureRows
        rows={featureRows}
        footerCta={footerCta}
        isSmp5Page={isSmp5Page}
        isMpsPage={isMpsPage}
        isServerHostingPage={isServerHostingPage}
      />
    </div>
  );
}
