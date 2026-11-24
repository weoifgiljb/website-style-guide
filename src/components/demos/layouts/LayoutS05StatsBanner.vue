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
  border-radius: 12px;
  padding: 16px 16px;
  color: #ffffff;
  text-align: center;
  box-shadow: var(--shadow-sm);
  box-sizing: border-box;
}

.ms-title {
  font-size: 12px;
  color: #bfdbfe;
  margin-bottom: 12px;
  font-weight: 600;
}

.ms-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;
}

.ms-item {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 9px;
  padding: 10px 6px;
  min-width: 0;
  box-sizing: border-box;
}

.ms-num {
  font-size: 17px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
}

.ms-lbl {
  font-size: 10.5px;
  color: #cbd5e1;
  margin-top: 3px;
}

.layout-s05.is-compact {
  padding: 11px 10px;
}

.layout-s05.is-compact .ms-title {
  font-size: 11px;
  margin-bottom: 9px;
}

.layout-s05.is-compact .ms-item {
  padding: 8px 4px;
}

.layout-s05.is-compact .ms-num {
  font-size: 15px;
}

.layout-s05.is-mobile {
  padding: 12px 11px;
}

.layout-s05.is-mobile .ms-title {
  font-size: 11px;
  margin-bottom: 8px;
}

.layout-s05.is-mobile .ms-row {
  grid-template-columns: 1fr;
  gap: 6px;
}

.layout-s05.is-mobile .ms-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 10px;
}

.layout-s05.is-mobile .ms-num {
  font-size: 14.5px;
}

.layout-s05.is-mobile .ms-lbl {
  font-size: 10px;
  margin-top: 0;
}
</style>
