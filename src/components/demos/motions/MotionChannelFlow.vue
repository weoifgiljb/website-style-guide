<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  replayTick: { type: Number, default: 0 },
  viewport: { type: String, default: 'desktop' }
})

const channels = [
  { name: 'WhatsApp', dot: '#10b981' },
  { name: 'Instagram', dot: '#ec4899' },
  { name: 'TikTok', dot: '#0f172a' },
  { name: 'Messenger', dot: '#2563eb' }
]

const outputs = [
  { title: 'AI 自动多语回复', meta: '0.8s 响应' },
  { title: 'VIP 坐席智能分流', meta: '按国家路由' }
]

const phase = ref(0)
const isPaused = ref(false)
let phaseTimer = null

function stopTimer() {
  if (phaseTimer) {
    clearInterval(phaseTimer)
    phaseTimer = null
  }
}

function startTimer() {
  stopTimer()
  phaseTimer = setInterval(() => {
    if (!isPaused.value) {
      phase.value = (phase.value + 1) % 3
    }
  }, 900)
}

function pulseManual() {
  phase.value = 0
  startTimer()
}

watch(
  () => props.replayTick,
  () => {
    pulseManual()
  }
)

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>

<template>
  <div
    class="motion-channel-flow"
    :class="{ 'is-mobile': props.viewport === 'mobile', 'is-paused': isPaused }"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
  >
    <span class="stage-badge">
      {{ isPaused ? '⏸ 悬停已暂停' : 'Respond.io 同款 · 全渠道流光汇聚' }}
    </span>
    <button type="button" class="stage-action" @click.stop="pulseManual">▶ 触发流转</button>

    <div class="flow-diagram">
      <!-- Left: Multi-channel sources -->
      <div class="flow-sources" :class="{ active: phase === 0 }">
        <span
          v-for="ch in channels"
          :key="ch.name"
          class="source-pill"
        >
          <i class="source-dot" :style="{ background: ch.dot }"></i>
          {{ ch.name }}
        </span>
      </div>

      <!-- Connector 1 -->
      <div class="flow-Pipe" aria-hidden="true">
        <svg v-if="props.viewport !== 'mobile'" viewBox="0 0 54 96" class="pipe-svg">
          <path d="M2 14 C 28 14, 26 48, 52 48" class="pipe-base" />
          <path d="M2 38 C 26 38, 28 48, 52 48" class="pipe-base" />
          <path d="M2 60 C 26 60, 28 48, 52 48" class="pipe-base" />
          <path d="M2 84 C 28 84, 26 48, 52 48" class="pipe-base" />
          <path d="M2 14 C 28 14, 26 48, 52 48" class="pipe-pulse" />
          <path d="M2 60 C 26 60, 28 48, 52 48" class="pipe-pulse delay" />
        </svg>
        <div v-else class="mobile-arrow" :class="{ lit: phase >= 1 }">↓ 汇聚脉冲</div>
      </div>

      <!-- Center: Unified AI Hub -->
      <div class="flow-hub" :class="{ active: phase === 1 }">
        <div class="hub-badge">SaleSmartly</div>
        <div class="hub-title">AI 统一收件箱</div>
        <div class="hub-sub">意图识别 · 自动翻译</div>
      </div>

      <!-- Connector 2 -->
      <div class="flow-Pipe" aria-hidden="true">
        <svg v-if="props.viewport !== 'mobile'" viewBox="0 0 46 96" class="pipe-svg is-narrow">
          <path d="M2 48 C 22 48, 24 26, 44 26" class="pipe-base" />
          <path d="M2 48 C 22 48, 24 70, 44 70" class="pipe-base" />
          <path d="M2 48 C 22 48, 24 26, 44 26" class="pipe-pulse" />
          <path d="M2 48 C 22 48, 24 70, 44 70" class="pipe-pulse delay" />
        </svg>
        <div v-else class="mobile-arrow" :class="{ lit: phase === 2 }">↓ 智能分发</div>
      </div>

      <!-- Right: Routed Action Cards -->
      <div class="flow-targets">
        <div
          v-for="out in outputs"
          :key="out.title"
          class="target-card"
          :class="{ active: phase === 2 }"
        >
          <div class="target-title">{{ out.title }}</div>
          <div class="target-meta">{{ out.meta }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.motion-channel-flow {
  width: 100%;
  padding-top: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flow-diagram {
  width: 100%;
  max-width: 472px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}

.flow-sources {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-shrink: 0;
}

.source-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 3px 9px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
  transition:
    border-color var(--dur, 0.28s) var(--ease),
    transform var(--dur, 0.28s) var(--ease);
}

.flow-sources.active .source-pill {
  border-color: #93c5fd;
}

.source-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.flow-Pipe {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pipe-svg {
  width: 48px;
  height: 96px;
  overflow: visible;
}

.pipe-svg.is-narrow {
  width: 40px;
}

.pipe-base {
  fill: none;
  stroke: #cbd5e1;
  stroke-width: 1.5;
}

.pipe-pulse {
  fill: none;
  stroke: var(--primary);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 16 64;
  animation: dashFlow 2.2s linear infinite;
}

.pipe-pulse.delay {
  animation-delay: -1.1s;
  stroke: #10b981;
}

.motion-channel-flow.is-paused .pipe-pulse {
  animation-play-state: paused;
}

@keyframes dashFlow {
  from {
    stroke-dashoffset: 80;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.flow-hub {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 12px;
  padding: 9px 11px;
  text-align: center;
  min-width: 116px;
  box-shadow: var(--shadow-sm);
  transition:
    border-color var(--dur, 0.28s) var(--ease),
    box-shadow var(--dur, 0.28s) var(--ease),
    transform var(--dur, 0.28s) var(--ease);
}

.flow-hub.active {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.16);
  transform: translateY(-2px);
}

.hub-badge {
  display: inline-block;
  font-size: 9.5px;
  font-weight: 700;
  color: var(--primary);
  background: var(--primary-soft);
  padding: 1px 6px;
  border-radius: 999px;
  margin-bottom: 3px;
}

.hub-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--text);
}

.hub-sub {
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 2px;
}

.flow-targets {
  display: flex;
  flex-direction: column;
  gap: 7px;
  flex: 1;
  min-width: 112px;
}

.target-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 9px;
  padding: 7px 9px;
  transition:
    border-color var(--dur, 0.28s) var(--ease),
    box-shadow var(--dur, 0.28s) var(--ease),
    transform var(--dur, 0.28s) var(--ease);
}

.target-card.active {
  border-color: #6ee7b7;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.15);
  transform: translateX(2px);
}

.target-title {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
}

.target-meta {
  font-size: 10px;
  color: #047857;
  font-weight: 600;
  margin-top: 2px;
}

.mobile-arrow {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--text-muted);
  padding: 1px 8px;
  border-radius: 999px;
  background: var(--surface-soft);
  transition: color var(--dur, 0.28s) ease, background var(--dur, 0.28s) ease;
}

.mobile-arrow.lit {
  color: var(--primary);
  background: var(--primary-soft);
}

.motion-channel-flow.is-mobile .flow-diagram {
  flex-direction: column;
  gap: 6px;
}

.motion-channel-flow.is-mobile .flow-sources {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
}

.motion-channel-flow.is-mobile .source-pill {
  font-size: 10px;
  padding: 2px 7px;
}

.motion-channel-flow.is-mobile .flow-hub {
  width: 100%;
  padding: 7px 10px;
}

.motion-channel-flow.is-mobile .flow-targets {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
}
</style>
