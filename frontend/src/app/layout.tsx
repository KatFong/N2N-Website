import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'N2N-AFE | Asia Financial Enterprise',
    template: '%s | N2N-AFE',
  },
  description: 'N2N-AFE - Connecting businesses across Asia with cutting-edge financial and enterprise solutions.',
  keywords: ['N2N-AFE', 'Asia', 'Financial', 'Enterprise', 'Business', 'Global'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
