<script setup>
import { ref } from 'vue'

const props = defineProps({
  replayTick: { type: Number, default: 0 },
  viewport: { type: String, default: 'desktop' }
})

const openIdx = ref(0)

const faqs = [
  {
    q: '支持扫码还是官方 API 接入？',
    a: '两种方式均支持，可按团队规模自由混用。'
  },
  {
    q: '多个客服能同时管理一个号吗？',
    a: '可以，会话智能分配不串号，记录云端留存。'
  }
]

function toggleItem(idx) {
  openIdx.value = openIdx.value === idx ? -1 : idx
}
</script>

<template>
  <div class="motion-accordion" :class="{ 'is-mobile': props.viewport === 'mobile' }">
    <span class="stage-badge">直接点问题展开</span>
    <div class="demo-acc">
      <div
        v-for="(item, idx) in faqs"
        :key="item.q"
        class="acc-item"
        :class="{ open: openIdx === idx }"
      >
        <button type="button" class="acc-btn" @click.stop="toggleItem(idx)">
          <span class="acc-q-text">{{ item.q }}</span>
          <span class="acc-arrow">▼</span>
        </button>
        <div class="acc-panel">
          <div class="acc-inner">
            <p>{{ item.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.motion-accordion {
  width: 100%;
  padding-top: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-acc {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.acc-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.acc-btn {
  width: 100%;
  border: none;
  background: transparent;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  text-align: left;
}

.acc-q-text {
  min-width: 0;
  line-height: 1.35;
}

.acc-arrow {
  font-size: 11px;
  color: var(--text-muted);
  flex-shrink: 0;
  transition:
    transform var(--dur, 0.28s) var(--ease, cubic-bezier(0.22, 1, 0.36, 1)),
    color var(--dur, 0.28s) ease;
}

.acc-item.open .acc-arrow {
  transform: rotate(180deg);
  color: var(--primary);
}

.acc-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--dur, 0.28s) var(--ease, cubic-bezier(0.22, 1, 0.36, 1));
}

.acc-item.open .acc-panel {
  grid-template-rows: 1fr;
}

.acc-inner {
  overflow: hidden;
  font-size: 12px;
  color: var(--text-secondary);
  padding: 0 14px;
  line-height: 1.45;
}

.acc-inner p {
  padding: 0 0 10px;
}

.motion-accordion.is-mobile .demo-acc {
  max-width: 100%;
  gap: 6px;
}

.motion-accordion.is-mobile .acc-btn {
  padding: 8px 10px;
  font-size: 12px;
}

.motion-accordion.is-mobile .acc-inner {
  font-size: 11.5px;
  padding: 0 10px;
}

.motion-accordion.is-mobile .acc-inner p {
  padding: 0 0 8px;
}
</style>
