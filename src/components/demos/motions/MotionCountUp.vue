<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  replayTick: { type: Number, default: 0 }
})

const metrics = [
  { target: 99.9, decimals: 1, suffix: '%', label: '系统稳定率', initial: '99.9%' },
  { target: 12800, decimals: 0, suffix: '+', label: '服务企业', initial: '12,800+' },
  { target: 3.5, decimals: 1, suffix: 'x', label: '响应提速', initial: '3.5x' }
]

const displayValues = ref(metrics.map((m) => m.initial))
const rootRef = ref(null)

let rafId = null
let observer = null

function cancelCountAnim() {
  if (rafId !== null && typeof cancelAnimationFrame === 'function') {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function disconnectObserver() {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

function formatMetric(metric, val) {
  const formatted =
    metric.decimals > 0
      ? val.toFixed(metric.decimals)
      : Math.round(val).toLocaleString('en-US')
  return `${formatted}${metric.suffix}`
}

function runCountUp() {
  cancelCountAnim()
  if (typeof requestAnimationFrame !== 'function' || typeof performance === 'undefined') {
    displayValues.value = metrics.map((m) => m.initial)
    return
  }

  const duration = 1000
  const start = performance.now()

  function step(now) {
    const p = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - p, 3)
    displayValues.value = metrics.map((m) => formatMetric(m, m.target * eased))
    if (p < 1) {
      rafId = requestAnimationFrame(step)
    } else {
      rafId = null
    }
  }

  rafId = requestAnimationFrame(step)
}

onMounted(() => {
  if (typeof IntersectionObserver !== 'undefined' && rootRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          runCountUp()
          disconnectObserver()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(rootRef.value)
  }
})

onUnmounted(() => {
  cancelCountAnim()
  disconnectObserver()
})
</script>

<template>
  <div ref="rootRef" class="motion-count-up">
    <span class="stage-badge">1 秒滚到目标值</span>
    <button type="button" class="stage-action" @click.stop="runCountUp">↻ 重播递增</button>
    <div class="demo-count-grid">
      <div v-for="(metric, idx) in metrics" :key="metric.label" class="count-card">
        <div class="count-num">{{ displayValues[idx] }}</div>
        <div class="count-lbl">{{ metric.label }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.motion-count-up {
  width: 100%;
  padding-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-count-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
}

.count-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 6px;
  text-align: center;
}

.count-num {
  font-size: 18px;
  font-weight: 800;
  color: var(--primary);
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
}

.count-lbl {
  font-size: 10.5px;
  color: var(--text-muted);
  margin-top: 4px;
}
</style>
