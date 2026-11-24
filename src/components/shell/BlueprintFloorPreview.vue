<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { LAYOUT_DEMO_MAP } from '../demos/index.js'

const props = defineProps({
  floorIndex: { type: Number, required: true },
  layoutItem: { type: Object, required: true },
  motionItem: { type: Object, default: null },
  viewport: { type: String, default: 'desktop' },
  replayKey: { type: Number, default: 0 },
  scrollRatio: { type: Number, default: 0 }
})

const CHANNELS = ['WhatsApp', 'Messenger', 'Instagram', 'LINE']
const TABS = ['场景 A · 获客', '场景 B · 接待', '场景 C · 复购']
const STICKY_STEPS = ['① 接入账号', '② 智能分流', '③ 沉淀转化']
const AUTO_TABS = ['① AI 意图分流', '② 多语实时互译', '③ 广告归因回传']
const MARQUEE_CHANNELS = ['WhatsApp', 'Messenger', 'Instagram', 'Telegram', 'LINE', 'TikTok']

const motionId = computed(() => props.motionItem?.id || '')
const isEntranceMotion = computed(() => ['M-01', 'M-02', 'M-03'].includes(motionId.value))

const actionLabel = computed(() => {
  if (['M-01', 'M-02', 'M-03', 'M-12', 'M-15', 'M-17'].includes(motionId.value)) return '↻ 重播'
  if (motionId.value === 'M-04') return '⇄ 切模式'
  return '▶ 演示动效'
})

const stageAnimKey = ref(0)
const isDemoActive = ref(false)
const textMode = ref('rotate')
const wordIdx = ref(0)
const typedText = ref(CHANNELS[0])
const accordionOpen = ref(false)
const activeTab = ref(0)
const tabFading = ref(false)
const stickyStep = ref(0)
const autoTabIdx = ref(0)
const autoTabProgress = ref(0)
const flowPhase = ref(0)
const chatStep = ref(0)
const parallaxWave = ref(0)
const metrics = reactive({ stability: '99.9', companies: '12,800', speed: '3.5' })

let demoTimer = null
let rotateTimer = null
let typeTimer = null
let tabTimer = null
let autoTabTimer = null
let flowTimer = null
const stepTimers = []
let countRaf = null
let parallaxRaf = null

function clearTransientTimers() {
  if (demoTimer) { clearTimeout(demoTimer); demoTimer = null }
  if (tabTimer) { clearTimeout(tabTimer); tabTimer = null }
  if (autoTabTimer) { clearInterval(autoTabTimer); autoTabTimer = null }
  if (flowTimer) { clearInterval(flowTimer); flowTimer = null }
  while (stepTimers.length) clearTimeout(stepTimers.pop())
  if (countRaf) { cancelAnimationFrame(countRaf); countRaf = null }
  if (parallaxRaf) { cancelAnimationFrame(parallaxRaf); parallaxRaf = null }
}

function clearTextTimers() {
  if (rotateTimer) { clearInterval(rotateTimer); rotateTimer = null }
  if (typeTimer) { clearTimeout(typeTimer); typeTimer = null }
}

function pulseDemo(duration = 950) {
  if (demoTimer) clearTimeout(demoTimer)
  isDemoActive.value = true
  demoTimer = setTimeout(() => {
    isDemoActive.value = false
  }, duration)
}

function startTextLoop() {
  clearTextTimers()
  if (motionId.value !== 'M-04') return
  if (textMode.value === 'rotate') {
    rotateTimer = setInterval(() => {
      wordIdx.value = (wordIdx.value + 1) % CHANNELS.length
    }, 1800)
    return
  }
  let charPos = 0
  let deleting = false
  const step = () => {
    const target = CHANNELS[wordIdx.value]
    if (!deleting) {
      charPos += 1
      typedText.value = target.slice(0, charPos)
      if (charPos >= target.length) {
        deleting = true
        typeTimer = setTimeout(step, 1100)
        return
      }
      typeTimer = setTimeout(step, 75)
    } else {
      charPos -= 1
      typedText.value = target.slice(0, Math.max(0, charPos))
      if (charPos <= 0) {
        deleting = false
        wordIdx.value = (wordIdx.value + 1) % CHANNELS.length
        typeTimer = setTimeout(step, 180)
        return
      }
      typeTimer = setTimeout(step, 42)
    }
  }
  typedText.value = ''
  step()
}

