import type { ProductIconId } from '@/lib/productIcons';

const base = 'h-12 w-12 shrink-0 transition-transform duration-300 ease-out group-hover:scale-105';

export function ProductIcon({ id, className }: { id: ProductIconId; className?: string }) {
  const stroke = 'currentColor';
  const common = `${base} ${className ?? ''}`;

  switch (id) {
    case 'institutional':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={common} aria-hidden>
          {/* 建筑 + 服务器机架 */}
          <path
            d="M10 38V18l8-4 8 4v20M10 38h16M18 14v4M22 14v4"
            stroke={stroke}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="28" y="12" width="12" height="26" rx="1.5" stroke={stroke} strokeWidth="1.6" />
          <path d="M31 17h6M31 22h6M31 27h6" stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="34" cy="32" r="1.8" fill="#38bdf8" fillOpacity="0.5" />
        </svg>
      );
    case 'fintech':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={common} aria-hidden>
          {/* 虚拟货币 + 大脑轮廓与齿轮 */}
          <circle cx="18" cy="20" r="9" stroke={stroke} strokeWidth="1.6" />
          <path d="M14 20h8M18 16v8" stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round" />
          <path
            d="M30 14c3 0 5.5 2.2 6 5 .2 1.2-.2 2.4-1 3.3M28 36c-1-2 0-4.5 1.5-6"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="33" cy="28" r="3.5" stroke={stroke} strokeWidth="1.4" />
          <path d="M33 24.5v7M29.5 28h7" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case 'retail':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={common} aria-hidden>
          {/* 用户 + 手机与图表 */}
          <circle cx="16" cy="16" r="5" stroke={stroke} strokeWidth="1.6" />
          <path d="M9 30c1.5-4 5-6 7-6h0c2 0 5.5 2 7 6" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
          <rect x="26" y="10" width="14" height="28" rx="2.5" stroke={stroke} strokeWidth="1.6" />
          <path d="M29 34h10" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M29 22l3 3 4-5 4 6" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'hosting':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={common} aria-hidden>
          {/* 云 + 网络节点 */}
          <path
            d="M14 28c-3.5 0-6-2.8-6-6.2 0-3 2-5.5 4.8-6.3C14 11 18.5 8 24 8c6.8 0 12.2 4.5 13.2 10.5 3 .3 5.8 2.8 5.8 6 0 3.3-2.7 6-6 6H14z"
            stroke={stroke}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="36" r="2.5" stroke={stroke} strokeWidth="1.4" />
          <circle cx="32" cy="36" r="2.5" stroke={stroke} strokeWidth="1.4" />
          <path d="M18.5 36h11M24 33v6" stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}
