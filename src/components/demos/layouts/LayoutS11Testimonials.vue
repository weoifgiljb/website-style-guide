<script setup>
defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false }
})

const quotes = [
  {
    avatar: 'L',
    color: '#2563eb',
    quote: '“多账号询盘统一分配后，夜间漏单基本清零。”',
    role: '跨境独立站 · 运营总监',
    metric: '首响提速 3.2x'
  },
  {
    avatar: 'K',
    color: '#0ea5e9',
    quote: '“WhatsApp 群发回传广告归因，投放更精准。”',
    role: 'DTC 出海品牌 · 增长负责人',
    metric: 'ROAS +28%'
  }
]
</script>

<template>
  <div class="layout-s11" :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }">
    <div v-for="item in quotes" :key="item.role" class="tm-card">
      <div class="tm-top">
        <span class="tm-badge">{{ item.metric }}</span>
      </div>
      <p class="tm-quote">{{ item.quote }}</p>
      <div class="tm-user">
        <span class="tm-av" :style="{ backgroundColor: item.color }">{{ item.avatar }}</span>
        <span class="tm-role">{{ item.role }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-s11 {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.tm-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 11px;
  padding: 13px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  box-shadow: var(--shadow-sm);
  min-width: 0;
  box-sizing: border-box;
}

.tm-top {
  display: flex;
  justify-content: flex-end;
}

.tm-badge {
  font-size: 9.5px;
  font-weight: 700;
  color: #047857;
  background: var(--accent-soft);
  border: 1px solid #a7f3d0;
  padding: 2px 7px;
  border-radius: 999px;
}

.tm-quote {
  font-size: 10.5px;
  color: var(--text);
  line-height: 1.45;
  font-weight: 500;
}

.tm-user {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
}

.tm-av {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.tm-role {
  font-size: 9.5px;
  color: var(--text-muted);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout-s11.is-compact {
  gap: 8px;
}

.layout-s11.is-compact .tm-card {
  padding: 8px 9px;
  gap: 6px;
}

.layout-s11.is-compact .tm-quote {
  font-size: 9.5px;
}

.layout-s11.is-mobile {
  grid-template-columns: 1fr;
  gap: 7px;
}

.layout-s11.is-mobile .tm-card {
  padding: 10px 11px;
  gap: 6px;
}

.layout-s11.is-mobile .tm-quote {
  font-size: 10px;
}
</style>
