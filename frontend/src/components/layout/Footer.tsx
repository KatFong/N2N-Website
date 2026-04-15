import Link from 'next/link';
import Image from 'next/image';
import type { MappedFooter } from '@/lib/footerDefaults';

type Props = {
  data?: MappedFooter;
};

const BRAND_LINKS = [{ label: 'Market Know how', href: '/news-insights#market-know-how-section' }];

const PRODUCTS_LINKS = [
  { label: '券商交易系统', href: '/trading-solution' },
  { label: '股市行情报价机（SMP5 股市宝）', href: '/smp5' },
  { label: '券商结算系统', href: '/settlement-solution' },
  { label: '选股助手（Master Pick）', href: '/mps' },
  { label: '券商报价系统', href: '/financial-information-service' },
  { label: '量化投资交易平台', href: '/quant' },
  { label: '服务器托管与专线服务', href: '/server-hosting' },
  { label: '虚拟资产交易', href: '/vas' },
];

const WINWIN_LINKS = [
  { label: '全球业务', href: '/global-business' },
  { label: '商务合作', href: '/business-partnership' },
  { label: '隐私政策', href: '/privacy-policy' },
  { label: '免责声明', href: '/privacy-policy#disclaimer-section' },
];

const ABOUT_LINKS = [
  { label: '公司介绍', href: '/about#company-introduction-section' },
  { label: '公司动态', href: '/news-insights#company-updates-section' },
  { label: '行业透视', href: '/news-insights#industry-insights-section' },
  { label: '产品资讯', href: '/news-insights#product-information-section' },
  { label: 'Market Know How', href: '/news-insights#market-know-how-section' },
];

const CTA_LEFT_LINKS = [
  { label: '联系我们', href: '/contact' },
  { label: '电话', href: '/contact#contact-section' },
  { label: '邮箱', href: '/contact#contact-section' },
  { label: '微信（二維碼）', href: '/contact#contact-section' },
  { label: 'Twitter', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Youtube', href: '#' },
];

const CTA_RIGHT_LINKS = [
  { label: 'Whatsapp（二維碼）', href: '/contact#contact-section' },
  { label: 'Facebook', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: '小红书', href: '#' },
];

export default function Footer({ data: _data }: Props) {
  void _data;

  return (
    <footer style={{ backgroundColor: '#F5F7FA', borderTop: '1px solid #D9E2EC' }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_3fr_1.9fr]">
          <div>
            <h4 className="mb-4 text-xs font-black tracking-[0.18em] text-[#003366]">品牌区</h4>
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/n2n-logo-head.png"
                alt="N2N-AFE"
                width={130}
                height={36}
                className="object-contain"
                style={{ height: 34, width: 'auto' }}
              />
            </Link>
            <ul className="mt-4 space-y-2">
              {BRAND_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-lg font-semibold leading-relaxed text-[#1F2937] transition-colors duration-150 hover:text-[#003366]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-black tracking-[0.18em] text-[#003366]">主导航区</h4>
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <p className="mb-3 text-lg font-bold text-[#1F2937]">产品与服务</p>
                <ul className="space-y-2">
                  {PRODUCTS_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm leading-relaxed text-[#4B5563] transition-colors hover:text-[#003366]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-3 text-lg font-bold text-[#1F2937]">合作共赢</p>
                <ul className="space-y-2">
                  {WINWIN_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm leading-relaxed text-[#4B5563] transition-colors hover:text-[#003366]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-3 text-lg font-bold text-[#1F2937]">关于N2N-AFE</p>
                <ul className="space-y-2">
                  {ABOUT_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm leading-relaxed text-[#4B5563] transition-colors hover:text-[#003366]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-black tracking-[0.18em] text-[#003366]">CTA区</h4>
            <div className="grid gap-6 sm:grid-cols-2">
              <ul className="space-y-2">
                {CTA_LEFT_LINKS.map((link, idx) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`leading-relaxed transition-colors hover:text-[#003366] ${idx === 0 ? 'text-lg font-bold text-[#1F2937]' : 'text-sm text-[#4B5563]'}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="space-y-2">
                {CTA_RIGHT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm leading-relaxed text-[#4B5563] transition-colors hover:text-[#003366]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className="mb-6 mt-10 h-px"
          style={{ background: 'linear-gradient(90deg, #003366 0%, #0077CC 50%, #003366 100%)', opacity: 0.25 }}
        />

        <div className="space-y-3 text-sm text-[#4B5563]">
          <p className="text-base font-semibold text-[#1F2937]">
            Copyright 2026 N2N-AFE (Hong Kong) Limited. All Rights Reserved.
          </p>
          <p>
            The financial information is provided by N2N-AFE (Hong Kong) .
            <Link href="/privacy-policy#disclaimer-section" className="ml-2 underline underline-offset-2 transition-colors hover:text-[#003366]">
              免责声明
            </Link>
            <Link href="/privacy-policy#privacy-policy-section" className="ml-2 underline underline-offset-2 transition-colors hover:text-[#003366]">
              私隐政策声明
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
