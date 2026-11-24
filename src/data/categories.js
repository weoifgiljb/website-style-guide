export const CATEGORIES = [
  {
    id: 'all',
    tabLabel: '全部',
    label: '全部',
    sectionTitle: '全部样式与动效',
    sectionNum: '★',
    sectionDesc: ''
  },
  {
    id: 'style',
    tabLabel: '常用版式',
    label: '常用版式',
    sectionTitle: '常用页面版式（S-01 ~ S-14）',
    sectionNum: 'S',
    sectionDesc: '先挑页面骨架，可直接报编号给 Codex',
    numStyle: 'background:#ecfdf5;color:#047857;'
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
    sectionTitle: '持续循环与轮播流转动效',
    sectionNum: '4',
    sectionDesc: '低幅度克制循环与自动读条，鼠标移入可暂停'
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
    tag: '百搭高频',
    name: '常规功能页标准 5 屏',
    desc: '左文右图首屏 → 三栏价值 → 左右交替 → FAQ → 底部收口',
    floors: [
      { layoutId: 'S-01', motionId: 'M-01' },
      { layoutId: 'S-02', motionId: 'M-02' },
      { layoutId: 'S-03', motionId: 'M-05' },
      { layoutId: 'S-14', motionId: 'M-08' },
      { layoutId: 'S-06', motionId: 'M-06' }
    ],
    extraIds: ['P-04']
  },
  {
    id: 'saas-ai-flagship',
    tag: 'Intercom / Respond.io 风',
    name: 'AI 全渠道旗舰专题页 5 屏',
    desc: 'AI 对话流首屏 → 全渠道流光汇聚 → 自动读条轮播 → 递增指标 → 底部收口',
    floors: [
      { layoutId: 'S-01', motionId: 'M-17' },
      { layoutId: 'S-04', motionId: 'M-16' },
      { layoutId: 'S-13', motionId: 'M-15' },
      { layoutId: 'S-05', motionId: 'M-12' },
      { layoutId: 'S-06', motionId: 'M-06' }
    ],
    extraIds: ['P-05']
  },
  {
    id: 'comparison-landing',
    tag: '广告转化页',
    name: '方案对比转化页 6 屏',
    desc: '居中大图首屏 → 优劣对比 → 三步流程 → 数据横幅 → 客户证言 → 底部收口',
    floors: [
      { layoutId: 'S-07', motionId: 'M-01' },
      { layoutId: 'S-09', motionId: 'M-05' },
      { layoutId: 'S-10', motionId: 'M-02' },
      { layoutId: 'S-05', motionId: 'M-12' },
      { layoutId: 'S-11', motionId: 'M-07' },
      { layoutId: 'S-06', motionId: 'M-06' }
    ],
    extraIds: ['P-01']
  },
  {
    id: 'flagship-showcase',
    tag: '多角色方案页',
    name: '多场景旗舰专题页 6 屏',
    desc: '轮换词首屏 → 渠道矩阵 → Bento 网格 → 角色 Tab → 套餐定价 → 底部收口',
    floors: [
      { layoutId: 'S-01', motionId: 'M-04' },
      { layoutId: 'S-04', motionId: 'M-13' },
      { layoutId: 'S-08', motionId: 'M-05' },
      { layoutId: 'S-13', motionId: 'M-09' },
      { layoutId: 'S-12', motionId: 'M-06' },
      { layoutId: 'S-06', motionId: '' }
    ],
    extraIds: ['P-06']
  }
]
