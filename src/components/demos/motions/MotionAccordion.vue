<script setup>
import { ref } from 'vue'

defineProps({
  replayTick: { type: Number, default: 0 }
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
  <div class="motion-accordion">
    <span class="stage-badge">直接点问题展开</span>
    <div class="demo-acc">
      <div
        v-for="(item, idx) in faqs"
        :key="item.q"
        class="acc-item"
        :class="{ open: openIdx === idx }"
      >
        <button type="button" class="acc-btn" @click.stop="toggleItem(idx)">
          <span>{{ item.q }}</span>
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
  max-width: 290px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.acc-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 9px;
  overflow: hidden;
}

.acc-btn {
  width: 100%;
  border: none;
  background: transparent;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  text-align: left;
}

.acc-arrow {
  font-size: 11px;
  color: var(--text-muted);
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
  font-size: 11.5px;
  color: var(--text-secondary);
  padding: 0 12px;
}

.acc-inner p {
  padding: 0 0 9px;
}
</style>
