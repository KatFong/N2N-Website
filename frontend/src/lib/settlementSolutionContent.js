"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SETTLEMENT_SOLUTION_FEATURE_ROWS = exports.SETTLEMENT_SOLUTION_FOOTER_CTA_DEFAULT = exports.SETTLEMENT_SOLUTION_SIX_GRID = exports.SETTLEMENT_SOLUTION_SPOTLIGHT = exports.SETTLEMENT_SOLUTION_HERO = void 0;
/** 结算方案页 — Strapi 未填时之程式后备（结构同 Trading Solution） */
exports.SETTLEMENT_SOLUTION_HERO = {
    title: '券商交易系统',
    subtitle: '交易解决方案（G3 Pro 后台）',
};
exports.SETTLEMENT_SOLUTION_SPOTLIGHT = {
    title: '券商交易系统 - 多终端交易解决方案',
    tagline: 'G3 Pro X | Trade X | Mobile X | VA Trading | Algo Trading',
    paragraphs: [
        '覆盖PC端（电脑应用）、Web端（网页访问）与移动端（APP）；',
        '支持传统证券交易、虚拟资产交易、量化程序交易。',
    ],
    imageSrc: '/trading-solution/front-office.png',
    ctaLabel: '了解更多',
    ctaHref: '/contact',
};
exports.SETTLEMENT_SOLUTION_SIX_GRID = [
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
exports.SETTLEMENT_SOLUTION_FOOTER_CTA_DEFAULT = {
    kicker: '',
    title: '准备好迎接金融科技的未来了吗？',
    description: '立即联系我们的专家，获取为您量身定制的解决方案。',
    footnote: '',
    buttonLabel: '免费咨询',
    buttonHref: '/contact',
};
/** 八组图文 — 程式后备（CMS `features` 有资料时会覆写）；文案为交易产品线模组 */
exports.SETTLEMENT_SOLUTION_FEATURE_ROWS = [
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
            '全球市场覆盖：交易港股、美股、A 股、欧股、日股等主要国际市场',
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
        title: '高效程式交易系统（Algo Trading）',
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
