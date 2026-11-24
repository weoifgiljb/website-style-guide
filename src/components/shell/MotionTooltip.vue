<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: '' },
  badge: { type: String, default: '' },
  tip: { type: String, default: '' },
  anim: { type: String, default: 'scroll-enter' },
  anchorRect: { type: Object, default: null }
})

const counterVal = ref(18)
const activeSlot = ref(0)
let loopTimer = null

const SECTION_META = {
  'sec-hero': { floorIndex: 0, posLabel: '第1屏' },
  'sec-feature': { floorIndex: 1, posLabel: '第2屏' },
  'sec-bento': { floorIndex: 2, posLabel: '中间段' },
  'sec-flow': { floorIndex: 3, posLabel: '中段图' },
  'sec-tabs': { floorIndex: 4, posLabel: '靠下方' },
  'sec-other': { floorIndex: -1, posLabel: '任意处' }
}

const isSectionScene = computed(() => Boolean(SECTION_META[props.anim]))
const activeFloorIdx = computed(() => {
  const meta = SECTION_META[props.anim]
  if (!meta) return 0
  if (meta.floorIndex === -1) return activeSlot.value === 0 ? 1 : 3
  return meta.floorIndex
})

function clearLoop() {
  if (loopTimer) {
    clearInterval(loopTimer)
    loopTimer = null
  }
}

function startMiniLoop() {
  clearLoop()
  activeSlot.value = 0
  counterVal.value = 24
  loopTimer = setInterval(() => {
    activeSlot.value = (activeSlot.value + 1) % 2
    counterVal.value = activeSlot.value === 0 ? 36 : 98
  }, 1150)
}

