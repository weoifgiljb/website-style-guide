<script setup>
defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false }
})

const channels = [
  { name: 'WhatsApp', color: '#22c55e' },
  { name: 'Messenger', color: '#2563eb' },
  { name: 'Instagram', color: '#ec4899' },
  { name: 'Telegram', color: '#0ea5e9' },
  { name: 'LINE', color: '#10b981' },
  { name: 'Shopify', color: '#111827' }
]
</script>

<template>
  <div class="layout-s04" :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }">
    <div v-for="ch in channels" :key="ch.name" class="mch-cell">
      <span class="logo-dot" :style="{ backgroundColor: ch.color }"></span>
      <span class="mch-name">{{ ch.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.layout-s04 {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
}

.mch-cell {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 9px;
  padding: 9px 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 10.5px;
  font-weight: 600;
  color: var(--text);
  box-shadow: var(--shadow-sm);
  white-space: nowrap;
}

.logo-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.mch-name {
  line-height: 1.2;
}

.layout-s04.is-compact .mch-cell {
  padding: 8px 6px;
}

.layout-s04.is-mobile {
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}

.layout-s04.is-mobile .mch-cell {
  justify-content: flex-start;
  padding: 8px 10px;
}
</style>
