import Link from 'next/link';
import Image from 'next/image';

const FOOTER_COLS = [
  {
    title: '关于我们',
    links: [
      { label: '公司简介', href: '/about' },
      { label: '企业亮点', href: '/about' },
    ],
  },
  {
    title: '业务概览',
    links: [
      { label: '首页', href: '/' },
      { label: '资本市场解决方案', href: '/#product-overview' },
      { label: '2.1 交易方案', href: '/trading-solution' },
      { label: '2.2 结算方案', href: '/settlement-solution' },
      { label: '创新金融科技', href: '/vas' },
      { label: '个人投资者工具', href: '/smp5' },
      { label: '技术与网络服务', href: '/custody' },
    ],
  },
  {
    title: '投资者关系',
    links: [
      { label: '概览', href: '/global-business' },
      { label: '公司公告', href: '/news-insights' },
      { label: '新闻稿', href: '/news-insights' },
    ],
  },
  {
    title: '咨询联系',
    links: [
      { label: '联系我们', href: '/contact' },
      { label: '加入我们', href: '/business-partnership' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#F5F7FA', borderTop: '1px solid #D9E2EC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4
                className="mb-4 text-xs font-black tracking-wide text-[#003366]"
              >
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm leading-relaxed transition-colors duration-150 text-[#666666] hover:text-[#003366]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Gradient divider */}
        <div
          className="h-px mb-6"
          style={{ background: 'linear-gradient(90deg, #003366 0%, #0077CC 50%, #003366 100%)', opacity: 0.25 }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/n2n-logo-head.png"
              alt="N2N-AFE"
              width={110}
              height={30}
              className="object-contain"
              style={{ height: 28, width: 'auto' }}
            />
          </Link>

          {/* Legal links */}
          <div className="flex items-center gap-4 text-xs" style={{ color: '#999999' }}>
            <Link
              href="/privacy-policy"
              className="transition-colors duration-150 hover:underline text-[#999999] hover:text-[#0077CC]"
            >
              条款与条件
            </Link>
            <span className="text-[#D9E2EC]">|</span>
            <Link
              href="/privacy-policy"
              className="transition-colors duration-150 hover:underline text-[#999999] hover:text-[#0077CC]"
            >
              法律信息
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-[#999999]">© N2N Connect Bhd. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
}
