"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductLinePage = exports.productLinePageContentBySlug = exports.PRODUCT_LINE_NAV = exports.productLineEntryHref = exports.PRODUCT_LINE_DYNAMIC_SLUGS = exports.PRODUCT_LINE_SLUGS = exports.PRODUCT_LINE_PAGE_ENTRIES = void 0;
const settlementSolutionContent_1 = require("@/lib/settlementSolutionContent");
/** 产品线内容 slug（不含「全球业务」，独立页 `/global-business`）；前台路径为根路径 `/{slug}`；交易／结算为独立路由 */
exports.PRODUCT_LINE_PAGE_ENTRIES = [
    { slug: 'quotation', label: '报价' },
    { slug: 'server-hosting', label: '服务器托管和专线服务' },
    { slug: 'vas', label: 'VAS' },
    { slug: 'smp5', label: 'SMP5' },
    { slug: 'mps', label: 'MPS' },
    { slug: 'quant', label: 'Quant' },
];
exports.PRODUCT_LINE_SLUGS = exports.PRODUCT_LINE_PAGE_ENTRIES.map((e) => e.slug);
/** 由 `(product-line)/[slug]` 承載；`/server-hosting` 另用 Single Type 專頁 */
exports.PRODUCT_LINE_DYNAMIC_SLUGS = exports.PRODUCT_LINE_PAGE_ENTRIES.filter((e) => e.slug !== 'server-hosting').map((e) => e.slug);
function productLineEntryHref(slug) {
    return `/${slug}`;
}
exports.productLineEntryHref = productLineEntryHref;
/**
 * Header「产品与服务」下拉与二级 Tab：交易方案、结算方案与其余产品线（简体标签）。
 */
