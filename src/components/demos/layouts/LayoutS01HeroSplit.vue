<script setup>
defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false }
})
</script>

<template>
  <div class="layout-s01" :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }">
    <div class="mh-left">
      <div class="mh-pill">Click to Message</div>
      <div class="mh-h1"></div>
      <div class="mh-h1 short"></div>
      <div class="mh-sub"></div>
      <div class="mh-btns">
        <span class="mh-btn-p">免费试用</span>
        <span class="mh-btn-s">演示</span>
      </div>
    </div>
    <div class="mh-right">
      <div class="mh-chat-row"><span class="mh-av"></span><span class="mh-bbl"></span></div>
      <div class="mh-chat-row"><span class="mh-av g"></span><span class="mh-bbl sm"></span></div>
      <div class="mh-chat-row"><span class="mh-av"></span><span class="mh-bbl"></span></div>
    </div>
  </div>
</template>

<style scoped>
.layout-s01 {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 15px 16px;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 14px;
  align-items: center;
  box-shadow: var(--shadow-sm);
  box-sizing: border-box;
}

.mh-left {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
}

.mh-pill {
  align-self: flex-start;
  font-size: 10px;
  font-weight: 700;
  color: var(--primary);
  background: #dbeafe;
  padding: 2px 8px;
  border-radius: 999px;
  line-height: 1.4;
}

.mh-h1 {
  width: 92%;
  height: 11px;
  border-radius: 4px;
  background: var(--text);
}

.mh-h1.short {
  width: 68%;
}

.mh-sub {
  width: 84%;
  height: 7px;
  border-radius: 3px;
  background: var(--border-strong);
}

.mh-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 4px;
}

.mh-btn-p,
.mh-btn-s {
  font-size: 10.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  text-align: center;
  line-height: 1.3;
}

.mh-btn-p {
  background: var(--primary);
  color: #ffffff;
}

.mh-btn-s {
  background: #e2e8f0;
  color: var(--text-secondary);
}

.mh-right {
  height: 100%;
  min-height: 96px;
  border-radius: 9px;
  background: linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%);
  border: 1px solid #bfdbfe;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 7px;
  min-width: 0;
  box-sizing: border-box;
}

.mh-chat-row {
  display: flex;
  gap: 6px;
  align-items: center;
  min-width: 0;
}

.mh-av {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #3b82f6;
  flex-shrink: 0;
}

.mh-av.g {
  background: var(--accent);
}

.mh-bbl {
  height: 14px;
  flex: 1;
  min-width: 0;
  border-radius: 6px;
  background: #ffffff;
}

.mh-bbl.sm {
  max-width: 72%;
  background: var(--primary-soft);
}

.layout-s01.is-compact {
  padding: 10px 12px;
  gap: 10px;
}

.layout-s01.is-compact .mh-right {
  min-height: 82px;
  padding: 8px;
}

.layout-s01.is-mobile {
  grid-template-columns: 1fr;
  padding: 11px 12px;
  gap: 9px;
}

.layout-s01.is-mobile .mh-right {
  min-height: 76px;
  padding: 8px;
}

.layout-s01.is-mobile .mh-btns {
  width: 100%;
}

.layout-s01.is-mobile .mh-btn-p,
.layout-s01.is-mobile .mh-btn-s {
  flex: 1;
  min-width: 0;
  padding: 4px 8px;
  font-size: 10px;
}
</style>
