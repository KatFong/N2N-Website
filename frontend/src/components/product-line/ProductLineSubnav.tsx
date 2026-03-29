'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PRODUCT_LINE_NAV } from '@/lib/productLinePageContent';

export default function ProductLineSubnav() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-16 z-40 border-b border-slate-200/90 bg-white/95 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-md"
      aria-label="产品线导航"
    >
      <div className="mx-auto flex max-w-7xl items-stretch justify-center overflow-x-auto px-2 sm:px-4 lg:px-8">
        {PRODUCT_LINE_NAV.map((item, i) => {
          const active = pathname === item.href;
          return (
            <div key={item.href} className="flex shrink-0 items-stretch">
              {i > 0 ? (
                <span className="hidden self-stretch w-px bg-slate-200 sm:block" aria-hidden />
              ) : null}
              <Link
                href={item.href}
                className={`relative flex min-h-[3rem] items-center px-3 py-2 text-sm font-semibold transition sm:min-h-[3.25rem] sm:px-5 sm:text-[15px] ${
                  active
                    ? 'text-[#2027a8] after:absolute after:left-2 after:right-2 after:top-0 after:h-1 after:rounded-b after:bg-[#2027a8] sm:after:left-4 sm:after:right-4'
                    : 'text-slate-900 hover:text-[#2027a8]'
                }`}
              >
                {item.label}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
