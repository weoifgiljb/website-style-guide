<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'

const props = defineProps({
  replayTick: { type: Number, default: 0 },
  viewport: { type: String, default: 'desktop' }
})

const offset = ref(0)
let rafId = null

function cancelAuto() {
  if (rafId !== null && typeof cancelAnimationFrame === 'function') {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

const factor = computed(() => (props.viewport === 'mobile' ? 0.5 : 1))

const orbStyle = computed(() => ({
  transform: `translate(${offset.value * 0.38 * factor.value}px, ${offset.value * 0.14 * factor.value}px)`
}))

const tagStyle = computed(() => ({
  transform: `translate(${-offset.value * 0.28 * factor.value}px, ${-offset.value * 0.08 * factor.value}px)`
}))

const frontStyle = computed(() => ({
  transform: `translate(${offset.value * 0.12 * factor.value}px, 0px)`
}))

function runAutoParallax() {
  cancelAuto()
  if (typeof requestAnimationFrame !== 'function' || typeof performance === 'undefined') {
    return
  }
  const start = performance.now()
  const total = 1600

  function frame(now) {
    const p = Math.min(1, (now - start) / total)
    offset.value = Math.round(Math.sin(p * Math.PI * 2) * 90)
    if (p < 1) {
      rafId = requestAnimationFrame(frame)
    } else {
      offset.value = 0
      rafId = null
    }
  }

  rafId = requestAnimationFrame(frame)
}

watch(
  () => props.replayTick,
  () => {
    runAutoParallax()
  }
)

onUnmounted(() => {
  cancelAuto()
})
</script>

<template>
  <div class="motion-parallax" :class="{ 'is-mobile': props.viewport === 'mobile' }">
    <span class="stage-badge">{{
      props.viewport === 'mobile' ? '📱 手机端自动减弱视差幅度' : '拖动滑块模拟滚动'
    }}</span>
    <button type="button" class="stage-action" @click.stop="runAutoParallax">▶ 自动演示</button>
    <div class="demo-parallax-box">
      <div class="px-bg-orb" :style="orbStyle"></div>
      <div class="px-mid-tag" :style="tagStyle">中景标签 · 较快</div>
      <div class="px-front-card" :style="frontStyle">前景主卡片 · 慢速稳重</div>
      <input
        v-model.number="offset"
        class="px-slider"
        type="range"
        min="-100"
        max="100"
        aria-label="模拟视差滚动"
        @click.stop
        @pointerdown.stop="cancelAuto"
        @mousedown.stop="cancelAuto"
        @touchstart.stop="cancelAuto"
        @input="cancelAuto"
      />
    </div>
  </div>
</template>

<style scoped>
.motion-parallax {
  width: 100%;
  padding-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-parallax-box {
  width: 100%;
  max-width: 430px;
  height: 136px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.px-bg-orb {
  position: absolute;
  width: 118px;
  height: 118px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.55), transparent 70%);
  left: 16%;
  top: 10%;
  transition: transform calc(var(--dur, 0.28s) * 0.55) ease-out;
}

.px-mid-tag {
  position: absolute;
  right: 16px;
  top: 14px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(4px);
  color: #e0f2fe;
  font-size: 11px;
  padding: 3px 9px;
  border-radius: 999px;
  transition: transform calc(var(--dur, 0.28s) * 0.55) ease-out;
}

.px-front-card {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.96);
  color: var(--text);
  padding: 11px 18px;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 700;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
  transition: transform calc(var(--dur, 0.28s) * 0.55) ease-out;
}

.px-slider {
  position: absolute;
  bottom: 9px;
  left: 50%;
  transform: translateX(-50%);
  width: 156px;
  z-index: 5;
  accent-color: #60a5fa;
  cursor: pointer;
}

.motion-parallax.is-mobile .demo-parallax-box {
  max-width: 100%;
  height: 122px;
}

.motion-parallax.is-mobile .px-mid-tag {
  right: 10px;
  top: 10px;
  font-size: 10px;
  padding: 2px 7px;
}

.motion-parallax.is-mobile .px-front-card {
  padding: 8px 12px;
  font-size: 11.5px;
}

.motion-parallax.is-mobile .px-slider {
  width: 128px;
  bottom: 7px;
}
</style>
