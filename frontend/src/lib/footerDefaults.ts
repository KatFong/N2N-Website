/** 全站頁尾預設（Strapi `footer` 未填或離線時使用） */
export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

export const FOOTER_DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: '关于我们',
    links: [
      { label: '公司简介', href: '/about' },
      { label: '企业亮点', href: '/about' },
    ],
  },
  {
    title: '产品与服务',
    links: [
      { label: '资本市场解决方案', href: '/#product-overview' },
      { label: '交易方案', href: '/trading-solution' },
      { label: '结算方案', href: '/settlement-solution' },
      { label: '创新金融科技', href: '/vas' },
      { label: '个人投资者工具', href: '/smp5' },
      { label: '服务器托管和专线服务', href: '/server-hosting' },
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

export const FOOTER_DEFAULT_LEGAL_LINKS: FooterLink[] = [
  { label: '条款与条件', href: '/privacy-policy' },
  { label: '法律信息', href: '/privacy-policy' },
];

export const FOOTER_DEFAULT_COPYRIGHT = '© N2N Connect Bhd. 保留所有权利。';

export type MappedFooter = {
  columns: FooterColumn[];
  legalLinks: FooterLink[];
  copyright: string;
};
