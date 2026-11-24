<script setup>
defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false }
})
</script>

<template>
  <div class="layout-s07" :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }">
    <span class="ch-badge">✨ AI 全景客服工作台</span>
    <div class="ch-title">一屏统管全球社媒与独立站询盘</div>
    <div class="ch-actions">
      <span class="ch-btn-p">免费试用</span>
      <span class="ch-btn-s">观看演示</span>
    </div>
    <div class="ch-workbench">
      <div class="wb-col wb-list">
        <span class="wb-line active"></span>
        <span class="wb-line"></span>
        <span class="wb-line"></span>
      </div>
      <div class="wb-col wb-chat">
        <div class="wb-msg left">Hi, shipping to US?</div>
        <div class="wb-msg right">AI: 3–5 business days ⚡</div>
      </div>
      <div class="wb-col wb-crm">
        <span class="wb-tag">高意向 VIP</span>
        <span class="wb-line"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-s07 {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 5px;
  box-shadow: var(--shadow-sm);
}

.ch-badge {
  font-size: 9px;
  font-weight: 700;
  color: var(--primary);
  background: var(--primary-soft);
  border: 1px solid #bfdbfe;
  padding: 1px 8px;
  border-radius: 999px;
}

.ch-title { font-size: 11.5px; font-weight: 800; color: var(--text); line-height: 1.3; }
.ch-actions { display: flex; gap: 6px; }

.ch-btn-p,
.ch-btn-s { font-size: 9.5px; font-weight: 600; padding: 2px 9px; border-radius: 999px; }
.ch-btn-p { background: var(--primary); color: #ffffff; }
.ch-btn-s { background: var(--surface-soft); color: var(--text-secondary); border: 1px solid var(--border); }

.ch-workbench {
  width: 100%;
  margin-top: 3px;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  padding: 6px;
  display: grid;
  grid-template-columns: 0.75fr 1.5fr 0.85fr;
  gap: 5px;
  text-align: left;
}

.wb-col {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.wb-line { height: 6px; border-radius: 3px; background: #e2e8f0; }
.wb-line.active { background: #93c5fd; }

.wb-msg { font-size: 8.5px; padding: 2px 5px; border-radius: 4px; background: var(--surface-soft); color: var(--text-secondary); }
.wb-msg.right { align-self: flex-end; background: var(--primary-soft); color: var(--primary); font-weight: 600; }

.wb-tag {
  font-size: 8px;
  font-weight: 700;
  color: #047857;
  background: var(--accent-soft);
  padding: 1px 4px;
  border-radius: 4px;
  align-self: flex-start;
}

.layout-s07.is-compact { padding: 8px 10px; }
.layout-s07.is-mobile { padding: 9px; }
.layout-s07.is-mobile .ch-workbench { grid-template-columns: 1fr; }
.layout-s07.is-mobile .wb-list,
.layout-s07.is-mobile .wb-crm { display: none; }
</style>
