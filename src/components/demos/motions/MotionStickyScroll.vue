<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  replayTick: { type: Number, default: 0 },
  viewport: { type: String, default: 'desktop' }
})

const steps = [
  {
    label: '① 接入多渠道账号',
    bg: 'linear-gradient(135deg, #2563eb, #3b82f6)',
    title: '画面 ① 多渠道聚合',
    sub: '扫码或 API 快速接入'
  },
  {
    label: '② 自动识别意图分流',
    bg: 'linear-gradient(135deg, #0f766e, #10b981)',
    title: '画面 ② 智能分流',
    sub: 'AI 自动识别意图分配'
  },
  {
    label: '③ 沉淀线索促进成交',
    bg: 'linear-gradient(135deg, #7c3aed, #6366f1)',
    title: '画面 ③ 留资成交',
    sub: '标签沉淀 + 跟进提醒'
  }
]

const activeStep = ref(0)
const leftRef = ref(null)
let autoTimer = null
let programmaticTimer = null
let isProgrammaticScroll = false

function clearProgrammaticGuard() {
  isProgrammaticScroll = false
  if (programmaticTimer !== null) {
    clearTimeout(programmaticTimer)
    programmaticTimer = null
  }
}

function clearAutoTimer() {
  if (autoTimer !== null) {
    clearInterval(autoTimer)
    autoTimer = null
  }
}

function onManualScrollIntent() {
  clearAutoTimer()
  clearProgrammaticGuard()
}

function selectStep(idx) {
  clearAutoTimer()
  clearProgrammaticGuard()
  activeStep.value = idx
  if (leftRef.value && props.viewport !== 'mobile') {
    isProgrammaticScroll = true
    const max = Math.max(0, leftRef.value.scrollHeight - leftRef.value.clientHeight)
    leftRef.value.scrollTop = Math.round((idx / (steps.length - 1)) * max)
    programmaticTimer = setTimeout(() => {
      isProgrammaticScroll = false
      programmaticTimer = null
    }, 450)
  }
}

function onLeftScroll(e) {
  if (props.viewport === 'mobile' || autoTimer !== null || isProgrammaticScroll) return
  const el = e.currentTarget
  if (!el) return
  const max = el.scrollHeight - el.clientHeight
  if (max <= 0) return
  const ratio = el.scrollTop / max
  activeStep.value = ratio < 0.34 ? 0 : ratio < 0.72 ? 1 : 2
}

function runAutoDemo() {
  clearAutoTimer()
  clearProgrammaticGuard()
  let step = 0
  activeStep.value = 0
  if (leftRef.value) {
    leftRef.value.scrollTop = 0
  }
  autoTimer = setInterval(() => {
    step += 1
    if (step > 2) {
      clearAutoTimer()
      return
    }
    activeStep.value = step
    if (leftRef.value && props.viewport !== 'mobile') {
      const max = Math.max(0, leftRef.value.scrollHeight - leftRef.value.clientHeight)
      leftRef.value.scrollTop = Math.round((step / 2) * max)
    }
  }, 750)
}

watch(
  () => props.replayTick,
  () => {
    runAutoDemo()
  }
)

onUnmounted(() => {
  clearAutoTimer()
  clearProgrammaticGuard()
})
</script>

<template>
  <div class="motion-sticky-scroll" :class="{ 'is-mobile': props.viewport === 'mobile' }">
    <span class="stage-badge">{{
      props.viewport === 'mobile' ? '📱 手机端自动改为纵向切换' : '滚左侧或点步骤'
    }}</span>
    <button type="button" class="stage-action" @click.stop="runAutoDemo">▶ 自动演示</button>
    <div class="demo-sticky-box">
      <div
        ref="leftRef"
        class="sticky-left"
        @wheel="onManualScrollIntent"
        @touchmove="onManualScrollIntent"
        @scroll="onLeftScroll"
      >
        <div
          v-for="(item, idx) in steps"
          :key="item.label"
          class="sticky-step"
          :class="{ active: activeStep === idx }"
          @click.stop="selectStep(idx)"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="sticky-right">
        <div :key="activeStep" class="sticky-screen" :style="{ background: steps[activeStep].bg }">
          <div>{{ steps[activeStep].title }}</div>
          <div class="sticky-sub">{{ steps[activeStep].sub }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.motion-sticky-scroll {
  width: 100%;
  padding-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-sticky-box {
  width: 100%;
  max-width: 440px;
  height: 136px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  display: grid;
  grid-template-columns: 1fr 1.08fr;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.sticky-left {
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-right: 1px solid var(--border);
  scroll-behavior: smooth;
  min-width: 0;
}

.sticky-step {
  padding: 14px 10px;
  border-radius: 8px;
  background: var(--surface-soft);
  border: 1px solid transparent;
  font-size: 11.5px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--dur, 0.28s) ease;
}

.sticky-step.active {
  background: var(--primary-soft);
  border-color: #93c5fd;
  color: var(--primary);
  font-weight: 600;
}

.sticky-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: #f8fafc;
  min-width: 0;
}

.sticky-screen {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  padding: 12px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  box-sizing: border-box;
  animation: screenSwap var(--dur, 0.28s) var(--ease, cubic-bezier(0.22, 1, 0.36, 1)) both;
}

.sticky-sub {
  font-size: 11px;
  font-weight: 400;
  opacity: 0.92;
  margin-top: 4px;
}

.motion-sticky-scroll.is-mobile .demo-sticky-box {
  max-width: 100%;
  grid-template-columns: 1fr;
  height: auto;
}

.motion-sticky-scroll.is-mobile .sticky-left {
  overflow-y: visible;
  border-right: none;
  border-bottom: 1px solid var(--border);
  padding: 7px;
  gap: 5px;
}

.motion-sticky-scroll.is-mobile .sticky-step {
  padding: 6px 9px;
  font-size: 11px;
}

.motion-sticky-scroll.is-mobile .sticky-right {
  padding: 8px;
}

.motion-sticky-scroll.is-mobile .sticky-screen {
  min-height: 76px;
  height: auto;
  font-size: 12px;
  padding: 10px;
}

.motion-sticky-scroll.is-mobile .sticky-sub {
  font-size: 10.5px;
}

@keyframes screenSwap {
  from {
    opacity: 0.72;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