function runCountUp() {
  if (countRaf) cancelAnimationFrame(countRaf)
  const start = performance.now()
  const duration = 900
  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration)
    const ease = 1 - Math.pow(1 - t, 3)
    metrics.stability = (99.9 * ease).toFixed(1)
    metrics.companies = Math.round(12800 * ease).toLocaleString('en-US')
    metrics.speed = (3.5 * ease).toFixed(1)
    if (t < 1) countRaf = requestAnimationFrame(tick)
  }
  countRaf = requestAnimationFrame(tick)
}

function runParallaxWave() {
  if (parallaxRaf) cancelAnimationFrame(parallaxRaf)
  const start = performance.now()
  const duration = 1200
  const amp = props.viewport === 'mobile' ? 0.5 : 1
  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration)
    parallaxWave.value = Math.sin(t * Math.PI * 2) * 14 * amp
    if (t < 1) {
      parallaxRaf = requestAnimationFrame(tick)
    } else {
      parallaxWave.value = 0
    }
  }
  parallaxRaf = requestAnimationFrame(tick)
}

function selectTab(idx) {
  if (activeTab.value === idx) return
  activeTab.value = idx
  tabFading.value = true
  if (tabTimer) clearTimeout(tabTimer)
  tabTimer = setTimeout(() => { tabFading.value = false }, 220)
}

function playStickySequence() {
  while (stepTimers.length) clearTimeout(stepTimers.pop())
  stickyStep.value = 0
  stepTimers.push(setTimeout(() => { stickyStep.value = 1 }, 420))
  stepTimers.push(setTimeout(() => { stickyStep.value = 2 }, 840))
}

function startAutoTabs() {
  if (autoTabTimer) clearInterval(autoTabTimer)
  autoTabIdx.value = 0
  autoTabProgress.value = 0
  autoTabTimer = setInterval(() => {
    const next = autoTabProgress.value + 5
    if (next >= 100) {
      autoTabIdx.value = (autoTabIdx.value + 1) % AUTO_TABS.length
      autoTabProgress.value = 0
    } else {
      autoTabProgress.value = next
    }
  }, 150)
}

function pickAutoTab(idx) {
  autoTabIdx.value = idx
  autoTabProgress.value = 0
}

function startChannelFlow() {
  if (flowTimer) clearInterval(flowTimer)
  flowPhase.value = 0
  flowTimer = setInterval(() => {
    flowPhase.value = (flowPhase.value + 1) % 3
  }, 800)
}

function playChatStream() {
  while (stepTimers.length) clearTimeout(stepTimers.pop())
  chatStep.value = 1
  stepTimers.push(setTimeout(() => { chatStep.value = 2 }, 400))
  stepTimers.push(setTimeout(() => { chatStep.value = 3 }, 980))
}

function runBoundMotion(isManualClick = false) {
  clearTransientTimers()
  isDemoActive.value = false
  parallaxWave.value = 0
  const id = motionId.value
  if (!id) return
  if (isEntranceMotion.value) {
    stageAnimKey.value += 1
  } else if (id === 'M-04') {
    if (isManualClick) {
      textMode.value = textMode.value === 'rotate' ? 'typewriter' : 'rotate'
    }
    startTextLoop()
  } else if (id === 'M-05' || id === 'M-06' || id === 'M-07' || id === 'M-13' || id === 'M-14') {
    pulseDemo(950)
  } else if (id === 'M-08') {
    accordionOpen.value = isManualClick ? !accordionOpen.value : true
  } else if (id === 'M-09') {
    selectTab((activeTab.value + 1) % TABS.length)
  } else if (id === 'M-10') {
    playStickySequence()
  } else if (id === 'M-11') {
    runParallaxWave()
  } else if (id === 'M-12') {
    runCountUp()
  } else if (id === 'M-15') {
    startAutoTabs()
  } else if (id === 'M-16') {
    startChannelFlow()
  } else if (id === 'M-17') {
    playChatStream()
  }
}

function triggerFloorMotion() {
  runBoundMotion(true)
}