watch(
  () => [props.visible, props.anim],
  ([vis]) => {
    if (vis) {
      startMiniLoop()
    } else {
      clearLoop()
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  clearLoop()
})

const tooltipStyle = computed(() => {
  const rect = props.anchorRect
  if (!rect) return { left: '50%', top: '50%' }
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const halfWidth = 128
  const centerX = Math.min(vw - halfWidth - 12, Math.max(halfWidth + 12, rect.left + rect.width / 2))
  const placeBelow = rect.top < 172

  if (placeBelow) {
    return {
      left: `${centerX}px`,
      top: `${rect.bottom + 10}px`,
      transform: 'translate(-50%, 0)'
    }
  }
  return {
    left: `${centerX}px`,
    top: `${rect.top - 10}px`,
    transform: 'translate(-50%, -100%)'
  }
})

const isBelow = computed(() => Boolean(props.anchorRect && props.anchorRect.top < 172))
</script>

<template>
  <Teleport to="body">
    <Transition name="mt-pop">
      <div
        v-if="props.visible && props.anchorRect"
        class="motion-tooltip"
        :class="{ 'is-below': isBelow }"
        :style="tooltipStyle"
        role="tooltip"
      >
        <div class="mt-stage">
          <!-- ================= A. 页面位置与模块长相示意（在哪个位置） ================= -->
          <div v-if="isSectionScene" class="scene scene-section-map">
            <!-- 左侧：整张网页从上到下迷你定位图（在哪儿） -->
            <div class="mini-page-map" aria-hidden="true">
              <div class="mpm-browser-dots">
                <i></i><i></i><i></i>
                <span>整张网页</span>
              </div>
              <div class="mpm-floors">
                <div
                  v-for="idx in [0, 1, 2, 3, 4]"
                  :key="idx"
                  class="mpm-floor"
                  :class="{ hit: activeFloorIdx === idx }"
                >
                  <em v-if="activeFloorIdx === idx">在这</em>
                </div>
              </div>
            </div>

            <!-- 右侧：这块区域放大长什么样（是什么） -->
            <div class="sec-zoom-card">
              <!-- 1. 首屏 Hero -->
              <div v-if="anim === 'sec-hero'" class="sz-hero">
                <div class="sz-hero-left">
                  <span class="sz-kicker">大标题区</span>
                  <i class="sz-h1"></i>
                  <i class="sz-h2"></i>
                  <span class="sz-cta">主按钮</span>
                </div>
                <div class="sz-hero-right">主视觉图</div>
              </div>

              <!-- 2. 功能演示区 -->
              <div v-else-if="anim === 'sec-feature'" class="sz-feature">
                <div class="sz-feat-points">
                  <span class="on">✓ 卖点 1</span>
                  <span>✓ 卖点 2</span>
                </div>
                <div class="sz-feat-screen">🖥 产品界面图</div>
              </div>

              <!-- 3. 多栏卡片区 -->
              <div v-else-if="anim === 'sec-bento'" class="sz-bento">
                <div class="sz-bento-cell hi">📦 亮点卡 1</div>
                <div class="sz-bento-cell">⚡ 亮点卡 2</div>
                <div class="sz-bento-cell">🛡 亮点卡 3</div>
                <div class="sz-bento-cell hi">📊 亮点卡 4</div>
              </div>

              <!-- 4. 连线架构图 -->
              <div v-else-if="anim === 'sec-flow'" class="sz-flow">
                <div class="sz-flow-col">
                  <span>WA</span>
                  <span>IG</span>
                </div>
                <div class="sz-flow-arrow">──▶</div>
                <div class="sz-flow-hub">中心系统</div>
              </div>

              <!-- 5. Tab / 问答区 -->
              <div v-else-if="anim === 'sec-tabs'" class="sz-tabs">
                <div class="sz-tab-pills">
                  <span class="on">标签 1</span>
                  <span>标签 2</span>
                </div>
                <div class="sz-faq-bar">Q: 常见问题展开 ▾</div>
              </div>

              <!-- 6. 其他位置 -->
              <div v-else class="sz-other">
                <span class="sz-other-icon">🔍 任意模块</span>
                <span class="sz-other-sub">填上方原文词自动定位</span>
              </div>
            </div>
          </div>

          <!-- ================= B. 12 种实时微缩动效演示（怎么触发 / 什么效果） ================= -->
          <!-- 1. scroll-enter: Fade In Up -->
          <div v-else-if="anim === 'scroll-enter'" class="scene scene-enter">
            <div class="mini-scroll-track"><i class="mini-scroll-thumb"></i></div>
            <div class="mini-card anim-loop-fadeup">
              <span class="mc-pill"></span>
              <span class="mc-line"></span>
              <span class="mc-line short"></span>
            </div>
          </div>

          <!-- 2. scroll-scrub: Scroll-linked movement -->
          <div v-else-if="anim === 'scroll-scrub'" class="scene scene-scrub">
            <div class="mini-scroll-track"><i class="mini-scroll-thumb scrub"></i></div>
            <div class="scrub-cols">
              <div class="scrub-pin">📌 固定</div>
              <div class="scrub-movers">
                <span class="scrub-card">画面随滚动推进</span>
              </div>
            </div>
          </div>

          <!-- 3. hover-react: Cursor hover lift & glow -->
          <div v-else-if="anim === 'hover-react'" class="scene scene-hover">
            <div class="hover-target-card">
              <span class="mc-pill"></span>
              <span class="mc-line"></span>
            </div>
            <span class="mini-cursor">↖</span>
          </div>

          <!-- 4. auto-progress: Progress bar tabs -->
          <div v-else-if="anim === 'auto-progress'" class="scene scene-autotab">
            <div class="at-tabs">
              <div class="at-tab" :class="{ on: activeSlot === 0 }">
                <span>卖点 1</span>
                <i v-if="activeSlot === 0" class="at-bar"></i>
              </div>
              <div class="at-tab" :class="{ on: activeSlot === 1 }">
                <span>卖点 2</span>
                <i v-if="activeSlot === 1" class="at-bar"></i>
              </div>
            </div>
            <div :key="activeSlot" class="at-screen">
              {{ activeSlot === 0 ? '📊 图表视图 A' : '💬 会话视图 B' }}
            </div>
          </div>

          <!-- 5. click-switch: Sliding tab indicator -->
          <div v-else-if="anim === 'click-switch'" class="scene scene-switch">
            <div class="sw-pill-bar">
              <i
                class="sw-glider"
                :style="{ transform: `translateX(${activeSlot * 100}%)` }"
              ></i>
              <span :class="{ on: activeSlot === 0 }">方案 A</span>
              <span :class="{ on: activeSlot === 1 }">方案 B</span>
            </div>
            <div :key="activeSlot" class="at-screen">
              {{ activeSlot === 0 ? '内容平滑淡入 A' : '内容平滑淡入 B' }}
            </div>
          </div>

          <!-- 6. loop-pulse: Seamless marquee -->
          <div v-else-if="anim === 'loop-pulse'" class="scene scene-marquee">
            <div class="mq-row">
              <div class="mq-track">
                <span>WhatsApp</span>
                <span>TikTok</span>
                <span>LINE</span>
                <span>WhatsApp</span>
                <span>TikTok</span>
                <span>LINE</span>
              </div>
            </div>
            <div class="pulse-badge"><i class="pulse-dot"></i>持续柔和循环</div>
          </div>

          <!-- 7. pin-swap: Left pinned, right swaps -->
          <div v-else-if="anim === 'pin-swap'" class="scene scene-pinswap">
            <div class="ps-left">
              <span class="ps-tag">左侧不动</span>
              <span class="mc-line"></span>
              <span class="mc-line short"></span>
            </div>
            <div :key="activeSlot" class="ps-right">
              {{ activeSlot === 0 ? '🖼 配图 01' : '✨ 配图 02' }}
            </div>
          </div>

          <!-- 8. stagger-stream: Sequential bubbles -->
          <div v-else-if="anim === 'stagger-stream'" class="scene scene-stream">
            <span class="st-bubble b1">① 买家提问滑入</span>
            <span class="st-bubble b2">② AI 识别意图...</span>
            <span class="st-bubble b3">③ 自动秒回气泡</span>
          </div>

          <!-- 9. path-pulse: Flowing light along line -->
          <div v-else-if="anim === 'path-pulse'" class="scene scene-path">
            <span class="pf-node">多渠道</span>
            <span class="pf-wire"><i class="pf-spark"></i></span>
            <span class="pf-node hub">AI 中枢</span>
          </div>

          <!-- 10. spotlight-glow: Border shimmer -->
          <div v-else-if="anim === 'spotlight-glow'" class="scene scene-shimmer">
            <div class="shimmer-card">
              <span>✨ 品牌高光扫过</span>
              <i class="shimmer-beam"></i>
            </div>
          </div>

          <!-- 11. smooth-expand: Smooth height accordion -->
          <div v-else-if="anim === 'smooth-expand'" class="scene scene-expand">
            <div class="exp-box" :class="{ open: activeSlot === 1 }">
              <div class="exp-head">
                <span>常见问题平滑展开</span>
                <b :class="{ rot: activeSlot === 1 }">▾</b>
              </div>
              <div class="exp-body">
                <div>高度丝滑推开不闪跳</div>
              </div>
            </div>
          </div>

          <!-- 12. number-bar: Rolling counter -->
          <div v-else class="scene scene-number">
            <div class="num-big">+{{ counterVal }}%</div>
            <div class="num-bar-track">
              <div class="num-bar-fill" :style="{ width: `${counterVal}%` }"></div>
            </div>
          </div>
        </div>

        <div class="mt-caption">
          <div class="mt-head-row">
            <span class="mt-title">{{ props.title }}</span>
            <span v-if="props.badge" class="mt-where-badge">📍 {{ props.badge }}</span>
          </div>
          <div class="mt-tip">{{ props.tip }}</div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.motion-tooltip {
  position: fixed;
  z-index: 220;
  width: 252px;
  background: #0f172a;
  color: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 18px 36px -8px rgba(15, 23, 42, 0.42);
  pointer-events: none;
}

.motion-tooltip::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -5px;
  width: 9px;
  height: 9px;
  background: #0f172a;
  border-right: 1px solid rgba(148, 163, 184, 0.28);
  border-bottom: 1px solid rgba(148, 163, 184, 0.28);
  transform: translateX(-50%) rotate(45deg);
}

