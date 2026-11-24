<script setup>
defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const columns = ['功能权益', 'Free', 'Pro', 'Max']

const rows = [
  {
    feature: '多渠道聚合会话',
    cells: [
      { type: 'text', value: '2 坐席' },
      { type: 'text', value: '10 坐席' },
      { type: 'text', value: '不限', highlight: true }
    ]
  },
  {
    feature: '官方 WhatsApp API',
    cells: [
      { type: 'x' },
      { type: 'check' },
      { type: 'check' }
    ]
  },
  {
    feature: 'AI 意图工作流',
    cells: [
      { type: 'x' },
      { type: 'check' },
      { type: 'check' }
    ]
  },
  {
    feature: '专属客户成功经理',
    cells: [
      { type: 'x' },
      { type: 'x' },
      { type: 'check' }
    ]
  }
]
</script>

<template>
  <div
    class="normal-n12"
    :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }"
  >
    <div class="n12-table" role="table" aria-label="套餐功能权益对比表">
      <!-- RowTitle Header -->
      <div class="n12-row n12-header-row" role="row">
        <div
          v-for="(col, cIdx) in columns"
          :key="col"
          class="n12-title-cell"
          :class="{ 'is-feature-col': cIdx === 0, 'is-pro-col': col === 'Pro' }"
          role="columnheader"
        >
          <span>{{ col }}</span>
          <em v-if="col === 'Pro'" class="pro-tag">热门</em>
        </div>
      </div>

      <!-- RowContent Matrix -->
      <div
        v-for="row in rows"
        :key="row.feature"
        class="n12-row"
        role="row"
      >
        <div class="n12-cell is-feature-col" role="cell">
          <span class="feat-name">{{ row.feature }}</span>
        </div>

        <div
          v-for="(cell, idx) in row.cells"
          :key="idx"
          class="n12-cell"
          :class="{ 'is-pro-col': idx === 1 }"
          role="cell"
        >
          <span
            v-if="cell.type === 'check'"
            class="cell-check"
            aria-label="支持"
          >✓</span>
          <span
            v-else-if="cell.type === 'x'"
            class="cell-x"
            aria-label="不支持"
          >✕</span>
          <span
            v-else
            class="cell-text"
            :class="{ 'is-accent': cell.highlight }"
          >{{ cell.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.normal-n12 {
  width: 100%;
  box-sizing: border-box;
}

.n12-table {
  width: 100%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
}

.n12-row {
  display: grid;
  grid-template-columns: 1.45fr repeat(3, 0.85fr);
  border-bottom: 1px solid #f1f5f9;
}

.n12-row:last-child {
  border-bottom: none;
}

.n12-title-cell {
  background: #f8f9fa;
  font-weight: 700;
  font-size: 10.5px;
  color: #0f172a;
  height: 36px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-bottom: 1px solid #eef2f7;
  box-sizing: border-box;
}

.n12-title-cell.is-feature-col {
  justify-content: flex-start;
  padding-left: 12px;
}

.pro-tag {
  font-style: normal;
  font-size: 8px;
  font-weight: 700;
  color: #333bfa;
  background: rgba(51, 59, 250, 0.1);
  padding: 1px 5px;
  border-radius: 999px;
  line-height: 1.3;
}

.n12-cell {
  height: 36px;
  padding: 0 8px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  box-sizing: border-box;
}

.n12-cell.is-pro-col {
  background: rgba(239, 246, 255, 0.38);
}

.n12-cell.is-feature-col {
  justify-content: flex-start;
  padding-left: 12px;
}

.feat-name {
  font-size: 10px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.3;
}

.cell-check {
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: #333bfa;
  color: #ffffff;
  font-size: 10px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  flex-shrink: 0;
}

.cell-x {
  color: #cbd5e1;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
}

.cell-text {
  font-size: 9.5px;
  font-weight: 600;
  color: #334155;
  white-space: nowrap;
}

.cell-text.is-accent {
  color: #333bfa;
  font-weight: 700;
}

/* Compact */
.normal-n12.is-compact .n12-title-cell,
.normal-n12.is-compact .n12-cell {
  height: 30px;
  padding: 0 6px;
}

.normal-n12.is-compact .n12-title-cell.is-feature-col,
.normal-n12.is-compact .n12-cell.is-feature-col {
  padding-left: 9px;
}

.normal-n12.is-compact .n12-title-cell,
.normal-n12.is-compact .feat-name {
  font-size: 9px;
}

.normal-n12.is-compact .cell-text {
  font-size: 8.5px;
}

.normal-n12.is-compact .cell-check {
  width: 15px;
  height: 15px;
  font-size: 9px;
}

/* Mobile (316px shell -> ~290px inner width) */
.normal-n12.is-mobile .n12-row {
  grid-template-columns: 1.42fr repeat(3, 0.86fr);
}

.normal-n12.is-mobile .n12-title-cell,
.normal-n12.is-mobile .n12-cell {
  height: 31px;
  padding: 0 3px;
}

.normal-n12.is-mobile .n12-title-cell.is-feature-col,
.normal-n12.is-mobile .n12-cell.is-feature-col {
  padding-left: 7px;
}

.normal-n12.is-mobile .n12-title-cell {
  font-size: 9px;
}

.normal-n12.is-mobile .pro-tag {
  display: none;
}

.normal-n12.is-mobile .feat-name {
  font-size: 8.5px;
  line-height: 1.2;
}

.normal-n12.is-mobile .cell-text {
  font-size: 8.5px;
}

.normal-n12.is-mobile .cell-check {
  width: 14px;
  height: 14px;
  font-size: 8.5px;
}

.normal-n12.is-mobile .cell-x {
  font-size: 9.5px;
}
</style>
