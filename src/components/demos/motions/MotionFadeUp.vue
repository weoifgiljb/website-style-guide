<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  replayTick: { type: Number, default: 0 }
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
  <div class="motion-fade-up">
    <span class="stage-badge">进场演示</span>
    <button type="button" class="stage-action" @click.stop="replay">↻ 重播</button>
    <div :key="animKey" class="demo-fade-box anim-fade-up">
      <span class="df-tag">最百搭 · 最显高级</span>
      <div class="df-h">多渠道客户消息一站式聚合</div>
      <div class="df-p">从透明慢慢变清晰，同时向上轻滑落位。</div>
    </div>
  </div>
</template>

<style scoped>
.motion-fade-up {
  width: 100%;
  padding-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-fade-box {
  width: 100%;
  max-width: 260px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: var(--shadow-sm);
}

.df-tag {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  color: var(--primary);
  background: var(--primary-soft);
  padding: 2px 7px;
  border-radius: 999px;
  margin-bottom: 6px;
}

.df-h {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
}

.df-p {
  font-size: 11.5px;
  color: var(--text-muted);
}

.anim-fade-up {
  animation: fadeUp var(--dur, 0.28s) var(--ease, cubic-bezier(0.22, 1, 0.36, 1)) both;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
