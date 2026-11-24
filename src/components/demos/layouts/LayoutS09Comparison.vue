<script setup>
defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false }
})

const beforePoints = ['消息漏回 · 响应滞后', '账号易封 · 频繁切号', '数据割裂 · 难算投产']
const afterPoints = ['一屏统管全渠道消息', '官方 API 稳定防封号', '转化可归因闭环追踪']
</script>

<template>
  <div class="layout-s09" :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }">
    <div class="cmp-card is-before">
      <div class="cmp-head">❌ 传统多开网页</div>
      <ul class="cmp-list">
        <li v-for="pt in beforePoints" :key="pt">
          <span class="cmp-dot bad"></span><span>{{ pt }}</span>
        </li>
      </ul>
    </div>
    <div class="cmp-card is-after">
      <div class="cmp-head">✅ SaleSmartly 聚合</div>
      <ul class="cmp-list">
        <li v-for="pt in afterPoints" :key="pt">
          <span class="cmp-dot good"></span><span>{{ pt }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.layout-s09 {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.cmp-card {
  border-radius: 11px;
  padding: 13px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  box-sizing: border-box;
}

.cmp-card.is-before {
  background: var(--danger-soft);
  border: 1px solid #fecaca;
  color: #7f1d1d;
}

.cmp-card.is-after {
  background: linear-gradient(145deg, #eff6ff 0%, #ecfdf5 100%);
  border: 1px solid #93c5fd;
  color: var(--text);
  box-shadow: var(--shadow-sm);
}

.cmp-head {
  font-size: 11.5px;
  font-weight: 800;
  line-height: 1.3;
}

.is-before .cmp-head {
  color: #b91c1c;
}

.is-after .cmp-head {
  color: var(--primary);
}

.cmp-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 10.5px;
  line-height: 1.4;
}

.cmp-list li {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.cmp-dot {
  width: 5.5px;
  height: 5.5px;
  border-radius: 50%;
  flex-shrink: 0;
}

.cmp-dot.bad {
  background: var(--danger);
}

.cmp-dot.good {
  background: var(--accent);
}

.layout-s09.is-compact .cmp-card {
  padding: 9px 10px;
  gap: 6px;
}

.layout-s09.is-compact .cmp-head {
  font-size: 10.5px;
}

.layout-s09.is-compact .cmp-list {
  font-size: 9.5px;
  gap: 4px;
}

.layout-s09.is-mobile {
  grid-template-columns: 1fr;
  gap: 7px;
}

.layout-s09.is-mobile .cmp-card {
  padding: 10px 11px;
  gap: 6px;
}

.layout-s09.is-mobile .cmp-head {
  font-size: 10.5px;
}

.layout-s09.is-mobile .cmp-list {
  font-size: 9.5px;
  gap: 4px;
}
</style>