.motion-tooltip.is-below::after {
  bottom: auto;
  top: -5px;
  transform: translateX(-50%) rotate(225deg);
}

.mt-stage {
  height: 92px;
  background: #f8fafc;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 8px;
  color: #0f172a;
}

.mt-caption {
  padding: 7px 4px 2px;
}

.mt-head-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 3px;
}

.mt-title {
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
}

.mt-where-badge {
  font-size: 10px;
  font-weight: 600;
  color: #93c5fd;
  background: rgba(37, 99, 235, 0.24);
  border: 1px solid rgba(96, 165, 250, 0.35);
  padding: 1px 6px;
  border-radius: 999px;
  white-space: nowrap;
}

.mt-tip {
  font-size: 11px;
  color: #cbd5e1;
  line-height: 1.4;
}

.scene {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* ================= Section Map + Structure Wireframe ================= */
.scene-section-map {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 7px;
  align-items: stretch;
}

.mini-page-map {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.mpm-browser-dots {
  display: flex;
  align-items: center;
  gap: 2px;
  padding-bottom: 2px;
  border-bottom: 1px solid #e2e8f0;
}

.mpm-browser-dots i {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #94a3b8;
}

.mpm-browser-dots span {
  margin-left: auto;
  font-size: 7.5px;
  font-weight: 700;
  color: #64748b;
}

.mpm-floors {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.5px;
  justify-content: space-between;
}

.mpm-floor {
  flex: 1;
  border-radius: 3px;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
}

.mpm-floor.hit {
  background: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.25);
  animation: floorPulse 1.2s ease-in-out infinite;
}

.mpm-floor em {
  font-style: normal;
  font-size: 8px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
}

.sec-zoom-card {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  padding: 6px 7px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 1. Hero wireframe */
.sz-hero {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 56px;
  gap: 6px;
  align-items: center;
}

.sz-hero-left {
  display: flex;
  flex-direction: column;
  gap: 3.5px;
}

.sz-kicker {
  font-size: 8.5px;
  font-weight: 700;
  color: #2563eb;
}

.sz-h1 {
  display: block;
  width: 92%;
  height: 5px;
  border-radius: 3px;
  background: #0f172a;
}

.sz-h2 {
  display: block;
  width: 68%;
  height: 4px;
  border-radius: 3px;
  background: #94a3b8;
}

.sz-cta {
  align-self: flex-start;
  font-size: 8px;
  font-weight: 700;
  color: #ffffff;
  background: #2563eb;
  padding: 1.5px 6px;
  border-radius: 4px;
  margin-top: 1px;
}

.sz-hero-right {
  height: 52px;
  border-radius: 6px;
  background: #eff6ff;
  border: 1px solid #93c5fd;
  display: grid;
  place-items: center;
  font-size: 9px;
  font-weight: 700;
  color: #1d4ed8;
}

/* 2. Feature demo wireframe */
.sz-feature {
  width: 100%;
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 6px;
  align-items: center;
}

.sz-feat-points {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sz-feat-points span {
  font-size: 8.5px;
  font-weight: 600;
  color: #64748b;
  background: #f1f5f9;
  padding: 3px 4px;
  border-radius: 4px;
}

.sz-feat-points span.on {
  color: #2563eb;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
}

.sz-feat-screen {
  height: 52px;
  border-radius: 6px;
  background: #eff6ff;
  border: 1px solid #93c5fd;
  display: grid;
  place-items: center;
  font-size: 9.5px;
  font-weight: 700;
  color: #1e40af;
}

/* 3. Bento multi-card grid */
.sz-bento {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
}

.sz-bento-cell {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 5px;
  padding: 5px 4px;
  font-size: 8.5px;
  font-weight: 700;
  color: #334155;
  text-align: center;
}

.sz-bento-cell.hi {
  background: #eff6ff;
  border-color: #93c5fd;
  color: #1d4ed8;
}

/* 4. Flow diagram wireframe */
.sz-flow {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}

.sz-flow-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sz-flow-col span {
  font-size: 8.5px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
}

.sz-flow-arrow {
  font-size: 10px;
  font-weight: 800;
  color: #2563eb;
  letter-spacing: -1px;
}

.sz-flow-hub {
  font-size: 9px;
  font-weight: 700;
  color: #2563eb;
  background: #eff6ff;
  border: 1.5px solid #2563eb;
  border-radius: 6px;
  padding: 9px 6px;
}

/* 5. Tabs / FAQ wireframe */
.sz-tabs {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.sz-tab-pills {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  background: #f1f5f9;
  padding: 2px;
  border-radius: 5px;
}

.sz-tab-pills span {
  font-size: 8.5px;
  font-weight: 700;
  text-align: center;
  padding: 2px 0;
  border-radius: 4px;
  color: #64748b;
}

.sz-tab-pills span.on {
  background: #ffffff;
  color: #2563eb;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}

.sz-faq-bar {
  font-size: 9px;
  font-weight: 600;
  color: #1e293b;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 5px;
  padding: 5px 6px;
  text-align: center;
}

/* 6. Other custom area */
.sz-other {
  width: 100%;
  height: 54px;
  border: 1.5px dashed #93c5fd;
  background: #f8faff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
}

.sz-other-icon {
  font-size: 10px;
  font-weight: 700;
  color: #2563eb;
}

.sz-other-sub {
  font-size: 8.5px;
  color: #64748b;
}

/* ================= Motion Demos ================= */
.mini-scroll-track {
  width: 4px;
  height: 56px;
  border-radius: 999px;
  background: #e2e8f0;
  margin-right: 10px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.mini-scroll-thumb {
  position: absolute;
  left: 0;
  width: 100%;
  height: 18px;
  border-radius: 999px;
  background: #2563eb;
  animation: thumbMove 1.5s ease-in-out infinite;
}

.mini-scroll-thumb.scrub {
  animation: thumbScrub 1.8s ease-in-out infinite alternate;
}

.mini-card,
.hover-target-card {
  flex: 1;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
}

.anim-loop-fadeup {
  animation: loopFadeUp 1.5s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}

.mc-pill {
  width: 34px;
  height: 6px;
  border-radius: 999px;
  background: #2563eb;
}

.mc-line {
  width: 85%;
  height: 5px;
  border-radius: 999px;
  background: #cbd5e1;
}

.mc-line.short {
  width: 55%;
}

/* Scrub */
.scrub-cols {
  flex: 1;
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 6px;
  align-items: center;
}

.scrub-pin {
  font-size: 10px;
  font-weight: 700;
  color: #2563eb;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  padding: 8px 4px;
  text-align: center;
}

.scrub-card {
  display: block;
  font-size: 10px;
  font-weight: 600;
  background: #ffffff;
  border: 1px solid #93c5fd;
  border-radius: 6px;
  padding: 8px 6px;
  text-align: center;
  animation: scrubSlide 1.8s ease-in-out infinite alternate;
}

/* Hover */
.hover-target-card {
  max-width: 148px;
  animation: cardHoverLift 1.6s ease-in-out infinite;
}

.mini-cursor {
  position: absolute;
  right: 26px;
  bottom: 6px;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  animation: cursorApproach 1.6s ease-in-out infinite;
}

/* Auto-Progress & Switch */
.scene-autotab,
.scene-switch {
  flex-direction: column;
  gap: 6px;
}

.at-tabs {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.at-tab {
  position: relative;
  overflow: hidden;
  background: #e2e8f0;
  border-radius: 5px;
  padding: 3px 6px 5px;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  color: #64748b;
}

.at-tab.on {
  background: #ffffff;
  color: #2563eb;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
}

.at-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  background: #2563eb;
  animation: barFill 1.15s linear infinite;
}

.at-screen {
  width: 100%;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 6px;
  font-size: 10.5px;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  animation: quickSwap 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.sw-pill-bar {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #e2e8f0;
  padding: 2px;
  border-radius: 6px;
}

.sw-glider {
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: 2px;
  width: calc(50% - 2px);
  background: #ffffff;
  border-radius: 4px;
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.sw-pill-bar span {
  position: relative;
  z-index: 1;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  padding: 2px 0;
  color: #64748b;
}

.sw-pill-bar span.on {
  color: #2563eb;
}

/* Marquee */
.scene-marquee {
  flex-direction: column;
  gap: 7px;
}

.mq-row {
  width: 100%;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 4px 0;
}

.mq-track {
  display: flex;
  width: max-content;
  gap: 10px;
  animation: miniMarquee 3.2s linear infinite;
}

.mq-track span {
  font-size: 10px;
  font-weight: 600;
  color: #475569;
}

.pulse-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 600;
  color: #047857;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  animation: dotPing 1.2s ease-out infinite;
}

/* Pin-swap */
.scene-pinswap {
  gap: 7px;
}

.ps-left {
  width: 78px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ps-tag {
  font-size: 9.5px;
  font-weight: 700;
  color: #2563eb;
}

.ps-right {
  flex: 1;
  height: 54px;
  background: #eff6ff;
  border: 1px solid #93c5fd;
  border-radius: 7px;
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 700;
  color: #1d4ed8;
  animation: quickSwap 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* Stream */
.scene-stream {
  flex-direction: column;
  align-items: stretch;
  gap: 4px;
}

.st-bubble {
  font-size: 9.5px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  align-self: flex-start;
  animation: staggerPop 1.8s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}

.st-bubble.b2 {
  align-self: flex-end;
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #2563eb;
  animation-delay: 0.24s;
}

.st-bubble.b3 {
  align-self: flex-end;
  background: #ecfdf5;
  border-color: #a7f3d0;
  color: #047857;
  animation-delay: 0.48s;
}

/* Path pulse */
.scene-path {
  gap: 6px;
}

.pf-node {
  font-size: 10px;
  font-weight: 700;
  padding: 5px 8px;
  border-radius: 7px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
}

.pf-node.hub {
  border-color: #2563eb;
  color: #2563eb;
  animation: hubGlow 1.4s ease-in-out infinite;
}

.pf-wire {
  flex: 1;
  height: 3px;
  background: #e2e8f0;
  border-radius: 999px;
  position: relative;
  overflow: hidden;
}

.pf-spark {
  position: absolute;
  top: 0;
  left: -30%;
  width: 35%;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, #2563eb, #10b981);
  animation: sparkRun 1.4s linear infinite;
}

/* Shimmer */
.shimmer-card {
  position: relative;
  overflow: hidden;
  width: 164px;
  padding: 12px 10px;
  border-radius: 9px;
  background: #ffffff;
  border: 1.5px solid #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.14);
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  color: #1e293b;
}

.shimmer-beam {
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, transparent 25%, rgba(37, 99, 235, 0.22) 50%, transparent 75%);
  animation: shimmerSweep 1.5s ease-in-out infinite;
}

/* Smooth expand */
.exp-box {
  width: 100%;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  padding: 6px 9px;
}

.exp-head {
  display: flex;
  justify-content: space-between;
  font-size: 10.5px;
  font-weight: 700;
}

.exp-head b {
  transition: transform 0.28s ease;
}

.exp-head b.rot {
  transform: rotate(180deg);
  color: #2563eb;
}

.exp-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.exp-box.open .exp-body {
  grid-template-rows: 1fr;
}

.exp-body > div {
  overflow: hidden;
  font-size: 10px;
  color: #2563eb;
  padding-top: 0;
}

.exp-box.open .exp-body > div {
  padding-top: 5px;
}

/* Number bar */
.scene-number {
  flex-direction: column;
  gap: 7px;
}

.num-big {
  font-size: 20px;
  font-weight: 800;
  color: #2563eb;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.num-bar-track {
  width: 148px;
  height: 6px;
  border-radius: 999px;
  background: #e2e8f0;
  overflow: hidden;
}

.num-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #2563eb, #10b981);
  border-radius: 999px;
  transition: width 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.mt-pop-enter-active,
.mt-pop-leave-active {
  transition: opacity 0.14s ease;
}

.mt-pop-enter-from,
.mt-pop-leave-to {
  opacity: 0;
}

@keyframes floorPulse {
  0%, 100% { transform: scaleX(1); }
  50% { transform: scaleX(1.03); }
}

@keyframes loopFadeUp {
  0%, 15% { opacity: 0; transform: translateY(14px); }
  45%, 85% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-4px); }
}

@keyframes thumbMove {
  0% { top: 4px; }
  50%, 100% { top: 32px; }
}

@keyframes thumbScrub {
  from { top: 4px; }
  to { top: 34px; }
}

@keyframes scrubSlide {
  from { transform: translateY(8px); opacity: 0.65; }
  to { transform: translateY(-8px); opacity: 1; }
}

@keyframes cardHoverLift {
  0%, 25% { transform: translateY(0); box-shadow: none; border-color: #cbd5e1; }
  55%, 85% { transform: translateY(-5px); box-shadow: 0 8px 16px rgba(37, 99, 235, 0.18); border-color: #2563eb; }
  100% { transform: translateY(0); }
}

@keyframes cursorApproach {
  0%, 20% { transform: translate(14px, 12px); }
  50%, 85% { transform: translate(-8px, -8px); }
  100% { transform: translate(14px, 12px); }
}

@keyframes barFill {
  from { width: 0%; }
  to { width: 100%; }
}

@keyframes quickSwap {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes miniMarquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes dotPing {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.55); }
  80%, 100% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
}

@keyframes staggerPop {
  0%, 12% { opacity: 0; transform: translateY(8px); }
  35%, 85% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; }
}

@keyframes sparkRun {
  from { left: -35%; }
  to { left: 105%; }
}

@keyframes hubGlow {
  0%, 55% { box-shadow: none; }
  75% { box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.22); }
  100% { box-shadow: none; }
}

@keyframes shimmerSweep {
  0% { transform: translateX(-110%); }
  65%, 100% { transform: translateX(110%); }
}
</style>
