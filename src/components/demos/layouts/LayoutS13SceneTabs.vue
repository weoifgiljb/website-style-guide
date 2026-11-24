<script setup>
import { ref, computed } from 'vue'

defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false }
})

const activeTab = ref(0)

const roles = [
  { role: '一线客服', title: 'AI 辅助草稿 + 实时翻译', desc: '告别切屏查词，单人日接待量翻倍', metric: '+120%', kpi: '人效提升' },
  { role: '客服主管', title: '智能分流 + 会话质检看板', desc: '实时监控首响与满意度，漏单自动预警', metric: '18s', kpi: '平均首响' },
  { role: '业务负责人', title: '广告归因 + 客户资产沉淀', desc: '打通投放与复购链路，清晰核算渠道 ROI', metric: '+32%', kpi: '复购转化' }
]

const current = computed(() => roles[activeTab.value])
</script>

<template>
  <div class="layout-s13" :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }">
    <div class="sc-tabs">
      <button
        v-for="(item, idx) in roles"
        :key="item.role"
        type="button"
        :class="{ active: activeTab === idx }"
        @click.stop="activeTab = idx"
      >
        {{ item.role }}
      </button>
    </div>
    <div class="sc-panel">
      <div class="sc-copy">
        <div class="sc-title">{{ current.title }}</div>
        <div class="sc-desc">{{ current.desc }}</div>
      </div>
      <div class="sc-metric">
        <div class="sc-num">{{ current.metric }}</div>
        <div class="sc-kpi">{{ current.kpi }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-s13 {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.sc-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
  background: var(--surface-soft);
  padding: 4px;
  border-radius: 9px;
  border: 1px solid var(--border);
  box-sizing: border-box;
}

.sc-tabs button {
  border: none;
  background: transparent;
  font-size: 10.5px;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 5px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.18s ease;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sc-tabs button.active {
  background: var(--surface);
  color: var(--primary);
  box-shadow: var(--shadow-sm);
}

.sc-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 11px;
  padding: 13px 15px;
  display: grid;
  grid-template-columns: 1.45fr 0.85fr;
  gap: 12px;
  align-items: center;
  box-shadow: var(--shadow-sm);
  box-sizing: border-box;
}

.sc-copy {
  min-width: 0;
}

.sc-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
}

.sc-desc {
  font-size: 10px;
  color: var(--text-secondary);
  line-height: 1.45;
}

.sc-metric {
  background: var(--primary-soft);
  border: 1px solid #bfdbfe;
  border-radius: 9px;
  padding: 9px 8px;
  text-align: center;
  min-width: 0;
}

.sc-num {
  font-size: 16px;
  font-weight: 800;
  color: var(--primary);
  line-height: 1.2;
}

.sc-kpi {
  font-size: 9.5px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.layout-s13.is-compact {
  gap: 7px;
}

.layout-s13.is-compact .sc-panel {
  padding: 10px;
  gap: 8px;
}

.layout-s13.is-compact .sc-title {
  font-size: 10.5px;
}

.layout-s13.is-compact .sc-num {
  font-size: 14px;
}

.layout-s13.is-mobile {
  gap: 7px;
}

.layout-s13.is-mobile .sc-tabs {
  gap: 4px;
  padding: 3px;
}

.layout-s13.is-mobile .sc-tabs button {
  font-size: 9.5px;
  padding: 4px 4px;
}

.layout-s13.is-mobile .sc-panel {
  grid-template-columns: 1fr;
  padding: 10px 11px;
  gap: 8px;
}

.layout-s13.is-mobile .sc-title {
  font-size: 11px;
}

.layout-s13.is-mobile .sc-desc {
  font-size: 9.5px;
}

.layout-s13.is-mobile .sc-metric {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
}

.layout-s13.is-mobile .sc-num {
  font-size: 14px;
}

.layout-s13.is-mobile .sc-kpi {
  margin-top: 0;
}
</style>
