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
  gap: 10px;
}

.m3-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 11px;
  padding: 13px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: var(--shadow-sm);
  min-width: 0;
  box-sizing: border-box;
}

.m3-ico {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: var(--primary-soft);
  color: var(--primary);
  display: grid;
  place-items: center;
  font-size: 13.5px;
  flex-shrink: 0;
}

.m3-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
}

.m3-title-row {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.m3-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
}

.m3-t {
  height: 7px;
  flex: 1;
  min-width: 0;
  max-width: 40px;
  border-radius: 3px;
  background: #1e293b;
}

.m3-l {
  height: 5.5px;
  width: 100%;
  border-radius: 3px;
  background: var(--border-strong);
}

.m3-l.short {
  width: 70%;
}

.layout-s02.is-compact {
  gap: 8px;
}

.layout-s02.is-compact .m3-card {
  padding: 9px 8px;
  gap: 6px;
}

.layout-s02.is-compact .m3-ico {
  width: 24px;
  height: 24px;
  font-size: 12px;
}

.layout-s02.is-compact .m3-label {
  font-size: 10px;
}

.layout-s02.is-mobile {
  grid-template-columns: 1fr;
  gap: 6px;
}

.layout-s02.is-mobile .m3-card {
  flex-direction: row;
  align-items: center;
  padding: 9px 11px;
  gap: 10px;
}

.layout-s02.is-mobile .m3-ico {
  width: 24px;
  height: 24px;
  font-size: 12px;
}

.layout-s02.is-mobile .m3-label {
  font-size: 10.5px;
}
</style>
