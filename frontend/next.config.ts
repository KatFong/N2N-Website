import path from 'path';
import { fileURLToPath } from 'url';
import type { NextConfig } from 'next';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /** 避免上层目录另有 lockfile 时误判 workspace root */
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      { source: '/products-services', destination: '/#product-overview', permanent: true },
      { source: '/trading-solution.html', destination: '/trading-solution', permanent: true },
      {
        source: '/product/trading-system.html',
        destination: '/trading-solution',
        permanent: true,
      },
      { source: '/product/trading-system', destination: '/trading-solution', permanent: true },
      { source: '/product/trading-solution', destination: '/trading-solution', permanent: true },
      {
        source: '/product/settlement-solution',
        destination: '/settlement-solution',
        permanent: true,
      },
      {
        source: '/product/financial-information-service',
        destination: '/financial-information-service',
        permanent: true,
      },
      { source: '/custody', destination: '/server-hosting', permanent: true },
      { source: '/custody.html', destination: '/server-hosting', permanent: true },
      { source: '/product/virtual-assets', destination: '/vas', permanent: true },
      { source: '/product/smp5', destination: '/smp5', permanent: true },
      { source: '/product/server-hosting', destination: '/server-hosting', permanent: true },
      {
        source: '/product/virtual-assets.html',
        destination: '/vas',
        permanent: true,
      },
      { source: '/product/smp5.html', destination: '/smp5', permanent: true },
      {
        source: '/product/server-hosting.html',
        destination: '/server-hosting',
        permanent: true,
      },
      { source: '/products/virtual-assets', destination: '/vas', permanent: true },
      { source: '/products/smp5', destination: '/smp5', permanent: true },
      { source: '/products/server-hosting', destination: '/server-hosting', permanent: true },
      { source: '/product-line', destination: '/quotation', permanent: true },
      { source: '/product-line/:slug', destination: '/:slug', permanent: true },
      {
        source: '/products/:slug',
        destination: '/product/:slug',
        permanent: true,
      },
      /** 首页核心优势卡片沿用旧站 .html 路径 */
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/contact-us.html', destination: '/contact', permanent: true },
      { source: '/global-business.html', destination: '/global-business', permanent: true },
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
