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
  }, 900)
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
  <div class="motion-hover-lift" :class="{ 'is-mobile': props.viewport === 'mobile' }">
    <span class="stage-badge">{{
      props.viewport === 'mobile' ? '手机端轻触微浮' : '鼠标移上来体验'
    }}</span>
    <button type="button" class="stage-action" @click.stop="triggerDemo">模拟一次</button>
    <div class="demo-lift-card" :class="{ 'is-demo': isDemo }" @click.stop="triggerDemo">
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
  width: 100%;
  max-width: 380px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px 18px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  box-sizing: border-box;
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
  font-size: 14.5px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 5px;
}

.lift-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.45;
}

.motion-hover-lift.is-mobile .demo-lift-card {
  max-width: 100%;
  padding: 12px 14px;
}

.motion-hover-lift.is-mobile .lift-title {
  font-size: 13px;
  margin-bottom: 4px;
}

.motion-hover-lift.is-mobile .lift-desc {
  font-size: 11.5px;
}
</style>
