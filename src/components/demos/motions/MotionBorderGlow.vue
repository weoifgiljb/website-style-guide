<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  replayTick: { type: Number, default: 0 },
  viewport: { type: String, default: 'desktop' }
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
  }, 950)
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
  <div class="motion-border-glow" :class="{ 'is-mobile': props.viewport === 'mobile' }">
    <span class="stage-badge">{{
      props.viewport === 'mobile' ? '主按钮扫光保留' : '悬停按钮或卡片'
    }}</span>
    <button type="button" class="stage-action" @click.stop="triggerDemo">模拟一次</button>
    <div class="demo-glow-wrap">
      <button
        type="button"
        class="shimmer-btn"
        :class="{ 'is-demo': isDemo }"
        @click.stop="triggerDemo"
      >
        开始免费体验 →
      </button>
      <div class="glow-card" :class="{ 'is-demo': isDemo }" @click.stop="triggerDemo">
        企业版方案 · 悬停亮起品牌色边框光
      </div>
    </div>
  </div>
</template>

<style scoped>
.motion-border-glow {
  width: 100%;
  padding-top: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-glow-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 380px;
}

.shimmer-btn {
  position: relative;
  overflow: hidden;
  border: none;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  color: #ffffff;
  font-size: 13.5px;
  font-weight: 600;
  padding: 10px 24px;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 6px 16px -4px rgba(37, 99, 235, 0.45);
  transition: transform 0.2s ease;
  box-sizing: border-box;
}

.shimmer-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -120%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    105deg,
    transparent 20%,
    rgba(255, 255, 255, 0.55) 50%,
    transparent 80%
  );
  transition: left calc(var(--dur, 0.28s) * 1.4) ease;
}

.shimmer-btn:hover::after,
.shimmer-btn.is-demo::after {
  left: 140%;
}

.glow-card {
  position: relative;
  width: 100%;
  max-width: 320px;
  padding: 11px 16px;
  border-radius: 10px;
  background: var(--surface);
  border: 1.5px solid var(--border);
  font-size: 12.5px;
  color: var(--text-secondary);
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  transition:
    border-color var(--dur, 0.28s) ease,
    box-shadow var(--dur, 0.28s) ease,
    color var(--dur, 0.28s) ease;
}

.glow-card:hover,
.glow-card.is-demo {
  border-color: var(--primary);
  box-shadow:
    0 0 0 4px rgba(37, 99, 235, 0.14),
    0 8px 20px -6px rgba(37, 99, 235, 0.28);
  color: var(--text);
}

.motion-border-glow.is-mobile .demo-glow-wrap {
  max-width: 100%;
  gap: 9px;
}

.motion-border-glow.is-mobile .shimmer-btn {
  width: 100%;
  padding: 9px 14px;
  font-size: 12.5px;
}

.motion-border-glow.is-mobile .glow-card {
  max-width: 100%;
  padding: 8px 10px;
  font-size: 11.5px;
}
</style>
