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
        <div class="bar-row">
          <span>命中率</span>
          <span class="bar-track"><i style="width: 88%"></i></span>
          <b>94%</b>
        </div>
        <div class="bar-row">
          <span>首响时效</span>
          <span class="bar-track"><i class="g" style="width: 76%"></i></span>
          <b>1.8s</b>
        </div>
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
  gap: 10px;
}

.bento-main {
  grid-row: span 2;
  background: linear-gradient(145deg, #ffffff 0%, #eff6ff 100%);
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  padding: 14px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 7px;
  box-shadow: var(--shadow-sm);
  min-width: 0;
  box-sizing: border-box;
}

.bento-tag {
  align-self: flex-start;
  font-size: 9px;
  font-weight: 700;
  color: var(--primary);
  background: #dbeafe;
  padding: 2px 7px;
  border-radius: 999px;
}

.bento-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--text);
  line-height: 1.25;
}

.bento-desc {
  font-size: 10.5px;
  color: var(--text-secondary);
  line-height: 1.4;
}

.bento-bars {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 3px;
}

.bar-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 9.5px;
  color: var(--text-muted);
  min-width: 0;
}

.bar-row > span:first-child {
  width: 42px;
  flex-shrink: 0;
}

.bar-track {
  flex: 1;
  min-width: 0;
  height: 6px;
  border-radius: 99px;
  background: #dbeafe;
  overflow: hidden;
  display: block;
}

.bar-track i {
  height: 100%;
  border-radius: 99px;
  background: var(--primary);
  display: block;
}

.bar-track i.g {
  background: var(--accent);
}

.bar-row b {
  color: var(--text);
  font-weight: 700;
  flex-shrink: 0;
}

.bento-sub {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 11px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  box-shadow: var(--shadow-sm);
  min-width: 0;
  box-sizing: border-box;
}

.sub-head {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 700;
  color: var(--text);
  min-width: 0;
}

.sub-ico {
  font-size: 12px;
  flex-shrink: 0;
}

.sub-meta {
  font-size: 10px;
  color: var(--text-muted);
  line-height: 1.35;
}

.layout-s08.is-compact {
  gap: 6px;
}

.layout-s08.is-compact .bento-main {
  padding: 9px 10px;
}

.layout-s08.is-compact .bento-title {
  font-size: 11.5px;
}

.layout-s08.is-compact .bento-sub {
  padding: 8px 9px;
}

.layout-s08.is-mobile {
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 7px;
}

.layout-s08.is-mobile .bento-main {
  grid-row: auto;
  padding: 11px 12px;
}

.layout-s08.is-mobile .bento-title {
  font-size: 12px;
}

.layout-s08.is-mobile .bento-desc {
  font-size: 10px;
}

.layout-s08.is-mobile .bento-sub {
  padding: 9px 11px;
}

.layout-s08.is-mobile .sub-head {
  font-size: 11px;
}
</style>
