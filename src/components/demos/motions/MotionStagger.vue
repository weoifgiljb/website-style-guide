<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  replayTick: { type: Number, default: 0 },
  viewport: { type: String, default: 'desktop' }
})

const animKey = ref(0)

const cards = [
  { num: '1', title: '多号聚合', delay: '0s' },
  { num: '2', title: '智能分配', delay: '0.1s' },
  { num: '3', title: '云端留存', delay: '0.2s' }
]

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
  <div class="motion-stagger" :class="{ 'is-mobile': props.viewport === 'mobile' }">
    <span class="stage-badge">错峰节奏</span>
    <button type="button" class="stage-action" @click.stop="replay">↻ 重播</button>
    <div :key="animKey" class="demo-stagger-grid">
      <div
        v-for="card in cards"
        :key="card.num"
        class="stagger-item"
        :style="{ animationDelay: card.delay }"
      >
        <div class="si-ico">{{ card.num }}</div>
        <div class="si-t">{{ card.title }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.motion-stagger {
  width: 100%;
  padding-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-stagger-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
  max-width: 420px;
}

.stagger-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px 10px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  min-width: 0;
  box-sizing: border-box;
  animation: staggerUp var(--dur, 0.28s) var(--ease, cubic-bezier(0.22, 1, 0.36, 1)) both;
}

.si-ico {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  margin: 0 auto 8px;
  display: grid;
  place-items: center;
  font-size: 14px;
  background: var(--primary-soft);
  color: var(--primary);
  font-weight: 700;
  flex-shrink: 0;
}

.si-t {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text);
}

.motion-stagger.is-mobile .demo-stagger-grid {
  grid-template-columns: 1fr;
  gap: 7px;
  max-width: 100%;
}

.motion-stagger.is-mobile .stagger-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border-radius: 10px;
  text-align: left;
}

.motion-stagger.is-mobile .si-ico {
  width: 24px;
  height: 24px;
  margin: 0;
  font-size: 12px;
  border-radius: 7px;
}

.motion-stagger.is-mobile .si-t {
  font-size: 12px;
}

@keyframes staggerUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
