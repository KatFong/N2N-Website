export type ProductIconId = 'institutional' | 'fintech' | 'retail' | 'hosting';

export type ProductBodyMode = 'bullets' | 'paragraph';

export type ProductOverviewItem = {
  slug: string;
  title: string;
  subtitle?: string;
  bullets: string[];
  icon: ProductIconId;
  /** 卡片頂部大圖（全寬 cover） */
  coverImage: string;
  /** bullets：多條重點；paragraph：以首段為一段說明（對齊設計稿第二種卡片） */
  bodyMode?: ProductBodyMode;
};

export const productOverviewItems: ProductOverviewItem[] = [
  {
    slug: 'trading-system',
    title: '机构解决方案',
    subtitle: 'Institutional Solutions',
    bullets: [
      '券商基础设施：为券商提供稳定、高效、安全的交易、报价与结算系统，支持全球多市场接入。',
    ],
    icon: 'institutional',
    coverImage: '/about/geometric-building2.jpg',
    bodyMode: 'paragraph',
  },
  {
    slug: 'virtual-assets',
    title: '创新金融科技',
    subtitle: 'Innovative FinTech',
    bullets: [
      '虚拟资产与量化交易，提供符合香港监管要求的虚拟资产交易解决方案，以及强大的 n2nquant 量化平台，把握新兴市场机遇。',
    ],
    icon: 'fintech',
    coverImage: '/product-overview/half-globe.png',
    bodyMode: 'paragraph',
  },
  {
    slug: 'smp5',
    title: '个人投资者工具',
    subtitle: 'Retail Investor Tools',
    bullets: [
      '个人投资利器，股市宝 SMP5 功能丰富实用，策略助手 Master Picks 集成各流派分析框架，为个人投资者提供专业级的数据与决策支持。',
    ],
    icon: 'retail',
    coverImage: '/about/geometric-building2.jpg',
    bodyMode: 'paragraph',
  },
  {
    slug: 'server-hosting',
    title: '技术与网络服务',
    subtitle: 'Technology & Network Services',
    bullets: [
      '托管与专线服务，金融级别的数据中心与高速专线服务，保障用户的业务 7×24 小时不间断运行。',
    ],
    icon: 'hosting',
    coverImage: '/product-overview/half-globe.png',
    bodyMode: 'paragraph',
  },
];

export function getProductBySlug(slug: string): ProductOverviewItem | undefined {
  return productOverviewItems.find((p) => p.slug === slug);
}
