<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  replayTick: { type: Number, default: 0 }
})

const isDemo = ref(false)
let demoTimer = null

function clearDemoTimer() {
  if (demoTimer !== null) {
    clearTimeout(demoTimer)
    demoTimer = null
  }
}

function triggerDemo() {
  clearDemoTimer()
  isDemo.value = true
  demoTimer = setTimeout(() => {
    isDemo.value = false
    demoTimer = null
  }, 1100)
}

watch(
  () => props.replayTick,
  () => {
    triggerDemo()
  }
)

onUnmounted(() => {
  clearDemoTimer()
})
</script>

<template>
  <div class="pitfall-amplitude">
    <span class="stage-badge">悬停或点对比体验</span>
    <button type="button" class="stage-action" @click.stop="triggerDemo">
      ▶ 同时触发对比
    </button>

    <div class="compare-grid">
      <div class="amp-card amp-good" :class="{ 'is-demo': isDemo }" @click.stop="triggerDemo">
        <span class="amp-tag tag-good">✅ 推荐 · 0.28s 柔和微浮</span>
        <div class="amp-title">全渠道客服聚合</div>
        <div class="amp-desc">轻抬 -4px + 柔和投影，稳重耐看</div>
      </div>

      <div class="amp-card amp-bad" :class="{ 'is-demo': isDemo }" @click.stop="triggerDemo">
        <span class="amp-tag tag-bad">❌ 反例 · 0.9s 大幅乱跳</span>
        <div class="amp-title">全渠道客服聚合</div>
        <div class="amp-desc">猛弹歪斜 + 拖沓回弹，廉价晃眼</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pitfall-amplitude {
  width: 100%;
  padding-top: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.compare-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.amp-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}

.amp-tag {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 999px;
  margin-bottom: 6px;
  line-height: 1.3;
}

.tag-good {
  background: var(--accent-soft);
  color: #047857;
  border: 1px solid #a7f3d0;
}

.tag-bad {
  background: var(--danger-soft);
  color: #b91c1c;
  border: 1px solid #fecaca;
}

.amp-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 3px;
}

.amp-desc {
  font-size: 10.5px;
  color: var(--text-muted);
  line-height: 1.4;
}

.amp-good {
  transition:
    transform var(--dur, 0.28s) var(--ease, cubic-bezier(0.22, 1, 0.36, 1)),
    box-shadow var(--dur, 0.28s) var(--ease, cubic-bezier(0.22, 1, 0.36, 1)),
    border-color var(--dur, 0.28s) ease;
}

.amp-good:hover,
.amp-good.is-demo {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  border-color: #6ee7b7;
}

.amp-bad:hover,
.amp-bad.is-demo {
  border-color: #f87171;
  box-shadow: 0 18px 28px -8px rgba(239, 68, 68, 0.32);
  animation: wildBounce 0.9s cubic-bezier(0.34, 1.85, 0.42, 0.95) both;
}

@keyframes wildBounce {
  0% {
    transform: translateY(0) scale(1) rotate(0deg);
  }
  28% {
    transform: translateY(-16px) scale(1.08) rotate(-2deg);
  }
  52% {
    transform: translateY(5px) scale(0.95) rotate(2deg);
  }
  74% {
    transform: translateY(-9px) scale(1.04) rotate(-1.5deg);
  }
  90% {
    transform: translateY(2px) scale(0.99) rotate(0.6deg);
  }
  100% {
    transform: translateY(-4px) scale(1.02) rotate(0deg);
  }
}
</style>
