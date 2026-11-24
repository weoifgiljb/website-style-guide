<script setup>
import { ref } from 'vue'

defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false }
})

const openIndex = ref(0)

const faqs = [
  { q: '接入官方 WhatsApp API 会封号吗？', a: '采用 Meta 官方授权 BSP 通道，合规群发稳定防封。' },
  { q: '原有聊天记录与标签能否平滑迁移？', a: '支持一键导入历史联系人、会话标签与快捷话术库。' }
]

function toggleFaq(idx) {
  openIndex.value = openIndex.value === idx ? -1 : idx
}
</script>

<template>
  <div class="layout-s14" :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }">
    <div class="faq-left">
      <div class="faq-title">常见问题解答</div>
      <div class="faq-sub">还有疑问？专属顾问在线答疑</div>
      <span class="faq-cta">联系顾问 →</span>
    </div>
    <div class="faq-right">
      <div
        v-for="(item, idx) in faqs"
        :key="item.q"
        class="faq-item"
        :class="{ open: openIndex === idx }"
      >
        <button type="button" class="faq-q" @click.stop="toggleFaq(idx)">
          <span class="faq-q-txt">{{ item.q }}</span>
          <i>{{ openIndex === idx ? '−' : '+' }}</i>
        </button>
        <div v-if="openIndex === idx" class="faq-a">{{ item.a }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-s14 {
  width: 100%;
  display: grid;
  grid-template-columns: 0.95fr 1.45fr;
  gap: 10px;
  align-items: start;
}

.faq-left {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 11px;
  padding: 13px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: var(--shadow-sm);
  min-width: 0;
  box-sizing: border-box;
}

.faq-title {
  font-size: 12px;
  font-weight: 800;
  color: var(--text);
}

.faq-sub {
  font-size: 9.5px;
  color: var(--text-muted);
  line-height: 1.4;
}

.faq-cta {
  align-self: flex-start;
  margin-top: 2px;
  font-size: 9.5px;
  font-weight: 700;
  color: var(--primary);
  background: var(--primary-soft);
  padding: 3px 9px;
  border-radius: 999px;
}

.faq-right {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
}

.faq-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 9px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.faq-item.open {
  border-color: #93c5fd;
}

.faq-q {
  width: 100%;
  border: none;
  background: transparent;
  padding: 9px 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 10.5px;
  font-weight: 700;
  color: var(--text);
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;
}

.faq-q-txt {
  min-width: 0;
  line-height: 1.35;
}

.faq-q i {
  font-style: normal;
  color: var(--primary);
  font-weight: 800;
  flex-shrink: 0;
}

.faq-a {
  padding: 0 11px 9px;
  font-size: 9.5px;
  color: var(--text-secondary);
  line-height: 1.45;
}

.layout-s14.is-compact {
  gap: 8px;
}

.layout-s14.is-compact .faq-left {
  padding: 9px;
}

.layout-s14.is-compact .faq-title {
  font-size: 10.5px;
}

.layout-s14.is-compact .faq-q {
  padding: 6px 8px;
  font-size: 9px;
}

.layout-s14.is-compact .faq-a {
  padding: 0 8px 7px;
  font-size: 8.5px;
}

.layout-s14.is-mobile {
  grid-template-columns: 1fr;
  gap: 7px;
}

.layout-s14.is-mobile .faq-left {
  padding: 10px 11px;
  gap: 4px;
}

.layout-s14.is-mobile .faq-title {
  font-size: 11px;
}

.layout-s14.is-mobile .faq-q {
  padding: 7px 9px;
  font-size: 9.5px;
}

.layout-s14.is-mobile .faq-a {
  padding: 0 9px 8px;
  font-size: 9px;
}
</style>
