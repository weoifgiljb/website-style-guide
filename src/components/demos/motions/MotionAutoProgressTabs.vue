<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  replayTick: { type: Number, default: 0 },
  viewport: { type: String, default: 'desktop' }
})

const CYCLE_MS = 3800

const items = [
  {
    tag: 'Intercom 同款',
    title: '① AI 意图识别分流',
    desc: '自动判断售前询盘与售后改单，精准路由对应组。',
    metric: '分流准确率 98.4%',
    chipA: '售前询价 → 营销组',
    chipB: '物流查询 → AI 直回'
  },
  {
    tag: '134+ 语种',
    title: '② 双向实时母语翻译',
    desc: '客户发西语/泰语，坐席看中文回中文自动转译。',
    metric: '平均响应提速 3.2x',
    chipA: 'ES 西语 ↔ 简体中文',
    chipB: 'TH 泰语 ↔ 简体中文'
  },
  {
    tag: '数据闭环',
    title: '③ 广告归因回传优化',
    desc: '聊天成交线索一键回传 Meta / TikTok 广告后台。',
    metric: 'ROAS 提升 +37%',
    chipA: 'ClickID 自动绑定',
    chipB: '高潜客群回传'
  }
]

const activeIdx = ref(0)
const progress = ref(0)
const isPaused = ref(false)

let rafId = null
let lastTs = 0

function stopLoop() {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function tick(now) {
  if (!lastTs) lastTs = now
  const delta = now - lastTs
  lastTs = now

  if (!isPaused.value) {
    const next = progress.value + (delta / CYCLE_MS) * 100
    if (next >= 100) {
      activeIdx.value = (activeIdx.value + 1) % items.length
      progress.value = 0
    } else {
      progress.value = next
    }
  }
  rafId = requestAnimationFrame(tick)
}

function startLoop() {
  stopLoop()
  lastTs = 0
  rafId = requestAnimationFrame(tick)
}

function selectItem(idx) {
  activeIdx.value = idx
  progress.value = 0
  lastTs = 0
}

function restartCycle() {
  activeIdx.value = 0
  progress.value = 0
  lastTs = 0
  startLoop()
}

watch(
  () => props.replayTick,
  () => {
    restartCycle()
  }
)

onMounted(() => {
  startLoop()
})

onUnmounted(() => {
  stopLoop()
})
</script>

<template>
  <div
    class="motion-auto-tabs"
    :class="{ 'is-mobile': props.viewport === 'mobile' }"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
  >
    <span class="stage-badge">
      {{ isPaused ? '⏸ 悬停已暂停' : 'Intercom / 飞书同款 · 自动读条' }}
    </span>
    <button type="button" class="stage-action" @click.stop="restartCycle">↻ 重播</button>

    <div class="auto-tabs-shell">
      <div class="tabs-rail">
        <button
          v-for="(item, idx) in items"
          :key="item.title"
          type="button"
          class="rail-item"
          :class="{ active: activeIdx === idx }"
          @click.stop="selectItem(idx)"
        >
          <div class="rail-title">{{ item.title }}</div>
          <div v-if="activeIdx === idx && props.viewport !== 'mobile'" class="rail-desc">
            {{ item.desc }}
          </div>
          <div class="rail-progress-track">
            <div
              class="rail-progress-bar"
              :style="{ width: activeIdx === idx ? `${progress.toFixed(1)}%` : '0%' }"
            ></div>
          </div>
        </button>
      </div>

      <div class="preview-pane">
        <Transition name="pane-swap" mode="out-in">
          <div :key="activeIdx" class="pane-card">
            <div class="pane-top">
              <span class="pane-tag">{{ items[activeIdx].tag }}</span>
              <span class="pane-metric">{{ items[activeIdx].metric }}</span>
            </div>
            <div class="pane-headline">{{ items[activeIdx].title.slice(2) }}</div>
            <div class="pane-sub">{{ items[activeIdx].desc }}</div>
            <div class="pane-chips">
              <span class="pane-chip">{{ items[activeIdx].chipA }}</span>
              <span class="pane-chip">{{ items[activeIdx].chipB }}</span>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.motion-auto-tabs {
  width: 100%;
  padding-top: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auto-tabs-shell {
  width: 100%;
  max-width: 470px;
  display: grid;
  grid-template-columns: 5fr 6.5fr;
  gap: 10px;
  align-items: stretch;
}

.tabs-rail {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rail-item {
  position: relative;
  text-align: left;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.75);
  border-radius: 9px;
  padding: 8px 10px 10px;
  cursor: pointer;
  overflow: hidden;
  transition:
    background var(--dur, 0.28s) var(--ease),
    border-color var(--dur, 0.28s) var(--ease),
    box-shadow var(--dur, 0.28s) var(--ease);
}

.rail-item.active {
  background: var(--surface);
  border-color: #bfdbfe;
  box-shadow: var(--shadow-sm);
}

.rail-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-secondary);
  line-height: 1.3;
}

.rail-item.active .rail-title {
  color: var(--primary);
}

.rail-desc {
  font-size: 11px;
  color: var(--text-muted);
  line-height: 1.38;
  margin-top: 4px;
}

.rail-progress-track {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2.5px;
  background: rgba(226, 232, 240, 0.7);
}

.rail-progress-bar {
  height: 100%;
  background: var(--primary);
  border-radius: 0 999px 999px 0;
}

.preview-pane {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 11px;
  padding: 12px 13px;
  min-height: 138px;
  display: flex;
  align-items: center;
  box-shadow: var(--shadow-sm);
}

.pane-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pane-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.pane-tag {
  font-size: 10px;
  font-weight: 700;
  color: var(--primary);
  background: var(--primary-soft);
  padding: 2px 7px;
  border-radius: 999px;
}

.pane-metric {
  font-size: 10.5px;
  font-weight: 700;
  color: #047857;
}

.pane-headline {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--text);
}

.pane-sub {
  font-size: 11.5px;
  color: var(--text-secondary);
  line-height: 1.42;
}

.pane-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 2px;
}

.pane-chip {
  font-size: 10.5px;
  color: var(--text-secondary);
  background: var(--surface-soft);
  border: 1px solid var(--border);
  padding: 2px 7px;
  border-radius: 6px;
}

.pane-swap-enter-active,
.pane-swap-leave-active {
  transition:
    opacity var(--dur, 0.28s) var(--ease),
    transform var(--dur, 0.28s) var(--ease);
}

.pane-swap-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.pane-swap-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.motion-auto-tabs.is-mobile .auto-tabs-shell {
  grid-template-columns: 1fr;
  gap: 8px;
}

.motion-auto-tabs.is-mobile .tabs-rail {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 5px;
}

.motion-auto-tabs.is-mobile .rail-item {
  padding: 6px 5px 8px;
  text-align: center;
}

.motion-auto-tabs.is-mobile .rail-title {
  font-size: 10.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.motion-auto-tabs.is-mobile .preview-pane {
  min-height: 112px;
  padding: 10px 11px;
}
</style>
