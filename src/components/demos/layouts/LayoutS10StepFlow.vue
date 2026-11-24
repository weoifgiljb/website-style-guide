<script setup>
defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false }
})

const steps = [
  { no: '01', title: '扫码/API 接入', desc: '3 分钟绑定多社媒账号' },
  { no: '02', title: 'AI 自动分流接待', desc: '全天候识别意图秒回' },
  { no: '03', title: '标签回传再营销', desc: '沉淀高潜客群二次触达' }
]
</script>

<template>
  <div class="layout-s10" :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }">
    <template v-for="(step, idx) in steps" :key="step.no">
      <div class="step-card">
        <span class="step-no">{{ step.no }}</span>
        <div class="step-body">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-desc">{{ step.desc }}</div>
        </div>
      </div>
      <span v-if="idx < steps.length - 1" class="step-arrow" aria-hidden="true">→</span>
    </template>
  </div>
</template>

<style scoped>
.layout-s10 {
  width: 100%;
  display: flex;
  align-items: stretch;
  gap: 5px;
}

.step-card {
  flex: 1;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 9px 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  box-shadow: var(--shadow-sm);
}

.step-no {
  align-self: flex-start;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 9.5px;
  font-weight: 800;
  color: var(--primary);
  background: var(--primary-soft);
  border: 1px solid #bfdbfe;
  padding: 1px 6px;
  border-radius: 999px;
}

.step-body { display: flex; flex-direction: column; gap: 2px; }
.step-title { font-size: 10px; font-weight: 700; color: var(--text); line-height: 1.3; }
.step-desc { font-size: 8.5px; color: var(--text-muted); line-height: 1.35; }

.step-arrow {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: #93c5fd;
  flex-shrink: 0;
}

.layout-s10.is-compact .step-card { padding: 8px 7px; }

.layout-s10.is-mobile {
  position: relative;
  flex-direction: column;
  gap: 6px;
  padding-left: 4px;
}

.layout-s10.is-mobile::before {
  content: '';
  position: absolute;
  left: 25px;
  top: 14px;
  bottom: 14px;
  width: 2px;
  background: #bfdbfe;
  z-index: 0;
}

.layout-s10.is-mobile .step-arrow { display: none; }

.layout-s10.is-mobile .step-card {
  position: relative;
  z-index: 1;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 7px 9px;
}
</style>