exports.PRODUCT_LINE_NAV = [
    { label: '交易方案', href: '/trading-solution' },
    { label: '结算方案', href: '/settlement-solution' },
    ...exports.PRODUCT_LINE_PAGE_ENTRIES.map((e) => ({
        label: e.label,
        href: productLineEntryHref(e.slug),
    })),
];
const GRID_CTA = { label: '了解更多', href: '/contact' };
const IMG = '/trading-solution/front-office.png';
function rows(items) {
    return items;
}
function grid(items) {
    return items;
}
/** 與前台 fallback 相同；供 backend seed 寫入 Strapi `product-line-pages` 與 `server-hosting-page`。 */
exports.productLinePageContentBySlug = {
    quotation: {
        hero: {
            title: '报价与行情服务',
            subtitle: '多市场、多档深度、低延迟行情分发',
        },
        spotlight: {
            title: '机构级行情与报价能力',
            tagline: '稳定 · 可审计 · 可扩展',
            paragraphs: [
                '为券商与资管提供统一行情接入与分发，降低多供应商对接成本，缩短上线周期。',
                '可按业务与合规要求配置权限、留痕与灾备，满足机构对数据治理的要求。',
            ],
            imageSrc: IMG,
            ctaLabel: '了解更多',
            ctaHref: '/contact',
        },
        sixGrid: grid([
            { iconId: 'clock', title: '低延迟推送', lines: ['毫秒级更新节奏', '支持热备与多路源'] },
            { iconId: 'chart', title: '深度与图表', lines: ['多档买卖盘与成交', '与前台图表组件协同'] },
            { iconId: 'api', title: '标准接口', lines: ['REST / WebSocket', '便于对接自研与第三方'] },
            { iconId: 'security', title: '权限与合规', lines: ['按角色授权与审计', '传输与存储加密策略'] },
            { iconId: 'custom', title: '灵活部署', lines: ['云端或机房托管', '按量与套餐组合'] },
            { iconId: 'mobile', title: '全终端覆盖', lines: ['PC / Web / App', '统一行情视图'] },
        ]),
        gridSectionCta: GRID_CTA,
        footerCta: settlementSolutionContent_1.SETTLEMENT_SOLUTION_FOOTER_CTA_DEFAULT,
        featureRows: rows([
            { title: '多市场行情整合', variant: 'multi-chart', lines: ['一站式接入主要交易所与供应商', '统一符号与复权规则', '异常源自动切换'] },
            { title: '深度与逐笔数据', variant: 'order-blotter', lines: ['买卖多档与队列可视化', '逐笔成交还原盘口', '可对接风控与算法'] },
            { title: '分发与订阅管理', variant: 'api-console', lines: ['按客户与业务线隔离订阅', '带宽与并发可配置', '用量报表与告警'] },
            { title: '历史与回放', variant: 'spreadsheet', lines: ['Tick 与 K 线落库', '策略回测数据支撑', '合规查询与导出'] },
            { title: '灾备与高可用', variant: 'risk-radar', lines: ['双活与多机房策略', '断线自动重连', 'RTO/RPO 可约定'] },
            { title: '与交易系统联动', variant: 'compact-terminal', lines: ['与 G3 / Trade X 等前台打通', '下单前行情校验', '减少跨系统延迟'] },
            { title: '虚拟资产行情扩展', variant: 'portfolio', lines: ['主流币种与交易对', '合规披露字段可配', '与 VA 交易模块一致体验'] },
            { title: '专业服务', variant: 'settlement', lines: ['实施与迁移顾问', '7×24 运维可选', '定制化 SLA'] },
        ]),
    },
    'server-hosting': {
        hero: {
            title: '服务器托管和专线服务',
            subtitle: '7×24小时全天候监察',
        },
        spotlight: {
            title: '一站式服务',
            tagline: '',
            paragraphs: [],
            imageSrc: '/trading-solution/server-hosting-spotlight.png',
            ctaLabel: '了解更多',
            ctaHref: '/contact',
            highlightsHeading: '',
            coreHighlights: [
                'IT硬件和服务器机房环境',
                '7×24全天候监察',
                '符合证监会科技安全要求',
                '系统设置与维护',
                '技术稳定可靠',
            ],
        },
        sixGrid: grid([
            {
                iconId: 'harddrive',
                title: '服务器托管',
                lines: [
                    '多服务器托管设施',
                    '高性能互联网接入',
                    '服务器安装与配置',
                    '服务器处置服务',
                    '资产计算与存储',
                ],
            },
            {
                iconId: 'api',
                title: '专线服务',
                lines: [
                    'GP多线网络',
                    '高速专线连接',
                    '低延迟数据传输',
                    '网络冗余备份',
                    '24小时网络监控',
                ],
            },
            {
                iconId: 'security',
                title: '网络安全',
                lines: ['DDoS防护', '网络安全监控', '数据加密传输', '物理安全防护'],
            },
            {
                iconId: 'headphones',
                title: '技术支持',
                lines: [
                    '7×24小时技术支持',
                    '故障即时响应',
                    '系统设置与维护',
                    '灾备恢复服务',
                    '定期安全审计',
                ],
            },
        ]),
        gridSectionCta: GRID_CTA,
        footerCta: settlementSolutionContent_1.SETTLEMENT_SOLUTION_FOOTER_CTA_DEFAULT,
        featureRows: rows([
            {
                title: '服务器托管',
                variant: 'settlement',
                lines: [
                    '多服务器托管设施',
                    '高性能互联网接入',
                    '服务器安装与配置',
                    '服务器处置服务',
                    '资产计算与存储',
                ],
            },
            {
                title: '专线服务',
                variant: 'api-console',
                lines: [
                    'GP多线网络',
                    '高速专线连接',
                    '低延迟数据传输',
                    '网络冗余备份',
                    '24小时网络监控',
                ],
            },
            {
                title: '网络安全',
                variant: 'risk-radar',
                lines: ['DDoS防护', '网络安全监控', '数据加密传输', '物理安全防护'],
            },
            {
                title: '技术支持',
                variant: 'compact-terminal',
                lines: [
                    '7×24小时技术支持',
                    '故障即时响应',
                    '系统设置与维护',
                    '灾备恢复服务',
                    '定期安全审计',
                ],
            },
        ]),
    },
    vas: {
        hero: {
            title: '虚拟资产交易解决方案（VAS）',
            subtitle: 'Virtual Asset Trading Solutions',
        },
        spotlight: {
            title: '智能聚合型虚拟资产交易平台',
            tagline: '合规·智能·全栈',
            paragraphs: [],
            coreHighlights: [
                '合规框架技术方案',
                '一站式数字资产交易基础设施',
                '股票与虚拟资产统一账户管理',
                'PC、Web与APP全终端覆盖',
            ],
            imageSrc: IMG,
            ctaLabel: '了解更多',
            ctaHref: '/contact',
        },
        sixGrid: grid([
            {
                iconId: 'shield',
                title: '券商级合规与风控',
                lines: ['全面适配监管政策要求，内置 AML 与 KYC 流程，确保业务安全稳健'],
            },
            {
                iconId: 'brain',
                title: 'AI 驱动的智能交易与分析',
                lines: ['实时解析全球财经信息，进行市场情绪分析与趋势报告生成'],
            },
            {
                iconId: 'arrow',
                title: '全终端覆盖',
                lines: ['一套后台，多终端输出，覆盖柜台、移动、电脑、WEB 等媒介'],
            },
            {
                iconId: 'alarm',
                title: '不间断交易与清算',
                lines: ['计费系统灵活配置、支持多币种、多费率模式，实时计算与日终/实时对账'],
            },
        ]),
        gridSectionCta: GRID_CTA,
        footerCta: settlementSolutionContent_1.SETTLEMENT_SOLUTION_FOOTER_CTA_DEFAULT,
        featureRows: rows([
            {
                title: '多币种与多资产',
                variant: 'portfolio',
                lines: ['主流币、稳定币与合规上架代币', '统一账户与分账视图', '跨币种估值与损益'],
            },
            {
                title: '透明与可审计',
                variant: 'order-blotter',
                lines: ['链上/链下流水勾稽', '存取款与冷温热钱包策略', '监管报送与对账导出'],
            },
            {
                title: '风控与限额',
                variant: 'risk-radar',
                lines: ['头寸、杠杆与保证金', '黑白名单与地域策略', '实时预警与强平流程'],
            },
            {
                title: '机构级 API',
                variant: 'api-console',
                lines: ['做市与量化接入', '子账户与权限隔离', '密钥与 IP 白名单'],
            },
            {
                title: '投资者适当性',
                variant: 'multi-chart',
                lines: ['问卷与知识测评', '产品风险分级', '冷静期与确认记录'],
            },
            {
                title: '与证券业务协同',
                variant: 'compact-terminal',
                lines: ['同一客户号与登录', '传统证券与 VA 头寸合并视图', '统一客服与工单'],
            },
            {
                title: '监控与报表',
                variant: 'spreadsheet',
                lines: ['经营与合规看板', '大额与异常交易报表', '定期回顾与审计配合'],
            },
            {
                title: '实施与运维',
                variant: 'settlement',
                lines: ['监管沟通与差距分析', '演练与上线支持', '7×24 运维可选'],
            },
        ]),
    },
    smp5: {
        hero: {
            title: '股市宝 SMP5',
            subtitle: '面向个人投资者的行情与交易利器',
        },
        spotlight: {
            title: 'SMP5 产品亮点',
            tagline: '专业工具 · 简洁体验',
            paragraphs: [
                '为活跃个人投资者提供丰富的技术分析、自选股与交易入口，兼顾深度与易用性。',
                '可与券商现有开户、风控与清算体系对接，支持品牌与界面定制。',
            ],
            imageSrc: IMG,
            ctaLabel: '了解更多',
            ctaHref: '/contact',
        },
        sixGrid: grid([
            { iconId: 'chart', title: '图表分析', lines: ['多种指标与画线', '多周期联动'] },
            { iconId: 'mobile', title: '移动优先', lines: ['iOS / Android', '离线缓存可选'] },
            { iconId: 'clock', title: '实时行情', lines: ['报价与成交推送', '预警与提醒'] },
            { iconId: 'custom', title: '个性化', lines: ['自选与分组', '界面布局可调'] },
            { iconId: 'security', title: '账户安全', lines: ['生物识别与设备绑定', '异常登录提醒'] },
            { iconId: 'api', title: '券商集成', lines: ['单点登录与开户导流', '订单与持仓回写'] },
        ]),
        gridSectionCta: GRID_CTA,
        footerCta: settlementSolutionContent_1.SETTLEMENT_SOLUTION_FOOTER_CTA_DEFAULT,
        featureRows: rows([
            { title: '行情与新闻', variant: 'multi-chart', lines: ['全球主要市场', '财经快讯与关联品种', '自选股异动推送'] },
            { title: '交易与下单', variant: 'order-blotter', lines: ['快捷下单与条件单', '持仓与盈亏实时看', '费用与费率展示'] },
            { title: '策略与回测', variant: 'api-console', lines: ['简易策略模板', '历史回测与参数优化', '模拟盘可选'] },
            { title: '社交与资讯', variant: 'compact-terminal', lines: ['观点与组合分享（合规前提下）', '风险提示与适当性提示', '内容审核工具'] },
            { title: '运营与活动', variant: 'portfolio', lines: ['积分与任务体系', '营销页与落地页模板', '数据看板'] },
            { title: '白标与品牌', variant: 'spreadsheet', lines: ['Logo / 主题色 / 域名', '应用商店上架协助', '合规文案模板'] },
            { title: '与 Master Picks 协同', variant: 'risk-radar', lines: ['策略信号展示', '适当性匹配', '订阅与付费（若适用）'] },
            { title: '技术支持', variant: 'settlement', lines: ['SDK 与 H5 嵌入', '版本升级与兼容', '客服工单系统'] },
        ]),
    },
    mps: {
        hero: {
            title: 'MPS 策略服务',
            subtitle: 'Master Picks 与策略内容运营',
        },
        spotlight: {
            title: '策略与内容中台',
            tagline: '专业观点 · 合规分发',
            paragraphs: [
                '帮助券商构建或引入第三方策略观点、组合与课程，统一审核、上架与触达。',
                '支持按客户风险等级过滤可见内容，满足销售适当性要求。',
            ],
            imageSrc: IMG,
            ctaLabel: '了解更多',
            ctaHref: '/contact',
        },
        sixGrid: grid([
            { iconId: 'chart', title: '研究框架', lines: ['技术面与基本面', '量化因子展示'] },
            { iconId: 'security', title: '合规管控', lines: ['审核流与版本管理', '免责声明模板'] },
            { iconId: 'custom', title: '内容运营', lines: ['栏目与专题', '付费与免费分区'] },
            { iconId: 'api', title: '系统对接', lines: ['API 拉取策略列表', '与交易按钮联动'] },
            { iconId: 'mobile', title: '多端阅读', lines: ['App / H5 / PC', '推送与收藏'] },
            { iconId: 'clock', title: '时效运营', lines: ['盘前盘中盘后栏目', '重大事件专题'] },
        ]),
        gridSectionCta: GRID_CTA,
        footerCta: settlementSolutionContent_1.SETTLEMENT_SOLUTION_FOOTER_CTA_DEFAULT,
        featureRows: rows([
            { title: '策略库管理', variant: 'portfolio', lines: ['入库标准与标签体系', '绩效展示与回撤说明', '下架与追责流程'] },
            { title: '作者与第三方', variant: 'order-blotter', lines: ['签约与分润', '内容版权约定', '违规处理机制'] },
            { title: '用户分层', variant: 'risk-radar', lines: ['风险测评对接', '可见策略白名单', '冷静期与确认'] },
            { title: '与交易转化', variant: 'compact-terminal', lines: ['一键查看相关标的', '跳转 SMP5 下单', '转化漏斗分析'] },
            { title: '数据看板', variant: 'multi-chart', lines: ['阅读、订阅与付费', '策略跟随情况', '投诉与舆情'] },
            { title: '课程与直播', variant: 'api-console', lines: ['直播转点播', '聊天室审核', '回放版权'] },
            { title: '国际化', variant: 'settlement', lines: ['多语言内容', '跨境合规提示', '汇率与计价展示'] },
            { title: '实施服务', variant: 'spreadsheet', lines: ['冷启动内容包', '运营陪跑', '季度复盘'] },
        ]),
    },
    quant: {
        hero: {
            title: '量化交易（Quant）',
            subtitle: 'n2nquant 与程序化交易基础设施',
        },
        spotlight: {
            title: '量化全链路能力',
            tagline: '研究 · 回测 · 实盘',
            paragraphs: [
                '为机构与高净值客户提供从数据、研究到实盘执行的量化栈，降低自研门槛。',
                '支持与内部 OMS、风控及外部交易所低延迟连接，按策略复杂度弹性扩展资源。',
            ],
            imageSrc: IMG,
            ctaLabel: '了解更多',
            ctaHref: '/contact',
        },
        sixGrid: grid([
            { iconId: 'api', title: '开放 API', lines: ['Python / REST', '历史与实时数据'] },
            { iconId: 'clock', title: '低延迟', lines: ['托管机房与专线', '共址可选'] },
            { iconId: 'chart', title: '研究与回测', lines: ['向量化回测引擎', '绩效与归因报告'] },
            { iconId: 'security', title: '风控嵌入', lines: ['事前额度与黑白名单', '事中熔断'] },
            { iconId: 'custom', title: '策略托管', lines: ['容器与资源隔离', '密钥与代码安全'] },
            { iconId: 'mobile', title: '监控告警', lines: ['策略健康度', '异常成交推送'] },
        ]),
        gridSectionCta: GRID_CTA,
        footerCta: settlementSolutionContent_1.SETTLEMENT_SOLUTION_FOOTER_CTA_DEFAULT,
        featureRows: rows([
            { title: '数据与因子', variant: 'spreadsheet', lines: ['Tick 与基本面库', '因子计算与存储', '第三方数据接入'] },
            { title: '回测与仿真', variant: 'multi-chart', lines: ['滑点与费用模型', '并行参数扫描', '仿真与实盘一致性校验'] },
            { title: '算法交易', variant: 'order-blotter', lines: ['TWAP / VWAP / 冰山', '自定义母单拆分', '实时进度与撤补'] },
            { title: '实盘执行', variant: 'api-console', lines: ['多账户多策略路由', '失败重试与降级', '全链路日志'] },
            { title: '研究与协作', variant: 'compact-terminal', lines: ['Notebook 环境', '代码与策略版本管理', '团队权限'] },
            { title: '风控与合规', variant: 'risk-radar', lines: ['交易前检查', '异常模式检测', '监管报表辅助'] },
            { title: '资源与运维', variant: 'settlement', lines: ['GPU / CPU 集群', '容量规划', '7×24 监控'] },
            { title: '培训与生态', variant: 'portfolio', lines: ['量化入门到进阶课程', '策略伙伴引入', '黑客松与 PoC'] },
        ]),
    },
};
function getProductLinePage(slug) {
    return exports.productLinePageContentBySlug[slug];
}
exports.getProductLinePage = getProductLinePage;
