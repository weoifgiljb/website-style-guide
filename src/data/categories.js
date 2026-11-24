export const CATEGORIES = [
  {
    id: 'all',
    tabLabel: '全部',
    label: '全部',
    sectionTitle: '全部样式、动效与避坑速查',
    sectionNum: '★',
    sectionDesc: '覆盖 14 种官网版式、14 种交互动效与 6 项手机端降级避坑准则'
  },
  {
    id: 'style',
    tabLabel: '📐 常用版式',
    label: '📐 常用版式',
    sectionTitle: '官网常用版式样式库（先定结构，复用最快）',
    sectionNum: 'S',
    sectionDesc: '和钉钉文档「三、加样式与动效」速选清单对应，可直接报编号给 Codex',
    numStyle: 'background:#ecfdf5;color:#047857;'
  },
  {
    id: 'enter',
    tabLabel: '① 进场出现',
    label: '① 进场出现',
    sectionTitle: '进场出现类（页面打开 / 滚动到该区块时出现）',
    sectionNum: '1',
    sectionDesc: '点卡片右上角「重播」可反复看入场手感'
  },
  {
    id: 'hover',
    tabLabel: '② 悬停与点击',
    label: '② 悬停与点击',
    sectionTitle: '鼠标悬停与点击反馈类（桌面端交互手感）',
    sectionNum: '2',
    sectionDesc: '把鼠标移到演示区卡片上，或直接点击 Tab / FAQ 亲身体验'
  },
  {
    id: 'scroll',
    tabLabel: '③ 滚动联动',
    label: '③ 滚动联动',
    sectionTitle: '滚动联动类（随着访客上下滚动触发）',
    sectionNum: '3',
    sectionDesc: '可直接在演示框内上下滚动 / 拖动滑块，或点「自动演示」'
  },
  {
    id: 'loop',
    tabLabel: '④ 循环展示',
    label: '④ 循环展示',
    sectionTitle: '循环展示类（无需操作也会持续缓慢运动）',
    sectionNum: '4',
    sectionDesc: '注意克制幅度，避免长时间看觉得晃眼'
  },
  {
    id: 'pitfall',
    tabLabel: '🛡️ 手机端与避坑',
    label: '🛡️ 手机端与避坑',
    sectionTitle: '手机端简化 & 动效避坑对比专区（390px 降级与克制准则）',
    sectionNum: 'P',
    sectionDesc: '直观对比推荐克制做法与常见踩坑反例，勾选即可把约束同步写进 Codex 话术',
    numStyle: 'background:#fef2f2;color:#dc2626;'
  }
]

export const PAGE_PRESETS = [
  {
    id: 'standard-feature',
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
    id: 'comparison-landing',
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
