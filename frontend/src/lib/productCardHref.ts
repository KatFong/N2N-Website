/**
 * 首页「产品与服务」卡片内部 slug → 正式路径（产品线为根路径 `/{slug}`）。
 */
export function productCardHref(slug: string): string {
  switch (slug) {
    case 'trading-solution':
    case 'trading-system':
      return '/trading-solution';
    case 'settlement-solution':
      return '/settlement-solution';
    case 'financial-information-service':
      return '/financial-information-service';
    case 'virtual-assets':
      return '/vas';
    case 'smp5':
      return '/smp5';
    case 'server-hosting':
      return '/custody';
    default:
      return `/${slug}`;
  }
}
