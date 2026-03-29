'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type FocusEvent, useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { PRODUCT_LINE_NAV } from '@/lib/productLinePageContent';

const productsDropdownItems = PRODUCT_LINE_NAV.map((item) => ({
  label: item.label,
  href: item.href,
}));

const navLinks = [
  { label: '全球业务', href: '/global-business' },
  { label: '商务合作', href: '/business-partnership' },
  { label: '新闻与洞察', href: '/news-insights' },
  { label: '关于 N2N-AFE', href: '/about' },
  { label: '登录 / 注册', href: '/login' },
  { label: '隐私政策', href: '/privacy-policy' },
];

const linkClass =
  'rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[#2027a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2027a8]';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!productsOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [productsOpen]);

  const handleProductsBlur = (e: FocusEvent<Element>) => {
    const next = e.relatedTarget as Node | null;
    if (productsRef.current && !productsRef.current.contains(next)) setProductsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 rounded-lg outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2027a8]"
          >
            <Image
              src="/n2n-logo-head.png"
              alt="N2N Connect"
              width={132}
              height={36}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="主导航">
            <div
              ref={productsRef}
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                type="button"
                onFocus={() => setProductsOpen(true)}
                onBlur={handleProductsBlur}
                className={`${linkClass} inline-flex items-center gap-1 ${productsOpen ? 'bg-slate-100 text-[#2027a8]' : ''}`}
                aria-expanded={productsOpen}
                aria-haspopup="true"
                aria-controls="nav-products-dropdown"
              >
                产品与服务
                <ChevronDown
                  className={`h-4 w-4 shrink-0 opacity-70 transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
              {productsOpen ? (
                <div
                  id="nav-products-dropdown"
                  role="menu"
                  className="absolute left-0 top-full z-50 -mt-1 max-h-[min(70vh,24rem)] min-w-[16.5rem] overflow-y-auto overscroll-contain rounded-xl border border-slate-200/90 bg-white pb-2 pt-1 shadow-lg ring-1 ring-slate-900/[0.04]"
                >
                  {productsDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className="block px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-[#2027a8] focus-visible:bg-slate-50 focus-visible:outline-none"
                      onBlur={handleProductsBlur}
                      onClick={() => setProductsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            {navLinks.map((link) =>
              link.href === '/login' ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="ml-2 rounded-lg bg-[#2027a8] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1a2188] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2027a8]"
                >
                  {link.label}
                </Link>
              ) : (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <button
            type="button"
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 lg:hidden"
            onClick={() => {
              if (menuOpen) {
                setMobileProductsOpen(false);
                setMenuOpen(false);
              } else {
                setMenuOpen(true);
              }
            }}
            aria-expanded={menuOpen}
            aria-label="切换菜单"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-200/80 bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-0.5 px-4 py-3">
            <div className="flex flex-col">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#2027a8]"
                onClick={() => setMobileProductsOpen((v) => !v)}
                aria-expanded={mobileProductsOpen}
              >
                产品与服务
                <ChevronDown
                  className={`h-4 w-4 shrink-0 opacity-70 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
              {mobileProductsOpen ? (
                <div className="ml-2 flex flex-col border-l border-slate-200 pl-3">
                  {productsDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-[#2027a8]"
                      onClick={() => {
                        setMobileProductsOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  link.href === '/login'
                    ? 'mx-1 mt-1 rounded-lg bg-[#2027a8] px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-[#1a2188]'
                    : 'rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#2027a8]'
                }
                onClick={() => {
                  setMobileProductsOpen(false);
                  setMenuOpen(false);
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
