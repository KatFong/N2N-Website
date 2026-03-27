import Link from 'next/link';
import Image from 'next/image';

const FOOTER_COLS = [
  {
    title: 'OUR COMPANY',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Corporate Highlights', href: '/about' },
    ],
  },
  {
    title: 'OUR BUSINESS',
    links: [
      { label: 'Capital Market Solutions', href: '/products-services' },
      { label: '机构解决方案', href: '/product/trading-system' },
      { label: '创新金融科技', href: '/product/virtual-assets' },
      { label: '个人投资者工具', href: '/product/smp5' },
      { label: '技术与网络服务', href: '/product/server-hosting' },
    ],
  },
  {
    title: 'INVESTOR RELATIONS',
    links: [
      { label: 'Overview', href: '/global-business' },
      { label: 'Company Announcements', href: '/news-insights' },
      { label: 'Press Release', href: '/news-insights' },
    ],
  },
  {
    title: 'ENQUIRIES',
    links: [
      { label: 'Contact Us', href: '/login' },
      { label: 'Join Us', href: '/business-partnership' },
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
                className="text-xs font-black tracking-[0.18em] mb-4 uppercase"
                style={{ color: '#003366' }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
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
              Terms &amp; Conditions
            </Link>
            <span className="text-[#D9E2EC]">|</span>
            <Link
              href="/privacy-policy"
              className="transition-colors duration-150 hover:underline text-[#999999] hover:text-[#0077CC]"
            >
              Legal
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-[#999999]">© N2N Connect Bhd. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
