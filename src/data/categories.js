export const CATEGORIES = [
  {
    id: 'all',
    tabLabel: '全部',
    label: '全部',
    sectionTitle: '全部 normal 组件与动效',
    sectionNum: '★',
    sectionDesc: ''
  },
  {
    id: 'style',
    tabLabel: 'normal 楼层',
    label: 'normal 楼层',
    sectionTitle: 'normal 页面楼层组件（N-01 ~ N-15）',
    sectionNum: 'N',
    sectionDesc: '严格对应 www 仓库 main 分支 src/components/normal/ 楼层区块组件',
    numStyle: 'background:#ecfdf5;color:#047857;'
  },
  {
    id: 'primitive',
    tabLabel: 'normal 子组件',
    label: 'normal 子组件',
    sectionTitle: 'normal 配套基础子组件（N-16 ~ N-18）',
    sectionNum: 'B',
    sectionDesc: '对应 src/components/normal/ 下的标准按钮组、返回/箭头链接与图标底座',
    numStyle: 'background:#eff6ff;color:#1d4ed8;'
  },
  {
    id: 'enter',
    tabLabel: '进场动效',
    label: '进场动效',
    sectionTitle: '进场出现动效',
    sectionNum: '1',
    sectionDesc: '点右上角「重播」反复看入场手感'
  },
  {
    id: 'hover',
    tabLabel: '悬停点击',
    label: '悬停点击',
    sectionTitle: '悬停与点击反馈',
    sectionNum: '2',
    sectionDesc: '移入鼠标或直接点击卡片内元素体验'
  },
  {
    id: 'scroll',
    tabLabel: '滚动联动',
    label: '滚动联动',
    sectionTitle: '滚动联动动效',
    sectionNum: '3',
    sectionDesc: '可在框内滚动、拖滑块或点自动演示'
  },
  {
    id: 'loop',
    tabLabel: '循环展示',
    label: '循环展示',
    sectionTitle: '持续循环动效',
    sectionNum: '4',
    sectionDesc: '低幅度克制循环，鼠标移入可暂停'
  },
  {
    id: 'pitfall',
    tabLabel: '避坑对比',
    label: '避坑对比',
    sectionTitle: '动效克制与手机端避坑对比',
    sectionNum: 'P',
    sectionDesc: '正反例同屏对照，避免花哨晃眼与窄屏挤压',
    numStyle: 'background:#fef2f2;color:#dc2626;'
  }
]

export const PAGE_PRESETS = [
  {
    id: 'standard-feature',
    name: '标准功能 / 方案页（对应 _default.js）',
    desc: 'MetricsCard → FeatureHighlightBanner → OpportunitySection → PartnerSection → ArticleSection → FaqSection → TestimonialSection',
    floors: [
      { layoutId: 'N-04', motionId: 'M-12' },
      { layoutId: 'N-06', motionId: 'M-01' },
      { layoutId: 'N-05', motionId: 'M-02' },
      { layoutId: 'N-09', motionId: '' },
      { layoutId: 'N-10', motionId: 'M-07' },
      { layoutId: 'N-13', motionId: 'M-08' },
      { layoutId: 'N-11', motionId: '' }
    ],
    extraIds: ['N-16']
  },
  {
    id: 'comparison-landing',
    name: '新版集成详情页（对应 IntegrationDetail）',
    desc: 'BrandWall → JourneyCardCarousel → OpportunitySection → ArticleSection → SolutionsSection → FaqSection → FinalCtaSection',
    floors: [
      { layoutId: 'N-02', motionId: 'M-13' },
      { layoutId: 'N-07', motionId: 'M-10' },
      { layoutId: 'N-05', motionId: 'M-02' },
      { layoutId: 'N-10', motionId: 'M-07' },
      { layoutId: 'N-08', motionId: 'M-09' },
      { layoutId: 'N-13', motionId: 'M-08' },
      { layoutId: 'N-14', motionId: 'M-14' }
    ],
    extraIds: ['N-17']
  },
  {
    id: 'flagship-showcase',
    name: '首页 / 定价转化页（对应 HomeV2 & pricing）',
    desc: 'LogoCloud → SolutionsSection → Table → TestimonialSection → FaqSection → CtaSection',
    floors: [
      { layoutId: 'N-03', motionId: 'M-13' },
      { layoutId: 'N-08', motionId: 'M-09' },
      { layoutId: 'N-12', motionId: '' },
      { layoutId: 'N-11', motionId: 'M-05' },
      { layoutId: 'N-13', motionId: 'M-08' },
      { layoutId: 'N-15', motionId: 'M-05' }
    ],
    extraIds: ['N-16']
  }
]
