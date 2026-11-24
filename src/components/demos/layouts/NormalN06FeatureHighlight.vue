<script setup>
import { ref } from 'vue'

defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const reverse = ref(false)
</script>

<template>
  <section
    class="normal-n06"
    :class="{
      'is-mobile': viewport === 'mobile',
      'is-compact': compact,
      'is-reverse': reverse && viewport !== 'mobile'
    }"
  >
    <div class="fh-toolbar">
      <button
        type="button"
        class="fh-toggle-btn"
        :class="{ active: reverse }"
        @click.stop="reverse = !reverse"
      >
        {{ reverse ? '⇄ reverse: true (左图右文)' : '⇄ reverse: false (左文右图)' }}
      </button>
    </div>

    <div class="fh-row">
      <div class="fh-text-col">
        <h2 class="fh-title">AI 智能语种识别与实时翻译</h2>
        <p class="fh-desc">
          自动识别买家母语并秒级双向互译，无需切换翻译软件即可地道沟通。
        </p>
      </div>

      <div class="fh-media-col">
        <div class="fh-mock-card">
          <div class="fh-mock-head">
            <span class="fh-dots"><i></i><i></i><i></i></span>
            <span class="fh-lang-pill">ES → ZH</span>
          </div>

          <div class="fh-chat-list">
            <div class="fh-bubble is-buyer">
              <div class="fh-raw">Hola, ¿tienen stock?</div>
              <div class="fh-trans">
                <span class="fh-trans-text">你好，请问有现货吗？</span>
                <span class="fh-trans-tag">[ES → ZH]</span>
              </div>
            </div>

            <div class="fh-bubble is-agent">
              <div class="fh-agent-line">¡Sí! Envío rápido en 24h ✓</div>
              <div class="fh-agent-sub">原文：有现货，24 小时极速发货</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.normal-n06 {
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 11px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.fh-toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.fh-toggle-btn {
  border: 1px solid #dce2f2;
  background: #f8fafc;
  color: #475569;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.fh-toggle-btn:hover {
  border-color: #2563eb;
  color: #2563eb;
}

.fh-toggle-btn.active {
  background: #eff6ff;
  border-color: #93c5fd;
  color: #1d4ed8;
}

.fh-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  width: 100%;
  min-width: 0;
}

.normal-n06.is-reverse .fh-row {
  flex-direction: row-reverse;
}

.fh-text-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.fh-title {
  margin: 0;
  font-size: 14.5px;
  font-weight: 800;
  line-height: 1.32;
  color: #0f172a;
  letter-spacing: -0.01em;
}

.fh-desc {
  margin: 0;
  font-size: 11px;
  line-height: 1.55;
  color: #475569;
}

.fh-media-col {
  flex: 1.08;
  min-width: 0;
  width: 100%;
}

.fh-mock-card {
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 12px 26px -8px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(15, 23, 42, 0.04);
  padding: 9px 10px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  box-sizing: border-box;
}

.fh-mock-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid #f1f5f9;
}

.fh-dots {
  display: inline-flex;
  gap: 4px;
}

.fh-dots i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #cbd5e1;
}

.fh-dots i:first-child {
  background: #fca5a5;
}

.fh-dots i:nth-child(2) {
  background: #fcd34d;
}

.fh-dots i:nth-child(3) {
  background: #86efac;
}

.fh-lang-pill {
  font-size: 9.5px;
  font-weight: 700;
  color: #1d4ed8;
  background: #dbeafe;
  padding: 1px 6px;
  border-radius: 999px;
}

.fh-chat-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.fh-bubble {
  border-radius: 10px;
  padding: 6px 8px;
  font-size: 10px;
  line-height: 1.38;
}

.fh-bubble.is-buyer {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  align-self: flex-start;
  width: 100%;
  box-sizing: border-box;
}

.fh-raw {
  font-weight: 600;
  color: #1e293b;
}

.fh-trans {
  margin-top: 4px;
  padding-top: 4px;
  border-top: 1px dashed #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  flex-wrap: wrap;
}

.fh-trans-text {
  color: #2563eb;
  font-weight: 600;
}

.fh-trans-tag {
  font-size: 9px;
  font-weight: 700;
  color: #1d4ed8;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0 4px;
  border-radius: 4px;
  white-space: nowrap;
}

.fh-bubble.is-agent {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  align-self: flex-end;
  width: 92%;
  box-sizing: border-box;
}

.fh-agent-line {
  font-weight: 600;
}

.fh-agent-sub {
  font-size: 9px;
  color: #dbeafe;
  margin-top: 2px;
}

.normal-n06.is-compact {
  padding: 9px 11px 11px;
  gap: 8px;
}

.normal-n06.is-compact .fh-title {
  font-size: 13px;
}

.normal-n06.is-compact .fh-desc {
  font-size: 10px;
}

.normal-n06.is-mobile {
  padding: 10px 11px 12px;
  gap: 8px;
}

.normal-n06.is-mobile .fh-toggle-btn {
  font-size: 9.5px;
  padding: 2px 7px;
}

.normal-n06.is-mobile .fh-row {
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
}

.normal-n06.is-mobile .fh-title {
  font-size: 13px;
}

.normal-n06.is-mobile .fh-desc {
  font-size: 10.5px;
}
</style>
