<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const animKey = ref(0)
const started = ref(false)
let resetTimer = null

watch(
  () => props.replayTick,
  () => {
    animKey.value += 1
  }
)

function handleStart() {
  started.value = true
  animKey.value += 1
  if (resetTimer) clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    started.value = false
  }, 1300)
}

onUnmounted(() => {
  if (resetTimer) clearTimeout(resetTimer)
})
</script>

<template>
  <section
    class="normal-n15"
    :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }"
  >
    <div class="n15-bg-glow" aria-hidden="true"></div>

    <div :key="animKey" class="n15-inner">
      <div class="n15-left">
        <h2 class="n15-title">立即与全球客户建立高效连接</h2>
        <button
          type="button"
          class="n15-cta-btn"
          @click.stop="handleStart"
        >
          {{ started ? '正在跳转注册台 ✓' : '免费开始使用' }}
        </button>
      </div>

      <div class="n15-right" aria-label="SaleSmartly 工作台与专属顾问示意">
        <!-- Back Layer: img-cta-ui mock product UI window -->
        <div class="img-cta-ui">
          <div class="ui-topbar">
            <span class="ui-dots"><i></i><i></i><i></i></span>
            <span class="ui-url">app.salesmartly.com</span>
          </div>
          <div class="ui-body">
            <div class="ui-sidebar">
              <span class="ch-dot wa"></span>
              <span class="ch-dot fb"></span>
              <span class="ch-dot ig"></span>
            </div>
            <div class="ui-chat">
              <div class="msg-in">Hi, bulk order shipping to US?</div>
              <div class="msg-ai">AI 自动翻译 · 意图：批发询价</div>
              <div class="msg-out">Yes! Express 3-5 days delivery ✨</div>
            </div>
          </div>
        </div>

        <!-- Front Layer: img-cta-person advisor character card -->
        <div class="img-cta-person">
          <div class="person-avatar">
            <span class="person-emoji" aria-hidden="true">👩‍💼</span>
            <i class="person-online" aria-hidden="true"></i>
          </div>
          <div class="person-meta">
            <span class="person-name">专属增长顾问</span>
            <span class="person-stat">首响 <b>&lt; 15s</b> · 转化 +38%</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.normal-n15 {
  position: relative;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 16px 15px 14px;
  overflow: hidden;
  box-sizing: border-box;
}

.n15-bg-glow {
  position: absolute;
  right: -30px;
  bottom: -40px;
  width: 220px;
  height: 170px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.14) 0%, rgba(96, 165, 250, 0.06) 52%, transparent 74%);
  pointer-events: none;
}

.n15-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 0.96fr 1.14fr;
  gap: 12px;
  align-items: center;
}

.n15-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 11px;
  min-width: 0;
  animation: n15SlideLeft 0.36s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.n15-title {
  margin: 0;
  font-size: 14.5px;
  font-weight: 800;
  line-height: 1.32;
  color: #0f172a;
}

.n15-cta-btn {
  border: none;
  border-radius: 999px;
  background: #2563eb;
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 700;
  padding: 8px 18px;
  cursor: pointer;
  box-shadow: 0 8px 18px -6px rgba(37, 99, 235, 0.45);
  transition: background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
  box-sizing: border-box;
}

.n15-cta-btn:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 11px 22px -6px rgba(29, 78, 216, 0.52);
}

.n15-right {
  position: relative;
  height: 124px;
  min-width: 0;
}

.img-cta-ui {
  position: absolute;
  top: 2px;
  left: 0;
  right: 16px;
  background: #f8fafc;
  border: 1px solid #dbeafe;
  border-radius: 12px;
  box-shadow: 0 10px 24px -10px rgba(15, 23, 42, 0.14);
  overflow: hidden;
  animation: n15SlideRight 0.38s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both;
}

.ui-topbar {
  height: 18px;
  padding: 0 8px;
  background: #eff6ff;
  border-bottom: 1px solid #dbeafe;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ui-dots {
  display: inline-flex;
  gap: 3px;
}

.ui-dots i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #93c5fd;
}

.ui-url {
  font-size: 7.5px;
  color: #64748b;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

.ui-body {
  display: flex;
  gap: 6px;
  padding: 7px 8px 14px;
}

.ui-sidebar {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-right: 5px;
  border-right: 1px dashed #e2e8f0;
}

.ch-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.ch-dot.wa { background: #22c55e; }
.ch-dot.fb { background: #2563eb; }
.ch-dot.ig { background: #ec4899; }

.ui-chat {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.msg-in {
  align-self: flex-start;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px 6px 6px 2px;
  padding: 2px 6px;
  font-size: 8px;
  color: #334155;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.msg-ai {
  align-self: flex-start;
  font-size: 7.5px;
  font-weight: 600;
  color: #2563eb;
  background: #eff6ff;
  padding: 1px 5px;
  border-radius: 4px;
}

.msg-out {
  align-self: flex-end;
  background: #2563eb;
  color: #ffffff;
  border-radius: 6px 6px 2px 6px;
  padding: 2px 6px;
  font-size: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 92%;
}

.img-cta-person {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #ffffff;
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  padding: 6px 9px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  box-shadow: 0 12px 24px -8px rgba(37, 99, 235, 0.25);
  animation: n15SlideRight 0.42s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both;
}

.person-avatar {
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #dbeafe, #93c5fd);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.person-emoji {
  font-size: 15px;
  line-height: 1;
}

.person-online {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  border: 1.5px solid #ffffff;
}

.person-meta {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.person-name {
  font-size: 9px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;
}

.person-stat {
  font-size: 8px;
  color: #475569;
  white-space: nowrap;
}

.person-stat b {
  color: #2563eb;
}

@keyframes n15SlideLeft {
  from {
    opacity: 0;
    transform: translateX(-14px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes n15SlideRight {
  from {
    opacity: 0;
    transform: translateX(16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Compact */
.normal-n15.is-compact {
  padding: 11px 11px 10px;
}

.normal-n15.is-compact .n15-title {
  font-size: 12.5px;
}

.normal-n15.is-compact .n15-cta-btn {
  padding: 6px 13px;
  font-size: 9.5px;
}

.normal-n15.is-compact .n15-right {
  height: 108px;
}

/* Mobile (316px shell) */
.normal-n15.is-mobile {
  padding: 12px 10px 11px;
}

.normal-n15.is-mobile .n15-inner {
  grid-template-columns: 1fr;
  gap: 10px;
}

.normal-n15.is-mobile .n15-left {
  align-items: center;
  text-align: center;
  gap: 8px;
}

.normal-n15.is-mobile .n15-title {
  font-size: 13px;
}

.normal-n15.is-mobile .n15-cta-btn {
  width: 100%;
  padding: 7px 14px;
  font-size: 10px;
}

.normal-n15.is-mobile .n15-right {
  height: 112px;
}

.normal-n15.is-mobile .img-cta-ui {
  right: 8px;
}

.normal-n15.is-mobile .img-cta-person {
  padding: 5px 8px;
}
</style>
