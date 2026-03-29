export type NewsArticle = {
  slug: string;
  title: string;
  category: '公告' | '新闻稿';
  publishedDate: string;
  excerpt: string;
  content: string;
};

export const pressAndAnnouncementArticles: NewsArticle[] = [
  {
    slug: 'announcement-25022026-a1',
    title: '一般公告 — 公司动态（A1）',
    category: '公告',
    publishedDate: '2026-02-25',
    excerpt: 'N2N Connect 发布重要公司动态与经营要点，供利益相关方参阅。',
    content:
      '<p>N2N Connect Berhad 发布本一般公告，以便股东与市场参与者了解最新公司发展与业务重点。</p><p>更多细节可通过马来西亚交易所公告及官方投资者沟通渠道获取。</p>',
  },
  {
    slug: 'announcement-20220819',
    title: '一般公告 — 业务与财务更新',
    category: '公告',
    publishedDate: '2022-08-19',
    excerpt: '就经营与财务进展发布信息，提升投资者知情度与透明度。',
    content:
      '<p>本公告概述与股东及潜在投资者相关的最新经营进展与财务更新。</p><p>公司将继续聚焦可持续增长与稳健执行。</p>',
  },
  {
    slug: 'press-20191002-ivsc-nst-edu',
    title: 'NST 报道 N2N 集团教育相关举措',
    category: '新闻稿',
    publishedDate: '2019-10-02',
    excerpt: '媒体报道 N2N 集团在区域市场的社区与教育项目。',
    content:
      '<p>N2N 集团持续支持教育与产业协作项目，培育面向未来的技术人才与科技驱动增长。</p>',
  },
  {
    slug: 'press-20190807-ivsc-nst-business',
    title: 'N2N 行业观点与市场展望',
    category: '新闻稿',
    publishedDate: '2019-08-07',
    excerpt: 'N2N 在商业专题报道中分享市场观察与战略展望。',
    content:
      '<p>访谈凸显 N2N 对资本市场技术、创新与区域拓展的长期承诺。</p>',
  },
  {
    slug: 'press-20181226-sbi-theedge',
    title: 'The Edge 提及与 SBI 战略合作进展',
    category: '新闻稿',
    publishedDate: '2018-12-26',
    excerpt: '媒体报道战略合作里程碑与技术定位相关进展。',
    content:
      '<p>本稿梳理战略合作更新，以及公司通过技术伙伴关系强化市场地位的进展。</p>',
  },
  {
    slug: 'press-20161012-afe-star',
    title: 'AFE：平台扩展与产品动能',
    category: '新闻稿',
    publishedDate: '2016-10-12',
    excerpt: '区域媒体报道产品开发与市场拓展计划。',
    content:
      '<p>N2N 的平台与产品路线图随资本市场需求变化与数字化转型持续演进。</p>',
  },
];
