<script setup>
defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false }
})

const cards = [
  { icon: '⚡', label: '秒级响应' },
  { icon: '🔒', label: '官方防封' },
  { icon: '📈', label: '转化归因' }
]
</script>

<template>
  <div class="layout-s02" :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }">
    <div v-for="card in cards" :key="card.label" class="m3-card">
      <div class="m3-ico">{{ card.icon }}</div>
      <div class="m3-body">
        <div class="m3-title-row">
          <span class="m3-label">{{ card.label }}</span>
          <span class="m3-t"></span>
        </div>
        <div class="m3-l"></div>
        <div class="m3-l short"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-s02 {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.m3-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: var(--shadow-sm);
}

.m3-ico {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: var(--primary-soft);
  color: var(--primary);
  display: grid;
  place-items: center;
  font-size: 12px;
  flex-shrink: 0;
}

.m3-body {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
}

.m3-title-row {
  display: flex;
  align-items: center;
  gap: 5px;
}

.m3-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
}

.m3-t {
  height: 7px;
  flex: 1;
  max-width: 36px;
  border-radius: 3px;
  background: #1e293b;
}

.m3-l {
  height: 5px;
  width: 100%;
  border-radius: 3px;
  background: var(--border-strong);
}

.m3-l.short {
  width: 70%;
}

.layout-s02.is-compact .m3-card {
  padding: 8px 7px;
}

.layout-s02.is-mobile {
  grid-template-columns: 1fr;
  gap: 6px;
}

.layout-s02.is-mobile .m3-card {
  flex-direction: row;
  align-items: center;
  padding: 8px 10px;
  gap: 9px;
}
</style>
