<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  replayTick: { type: Number, default: 0 },
  viewport: { type: String, default: 'desktop' }
})

// step 1: buyer msg -> step 2: AI typing dots -> step 3: AI reply + KB tag -> step 4: resolved status
const step = ref(0)
const timers = []

function clearAllTimers() {
  while (timers.length) {
    clearTimeout(timers.pop())
  }
}

function playStream() {
  clearAllTimers()
  step.value = 1
  timers.push(
    setTimeout(() => {
      step.value = 2
    }, 420)
  )
  timers.push(
    setTimeout(() => {
      step.value = 3
    }, 1050)
  )
  timers.push(
    setTimeout(() => {
      step.value = 4
    }, 1480)
  )
}

watch(
  () => props.replayTick,
  () => {
    playStream()
  }
)

onMounted(() => {
  playStream()
})

onUnmounted(() => {
  clearAllTimers()
})
</script>

<template>
  <div class="motion-chat-stream" :class="{ 'is-mobile': props.viewport === 'mobile' }">
    <span class="stage-badge">Fin.ai / ManyChat 同款 · 对话流</span>
    <button type="button" class="stage-action" @click.stop="playStream">↻ 重播</button>

    <div class="chat-window">
      <!-- Buyer Message -->
      <div v-if="step >= 1" class="msg-row is-buyer anim-msg-in">
        <span class="avatar buyer-av">买</span>
        <div class="bubble buyer-bubble">
          <div class="bubble-meta">WhatsApp · 西班牙语自动识别</div>
          <div class="bubble-text">¿Puedo cambiar la talla a M?（能把订单改成 M 码吗？）</div>
        </div>
      </div>

      <!-- AI Thinking Indicator -->
      <div v-if="step === 2" class="msg-row is-ai anim-msg-in">
        <span class="avatar ai-av">AI</span>
        <div class="typing-pill">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <em class="typing-label">检索 Shopify 订单 #8092...</em>
        </div>
      </div>

      <!-- AI Streamed Reply -->
      <div v-if="step >= 3" class="msg-row is-ai anim-msg-in">
        <span class="avatar ai-av">AI</span>
        <div class="bubble ai-bubble">
          <div class="kb-tag">✓ 命中售后知识库 · 已自动西语回复</div>
          <div class="bubble-text">
            ¡Claro! 已为您将订单 #8092 修改为 M 码，预计明日发出。
          </div>
        </div>
      </div>

      <!-- Bottom Auto-Resolved Status -->
      <div v-if="step >= 4" class="resolved-bar anim-msg-in">
        <span>⚡ 0.8s AI 自动闭环解决 · 免人工排队</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.motion-chat-stream {
  width: 100%;
  padding-top: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-window {
  width: 100%;
  max-width: 440px;
  min-height: 148px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 11px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: var(--shadow-sm);
}

.msg-row {
  display: flex;
  align-items: flex-start;
  gap: 7px;
}

.msg-row.is-ai {
  flex-direction: row-reverse;
}

.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 10.5px;
  font-weight: 700;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.buyer-av {
  background: #e2e8f0;
  color: var(--text-secondary);
}

.ai-av {
  background: var(--primary);
  color: #ffffff;
}

.bubble {
  max-width: 82%;
  border-radius: 10px;
  padding: 7px 10px;
  font-size: 11.5px;
  line-height: 1.4;
}

.buyer-bubble {
  background: var(--surface-soft);
  color: var(--text);
  border-top-left-radius: 3px;
}

.ai-bubble {
  background: var(--primary-soft);
  border: 1px solid #bfdbfe;
  color: var(--text);
  border-top-right-radius: 3px;
}

.bubble-meta {
  font-size: 9.5px;
  color: var(--text-muted);
  margin-bottom: 2px;
}

.kb-tag {
  display: inline-block;
  font-size: 9.5px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 3px;
}

.typing-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--primary-soft);
  border: 1px solid #bfdbfe;
  border-radius: 999px;
  padding: 5px 10px;
}

.typing-pill .dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--primary);
  animation: dotPulse 0.9s infinite ease-in-out;
}

.typing-pill .dot:nth-child(2) {
  animation-delay: 0.15s;
}

.typing-pill .dot:nth-child(3) {
  animation-delay: 0.3s;
}

.typing-label {
  font-style: normal;
  font-size: 10.5px;
  color: var(--primary);
  margin-left: 3px;
}

.resolved-bar {
  margin-top: auto;
  text-align: center;
  font-size: 10.5px;
  font-weight: 600;
  color: #047857;
  background: var(--accent-soft);
  border: 1px solid #a7f3d0;
  border-radius: 7px;
  padding: 3px 8px;
}

.anim-msg-in {
  animation: msgSlideIn var(--dur, 0.28s) var(--ease, cubic-bezier(0.22, 1, 0.36, 1)) both;
}

@keyframes msgSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dotPulse {
  0%,
  80%,
  100% {
    opacity: 0.3;
    transform: scale(0.85);
  }
  40% {
    opacity: 1;
    transform: scale(1.1);
  }
}

.motion-chat-stream.is-mobile .chat-window {
  padding: 9px 9px;
  min-height: 142px;
  gap: 6px;
}

.motion-chat-stream.is-mobile .bubble {
  max-width: 88%;
  padding: 6px 8px;
  font-size: 11px;
}

.motion-chat-stream.is-mobile .avatar {
  width: 21px;
  height: 21px;
  font-size: 9.5px;
}
</style>
