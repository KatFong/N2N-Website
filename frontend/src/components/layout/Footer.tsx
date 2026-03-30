import Link from 'next/link';
import Image from 'next/image';
import type { MappedFooter } from '@/lib/footerDefaults';
import { FOOTER_DEFAULT_COLUMNS, FOOTER_DEFAULT_COPYRIGHT, FOOTER_DEFAULT_LEGAL_LINKS } from '@/lib/footerDefaults';

type Props = {
  data?: MappedFooter;
};

export default function Footer({ data }: Props) {
  const cols = data?.columns?.length ? data.columns : FOOTER_DEFAULT_COLUMNS;
  const legalLinks = data?.legalLinks?.length ? data.legalLinks : FOOTER_DEFAULT_LEGAL_LINKS;
  const copyright = data?.copyright?.trim() ? data.copyright : FOOTER_DEFAULT_COPYRIGHT;

  return (
    <footer style={{ backgroundColor: '#F5F7FA', borderTop: '1px solid #D9E2EC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {cols.map((col) => (
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
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" style={{ color: '#999999' }}>
            {legalLinks.map((link, i) => (
              <span key={`${link.href}-${link.label}`} className="inline-flex items-center gap-4">
                {i > 0 ? <span className="text-[#D9E2EC]">|</span> : null}
                <Link
                  href={link.href}
                  className="transition-colors duration-150 hover:underline text-[#999999] hover:text-[#0077CC]"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-[#999999]">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