const orbFrontStyle = computed(() => {
  const amp = props.viewport === 'mobile' ? 0.5 : 1
  const y = (props.scrollRatio - 0.5) * -28 * amp + parallaxWave.value
  return { transform: `translate3d(0, ${y.toFixed(1)}px, 0)` }
})

const orbBackStyle = computed(() => {
  const amp = props.viewport === 'mobile' ? 0.5 : 1
  const y = (props.scrollRatio - 0.5) * 22 * amp - parallaxWave.value * 0.75
  return { transform: `translate3d(0, ${y.toFixed(1)}px, 0)` }
})

watch([motionId, () => props.replayKey], ([nextId, nextReplay], [prevId]) => {
  if (nextId !== 'M-04') clearTextTimers()
  if (nextId !== prevId && nextId === 'M-08') accordionOpen.value = false
  runBoundMotion(false)
})

onMounted(() => {
  if (motionId.value) runBoundMotion(false)
})

onUnmounted(() => {
  clearTransientTimers()
  clearTextTimers()
})
</script>

<template>
  <div
    class="blueprint-floor"
    :class="{
      'has-hover-lift': motionId === 'M-05',
      'has-border-glow': motionId === 'M-06',
      'has-img-zoom': motionId === 'M-07',
      'is-demo': isDemoActive
    }"
  >
    <div class="floor-strip">
      <span class="strip-title">
        F{{ floorIndex + 1 }} · {{ layoutItem.code }} {{ layoutItem.name }}
      </span>
      <div v-if="motionItem" class="strip-right">
        <span class="strip-motion-pill">✨ {{ motionItem.name }}</span>
        <button type="button" class="strip-action-btn" @click="triggerFloorMotion">
          {{ actionLabel }}
        </button>
      </div>
    </div>

    <div
      :key="isEntranceMotion ? stageAnimKey : 'steady'"
      class="floor-stage-inner"
      :class="{
        'anim-bp-fade-up': motionId === 'M-01',
        'anim-bp-stagger': motionId === 'M-02',
        'anim-bp-zoom': motionId === 'M-03',
        'has-parallax': motionId === 'M-11'
      }"
    >
      <!-- M-11 Parallax Depth Layer -->
      <div v-if="motionId === 'M-11'" class="bp-parallax-layer" aria-hidden="true">
        <span class="bp-orb orb-a" :style="orbBackStyle"></span>
        <span class="bp-orb orb-b" :style="orbFrontStyle">✦ 视差层次</span>
      </div>

      <!-- M-14 Float & Pulse Status -->
      <div
        v-if="motionId === 'M-14'"
        class="bp-float-bar"
        :class="{ 'is-mobile': viewport === 'mobile', 'is-boost': isDemoActive }"
      >
        <span class="bp-online-pill"><i class="bp-pulse-dot"></i>7×24 在线</span>
        <span class="bp-float-bubble">💬 新咨询 +1</span>
      </div>

      <!-- M-04 Typewriter / Text Rotate Banner -->
      <div v-if="motionId === 'M-04'" class="bp-rotate-banner">
        <span>轻松连接</span>
        <span v-if="textMode === 'rotate'" class="bp-word-slot">
          <span :key="wordIdx" class="bp-word-slide">{{ CHANNELS[wordIdx] }}</span>
        </span>
        <span v-else class="bp-word-slot is-type">
          {{ typedText }}<i class="bp-caret">|</i>
        </span>
        <span>客户</span>
        <em class="bp-mode-tag">{{ textMode === 'rotate' ? '上下轮换' : '打字机' }}</em>
      </div>

      <!-- M-09 Sliding Pill Tabs -->
      <div v-if="motionId === 'M-09'" class="bp-tabs-bar">
        <span class="bp-tab-glider" :style="{ transform: `translateX(${activeTab * 100}%)` }"></span>
        <button
          v-for="(label, idx) in TABS"
          :key="label"
          type="button"
          class="bp-tab-btn"
          :class="{ active: activeTab === idx }"
          @click="selectTab(idx)"
        >
          {{ label }}
        </button>
      </div>

      <!-- M-10 Sticky Step Progress -->
      <div v-if="motionId === 'M-10'" class="bp-sticky-bar">
        <button
          v-for="(stepLabel, sIdx) in STICKY_STEPS"
          :key="stepLabel"
          type="button"
          class="bp-step-pill"
          :class="{ active: stickyStep === sIdx }"
          @click="stickyStep = sIdx"
        >
          {{ stepLabel }}
        </button>
      </div>

      <!-- M-15 Auto-Progress Tabs Strip -->
      <div v-if="motionId === 'M-15'" class="bp-autotabs-bar">
        <button
          v-for="(tLabel, aIdx) in AUTO_TABS"
          :key="tLabel"
          type="button"
          class="bp-autotab-btn"
          :class="{ active: autoTabIdx === aIdx }"
          @click="pickAutoTab(aIdx)"
        >
          <span>{{ tLabel }}</span>
          <i
            class="bp-autotab-line"
            :style="{ width: autoTabIdx === aIdx ? `${autoTabProgress}%` : '0%' }"
          ></i>
        </button>
      </div>

      <!-- M-16 Omnichannel Routing Flow Strip -->
      <div v-if="motionId === 'M-16'" class="bp-flow-strip">
        <span class="bp-flow-node" :class="{ lit: flowPhase === 0 }">WhatsApp / IG / TikTok</span>
        <span class="bp-flow-beam"></span>
        <span class="bp-flow-node hub" :class="{ lit: flowPhase === 1 }">AI 统一路由中枢</span>
        <span class="bp-flow-beam"></span>
        <span class="bp-flow-node target" :class="{ lit: flowPhase === 2 }">自动翻译 + 分配坐席</span>
      </div>

      <!-- M-17 AI Chat Reply Stream Strip -->
      <div v-if="motionId === 'M-17'" class="bp-chat-strip">
        <span v-if="chatStep >= 1" class="bp-chat-pill buyer">买：¿Cambiar talla a M?</span>
        <span v-if="chatStep === 2" class="bp-chat-pill thinking">AI 检索订单库 ···</span>
        <span v-if="chatStep >= 3" class="bp-chat-pill ai">✓ AI 西语秒回：已改 M 码</span>
      </div>

      <!-- Core Layout Host -->
      <div
        class="floor-layout-host"
        :class="{
          'is-zoom-clip': motionId === 'M-07',
          'is-tab-fade': motionId === 'M-09' && tabFading,
          'has-sticky-step': motionId === 'M-10' || motionId === 'M-15',
          [`sticky-accent-${stickyStep}`]: motionId === 'M-10',
          [`sticky-accent-${autoTabIdx}`]: motionId === 'M-15'
        }"
      >
        <component
          :is="LAYOUT_DEMO_MAP[layoutItem.demoKey]"
          v-if="LAYOUT_DEMO_MAP[layoutItem.demoKey]"
          :viewport="viewport"
        />
      </div>

      <!-- M-12 Rolling Count-Up Strip -->
      <div v-if="motionId === 'M-12'" class="bp-metrics-strip">
        <span><b>{{ metrics.stability }}%</b> 稳定率</span>
        <i class="bp-dot">·</i>
        <span><b>{{ metrics.companies }}+</b> 企业</span>
        <i class="bp-dot">·</i>
        <span><b>{{ metrics.speed }}x</b> 提速</span>
      </div>

      <!-- M-08 Smooth Grid Accordion -->
      <div v-if="motionId === 'M-08'" class="bp-accordion">
        <button
          type="button"
          class="bp-acc-trigger"
          :aria-expanded="accordionOpen"
          @click="accordionOpen = !accordionOpen"
        >
          <span>补充常见疑问：支持多团队按权限分流吗？</span>
          <i class="bp-acc-arrow" :class="{ open: accordionOpen }">▾</i>
        </button>
        <div class="bp-acc-grid" :class="{ open: accordionOpen }">
          <div class="bp-acc-inner">
            支持按语种、渠道来源与坐席技能组自动路由，主管可按部门查看独立会话报表。
          </div>
        </div>
      </div>

      <!-- M-13 Seamless Channel Marquee -->
      <div v-if="motionId === 'M-13'" class="bp-marquee" :class="{ 'is-boost': isDemoActive }">
        <div class="bp-marquee-track">
          <span v-for="(ch, i) in [...MARQUEE_CHANNELS, ...MARQUEE_CHANNELS]" :key="i" class="bp-mq-chip">
            ● {{ ch }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blueprint-floor {
  position: relative;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  transition: transform var(--dur, 0.28s) var(--ease), box-shadow var(--dur, 0.28s) var(--ease), border-color var(--dur, 0.28s) var(--ease);
}

.floor-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding-bottom: 6px;
  border-bottom: 1px dashed var(--border);
  position: relative;
  z-index: 3;
}

