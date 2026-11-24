<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  replayTick: { type: Number, default: 0 },
  viewport: { type: String, default: 'desktop' }
})

const animKey = ref(0)

function replay() {
  animKey.value += 1
}

watch(
  () => props.replayTick,
  () => {
    animKey.value += 1
  }
)
</script>

<template>
  <div class="motion-zoom-in" :class="{ 'is-mobile': props.viewport === 'mobile' }">
    <span class="stage-badge">轻弹落位</span>
    <button type="button" class="stage-action" @click.stop="replay">↻ 重播</button>
    <div :key="animKey" class="demo-zoom-modal anim-zoom-in">
      <div class="zm-val">+38%</div>
      <div class="zm-sub">广告点击后的首响转化提升</div>
    </div>
  </div>
</template>

<style scoped>
.motion-zoom-in {
  width: 100%;
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-zoom-modal {
  width: 100%;
  max-width: 320px;
  background: var(--surface);
  border: 1px solid #bfdbfe;
  border-radius: 14px;
  padding: 18px 22px;
  box-shadow: 0 12px 26px -8px rgba(37, 99, 235, 0.22);
  text-align: center;
  box-sizing: border-box;
}

.zm-val {
  font-size: 26px;
  font-weight: 800;
  color: var(--primary);
  line-height: 1.2;
}

.zm-sub {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 5px;
}

.motion-zoom-in.is-mobile .demo-zoom-modal {
  max-width: 100%;
  padding: 14px;
}

.motion-zoom-in.is-mobile .zm-val {
  font-size: 22px;
}

.motion-zoom-in.is-mobile .zm-sub {
  font-size: 11.5px;
}

.anim-zoom-in {
  animation: zoomIn var(--dur, 0.28s) cubic-bezier(0.34, 1.4, 0.64, 1) both;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.86);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
