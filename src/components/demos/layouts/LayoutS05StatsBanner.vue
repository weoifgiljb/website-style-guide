<script setup>
defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false }
})

const metrics = [
  { num: '99.9%', label: '消息送达' },
  { num: '3.5x', label: '首响提速' },
  { num: '12,800+', label: '合作企业' }
]
</script>

<template>
  <div class="layout-s05" :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }">
    <div class="ms-title">已助力全球跨境团队持续提效</div>
    <div class="ms-row">
      <div v-for="item in metrics" :key="item.label" class="ms-item">
        <div class="ms-num">{{ item.num }}</div>
        <div class="ms-lbl">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-s05 {
  width: 100%;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  border-radius: 11px;
  padding: 14px 12px;
  color: #ffffff;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.ms-title {
  font-size: 11px;
  color: #bfdbfe;
  margin-bottom: 10px;
  font-weight: 600;
}

.ms-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.ms-item {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  padding: 8px 4px;
}

.ms-num {
  font-size: 15px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
}

.ms-lbl {
  font-size: 9.5px;
  color: #cbd5e1;
  margin-top: 2px;
}

.layout-s05.is-compact {
  padding: 11px 10px;
}

.layout-s05.is-mobile {
  padding: 11px 10px;
}

.layout-s05.is-mobile .ms-row {
  grid-template-columns: 1fr;
  gap: 5px;
}

.layout-s05.is-mobile .ms-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
}

.layout-s05.is-mobile .ms-lbl {
  margin-top: 0;
}
</style>
