/**
 * 机构方案（产品线 2.x）：与后台 Single Type 编号对齐。
 * 2.1 → /trading-solution；2.2 → /settlement-solution
 */
export type InstitutionalNavItem = {
  section: string;
  label: string;
  href: string;
};

export const INSTITUTIONAL_SOLUTION_NAV: InstitutionalNavItem[] = [
  { section: '2.1', label: '2.1 交易方案', href: '/trading-solution' },
  { section: '2.2', label: '2.2 结算方案', href: '/settlement-solution' },
];

export const FINANCIAL_INFORMATION_SERVICE_PAGE_DEFAULT = {
  title: '金融资讯服务',
  subtitle: '金融信息服务',
  bullets: [
    '即时与历史行情、参考数据与新闻资讯整合，支持投研与交易决策。',
    '可扩充的数据介面与 API，方便接入内部系统与第三方应用。',
    '依角色与合规需求配置权限与留痕，满足机构对资料治理的要求。',
  ],
};
