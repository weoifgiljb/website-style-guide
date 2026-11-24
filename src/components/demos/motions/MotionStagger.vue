<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  replayTick: { type: Number, default: 0 }
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
  <div class="motion-stagger">
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
  gap: 8px;
  width: 100%;
}

.stagger-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 8px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  animation: staggerUp var(--dur, 0.28s) var(--ease, cubic-bezier(0.22, 1, 0.36, 1)) both;
}

.si-ico {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  margin: 0 auto 6px;
  display: grid;
  place-items: center;
  font-size: 13px;
  background: var(--primary-soft);
  color: var(--primary);
  font-weight: 700;
}

.si-t {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text);
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
