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

const newsDropdownItems = [
  { label: '公司动态', href: '/news-insights#company-updates-section' },
  { label: '行业透视', href: '/news-insights#industry-insights-section' },
  { label: '产品资讯', href: '/news-insights#product-information-section' },
  { label: 'Market Know How', href: '/news-insights#market-know-how-section' },
];

const aboutDropdownItems = [
  { label: 'N2N-AFE', href: '/about#company-introduction-section' },
  { label: '联系我们', href: '/contact#contact-section' },
  { label: '加入我们', href: '/about#join-us-section' },
];

const navLinks = [{ label: '全球业务', href: '/global-business' }, { label: '商务合作', href: '/business-partnership' }];

const mobilePrimaryLink = { label: '登录 / 注册', href: '/login' };
const mobileSecondaryLinks = [...navLinks];

const linkClass =
  'rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[#2027a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2027a8]';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileNewsOpen, setMobileNewsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!newsOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (newsRef.current && !newsRef.current.contains(e.target as Node)) {
        setNewsOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [newsOpen]);

  useEffect(() => {
    if (!aboutOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [aboutOpen]);

  const handleProductsBlur = (e: FocusEvent<Element>) => {
    const next = e.relatedTarget as Node | null;
    if (productsRef.current && !productsRef.current.contains(next)) setProductsOpen(false);
  };

  const handleNewsBlur = (e: FocusEvent<Element>) => {
    const next = e.relatedTarget as Node | null;
    if (newsRef.current && !newsRef.current.contains(next)) setNewsOpen(false);
  };

  const handleAboutBlur = (e: FocusEvent<Element>) => {
    const next = e.relatedTarget as Node | null;
    if (aboutRef.current && !aboutRef.current.contains(next)) setAboutOpen(false);
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

            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}

            <div
              ref={newsRef}
              className="relative"
              onMouseEnter={() => setNewsOpen(true)}
              onMouseLeave={() => setNewsOpen(false)}
            >
              <button
                type="button"
                onFocus={() => setNewsOpen(true)}
                onBlur={handleNewsBlur}
                className={`${linkClass} inline-flex items-center gap-1 ${newsOpen ? 'bg-slate-100 text-[#2027a8]' : ''}`}
                aria-expanded={newsOpen}
                aria-haspopup="true"
                aria-controls="nav-news-dropdown"
              >
                新闻资讯
                <ChevronDown
                  className={`h-4 w-4 shrink-0 opacity-70 transition-transform ${newsOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
              {newsOpen ? (
                <div
                  id="nav-news-dropdown"
                  role="menu"
                  className="absolute left-0 top-full z-50 -mt-1 min-w-[14.5rem] overflow-hidden rounded-xl border border-slate-200/90 bg-white py-1 shadow-lg ring-1 ring-slate-900/[0.04]"
                >
                  {newsDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className="block px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-[#2027a8] focus-visible:bg-slate-50 focus-visible:outline-none"
                      onBlur={handleNewsBlur}
                      onClick={() => setNewsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <div
              ref={aboutRef}
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                type="button"
                onFocus={() => setAboutOpen(true)}
                onBlur={handleAboutBlur}
                className={`${linkClass} inline-flex items-center gap-1 ${aboutOpen ? 'bg-slate-100 text-[#2027a8]' : ''}`}
                aria-expanded={aboutOpen}
                aria-haspopup="true"
                aria-controls="nav-about-dropdown"
              >
                关于 N2N-AFE
                <ChevronDown
                  className={`h-4 w-4 shrink-0 opacity-70 transition-transform ${aboutOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
              {aboutOpen ? (
                <div
                  id="nav-about-dropdown"
                  role="menu"
                  className="absolute left-0 top-full z-50 -mt-1 min-w-[14.5rem] overflow-hidden rounded-xl border border-slate-200/90 bg-white py-1 shadow-lg ring-1 ring-slate-900/[0.04]"
                >
                  {aboutDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className="block px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-[#2027a8] focus-visible:bg-slate-50 focus-visible:outline-none"
                      onBlur={handleAboutBlur}
                      onClick={() => setAboutOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <Link
              href={mobilePrimaryLink.href}
              className="ml-2 rounded-lg bg-[#2027a8] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1a2188] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2027a8]"
            >
              {mobilePrimaryLink.label}
            </Link>
          </nav>

          <button
            type="button"
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 lg:hidden"
            onClick={() => {
              if (menuOpen) {
                setMobileProductsOpen(false);
                setMobileNewsOpen(false);
                setMobileAboutOpen(false);
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
            <Link
              href={mobilePrimaryLink.href}
              className="mx-1 mb-1 rounded-lg bg-[#2027a8] px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-[#1a2188]"
              onClick={() => {
                setMobileProductsOpen(false);
                setMobileNewsOpen(false);
                setMobileAboutOpen(false);
                setMenuOpen(false);
              }}
            >
              {mobilePrimaryLink.label}
            </Link>

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
                        setMobileNewsOpen(false);
                        setMobileAboutOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            {mobileSecondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#2027a8]"
                onClick={() => {
                  setMobileProductsOpen(false);
                  setMobileNewsOpen(false);
                  setMobileAboutOpen(false);
                  setMenuOpen(false);
                }}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#2027a8]"
                onClick={() => setMobileNewsOpen((v) => !v)}
                aria-expanded={mobileNewsOpen}
              >
                新闻资讯
                <ChevronDown
                  className={`h-4 w-4 shrink-0 opacity-70 transition-transform ${mobileNewsOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
              {mobileNewsOpen ? (
                <div className="ml-2 flex flex-col border-l border-slate-200 pl-3">
                  {newsDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-[#2027a8]"
                      onClick={() => {
                        setMobileProductsOpen(false);
                        setMobileNewsOpen(false);
                        setMobileAboutOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#2027a8]"
                onClick={() => setMobileAboutOpen((v) => !v)}
                aria-expanded={mobileAboutOpen}
              >
                关于 N2N-AFE
                <ChevronDown
                  className={`h-4 w-4 shrink-0 opacity-70 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
              {mobileAboutOpen ? (
                <div className="ml-2 flex flex-col border-l border-slate-200 pl-3">
                  {aboutDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-[#2027a8]"
                      onClick={() => {
                        setMobileProductsOpen(false);
                        setMobileNewsOpen(false);
                        setMobileAboutOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

          </div>
        </div>
      ) : null}
    </header>
  );
}
