import path from 'path';
import { fileURLToPath } from 'url';
import type { NextConfig } from 'next';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /** 避免上層目錄另有 lockfile 時誤判 workspace root */
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      /** 舊站 .html 與站內曾用的 /products/ 路徑 → 正式網址 /product/:slug */
      {
        source: '/product/trading-system.html',
        destination: '/product/trading-system',
        permanent: true,
      },
      {
        source: '/product/virtual-assets.html',
        destination: '/product/virtual-assets',
        permanent: true,
      },
      { source: '/product/smp5.html', destination: '/product/smp5', permanent: true },
      {
        source: '/product/server-hosting.html',
        destination: '/product/server-hosting',
        permanent: true,
      },
      {
        source: '/products/:slug',
        destination: '/product/:slug',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
