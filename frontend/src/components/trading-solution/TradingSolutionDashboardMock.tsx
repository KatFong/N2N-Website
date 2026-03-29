import type { ReactNode } from 'react';
import type { TradingSolutionFeatureRowVariant } from '@/lib/tradingSolutionContent';

type Props = {
  variant: TradingSolutionFeatureRowVariant;
};

/** 简化 UI 示意（非实景），倾斜透视 + 数据流光 */
function MockShell({
  children,
  className = '',
  tiltClass = '',
}: {
  children: ReactNode;
  className?: string;
  tiltClass?: string;
}) {
  return (
    <div
      className={`ts-mock-perspective relative mx-auto w-full max-w-md ${className}`}
      style={{ perspective: '1100px' }}
    >
      <div
        className={`ts-mock-tilt relative aspect-[16/10] w-full rounded-2xl border border-slate-600/40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 shadow-[0_24px_60px_-12px_rgba(15,23,42,0.65)] ${tiltClass}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="ts-mock-flow ts-mock-flow-1 pointer-events-none absolute -inset-px rounded-2xl opacity-80"
          aria-hidden
        />
        <div
          className="ts-mock-flow ts-mock-flow-2 pointer-events-none absolute -inset-px rounded-2xl opacity-60"
          aria-hidden
        />
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl p-3 sm:p-4">{children}</div>
      </div>
    </div>
  );
}

function BarRow({ w }: { w: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-slate-700/80">
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand-primary/40 to-sky-400/90"
        style={{ width: `${w}%` }}
      />
    </div>
  );
}

function SpreadsheetMock() {
  return (
    <MockShell tiltClass="rotate-x-[5deg] -rotate-y-[11deg]">
      <div className="mb-2 flex gap-1 border-b border-slate-600/50 pb-2">
        {['A', 'B', 'C', 'D', 'E'].map((c) => (
          <span key={c} className="w-8 text-center text-[9px] font-mono text-slate-500">
            {c}
          </span>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-5 gap-1.5 font-mono text-[8px] text-slate-300">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`rounded px-1 py-1 ${i % 5 === 0 ? 'bg-emerald-500/15 text-emerald-200' : 'bg-slate-700/40'}`}
          >
            {i % 3 === 0 ? `${((i * 17) % 97).toFixed(1)}` : '—'}
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2 border-t border-slate-600/40 pt-2">
        <div className="h-8 flex-1 rounded border border-slate-600/50 bg-slate-900/80" />
        <div className="h-8 w-16 rounded bg-brand-primary/30" />
      </div>
    </MockShell>
  );
}

function ApiConsoleMock() {
  return (
    <MockShell tiltClass="rotate-x-[6deg] rotate-y-[10deg]">
      <div className="mb-2 flex items-center gap-2 border-b border-slate-600/50 pb-2">
        <div className="h-2 w-2 rounded-full bg-emerald-400/90" />
        <span className="text-[10px] font-mono tracking-wide text-slate-400">行情流 / v1 / 报价</span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 overflow-hidden font-mono text-[9px] leading-relaxed text-sky-200/90">
        <p className="text-slate-500">{`{ "sym": "HKEX:XXX", "bid": 128.4, "ask": 128.5 }`}</p>
        <p className="text-emerald-300/80">{`{ "evt": "fill", "qty": 1200, "px": 128.45 }`}</p>
        <p className="text-slate-500">{`{ "evt": "risk_ok", "margin_pct": 42.1 }`}</p>
        <div className="mt-auto space-y-2">
          <BarRow w={72} />
          <BarRow w={54} />
          <BarRow w={88} />
        </div>
      </div>
    </MockShell>
  );
}

function MultiChartMock() {
  return (
    <MockShell tiltClass="-rotate-x-[4deg] -rotate-y-[12deg]">
      <div className="mb-2 grid grid-cols-3 gap-1">
        {['走势', '深度', '量价'].map((t) => (
          <div key={t} className="rounded-md bg-slate-900/90 py-1 text-center text-[9px] text-slate-400">
            {t}
          </div>
        ))}
      </div>
      <div className="relative flex-1 rounded-lg bg-slate-900/70 p-2">
        <svg viewBox="0 0 120 48" className="h-full w-full text-sky-400/80" preserveAspectRatio="none">
          <defs>
            <linearGradient id="tsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(56 189 248)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="rgb(56 189 248)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,38 L15,32 L30,35 L45,22 L60,26 L75,14 L90,18 L105,8 L120,12 L120,48 L0,48 Z"
            fill="url(#tsFill)"
          />
          <path
            d="M0,38 L15,32 L30,35 L45,22 L60,26 L75,14 L90,18 L105,8 L120,12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
        <div className="absolute bottom-1 left-2 right-2 flex h-10 items-end gap-1">
          {[40, 65, 35, 80, 55].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-brand-primary/35"
              style={{ height: `${h * 0.32}px`, minHeight: 14 }}
            />
          ))}
        </div>
      </div>
    </MockShell>
  );
}

function OrderBlotterMock() {
  return (
    <MockShell tiltClass="rotate-x-[5deg] rotate-y-[11deg]">
      <div className="mb-2 flex justify-between text-[9px] text-slate-500">
        <span>委托簿</span>
        <span className="text-emerald-400/90">即时</span>
      </div>
      <div className="flex flex-1 flex-col gap-1 overflow-hidden text-[9px]">
        {[
          { s: '买', p: '限 128.40', st: '预览' },
          { s: '卖', p: '市价', st: '风控通过' },
          { s: '买', p: '条件单', st: '待触发' },
        ].map((r, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg bg-slate-900/80 px-2 py-2">
            <span className={r.s === '买' ? 'text-emerald-400' : 'text-rose-400'}>{r.s}</span>
            <span className="font-mono text-slate-300">{r.p}</span>
            <span className="text-slate-500">{r.st}</span>
          </div>
        ))}
        <div className="mt-auto rounded-lg border border-brand-primary/30 bg-brand-primary/10 py-2 text-center text-[10px] text-sky-200">
          送出前检查完成
        </div>
      </div>
    </MockShell>
  );
}

function RiskRadarMock() {
  return (
    <MockShell tiltClass="-rotate-x-[5deg] rotate-y-[10deg]">
      <div className="relative mx-auto mb-2 aspect-square w-[55%] max-w-[140px]">
        <div className="absolute inset-0 rounded-full border border-slate-600/60" />
        <div className="absolute inset-[18%] rounded-full border border-slate-600/40" />
        <div className="absolute inset-[36%] rounded-full border border-amber-500/30 bg-amber-500/10" />
        <div className="absolute left-1/2 top-1/2 h-[42%] w-0.5 origin-bottom -translate-x-1/2 rotate-[35deg] bg-gradient-to-t from-transparent to-sky-400" />
      </div>
      <div className="mt-auto space-y-2">
        <BarRow w={62} />
        <BarRow w={41} />
        <div className="flex gap-2 text-[9px] text-slate-400">
          <span className="rounded bg-rose-500/20 px-2 py-0.5 text-rose-200">集中度</span>
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-200">保证金</span>
        </div>
      </div>
    </MockShell>
  );
}

function SettlementMock() {
  return (
    <MockShell tiltClass="rotate-x-[4deg] -rotate-y-[10deg]">
      <div className="mb-3 flex gap-2 border-b border-slate-600/50 pb-2">
        {['T+0', 'T+1', 'T+2'].map((t, i) => (
          <div
            key={t}
            className={`flex-1 rounded py-1 text-center text-[9px] ${i === 1 ? 'bg-brand-primary/25 text-white' : 'bg-slate-800/80 text-slate-500'}`}
          >
            {t}
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col justify-center gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-400/80" />
            <div className="h-2 flex-1 rounded-full bg-slate-700/80">
              <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-emerald-500/50 to-sky-400/60" />
            </div>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

function PortfolioBar({ w, muted }: { w: number; muted?: boolean }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-700/70">
      <div
        className={
          muted
            ? 'h-full rounded-full bg-slate-500/55'
            : 'h-full rounded-full bg-gradient-to-r from-[#2563eb] to-sky-400'
        }
        style={{ width: `${w}%` }}
      />
    </div>
  );
}

/** 虚拟资产／组合：左侧厚圆环、右侧蓝／灰长条（贴近设计稿） */
function PortfolioMock() {
  return (
    <MockShell tiltClass="-rotate-x-[5deg] -rotate-y-[10deg]">
      <div className="mb-3 flex justify-between text-[10px] font-medium tracking-wide text-slate-400">
        <span>配置</span>
        <span>归因</span>
      </div>
      <div className="flex min-h-0 flex-1 items-center gap-4 sm:gap-5">
        <div className="relative aspect-square w-[44%] max-w-[148px] shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1d4ed8] via-sky-500 to-teal-400 p-[14%]">
            <div className="h-full w-full rounded-full bg-slate-950/95 shadow-inner" />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2.5">
          <PortfolioBar w={88} />
          <PortfolioBar w={58} muted />
          <PortfolioBar w={72} />
          <PortfolioBar w={46} muted />
        </div>
      </div>
    </MockShell>
  );
}

function CompactTerminalMock() {
  return (
    <div className="mx-auto w-full max-w-[280px]">
      <MockShell tiltClass="rotate-x-[8deg] rotate-y-[14deg]">
      <div className="mb-2 flex items-center justify-between border-b border-slate-600/50 pb-2">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-slate-600" />
          <div className="h-2 w-2 rounded-full bg-slate-600" />
        </div>
        <span className="text-[9px] text-slate-500">N2N Go</span>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-16 rounded-lg bg-slate-900/90 p-2">
          <div className="h-full w-full rounded bg-gradient-to-t from-brand-primary/20 to-transparent" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-slate-800/90 py-4 text-center text-[10px] text-slate-300">买入</div>
          <div className="rounded-lg bg-slate-800/90 py-4 text-center text-[10px] text-slate-300">卖出</div>
        </div>
      </div>
    </MockShell>
    </div>
  );
}

export default function TradingSolutionDashboardMock({ variant }: Props) {
  switch (variant) {
    case 'spreadsheet':
      return <SpreadsheetMock />;
    case 'api-console':
      return <ApiConsoleMock />;
    case 'multi-chart':
      return <MultiChartMock />;
    case 'order-blotter':
      return <OrderBlotterMock />;
    case 'risk-radar':
      return <RiskRadarMock />;
    case 'settlement':
      return <SettlementMock />;
    case 'portfolio':
      return <PortfolioMock />;
    case 'compact-terminal':
      return <CompactTerminalMock />;
    default:
      return <MultiChartMock />;
  }
}
