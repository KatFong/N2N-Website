import type { ProductIconId } from '@/lib/productOverview';

export type CoreAdvStat = {
  target: number;
  prefix?: string;
  suffix?: string;
  unit: string;
  label: string;
  format?: 'int' | 'comma';
};

/** 首頁各區預設（Strapi 未填或離線時使用） */
export const HOME_HERO_DEFAULTS = {
  title: '43年专业 | 金融科技的可靠伙伴',
  subtitle: '联盛亚富资讯科技有限公司（N2N-AFE）',
  description: '为全球证券、期货、基金及债券市场提供快速、准确、可靠的交易与结算解决方案',
  backgroundImageUrl: '/about/geometric-building2.jpg',
  ctaPrimaryLabel: '了解我们的产品',
  ctaPrimaryLink: '/products-services',
  ctaSecondaryLabel: '全球业务网络',
  ctaSecondaryLink: '/global-business',
  showLogo: true,
};

export const HOME_CORE_ADV_DEFAULTS: {
  moduleLabel: string;
  titleZh: string;
  titleEn: string;
  introText: string;
  statStripBackgroundUrl: string;
  stats: CoreAdvStat[];
  cards: { title: string; desc: string }[];
} = {
  moduleLabel: 'Module 02',
  titleZh: '核心優勢',
  titleEn: 'Core Advantages',
  introText: '以數據呈現規模，以產品與服務落實價值。',
  statStripBackgroundUrl: '/about/geometric-building2.jpg',
  stats: [
    { target: 3, suffix: '+', unit: 'Million', label: 'ORDERS SUBMITTED' },
    { target: 85, suffix: '+', unit: 'Billion', label: 'TRADE VALUE' },
    { target: 85, suffix: '+', unit: 'Billion', label: 'TRADE VALUE' },
    { target: 180, suffix: '+', unit: 'Billion', label: 'TRADE VOLUME' },
    { target: 55000, suffix: '+', unit: '', label: 'INTERNATIONAL TRADES', format: 'comma' as const },
  ],
  cards: [
    {
      title: '低成本',
      desc: '以低於行業 30% 以上的成本獲得遠超過行業競爭力的產品、解決方案服務',
    },
    {
      title: '高效率',
      desc: '端到端整合架構與自動化流程，縮短上線時間並提升營運效率。',
    },
    {
      title: '可擴展',
      desc: '模組化設計支援業務成長，輕鬆擴展至多市場、多資產類別。',
    },
  ],
};

export type HomeProductCardDefault = {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  icon: ProductIconId;
  coverImage: string;
};

export const HOME_PRODUCTS_DEFAULTS: HomeProductCardDefault[] = [
  {
    slug: 'trading-system',
    title: '机构解决方案',
    subtitle: 'Institutional Solutions',
    description:
      '券商基础设施：为券商提供稳定、高效、安全的交易、报价与结算系统，支持全球多市场接入。',
    icon: 'institutional',
    coverImage: '/about/geometric-building2.jpg',
  },
  {
    slug: 'virtual-assets',
    title: '创新金融科技',
    subtitle: 'Innovative FinTech',
    description:
      '虚拟资产与量化交易，提供符合香港监管要求的虚拟资产交易解决方案，以及强大的 n2nquant 量化平台，把握新兴市场机遇。',
    icon: 'fintech',
    coverImage: '/product-overview/half-globe.png',
  },
  {
    slug: 'smp5',
    title: '个人投资者工具',
    subtitle: 'Retail Investor Tools',
    description:
      '个人投资利器，股市宝 SMP5 功能丰富实用，策略助手 Master Picks 集成各流派分析框架，为个人投资者提供专业级的数据与决策支持。',
    icon: 'retail',
    coverImage: '/about/geometric-building2.jpg',
  },
  {
    slug: 'server-hosting',
    title: '技术与网络服务',
    subtitle: 'Technology & Network Services',
    description:
      '托管与专线服务，金融级别的数据中心与高速专线服务，保障用户的业务 7×24 小时不间断运行。',
    icon: 'hosting',
    coverImage: '/product-overview/half-globe.png',
  },
];

export const HOME_PRODUCTS_SECTION_DEFAULTS = {
  moduleLabel: 'Module 03',
  titleZh: '产品与服务',
  titleEn: 'Product Overview',
  introText: '點擊卡片前往產品詳情；滑鼠懸停可預覽強調狀態。',
};

export const HOME_NEWS_DEFAULTS = {
  moduleLabel: 'Module 04',
  titleZh: '新闻与活动',
  titleEn: '',
  introText: '',
  featuredTitle: '',
  featuredLink: '/news-insights',
  featuredImageUrl: '/about/geometric-building2.jpg',
  moreButtonLabel: '更多',
  moreButtonLink: '/news-insights',
};

export const HOME_CONTACT_CTA_DEFAULTS = {
  title: '聯繫 N2N Connect，開啟降本增效與業務增長新模式',
  description:
    '超越傳統 IT 供應商，以領先金融科技提供高性價比、高效能，多市場、多業務的一站式靈活客製化服務。',
  buttonLabel: '聯繫我們',
  buttonLink: '/login',
  backgroundImageUrl: null as string | null,
};
