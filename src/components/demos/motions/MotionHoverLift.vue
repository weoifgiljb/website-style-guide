<script setup>
import { ref, onUnmounted } from 'vue'

defineProps({
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
  }, 900)
}

onUnmounted(() => {
  clearDemoTimer()
})
</script>

<template>
  <div class="motion-hover-lift">
    <span class="stage-badge">鼠标移上来体验</span>
    <button type="button" class="stage-action" @click.stop="triggerDemo">模拟一次</button>
    <div class="demo-lift-card" :class="{ 'is-demo': isDemo }" @click.stop>
      <div class="lift-title">AI 智能客服回复</div>
      <div class="lift-desc">鼠标移上去，卡片轻轻抬起并浮出柔和阴影，反馈明确不突兀。</div>
    </div>
  </div>
</template>

<style scoped>
.motion-hover-lift {
  width: 100%;
  padding-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-lift-card {
  width: 230px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition:
    transform var(--dur, 0.28s) var(--ease, cubic-bezier(0.22, 1, 0.36, 1)),
    box-shadow var(--dur, 0.28s) var(--ease, cubic-bezier(0.22, 1, 0.36, 1)),
    border-color var(--dur, 0.28s) ease;
}

.demo-lift-card:hover,
.demo-lift-card.is-demo {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
  border-color: #93c5fd;
}

.lift-title {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
}

.lift-desc {
  font-size: 11.5px;
  color: var(--text-muted);
}
</style>
