<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: '' },
  tip: { type: String, default: '' },
  anim: { type: String, default: 'scroll-enter' },
  anchorRect: { type: Object, default: null }
})

const counterVal = ref(18)
const activeSlot = ref(0)
let loopTimer = null

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
  const halfWidth = 114
  const centerX = Math.min(vw - halfWidth - 12, Math.max(halfWidth + 12, rect.left + rect.width / 2))
  const placeBelow = rect.top < 156

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

const isBelow = computed(() => Boolean(props.anchorRect && props.anchorRect.top < 156))
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
          <!-- 1. scroll-enter: Fade In Up -->
          <div v-if="anim === 'scroll-enter'" class="scene scene-enter">
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
          <div class="mt-title">{{ props.title }}</div>
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
  width: 224px;
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
  height: 82px;
  background: #f8fafc;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 10px;
  color: #0f172a;
}

.mt-caption {
  padding: 7px 4px 2px;
}

.mt-title {
  font-size: 11.5px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2px;
}

.mt-tip {
  font-size: 11px;
  color: #cbd5e1;
  line-height: 1.38;
}

.scene {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

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
