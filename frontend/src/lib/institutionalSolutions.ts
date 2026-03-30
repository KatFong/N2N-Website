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
  title: '券商报价系统',
  subtitle: 'Financial Information Service',
  bullets: [
    '多市场即时报价与深度行情，整合参考数据与新闻资讯，支援投研与柜台交易决策。',
    '可扩充的数据介面与 API，便于接入内部系统、风控与第三方应用。',
    '依角色与合规需求配置权限与留痕，满足券商对资料治理与审计的要求。',
  ],
};
