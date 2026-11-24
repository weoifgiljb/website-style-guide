<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  replayTick: { type: Number, default: 0 },
  viewport: { type: String, default: 'desktop' }
})

const words = ['WhatsApp', 'Messenger', 'Instagram', 'LINE']
const mode = ref('rotate')
const wordIdx = ref(0)
const displayText = ref(words[0])
const wordPhase = ref('')

let loopInterval = null
let stepTimeout = null
let rafId = null

function clearTimers() {
  if (loopInterval !== null) {
    clearInterval(loopInterval)
    loopInterval = null
  }
  if (stepTimeout !== null) {
    clearTimeout(stepTimeout)
    stepTimeout = null
  }
  if (rafId !== null && typeof cancelAnimationFrame === 'function') {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function getDurMs() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined' && document.documentElement) {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--dur').trim()
    const parsed = parseFloat(raw)
    if (!Number.isNaN(parsed) && parsed > 0) {
      return raw.endsWith('ms') ? Math.round(parsed) : Math.round(parsed * 1000)
    }
  }
  return 280
}

function startRotateLoop() {
  clearTimers()
  wordPhase.value = ''
  displayText.value = words[wordIdx.value]

  loopInterval = setInterval(() => {
    wordPhase.value = 'out'
    stepTimeout = setTimeout(() => {
      wordIdx.value = (wordIdx.value + 1) % words.length
      displayText.value = words[wordIdx.value]
      wordPhase.value = 'pre'
      if (typeof requestAnimationFrame === 'function') {
        rafId = requestAnimationFrame(() => {
          rafId = requestAnimationFrame(() => {
            wordPhase.value = ''
          })
        })
      } else {
        wordPhase.value = ''
      }
    }, getDurMs())
  }, 2000)
}

function startTypewriterLoop() {
  clearTimers()
  wordPhase.value = ''
  let charIdx = 0
  let deleting = false
  displayText.value = ''

  function tick() {
    if (mode.value !== 'type') return
    const current = words[wordIdx.value]
    if (!deleting) {
      charIdx += 1
      displayText.value = current.slice(0, charIdx)
      if (charIdx >= current.length) {
        deleting = true
        stepTimeout = setTimeout(tick, 1200)
        return
      }
      stepTimeout = setTimeout(tick, 95)
    } else {
      charIdx -= 1
      displayText.value = current.slice(0, charIdx)
      if (charIdx <= 0) {
        deleting = false
        wordIdx.value = (wordIdx.value + 1) % words.length
        stepTimeout = setTimeout(tick, 280)
        return
      }
      stepTimeout = setTimeout(tick, 55)
    }
  }

  tick()
}

function toggleMode() {
  if (mode.value === 'rotate') {
    mode.value = 'type'
    startTypewriterLoop()
  } else {
    mode.value = 'rotate'
    startRotateLoop()
  }
}

onMounted(() => {
  startRotateLoop()
})

onUnmounted(() => {
  clearTimers()
})
</script>

<template>
  <div class="motion-text-rotate" :class="{ 'is-mobile': props.viewport === 'mobile' }">
    <span class="stage-badge">{{ mode === 'rotate' ? '当前：上下轮换' : '当前：打字机' }}</span>
    <button type="button" class="stage-action" @click.stop="toggleMode">
      {{ mode === 'rotate' ? '切到打字机' : '切到上下轮换' }}
    </button>
    <div class="demo-text-stage">
      <div class="demo-text-line">
        <span>轻松聚合</span>
        <span class="rotate-slot">
          <span class="rotate-word" :class="wordPhase">{{ displayText }}</span>
          <span v-if="mode === 'type'" class="type-cursor"></span>
        </span>
        <span>客户</span>
      </div>
      <div class="demo-text-sub">自动轮播展示多个渠道 / 业务场景</div>
    </div>
  </div>
</template>

<style scoped>
.motion-text-rotate {
  width: 100%;
  padding-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-text-stage {
  width: 100%;
  max-width: 420px;
  text-align: center;
}

.demo-text-line {
  font-size: 17px;
  font-weight: 700;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  flex-wrap: wrap;
}

.rotate-slot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 114px;
  height: 32px;
  padding: 0 11px;
  border-radius: 8px;
  background: var(--primary);
  color: #ffffff;
  font-size: 14.5px;
  font-weight: 700;
  overflow: hidden;
  position: relative;
}

.rotate-word {
  display: inline-block;
  transition:
    transform var(--dur, 0.28s) var(--ease, cubic-bezier(0.22, 1, 0.36, 1)),
    opacity var(--dur, 0.28s) ease;
}

.rotate-word.out {
  opacity: 0;
  transform: translateY(-14px);
}

.rotate-word.pre {
  opacity: 0;
  transform: translateY(14px);
  transition: none;
}

.type-cursor {
  display: inline-block;
  width: 2px;
  height: 16px;
  background: #ffffff;
  margin-left: 2px;
  animation: cursorBlink 0.8s steps(1) infinite;
}

.demo-text-sub {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 10px;
}

.motion-text-rotate.is-mobile .demo-text-stage {
  max-width: 100%;
}

.motion-text-rotate.is-mobile .demo-text-line {
  font-size: 14px;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: center;
}

.motion-text-rotate.is-mobile .rotate-slot {
  min-width: 96px;
  height: 28px;
  padding: 0 8px;
  font-size: 13px;
}

.motion-text-rotate.is-mobile .demo-text-sub {
  font-size: 11px;
  margin-top: 8px;
}

@keyframes cursorBlink {
  50% {
    opacity: 0;
  }
}
</style>