.strip-title { font-size: 11.5px; font-weight: 700; color: var(--text-secondary); }
.strip-right { display: inline-flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.strip-motion-pill {
  font-size: 11px; font-weight: 600; color: var(--primary);
  background: var(--primary-soft); border: 1px solid #bfdbfe;
  padding: 1px 8px; border-radius: 999px;
}
.strip-action-btn {
  border: 1px solid var(--border); background: #ffffff; color: var(--text-secondary);
  font-size: 10.5px; font-weight: 600; padding: 1px 7px; border-radius: 999px;
  cursor: pointer; transition: all 0.18s ease;
}
.strip-action-btn:hover { border-color: var(--primary); color: var(--primary); background: var(--primary-soft); }

.floor-stage-inner { position: relative; display: flex; flex-direction: column; gap: 7px; z-index: 1; }
.floor-stage-inner.has-parallax { padding: 4px; }

/* M-01, M-02, M-03 Entrance */
.anim-bp-fade-up { animation: bpFadeUp var(--dur, 0.28s) var(--ease) both; }
.anim-bp-zoom { animation: bpZoomIn var(--dur, 0.28s) var(--ease) both; }
.anim-bp-stagger :deep(.layout-s02 > *),
.anim-bp-stagger :deep(.layout-s03 > *),
.anim-bp-stagger :deep(.layout-s04 > *),
.anim-bp-stagger :deep(.layout-s08 > *),
.anim-bp-stagger :deep(.layout-s09 > *),
.anim-bp-stagger :deep(.layout-s10 > *),
.anim-bp-stagger :deep(.layout-s11 > *),
.anim-bp-stagger :deep(.pr-grid > *),
.anim-bp-stagger .floor-layout-host > :deep(* > *) {
  animation-name: bpFadeUp;
  animation-duration: var(--dur, 0.28s);
  animation-timing-function: var(--ease);
  animation-fill-mode: both;
}
.anim-bp-stagger .floor-layout-host > :deep(* > *:nth-child(1)),
.anim-bp-stagger :deep(.pr-grid > *:nth-child(1)) { animation-delay: 0s; }
.anim-bp-stagger .floor-layout-host > :deep(* > *:nth-child(2)),
.anim-bp-stagger :deep(.pr-grid > *:nth-child(2)) { animation-delay: 0.1s; }
.anim-bp-stagger .floor-layout-host > :deep(* > *:nth-child(3)),
.anim-bp-stagger :deep(.pr-grid > *:nth-child(3)) { animation-delay: 0.2s; }
.anim-bp-stagger .floor-layout-host > :deep(* > *:nth-child(4)),
.anim-bp-stagger :deep(.pr-grid > *:nth-child(4)) { animation-delay: 0.3s; }
.anim-bp-stagger .floor-layout-host > :deep(* > *:nth-child(n + 5)) { animation-delay: 0.38s; }

/* M-05 Hover Lift */
.blueprint-floor.has-hover-lift:hover,
.blueprint-floor.has-hover-lift.is-demo {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
  border-color: #93c5fd;
}

/* M-06 Border Glow & Shimmer */
.blueprint-floor.has-border-glow::after {
  content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 2;
  background: linear-gradient(115deg, transparent 30%, rgba(37, 99, 235, 0.14) 50%, transparent 70%);
  transform: translateX(-120%); transition: transform 0.75s var(--ease);
}
.blueprint-floor.has-border-glow:hover,
.blueprint-floor.has-border-glow.is-demo {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.18), var(--shadow-hover);
}
.blueprint-floor.has-border-glow:hover::after,
.blueprint-floor.has-border-glow.is-demo::after { transform: translateX(120%); }

