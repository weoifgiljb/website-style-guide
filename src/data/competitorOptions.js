export const COMPETITOR_SECTION_OPTIONS = [
  {
    id: 'hero',
    shortLabel: '首屏',
    anim: 'sec-hero',
    whereTag: '网页最顶部 · 第 1 屏',
    tip: '刚打开网页不用往下滚，第一眼看到的大标题 + 按钮 + 主图区',
    label: '首屏主视觉（Hero）'
  },
  {
    id: 'feature-demo',
    shortLabel: '功能演示区',
    anim: 'sec-feature',
    whereTag: '首屏往下 · 第 2～3 屏',
    tip: '一边写功能卖点、一边放大张产品界面图的左右图文区',
    label: '中段核心功能演示区'
  },
  {
    id: 'bento-cards',
    shortLabel: '多栏卡片区',
    anim: 'sec-bento',
    whereTag: '网页中段 · 卡片格子区',
    tip: '三四张小卡片并排或拼成方格，每张卡讲一个功能亮点',
    label: 'Bento 卡片 / 多栏卖点区'
  },
  {
    id: 'flow-diagram',
    shortLabel: '连线架构图',
    anim: 'sec-flow',
    whereTag: '网页中段 · 关系图解区',
    tip: '画着多个渠道小图标，用线条或箭头连向中间系统的示意图',
    label: '连线流转 / 架构图解区'
  },
  {
    id: 'tabs-accordion',
    shortLabel: 'Tab / 问答区',
    anim: 'sec-tabs',
    whereTag: '网页中后段 / 靠底部',
    tip: '点一排标签切换内容，或网页下方点问题展开答案的 FAQ 区',
    label: 'Tab 轮播 / 折叠问答区'
  },
  {
    id: 'other',
    shortLabel: '其他位置',
    anim: 'sec-other',
    whereTag: '网页任意位置',
    tip: '拿不准叫啥选它就行！只要填上方一句原文词，AI 会自动找准',
    label: '其他自定义模块'
  }
]

export const COMPETITOR_TRIGGER_OPTIONS = [
  {
    id: 'scroll-enter',
    shortLabel: '滚到浮现',
    anim: 'scroll-enter',
    tip: '滚到这一屏时，元素自动淡入上浮一次',
    label: '滚到这里自动播放一次'
  },
  {
    id: 'scroll-scrub',
    shortLabel: '边滚边动',
    anim: 'scroll-scrub',
    tip: '画面随滚轮上下进度实时联动推进',
    label: '边往下滚，画面边跟着固定/切换'
  },
  {
    id: 'hover-react',
    shortLabel: '悬停反馈',
    anim: 'hover-react',
    tip: '鼠标移上去时卡片上浮、发光或跟随',
    label: '鼠标移上去跟随/微浮/高亮'
  },
  {
    id: 'auto-progress',
    shortLabel: '读条轮播',
    anim: 'auto-progress',
    tip: '进度条读满自动切下一项，也可手点',
    label: '带进度条自动轮播（也可手点）'
  },
  {
    id: 'click-switch',
    shortLabel: '点击切换',
    anim: 'click-switch',
    tip: '点击 Tab 或按钮后滑块与内容平滑过渡',
    label: '点击按钮或标签后平滑切换'
  },
  {
    id: 'loop-pulse',
    shortLabel: '持续流动',
    anim: 'loop-pulse',
    tip: '无需操作，匀速跑马灯或柔和呼吸循环',
    label: '一直在克制循环流动/脉冲'
  }
]

export const COMPETITOR_VISUAL_OPTIONS = [
  {
    id: 'pin-swap',
    shortLabel: '左定右切',
    anim: 'pin-swap',
    tip: '一侧文字固定不动，另一侧配图平滑切换',
    label: '一侧固定，另一侧配图/卡片切换'
  },
  {
    id: 'stagger-stream',
    shortLabel: '依次弹出',
    anim: 'stagger-stream',
    tip: '多个气泡或卡片按时间差错峰冒出来',
    label: '气泡/卡片按时间轴依次流式弹出'
  },
  {
    id: 'path-pulse',
    shortLabel: '连线流光',
    anim: 'path-pulse',
    tip: '光束顺着连线流动，依次点亮目标节点',
    label: '线条流光汇聚并依次点亮节点'
  },
  {
    id: 'spotlight-glow',
    shortLabel: '边框扫光',
    anim: 'spotlight-glow',
    tip: '按钮或卡片边框掠过一束柔和品牌高光',
    label: '局部边框发光 / 聚光灯扫光'
  },
  {
    id: 'smooth-expand',
    shortLabel: '丝滑展开',
    anim: 'smooth-expand',
    tip: '折叠区柔顺推开高度，不生硬闪现跳动',
    label: '高度平滑展开收起不闪跳'
  },
  {
    id: 'number-bar',
    shortLabel: '数字递增',
    anim: 'number-bar',
    tip: '核心数据从 0 快速滚动递增到目标值',
    label: '数字递增或进度条读秒推进'
  }
]

export const MOTION_TOOLTIP_ANIM_MAP = {
  'M-01': 'scroll-enter',
  'M-02': 'card-stagger',
  'M-03': 'zoom-pop',
  'M-04': 'text-rotate',
  'M-05': 'hover-react',
  'M-06': 'spotlight-glow',
  'M-07': 'img-zoom',
  'M-08': 'smooth-expand',
  'M-09': 'click-switch',
  'M-10': 'pin-swap',
  'M-11': 'scroll-scrub',
  'M-12': 'number-bar',
  'M-13': 'loop-pulse',
  'M-14': 'float-pulse',
  'M-15': 'auto-progress',
  'M-16': 'path-pulse',
  'M-17': 'stagger-stream'
}
