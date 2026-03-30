import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { mapFooterFromStrapi } from '@/lib/mapFooter';
import { getFooter } from '@/lib/strapi';

const inter = Inter({ subsets: ['latin'] });

/** 頁尾等依 Strapi，避免建置時快取舊內容 */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: 'N2N-AFE | 亚洲金融科技企业',
    template: '%s | N2N-AFE',
  },
  description:
    'N2N-AFE（联盛亚富）以领先的金融与企业科技方案，连接亚洲各地企业，助力业务增长与数字化。',
  keywords: ['N2N-AFE', '亚洲', '金融', '企业', '业务', '全球'],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerRes = await getFooter();
  const footerData = mapFooterFromStrapi(footerRes?.data ?? null);

  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <Footer data={footerData} />
      </body>
    </html>
  );
}