/* M-07 Image / Visual Zoom */
.floor-layout-host.is-zoom-clip { overflow: hidden; border-radius: 10px; }
.blueprint-floor.has-img-zoom .floor-layout-host > :deep(*) {
  transition: transform var(--dur, 0.28s) var(--ease);
  transform-origin: center center;
}
.blueprint-floor.has-img-zoom:hover .floor-layout-host > :deep(*),
.blueprint-floor.has-img-zoom.is-demo .floor-layout-host > :deep(*) {
  transform: scale(1.045);
}

/* M-04 Rotate / Typewriter */
.bp-rotate-banner {
  display: flex; align-items: center; flex-wrap: wrap; gap: 5px;
  padding: 5px 10px; border-radius: 7px; background: var(--primary-soft);
  border: 1px solid #bfdbfe; font-size: 11.5px; font-weight: 600; color: var(--text);
}
.bp-word-slot {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 78px; padding: 0 6px; border-radius: 5px;
  background: #ffffff; color: var(--primary); font-weight: 700; overflow: hidden;
}
.bp-word-slide { animation: bpWordIn 0.26s var(--ease) both; }
.bp-caret { margin-left: 1px; font-style: normal; animation: bpBlink 0.8s infinite; }
.bp-mode-tag { margin-left: auto; font-style: normal; font-size: 10px; color: var(--text-muted); }

