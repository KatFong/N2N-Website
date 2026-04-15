/** 内容对齐 n2nconnect-reference/site/trading-solution.html */

const ICON = (name: string) => `/trading-solution/front-office-icons/${name}`;
const ICON_BO = (name: string) => `/trading-solution/back-office-icons/${name}`;

export type TradingFeature = {
  icon: string;
  title: string;
  description: string;
};

export const TRADING_SOLUTION_FRONT_FEATURES: TradingFeature[] = [
  {
    icon: ICON('buy_sell_icon.png'),
    title: '零售与机构交易',
    description:
      '亚太区备受青睐的交易解决方案，覆盖全球各类交易场景与客户类型。',
  },
  {
    icon: ICON('order_icon.png'),
    title: '客户订单管理',
    description:
      '安全、高效、经济地执行证券订单，并覆盖盘前流程与持仓管理。',
  },
  {
    icon: ICON('profit_loss_icon.png'),
    title: '盈亏管理',
    description:
      '协助您统筹营收与成本，深入细节并获取经营洞察。',
  },
  {
    icon: ICON('algo_icon.png'),
    title: '程序化交易',
    description:
      '全自动、可预设的交易指令，速度与处理能力出众，紧跟市场趋势。',
  },
  {
    icon: ICON('analytic_icon.png'),
    title: '分析与图表',
    description:
      '面向成熟投资者：逾百种图表与指标、十余年历史数据、图表内下单等能力。',
  },
  {
    icon: ICON('low_latency_icon.png'),
    title: '低延迟直连市场（DMA）',
    description:
      '依托区域内广泛且优化的网络，提供极速直连市场交易体验。',
  },
  {
    icon: ICON('news_icon.png'),
    title: '新闻与基本面',
    description:
      '整合区域与本地资讯来源，帮助投资者做出更明智的交易决策。',
  },
  {
    icon: ICON('smart_order_icon.png'),
    title: '智能订单路由',
    description:
      '依您自定义规则，自动将订单路由至当前最优机会。',
  },
];

export const TRADING_SOLUTION_BACK_FEATURES: TradingFeature[] = [
  {
    icon: ICON_BO('data_reconciliation.png'),
    title: '数据核对',
    description:
      '顺畅完成数据迁移；运用数学模型校验，降低过程中的数据遗漏风险。',
  },
  {
    icon: ICON_BO('trade_settelment.png'),
    title: '交易结算',
    description:
      '高效结算是常态，算法公式助力确保计算准确、流程省时。',
  },
  {
    icon: ICON_BO('margin_calculation.png'),
    title: '保证金计算',
    description: '简化客户保证金的调整与个性化配置。',
  },
  {
    icon: ICON_BO('corporate_actions.png'),
    title: '公司行动',
    description: '及时、迅速、高效处理各类公司行动，流程顺畅可靠。',
  },
  {
    icon: ICON_BO('commissions_management.png'),
    title: '佣金管理',
    description: '为客户与代理配置差异化的收益与参与激励方案。',
  },
  {
    icon: ICON_BO('contract_generation.png'),
    title: '合约生成',
    description: '高效、准时生成合约，满足客户业务节奏。',
  },
  {
    icon: ICON_BO('client_statement.png'),
    title: '客户对账单',
    description: '及时向客户提供清晰易懂的交易活动对账单。',
  },
  {
    icon: ICON_BO('report_generation.png'),
    title: '报表生成',
    description: '支持客户按需配置并生成贴合自身需求的报表。',
  },
];

/** 首页式 Hero 说明（全宽横幅用） */
export const TRADING_SOLUTION_HERO = {
  title: '交易解决方案',
  subtitle:
    'N2N 为券商与机构客户提供整合前台交易与后台结算的一站式平台，涵盖多资产、多市场与多币种，稳定、安全、可扩展。',
};

/** Hero 下方主视觉区（左图右文，对齐设计稿） */
export const TRADING_SOLUTION_SPOTLIGHT = {
  title: '整合证券交易与结算',
  tagline: '全品类、多数据来源，满足机构级交易与风控需求',
  paragraphs: [
    '我们的前后台一体化方案，协助证券商与银行在单一平台上完成报价、下单、清算与结算，降低营运成本并缩短上线时间。',
    '无论是零售或机构客户，皆可透过可扩充架构接入环球市场，并依业务需求配置权限、报表与介面。',
  ],
  imageSrc: '/trading-solution/front-office.png',
  ctaLabel: '了解更多',
  ctaHref: '/contact',
};

/** 页尾蓝底横幅（Strapi `footerCta` 未填时后备） */
export type TradingSolutionFooterCta = {
  kicker: string;
  title: string;
  description: string;
  footnote: string;
  buttonLabel: string;
  buttonHref: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
};

export const TRADING_SOLUTION_FOOTER_CTA_DEFAULT: TradingSolutionFooterCta = {
  kicker: '',
  title: '准备好部署专业交易方案？',
  description:
    '与我们联系，安排产品示范、技术咨询与导入规划，为您的业务选择最合适的模组组合。',
  footnote: '',
  buttonLabel: '了解更多',
  buttonHref: '/contact',
  secondaryButtonLabel: '',
  secondaryButtonHref: '',
};

export type TradingSolutionGridIconId =
  | 'clock'
  | 'chart'
  | 'mobile'
  | 'custom'
  | 'api'
  | 'security'
  | 'shield'
  | 'brain'
  | 'arrow'
  | 'alarm'
  | 'harddrive'
  | 'headphones';

export type TradingSolutionGridItem = {
  iconId: TradingSolutionGridIconId;
  title: string;
  lines: string[];
};

