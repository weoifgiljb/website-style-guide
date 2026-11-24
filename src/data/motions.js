export const MOTION_ITEMS = [
  {
    id: 'M-01',
    code: 'M-01',
    cat: 'enter',
    kind: 'motion',
    demoKey: 'MotionFadeUp',
    name: '淡入上浮',
    en: 'Fade In Up',
    badge: '进场演示',
    keywords: 'm-01 淡入上浮 fade in up 首屏 标题 卡片 进场',
    scene: '首屏文字、各模块标题与卡片',
    mobileTip: '手机端上浮位移建议收小到 12～16px，触发一次后保持常驻不反复闪动',
    prompt:
      '滚到这屏时，标题和卡片依次淡入上浮（Fade In Up）：进入视口阈值 0.15 时触发一次，桌面端初始 opacity: 0、translateY(18px) 过渡至 opacity: 1、translateY(0)，时长 0.35s cubic-bezier(0.22, 1, 0.36, 1)；手机端（<=768px）位移收小至 12px，触发后保持常驻不重复闪烁',
    shortPrompt: '滚到这屏时，标题和卡片依次淡入上浮'
  },
  {
    id: 'M-02',
    code: 'M-02',
    cat: 'enter',
    kind: 'motion',
    demoKey: 'MotionStagger',
    name: '错峰依次出现',
    en: 'Stagger',
    badge: '错峰节奏',
    keywords: 'm-02 错峰依次出现 stagger 交错入场 三栏 卖点 卡片 流程 案例',
    scene: '三栏卖点卡、步骤流程、客户案例',
    mobileTip: '手机端单列堆叠时错峰间隔控制在 0.06～0.08s，避免滚到底下还在慢吞吞等待出现',
    prompt:
      '子卡片做错峰依次入场（Stagger）：每张卡从 opacity: 0、translateY(16px) 过渡到落位，桌面端相邻卡片延迟间隔 90ms（单卡时长 0.32s cubic-bezier(0.22, 1, 0.36, 1)）；手机端单列堆叠时间隔缩短至 65ms，整组总延迟不超过 0.35s',
    shortPrompt: '三张卡片做错峰入场，一张接一张出现'
  },
  {
    id: 'M-03',
    code: 'M-03',
    cat: 'enter',
    kind: 'motion',
    demoKey: 'MotionZoomIn',
    name: '缩放弹入',
    en: 'Scale / Zoom In',
    badge: '轻弹落位',
    keywords: 'm-03 缩放弹入 scale zoom in 弹窗 截图 徽章 强调',
    scene: '核心产品截图、弹窗、徽章标签',
    mobileTip: '手机端初始缩放建议从 0.92 起步，避免大面积卡片弹跳造成页面抖动感',
    prompt:
      '核心产品样机或重点数据徽章做轻缩放弹入（Scale / Zoom In）：桌面端从 opacity: 0、scale(0.92) 过渡至 opacity: 1、scale(1)，时长 0.32s cubic-bezier(0.22, 1, 0.36, 1)；手机端从 scale(0.95) 起步，禁止超过 1.02 的果冻回弹',
    shortPrompt: '弹窗或重点数据徽章打开时轻缩放弹入'
  },
  {
    id: 'M-04',
    code: 'M-04',
    cat: 'enter',
    kind: 'motion',
    demoKey: 'MotionTextRotate',
    name: '打字机 / 逐词切换',
    en: 'Typewriter / Text Rotate',
    badge: '当前：上下轮换',
    keywords: 'm-04 打字机 逐词切换 typewriter text rotate 首屏 标题 轮换 渠道',
    scene: '首屏主标题强调多场景、多渠道',
    mobileTip: '手机端给轮换词预留固定最小宽度与行高，防止词长变化引发整段标题上下跳动',
    prompt:
      '首屏标题里的渠道名做上下轮换或打字机逐字切换（Text Rotate / Typewriter）：轮换槽锁定固定 min-width 与单行高度 overflow: hidden，每 2.4s 切换下一词，切换过渡 0.28s cubic-bezier(0.22, 1, 0.36, 1) 的 translateY(100% -> 0) + opacity；手机端严禁因词长变化引起标题换行抖动',
    shortPrompt: '首屏标题里的渠道名做上下轮换'
  },
  {
    id: 'M-05',
    code: 'M-05',
    cat: 'hover',
    kind: 'motion',
    demoKey: 'MotionHoverLift',
    name: '悬停微浮 + 投影',
    en: 'Hover Lift',
    badge: '鼠标移上来体验',
    keywords: 'm-05 悬停微浮 投影 hover lift 卡片 方案 案例 卖点',
    scene: '卖点卡片、方案卡片、案例卡',
    mobileTip: '触屏手机无鼠标悬停态，通过 @media (hover: hover) 仅在桌面端启用微浮，手机端保持稳固卡片边框',
    prompt:
      '鼠标放卡片上轻微上浮并加柔和阴影（Hover Lift）：仅在 @media (hover: hover) 桌面端启用，hover 时 transform: translateY(-4px) 并切换品牌柔和阴影与浅蓝边框，过渡 0.26s cubic-bezier(0.22, 1, 0.36, 1)；触屏手机端保持静态清晰边框',
    shortPrompt: '鼠标放卡片上轻微上浮并加柔和阴影'
  },
  {
    id: 'M-06',
    code: 'M-06',
    cat: 'hover',
    kind: 'motion',
    demoKey: 'MotionBorderGlow',
    name: '悬停边框发光 / 扫光',
    en: 'Border Glow / Shimmer',
    badge: '悬停按钮或卡片',
    keywords: 'm-06 悬停边框发光 扫光 border glow shimmer 主按钮 cta 套餐 卡片',
    scene: '主 CTA 按钮、高价值套餐卡',
    mobileTip: '手机端主按钮保留静态渐变高对比度或极低频轻扫光，避免长列表多按钮同时发光耗电晃眼',
    prompt:
      '主按钮加轻微扫光效果（Shimmer），推荐套餐卡悬停亮起品牌色边框光（Border Glow）：按钮伪元素 115deg 半透明斜向高光 hover 时 0.65s 从左向右掠过，卡片 hover 叠加 2px 品牌色外发光环；手机端保留静态高对比主色按钮不持续闪光',
    shortPrompt: '主按钮加轻微扫光，卡片悬停亮品牌色边框'
  },
  {
    id: 'M-07',
    code: 'M-07',
    cat: 'hover',
    kind: 'motion',
    demoKey: 'MotionImageZoom',
    name: '图片轻缩放',
    en: 'Image Zoom on Hover',
    badge: '鼠标移到图卡上',
    keywords: 'm-07 图片轻缩放 image zoom hover 博客 案例 封面图',
    scene: '博客卡片、案例封面图',
    mobileTip: '封面容器务必设置 overflow: hidden 定高圆角，手机端直接静态展示清晰原图',
    prompt:
      '案例或博客卡片悬停时封面图在框内缓慢放大（Image Zoom on Hover）：外层图片框固定圆角与 overflow: hidden，桌面端 hover 时内部图片 scale(1 -> 1.05)，时长 0.38s cubic-bezier(0.22, 1, 0.36, 1)；手机端直接静态展示原图',
    shortPrompt: '鼠标移到卡片上，封面图在框内缓慢放大'
  },
  {
    id: 'M-08',
    code: 'M-08',
    cat: 'hover',
    kind: 'motion',
    demoKey: 'MotionAccordion',
    name: '平滑折叠 / 手风琴',
    en: 'Accordion',
    badge: '直接点问题展开',
    keywords: 'm-08 平滑折叠 手风琴 accordion faq 常见问题 展开 收起',
    scene: 'FAQ 常见问题、功能明细切换',
    mobileTip: '手机端问答按钮点击热区高度不低于 44px，采用 grid-template-rows 平滑展开不闪跳',
    prompt:
      'FAQ 常见问题展开和收起做平滑高度过渡（Accordion）：使用 CSS grid-template-rows: 0fr -> 1fr（内层 min-height: 0; overflow: hidden）配合右侧箭头 180deg 旋转，时长 0.28s cubic-bezier(0.22, 1, 0.36, 1)，手机端标题热区高度 >= 44px',
    shortPrompt: 'FAQ 展开收起做平滑过渡，不要生硬闪现'
  },
  {
    id: 'M-09',
    code: 'M-09',
    cat: 'hover',
    kind: 'motion',
    demoKey: 'MotionTabSlide',
    name: '标签页滑块切换',
    en: 'Tab Indicator Slide',
    badge: '点击切换 Tab',
    keywords: 'm-09 标签页滑块切换 tab indicator slide 切换 多场景 演示',
    scene: '多场景、多功能演示区',
    mobileTip: '手机端若 Tab 超过 3 个允许横向轻滑或等分紧凑排布，下方内容固定最小高度防抖动',
    prompt:
      'Tab 切换时底部/背景高亮滑块按 translateX 平滑移动，下方内容面板锁定最小高度防跳动并做 0.25s opacity(0->1) + translateY(6px->0) 淡入切换（Tab Indicator Slide）；手机端 Tab 栏支持紧凑等分或横向滑动',
    shortPrompt: 'Tab 切换时高亮滑块平滑移动，配图淡入淡出'
  },
  {
    id: 'M-10',
    code: 'M-10',
    cat: 'scroll',
    kind: 'motion',
    demoKey: 'MotionStickyScroll',
    name: '吸附固定 + 切换',
    en: 'Sticky Scroll',
    badge: '滚左侧或点步骤',
    keywords: 'm-10 吸附固定 切换 sticky scroll 滚动 分步 讲解 左文右图',
    scene: '核心功能分步讲解',
    mobileTip: '手机端（390px）必须解除左右 Sticky 吸附，自动降级为分段「上文下图」纵向顺滑阅读',
    prompt:
      '桌面端采用左文右图滚动吸附（Sticky Scroll）：右侧画布 position: sticky; top: 108px 固定视口，左侧 3 段步骤文案依次滚过中线时触发右侧对应配图 0.3s 淡入切换；手机端（<=768px）解除 sticky，自动降级为每步「上文下图」纵向堆叠',
    shortPrompt: '做成左文右图滚动吸附，左侧每滚到一步右侧切图'
  },
  {
    id: 'M-11',
    code: 'M-11',
    cat: 'scroll',
    kind: 'motion',
    demoKey: 'MotionParallax',
    name: '视差滚动',
    en: 'Parallax',
    badge: '拖动滑块模拟滚动',
    keywords: 'm-11 视差滚动 parallax 层次感 背景 装饰 首屏 活动页',
    scene: '首屏装饰元素、活动专题页',
    mobileTip: '手机端关闭或大幅减弱滚动视差位移，防止低刷移动设备出现掉帧和文字遮挡',
    prompt:
      '首屏背景光晕或装饰小徽章随页面滚动做克制视差位移（Parallax）：仅操作 GPU 合成属性 translate3d(0, y, 0)，最大位移幅度限制在 ±18px 以内且不遮挡正文；手机端（<=768px）关闭视差保持静态稳定',
    shortPrompt: '首屏背景光晕或悬浮标签加轻微视差，不要晃眼'
  },
  {
    id: 'M-12',
    code: 'M-12',
    cat: 'scroll',
    kind: 'motion',
    demoKey: 'MotionCountUp',
    name: '数字滚动递增',
    en: 'Count Up',
    badge: '1 秒滚到目标值',
    keywords: 'm-12 数字滚动递增 count up 数据 指标 成果 客户数',
    scene: '成果数据、客户数、提速指标',
    mobileTip: '使用等宽数字 tabular-nums 防止递增时宽度左右抖动，滚入视口只触发一次',
    prompt:
      '滚到数据指标区时触发一次数字递增动画（Count Up）：使用 requestAnimationFrame 在 900ms 内按 easeOutCubic 从 0 递增至目标值，数字强制设置 font-variant-numeric: tabular-nums 防止位宽抖动，符号（+ / % / x）保持静态',
    shortPrompt: '滚到数据区时，3 个核心数字做 1 秒内递增动画'
  },
  {
    id: 'M-13',
    code: 'M-13',
    cat: 'loop',
    kind: 'motion',
    demoKey: 'MotionMarquee',
    name: '无缝跑马灯',
    en: 'Marquee',
    badge: '鼠标移上去自动暂停',
    keywords: 'm-13 无缝跑马灯 marquee logo 墙 客户 渠道 滚动 暂停',
    scene: '合作客户 Logo 墙、渠道图标条',
    mobileTip: '手机端保持匀速缓慢横向滚动并加两侧渐隐遮罩，严禁撑出页面横向滚动条',
    prompt:
      '客户 Logo 墙或渠道条做成无缝横向滚动跑马灯（Marquee）：列表复制双份拼接以 translateX(0 -> -50%) 匀速 24s 循环，外层 overflow: hidden 并加左右 8% 渐隐 mask-image，鼠标 hover 时 animation-play-state: paused；手机端严禁产生横向滚动条',
    shortPrompt: '客户 Logo 墙做成无缝横向滚动，鼠标悬停暂停'
  },
  {
    id: 'M-14',
    code: 'M-14',
    cat: 'loop',
    kind: 'motion',
    demoKey: 'MotionFloatPulse',
    name: '轻呼吸 / 轻悬浮',
    en: 'Float / Pulse',
    badge: '克制缓慢循环',
    keywords: 'm-14 轻呼吸 轻悬浮 float pulse 在线 状态 气泡 首屏 装饰',
    scene: '在线状态点、首屏漂浮气泡',
    mobileTip: '手机端仅保留状态小绿点轻呼吸，纯装饰悬浮气泡自动收起或转为卡片内静态标签',
    prompt:
      '首屏在线状态绿点做 2s 柔和扩散呼吸（Pulse），主图边缘装饰角标做 3.2s ease-in-out 的 ±4px 极轻上下悬浮（Float）；手机端（<=768px）隐藏漂浮装饰气泡或转为静态内嵌标签，防止压住标题与按钮',
    shortPrompt: '首屏周围的消息气泡做轻微缓慢悬浮，幅度克制'
  },
  {
    id: 'M-15',
    code: 'M-15',
    cat: 'loop',
    kind: 'motion',
    demoKey: 'MotionAutoProgressTabs',
    name: '自动读条轮播切换',
    en: 'Auto-Progress Tabs',
    badge: 'Intercom / 飞书同款',
    keywords: 'm-15 自动读条轮播切换 auto progress tabs intercom zendesk 飞书 进度条 手风琴 轮播 卖点',
    scene: '核心功能 3～4 大卖点轮播（对标 Intercom / 飞书产品页）',
    mobileTip: '手机端解除左右双栏，转为顶部紧凑等分胶囊带底部细进度条 + 下方固定高度预览卡',
    prompt:
      '实现「左侧卖点自动读条轮播 + 右侧画布联动切换」（对标 Intercom / 飞书功能区规格）：桌面端左 5 右 7 双栏布局；左侧 3～4 个折叠项，当前激活项展开副文案并在底部渲染 2px 品牌色进度条，在 4.5s 内线性从 width: 0% 增长至 100% 后自动切下一项循环；鼠标移入暂停计时，手动点击任意项立即激活并从 0% 重置进度条；右侧预览框锁定固定最小高度防抖动，切换时做 0.3s cubic-bezier(0.22, 1, 0.36, 1) 的 opacity(0->1) + translateY(8px->0) 过渡；手机端（<=768px）降级为顶部紧凑胶囊切换 + 下方单栏画布',
    shortPrompt: '左侧卖点带进度条自动读秒轮播，右侧配图同步淡入切换'
  },
  {
    id: 'M-16',
    code: 'M-16',
    cat: 'loop',
    kind: 'motion',
    demoKey: 'MotionChannelFlow',
    name: '全渠道消息汇聚流转',
    en: 'Omni-Channel Flow Pulse',
    badge: 'Respond.io / SleekFlow 同款',
    keywords: 'm-16 全渠道消息汇聚流转 omni channel flow pulse respond sleekflow 连线 流光 路由 收件箱',
    scene: '全渠道聚合收件箱、AI 智能路由架构图（对标 Respond.io）',
    mobileTip: '手机端隐藏横向复杂贝塞尔曲线，自动转为「上渠道胶囊 -> 中路由核心 -> 下分流结果」纵向流转',
    prompt:
      '实现「全渠道消息流光汇聚路由图」（对标 Respond.io / SleekFlow 首页收件箱交互规格）：桌面端采用左中右三段式架构（左列 WhatsApp/Instagram/TikTok/Messenger 渠道胶囊 -> 中央统一收件箱/AI 路由中枢节点 -> 右列自动翻译/智能分配动作卡）；中间使用 SVG 贝塞尔连线配合 stroke-dasharray / stroke-dashoffset 以 2.2s 周期从左向右匀速流动光束，按 0.9s 节拍依次点亮左源头、中央中枢与右侧结果卡的品牌色发光边框，鼠标悬停暂停动画；手机端（<=768px）自动转为上中下纵向三段箭头流，严禁挤压横向文字',
    shortPrompt: '左侧多渠道沿连线发送流光汇入中枢，依次点亮右侧分流卡片'
  },
  {
    id: 'M-17',
    code: 'M-17',
    cat: 'enter',
    kind: 'motion',
    demoKey: 'MotionChatStream',
    name: 'AI 客服流式对话演示',
    en: 'Live AI Chat Stream',
    badge: 'Fin.ai / ManyChat 同款',
    keywords: 'm-17 ai 客服流式对话演示 live chat stream fin intercom manychat 气泡 打点 自动回复 翻译',
    scene: 'AI Agent 页首屏、社媒自动化回复演示（对标 Fin.ai / ManyChat）',
    mobileTip: '手机端聊天窗锁定固定最小高度防止推挤下方楼层，气泡最大宽度放宽至 88%',
    prompt:
      '实现「AI 客服多语种流式对话时间轴演示」（对标 Intercom Fin.ai / ManyChat 首屏交互规格）：聊天样机外框锁定固定 min-height 防止消息弹出时推挤下方页面布局；滚入视口触发一次四步序列（t=0ms 买家多语种提问气泡 opacity(0->1) + translateY(10px->0) 滑入 -> t=420ms 浮现 AI 三圆点交错呼吸思考态 -> t=1050ms 思考态替换为「命中知识库」小徽章并滑入 AI 回复气泡 -> t=1500ms 底部浮现「已自动闭环」状态条），单步过渡 0.28s cubic-bezier(0.22, 1, 0.36, 1) 并支持重播重置；手机端（<=768px）气泡最大宽度设为 88% 并收紧内边距',
    shortPrompt: '买家消息滑入后经 AI 思考打点，自动贴上标签并弹出回复气泡'
  }
]
