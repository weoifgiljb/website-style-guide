<script setup>
import { ref, computed } from 'vue'

defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false }
})

const billing = ref('yearly')
const plans = computed(() => [
  { name: '基础版', price: billing.value === 'yearly' ? '$23' : '$29', desc: '初创小团队', featured: false },
  { name: '专业版', price: billing.value === 'yearly' ? '$63' : '$79', desc: 'AI + 全渠道协同', featured: true },
  { name: '企业版', price: billing.value === 'yearly' ? '$159' : '$199', desc: '定制权限与专享', featured: false }
])
</script>

<template>
  <div class="layout-s12" :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }">
    <div class="pr-toggle">
      <button type="button" :class="{ active: billing === 'monthly' }" @click.stop="billing = 'monthly'">月付</button>
      <button type="button" :class="{ active: billing === 'yearly' }" @click.stop="billing = 'yearly'">年付 · 省 20%</button>
    </div>
    <div class="pr-grid">
      <div v-for="plan in plans" :key="plan.name" class="pr-card" :class="{ 'is-featured': plan.featured }">
        <span v-if="plan.featured" class="pr-rec">推荐</span>
        <div class="pr-name">{{ plan.name }}</div>
        <div class="pr-price">{{ plan.price }}<span>/月</span></div>
        <div class="pr-desc">{{ plan.desc }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-s12 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.pr-toggle {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  background: #e2e8f0;
  padding: 3px;
  border-radius: 999px;
  gap: 3px;
}

.pr-toggle button {
  border: none;
  background: transparent;
  font-size: 10px;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 3px 10px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.18s ease;
}

.pr-toggle button.active {
  background: var(--surface);
  color: var(--primary);
  box-shadow: var(--shadow-sm);
}

.pr-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;
}

.pr-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 10px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  min-width: 0;
  box-sizing: border-box;
}

.pr-card.is-featured {
  border-color: var(--primary);
  background: linear-gradient(180deg, #eff6ff 0%, #ffffff 100%);
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.18);
}

.pr-rec {
  position: absolute;
  top: -7px;
  right: 8px;
  font-size: 8.5px;
  font-weight: 700;
  background: var(--primary);
  color: #ffffff;
  padding: 1px 6px;
  border-radius: 999px;
}

.pr-name {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--text);
}

.pr-price {
  font-size: 15px;
  font-weight: 800;
  color: var(--text);
  line-height: 1.25;
  margin: 4px 0;
}

.pr-price span {
  font-size: 9px;
  font-weight: 500;
  color: var(--text-muted);
}

.pr-desc {
  font-size: 9px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.layout-s12.is-compact {
  gap: 7px;
}

.layout-s12.is-compact .pr-card {
  padding: 8px 6px;
}

.layout-s12.is-compact .pr-price {
  font-size: 13px;
  margin: 2px 0;
}

.layout-s12.is-mobile {
  gap: 8px;
}

.layout-s12.is-mobile .pr-toggle button {
  font-size: 9.5px;
  padding: 3px 8px;
}

.layout-s12.is-mobile .pr-grid {
  grid-template-columns: 1fr;
  gap: 9px;
}

.layout-s12.is-mobile .pr-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 8px 10px;
  text-align: left;
}

.layout-s12.is-mobile .pr-name {
  flex-shrink: 0;
}

.layout-s12.is-mobile .pr-price {
  font-size: 13.5px;
  margin: 0;
  flex-shrink: 0;
}

.layout-s12.is-mobile .pr-desc {
  min-width: 0;
}
</style>
