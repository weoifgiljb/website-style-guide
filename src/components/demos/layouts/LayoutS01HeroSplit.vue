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
  border-radius: 10px;
  padding: 12px;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 10px;
  align-items: center;
  box-shadow: var(--shadow-sm);
}

.mh-left { display: flex; flex-direction: column; gap: 6px; }
.mh-pill {
  align-self: flex-start;
  font-size: 9px;
  font-weight: 700;
  color: var(--primary);
  background: #dbeafe;
  padding: 1px 7px;
  border-radius: 999px;
  line-height: 1.4;
}

.mh-h1 { width: 92%; height: 10px; border-radius: 4px; background: var(--text); }
.mh-h1.short { width: 68%; }
.mh-sub { width: 84%; height: 6px; border-radius: 3px; background: var(--border-strong); }

.mh-btns { display: flex; gap: 6px; margin-top: 3px; }
.mh-btn-p,
.mh-btn-s {
  font-size: 9.5px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 5px;
  text-align: center;
  line-height: 1.3;
}
.mh-btn-p { background: var(--primary); color: #ffffff; }
.mh-btn-s { background: #e2e8f0; color: var(--text-secondary); }

.mh-right {
  height: 100%;
  min-height: 82px;
  border-radius: 8px;
  background: linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%);
  border: 1px solid #bfdbfe;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
}

.mh-chat-row { display: flex; gap: 5px; align-items: center; }
.mh-av { width: 14px; height: 14px; border-radius: 50%; background: #3b82f6; flex-shrink: 0; }
.mh-av.g { background: var(--accent); }
.mh-bbl { height: 12px; flex: 1; border-radius: 6px; background: #ffffff; }
.mh-bbl.sm { max-width: 72%; background: var(--primary-soft); }

.layout-s01.is-compact { padding: 10px; }
.layout-s01.is-mobile { grid-template-columns: 1fr; gap: 8px; }
.layout-s01.is-mobile .mh-btns { width: 100%; }
.layout-s01.is-mobile .mh-btn-p,
.layout-s01.is-mobile .mh-btn-s { flex: 1; }
</style>
