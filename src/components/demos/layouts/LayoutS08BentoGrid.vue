<script setup>
defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false }
})
</script>

<template>
  <div class="layout-s08" :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }">
    <div class="bento-main">
      <div class="bento-tag">CORE · 主能力</div>
      <div class="bento-title">AI 意图识别工作台</div>
      <div class="bento-desc">自动识别询价、售后与物流意图并秒级回复</div>
      <div class="bento-bars">
        <div class="bar-row"><span>命中率</span><i style="width: 88%"></i><b>94%</b></div>
        <div class="bar-row"><span>首响时效</span><i class="g" style="width: 76%"></i><b>1.8s</b></div>
      </div>
    </div>
    <div class="bento-sub">
      <div class="sub-head"><span class="sub-ico">🌐</span>多语种实时互译</div>
      <div class="sub-meta">覆盖 130+ 语种双向秒译</div>
    </div>
    <div class="bento-sub">
      <div class="sub-head"><span class="sub-ico">🏷️</span>自动打标沉淀</div>
      <div class="sub-meta">会话自动分层客户意向画像</div>
    </div>
  </div>
</template>

<style scoped>
.layout-s08 {
  width: 100%;
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 7px;
}

.bento-main {
  grid-row: span 2;
  background: linear-gradient(145deg, #ffffff 0%, #eff6ff 100%);
  border: 1px solid #bfdbfe;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  box-shadow: var(--shadow-sm);
}

.bento-tag {
  align-self: flex-start;
  font-size: 8.5px;
  font-weight: 700;
  color: var(--primary);
  background: #dbeafe;
  padding: 1px 6px;
  border-radius: 999px;
}

.bento-title { font-size: 11.5px; font-weight: 800; color: var(--text); line-height: 1.25; }
.bento-desc { font-size: 9.5px; color: var(--text-secondary); line-height: 1.35; }

.bento-bars { display: flex; flex-direction: column; gap: 4px; margin-top: 2px; }
.bar-row { display: flex; align-items: center; gap: 5px; font-size: 8.5px; color: var(--text-muted); }
.bar-row span { width: 38px; flex-shrink: 0; }
.bar-row i { height: 5px; border-radius: 99px; background: var(--primary); display: block; }
.bar-row i.g { background: var(--accent); }
.bar-row b { color: var(--text); font-weight: 700; margin-left: auto; }

.bento-sub {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 9px;
  padding: 8px 9px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  box-shadow: var(--shadow-sm);
}

.sub-head { display: flex; align-items: center; gap: 5px; font-size: 10.5px; font-weight: 700; color: var(--text); }
.sub-ico { font-size: 11px; }
.sub-meta { font-size: 9px; color: var(--text-muted); line-height: 1.3; }

.layout-s08.is-compact { gap: 6px; }
.layout-s08.is-compact .bento-main { padding: 8px 9px; }

.layout-s08.is-mobile {
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 6px;
}

.layout-s08.is-mobile .bento-main { grid-row: auto; }
</style>