/** 3×2 能力网格（六项：图示由前台 Lucide 渲染） */
export const TRADING_SOLUTION_SIX_GRID: TradingSolutionGridItem[] = [
  {
    iconId: 'clock',
    title: '超低延迟',
    lines: ['微秒级交易指令处理', '支持高频交易', '低时延响应'],
  },
  {
    iconId: 'chart',
    title: '全面图表',
    lines: ['多种技术图表', '图表功能全面', '设有比较及绘图功能'],
  },
  {
    iconId: 'mobile',
    title: '移动交易',
    lines: ['iOS & Android双平台', '实时市场价格与图表', '高移动性、稳定性'],
  },
  {
    iconId: 'custom',
    title: '定制服务',
    lines: ['量身定制、灵活配置', '满足不同客户需求'],
  },
  {
    iconId: 'api',
    title: 'API接口',
    lines: ['支持API对接，RESTful + WebSocket双协议支持', '可与券商自有系统无缝集成'],
  },
  {
    iconId: 'security',
    title: '安全合规',
    lines: ['符合香港证监会要求', '数据加密传输、权限管控机制'],
  },
];

export type TradingSolutionFeatureRowVariant =
  | 'spreadsheet'
  | 'api-console'
  | 'multi-chart'
  | 'order-blotter'
  | 'risk-radar'
  | 'settlement'
  | 'portfolio'
  | 'compact-terminal';

export type TradingSolutionFeatureRow = {
  title: string;
  lines: string[];
  variant: TradingSolutionFeatureRowVariant;
  moreLabel?: string;
  moreHref?: string;
};

/**
 * 8 组左右交错图文 — 预设文案（Strapi `trading-solution-page` 未发布或为空时使用）
 * 内容对齐业务提供的产品模组说明
 */
export const TRADING_SOLUTION_FEATURE_ROWS: TradingSolutionFeatureRow[] = [
  {
    title: '专业版网上交易系统（G3 Pro X）',
    variant: 'order-blotter',
    lines: [
      '自定义交易界面：模块化设计，用户可自由选择功能组件与排版布局',
      '全键盘快捷操作：丰富的快捷键设置，专为专业交易员优化操作效率',
      '多市场订单管理：支持电子买卖盘输入、投资组合展示及全球市场交易指令传送',
      '实时投资组合监控：整合后台连接功能，提供全面的账目管理与调整工具',
    ],
  },
  {
    title: '浏览器交易系统（Trade X）',
    variant: 'multi-chart',
    lines: [
      '跨设备跨平台：基于网页浏览器即可直接使用',
      '全球市场覆盖：交易港股、美股、A股、欧股、日股等主要国际市场',
      '进阶分析工具：内置强大图表互动功能与多种技术指标设置',
      '企业环境友好：突破应用防火墙限制，适合专业投资者随时监控与交易',
    ],
  },
  {
    title: '移动端交易系统（Mobile X）',
    variant: 'compact-terminal',
    lines: [
      '全天候移动交易：通过手机应用程序进入全球金融市场，随时把握交易机会',
      '多市场实时资讯：提供港股、美股及其他国际市场的不间断报价与财经资讯',
      '综合分析工具：整合基本面、消息面、资金面分析与技术图表功能',
      '多产品支持：支持多种金融产品交易，满足多元化投资需求',
    ],
  },
  {
    title: '专业虚拟资产交易系统（VA Trading）',
    variant: 'portfolio',
    lines: [
      '多币种交易支持：主流加密货币、稳定币及热门代币一站式交易',
      '合规透明：遵循监管要求，提供可审计的交易记录与资金流向报告',
      '即时资产管理：集中查看持仓、损益及市场波动，支持快速买卖操作',
      '自定义提醒：设定关键价位通知，及时把握市场机会',
    ],
  },
  {
    title: '高效率程式交易系统（Algo Trading）',
    variant: 'api-console',
    lines: [
      '多策略算法库：预设趋势跟踪、均值回归、做市商及套利等经典策略模板',
      '智能订单执行：支持 TWAP、VWAP 等算法，自动优化交易节奏与市场冲击',
      '回测与模拟环境：基于历史数据的策略回测与实时模拟交易，验证策略有效性',
      '实时监控与分析：图形化展示策略绩效、持仓状态及风险指标',
      '开放 API：支持自定义策略开发与第三方系统对接',
    ],
  },
  {
    title: '专业AI新闻分析（AI News Analysis）',
    variant: 'multi-chart',
    lines: [
      '多维度市场解析：深入分析市场与行业影响，确保投资者获取高价值信息。',
      '实时趋势与建议生成：基于全球财经新闻与数据，自动生成趋势报告与精准投资建议。',
      '智能情绪分析与过滤：高效过滤噪讯，进行市场情绪分析，提升决策可靠性。',
    ],
  },
  {
    title: 'IPO匹配引擎（IPO Matching Engine）',
    variant: 'settlement',
    lines: [
      '大数据投资者匹配：精准匹配发行方与投资者需求，提升新股发行效率。',
      '自动化适当性评估：自动评估投资者适当性，确保合规与资金配置效率。',
      '配售流程优化：优化配售流程，提高IPO运作效率与成功率。',
    ],
  },
  {
    title: '高阶电子化客户身份认证（eKYC）',
    variant: 'risk-radar',
    lines: [
      '先进生物识别认证：采用最先进生物识别技术，提供安全便捷的身份认证。',
      '智能风险验证：智能化身份验证与风险评估，缩短流程，提升合规运营效率。',
      '强化KYC合规：强化KYC措施，防范洗钱等非法活动，确保交易透明合规。',
    ],
  },
];