/* M-09 Sliding Tabs */
.bp-tabs-bar {
  position: relative; display: grid; grid-template-columns: repeat(3, 1fr);
  background: #e2e8f0; padding: 3px; border-radius: 8px;
}
.bp-tab-glider {
  position: absolute; top: 3px; bottom: 3px; left: 3px; width: calc((100% - 6px) / 3);
  background: #ffffff; border-radius: 6px; box-shadow: var(--shadow-sm);
  transition: transform var(--dur, 0.28s) var(--ease);
}
.bp-tab-btn {
  position: relative; z-index: 1; border: none; background: transparent;
  font-size: 10.5px; font-weight: 600; color: var(--text-secondary); padding: 4px 4px; cursor: pointer;
}
.bp-tab-btn.active { color: var(--primary); }
.floor-layout-host { transition: opacity 0.2s ease, box-shadow 0.25s ease; }
.floor-layout-host.is-tab-fade { opacity: 0.42; }

/* M-10 Sticky Step Bar & Synchronized Card Highlight */
.bp-sticky-bar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
.bp-step-pill {
  border: 1px solid var(--border); background: var(--surface-soft); color: var(--text-secondary);
  font-size: 10.5px; font-weight: 600; padding: 4px 6px; border-radius: 6px; cursor: pointer;
  transition: all var(--dur, 0.28s) var(--ease);
}
.bp-step-pill.active { background: var(--primary); border-color: var(--primary); color: #ffffff; }

.floor-layout-host.has-sticky-step :deep(.m3-card),
.floor-layout-host.has-sticky-step :deep(.step-card),
.floor-layout-host.has-sticky-step :deep(.mch-cell),
.floor-layout-host.has-sticky-step :deep(.ms-item),
.floor-layout-host.has-sticky-step :deep(.layout-s08 > *),
.floor-layout-host.has-sticky-step :deep(.pr-grid > *),
.floor-layout-host.has-sticky-step :deep(.ma-row),
.floor-layout-host.has-sticky-step :deep(.cmp-card),
.floor-layout-host.has-sticky-step :deep(.tm-card) {
  opacity: 0.56;
  transition:
    opacity var(--dur, 0.28s) var(--ease),
    transform var(--dur, 0.28s) var(--ease),
    border-color var(--dur, 0.28s) var(--ease),
    box-shadow var(--dur, 0.28s) var(--ease);
}

.floor-layout-host.sticky-accent-0 :deep(.m3-card:nth-of-type(1)),
.floor-layout-host.sticky-accent-0 :deep(.step-card:nth-of-type(1)),
.floor-layout-host.sticky-accent-0 :deep(.mch-cell:nth-of-type(1)),
.floor-layout-host.sticky-accent-0 :deep(.ms-item:nth-of-type(1)),
.floor-layout-host.sticky-accent-0 :deep(.layout-s08 > *:nth-child(1)),
.floor-layout-host.sticky-accent-0 :deep(.pr-grid > *:nth-child(1)),
.floor-layout-host.sticky-accent-0 :deep(.ma-row:nth-of-type(1)),
.floor-layout-host.sticky-accent-0 :deep(.cmp-card:nth-of-type(1)),
.floor-layout-host.sticky-accent-0 :deep(.tm-card:nth-of-type(1)),
.floor-layout-host.sticky-accent-1 :deep(.m3-card:nth-of-type(2)),
.floor-layout-host.sticky-accent-1 :deep(.step-card:nth-of-type(2)),
.floor-layout-host.sticky-accent-1 :deep(.mch-cell:nth-of-type(2)),
.floor-layout-host.sticky-accent-1 :deep(.ms-item:nth-of-type(2)),
.floor-layout-host.sticky-accent-1 :deep(.layout-s08 > *:nth-child(2)),
.floor-layout-host.sticky-accent-1 :deep(.pr-grid > *:nth-child(2)),
.floor-layout-host.sticky-accent-1 :deep(.ma-row:nth-of-type(2)),
.floor-layout-host.sticky-accent-1 :deep(.cmp-card:nth-of-type(2)),
.floor-layout-host.sticky-accent-1 :deep(.tm-card:nth-of-type(2)),
.floor-layout-host.sticky-accent-2 :deep(.m3-card:nth-of-type(3)),
.floor-layout-host.sticky-accent-2 :deep(.step-card:nth-of-type(3)),
.floor-layout-host.sticky-accent-2 :deep(.mch-cell:nth-of-type(3)),
.floor-layout-host.sticky-accent-2 :deep(.ms-item:nth-of-type(3)),
.floor-layout-host.sticky-accent-2 :deep(.layout-s08 > *:nth-child(3)),
.floor-layout-host.sticky-accent-2 :deep(.pr-grid > *:nth-child(3)),
.floor-layout-host.sticky-accent-2 :deep(.ma-row:last-of-type),
.floor-layout-host.sticky-accent-2 :deep(.cmp-card:last-of-type),
.floor-layout-host.sticky-accent-2 :deep(.tm-card:last-of-type) {
  opacity: 1;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.18), var(--shadow-sm);
  transform: translateY(-2px);
}

/* M-11 Parallax */
.bp-parallax-layer { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
.bp-orb { position: absolute; transition: transform 0.08s linear; }
.orb-a {
  width: 68px; height: 68px; left: -12px; bottom: -12px; border-radius: 50%;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.18), transparent 70%);
}
.orb-b {
  right: 8px; top: 4px; font-size: 10px; font-weight: 700; color: var(--primary);
  background: rgba(239, 246, 255, 0.92); border: 1px solid #bfdbfe;
  padding: 1px 7px; border-radius: 999px; box-shadow: var(--shadow-sm);
}

/* M-12 Count Up */
.bp-metrics-strip {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 8px;
  padding: 6px 10px; border-radius: 7px; background: #0f172a; color: #cbd5e1;
  font-size: 11px; font-variant-numeric: tabular-nums;
}
.bp-metrics-strip b { color: #38bdf8; font-size: 12.5px; }
.bp-dot { font-style: normal; opacity: 0.45; }

/* M-08 Accordion */
.bp-accordion { border: 1px solid var(--border); border-radius: 8px; background: var(--surface-soft); overflow: hidden; }
.bp-acc-trigger {
  width: 100%; border: none; background: transparent; padding: 7px 10px;
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  font-size: 11px; font-weight: 600; color: var(--text); cursor: pointer; text-align: left;
}
.bp-acc-arrow { font-style: normal; transition: transform var(--dur, 0.28s) var(--ease); }
.bp-acc-arrow.open { transform: rotate(180deg); color: var(--primary); }
.bp-acc-grid { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--dur, 0.28s) var(--ease); }
.bp-acc-grid.open { grid-template-rows: 1fr; }
.bp-acc-inner { overflow: hidden; font-size: 11px; color: var(--text-secondary); padding: 0 10px; }
.bp-acc-grid.open .bp-acc-inner { padding: 0 10px 8px; }

/* M-13 Marquee */
.bp-marquee {
  overflow: hidden; padding: 5px 0; border-radius: 7px; background: var(--surface-soft);
  border: 1px solid var(--border);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}
.bp-marquee-track { display: flex; width: max-content; gap: 14px; animation: bpMarquee 14s linear infinite; }
.bp-marquee:hover .bp-marquee-track { animation-play-state: paused; }
.bp-marquee.is-boost { border-color: var(--primary); background: var(--primary-soft); }
.bp-mq-chip { font-size: 10.5px; font-weight: 600; color: var(--text-secondary); white-space: nowrap; }

/* M-14 Float & Pulse */
.bp-float-bar {
  position: absolute; top: 4px; right: 6px; z-index: 3;
  display: inline-flex; align-items: center; gap: 6px; pointer-events: none;
}
.bp-float-bar.is-mobile { position: static; align-self: flex-start; margin-bottom: 2px; }
.bp-online-pill {
  display: inline-flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 700;
  color: #047857; background: var(--accent-soft); border: 1px solid #a7f3d0;
  padding: 1px 7px; border-radius: 999px;
}
.bp-pulse-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: bpPulse 1.8s ease-out infinite; }
.bp-float-bubble {
  font-size: 10px; font-weight: 700; color: var(--primary); background: #ffffff;
  border: 1px solid #bfdbfe; padding: 1px 8px; border-radius: 999px;
  box-shadow: var(--shadow-sm); animation: bpFloat 2.8s ease-in-out infinite;
}
.bp-float-bar.is-mobile .bp-float-bubble { animation: none; }
.bp-float-bar.is-boost .bp-float-bubble { border-color: var(--primary); box-shadow: var(--shadow-hover); }

/* M-15 Auto-Progress Tabs */
.bp-autotabs-bar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
.bp-autotab-btn {
  position: relative; overflow: hidden; border: 1px solid var(--border);
  background: var(--surface-soft); color: var(--text-secondary);
  font-size: 10.5px; font-weight: 600; padding: 4px 6px 6px; border-radius: 6px; cursor: pointer;
}
.bp-autotab-btn.active { background: #ffffff; border-color: #93c5fd; color: var(--primary); }
.bp-autotab-line {
  position: absolute; left: 0; bottom: 0; height: 2px; background: var(--primary);
  transition: width 0.14s linear;
}

/* M-16 Channel Flow Strip */
.bp-flow-strip {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 6px;
  padding: 5px 9px; border-radius: 7px; background: var(--surface-soft); border: 1px solid var(--border);
}
.bp-flow-node {
  font-size: 10px; font-weight: 600; color: var(--text-secondary);
  background: #ffffff; border: 1px solid var(--border); padding: 2px 7px; border-radius: 999px;
  transition: all var(--dur, 0.28s) var(--ease);
}
.bp-flow-node.lit { border-color: var(--primary); color: var(--primary); box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15); }
.bp-flow-node.target.lit { border-color: var(--accent); color: #047857; box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.16); }
.bp-flow-beam {
  flex: 1 1 24px; height: 2px; border-radius: 999px;
  background: linear-gradient(90deg, #cbd5e1 0%, var(--primary) 50%, #cbd5e1 100%);
  background-size: 200% 100%; animation: bpBeam 1.6s linear infinite;
}

/* M-17 Chat Reply Stream */
.bp-chat-strip {
  display: flex; flex-wrap: wrap; align-items: center; gap: 6px;
  padding: 5px 9px; border-radius: 7px; background: var(--surface-soft); border: 1px solid var(--border);
  min-height: 30px;
}
.bp-chat-pill {
  font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 999px;
  animation: bpWordIn var(--dur, 0.28s) var(--ease) both;
}
.bp-chat-pill.buyer { background: #ffffff; border: 1px solid var(--border); color: var(--text-secondary); }
.bp-chat-pill.thinking { background: var(--primary-soft); border: 1px solid #bfdbfe; color: var(--primary); }
.bp-chat-pill.ai { background: var(--accent-soft); border: 1px solid #a7f3d0; color: #047857; }

@keyframes bpBeam { from { background-position: 200% 0; } to { background-position: 0% 0; } }
@keyframes bpFadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
@keyframes bpZoomIn { from { opacity: 0; transform: scale(0.86); } to { opacity: 1; transform: scale(1); } }
@keyframes bpWordIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes bpBlink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
@keyframes bpMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes bpPulse { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.55); } 75%, 100% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); } }
@keyframes bpFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
</style>
