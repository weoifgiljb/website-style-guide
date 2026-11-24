import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'

export function useFloorMotionPlayers(props) {
const CHANNELS = ['WhatsApp', 'Messenger', 'Instagram', 'LINE']
const TABS = ['场景 A · 获客', '场景 B · 接待', '场景 C · 复购']
const STICKY_STEPS = ['① 接入账号', '② 智能分流', '③ 沉淀转化']
const AUTO_TABS = ['① AI 意图分流', '② 多语实时互译', '③ 广告归因回传']
const MARQUEE_CHANNELS = ['WhatsApp', 'Messenger', 'Instagram', 'Telegram', 'LINE', 'TikTok']

const resolvedMotions = computed(() => {
  if (Array.isArray(props.motionItems) && props.motionItems.length > 0) {
    return props.motionItems.filter(Boolean)
  }
  return props.motionItem ? [props.motionItem] : []
})

const motionIds = computed(() => resolvedMotions.value.map((m) => m.id))
const motionId = computed(() => motionIds.value[0] || '')

function hasMotion(id) {
  return motionIds.value.includes(id)
}

const isEntranceMotion = computed(() =>
  hasMotion('M-01') || hasMotion('M-02') || hasMotion('M-03')
)

const actionLabel = computed(() => {
  if (motionIds.value.length > 1) return '↻ 联动演示'
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
const chatTimers = []
let countRaf = null
let parallaxRaf = null

function clearTransientTimers() {
  if (demoTimer) { clearTimeout(demoTimer); demoTimer = null }
  if (tabTimer) { clearTimeout(tabTimer); tabTimer = null }
  if (autoTabTimer) { clearInterval(autoTabTimer); autoTabTimer = null }
  if (flowTimer) { clearInterval(flowTimer); flowTimer = null }
  while (stepTimers.length) clearTimeout(stepTimers.pop())
  while (chatTimers.length) clearTimeout(chatTimers.pop())
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
  if (!hasMotion('M-04')) return
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
  while (chatTimers.length) clearTimeout(chatTimers.pop())
  chatStep.value = 1
  chatTimers.push(setTimeout(() => { chatStep.value = 2 }, 400))
  chatTimers.push(setTimeout(() => { chatStep.value = 3 }, 980))
}

function runBoundMotion(isManualClick = false) {
  clearTransientTimers()
  isDemoActive.value = false
  parallaxWave.value = 0
  if (motionIds.value.length === 0) return

  if (isEntranceMotion.value) {
    stageAnimKey.value += 1
  }
  if (hasMotion('M-04')) {
    if (isManualClick) {
      textMode.value = textMode.value === 'rotate' ? 'typewriter' : 'rotate'
    }
    startTextLoop()
  }
  if (
    hasMotion('M-05') ||
    hasMotion('M-06') ||
    hasMotion('M-07') ||
    hasMotion('M-13') ||
    hasMotion('M-14')
  ) {
    pulseDemo(950)
  }
  if (hasMotion('M-08')) {
    accordionOpen.value = isManualClick ? !accordionOpen.value : true
  }
  if (hasMotion('M-09')) {
    selectTab((activeTab.value + 1) % TABS.length)
  }
  if (hasMotion('M-10')) {
    playStickySequence()
  }
  if (hasMotion('M-11')) {
    runParallaxWave()
  }
  if (hasMotion('M-12')) {
    runCountUp()
  }
  if (hasMotion('M-15')) {
    startAutoTabs()
  }
  if (hasMotion('M-16')) {
    startChannelFlow()
  }
  if (hasMotion('M-17')) {
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

watch(
  [() => motionIds.value.join(','), () => props.replayKey],
  ([nextKey], [prevKey]) => {
    if (!hasMotion('M-04')) clearTextTimers()
    if (nextKey !== prevKey && !prevKey?.includes('M-08') && hasMotion('M-08')) {
      accordionOpen.value = false
    }
    runBoundMotion(false)
  }
)

onMounted(() => {
  if (motionIds.value.length > 0) runBoundMotion(false)
})

onUnmounted(() => {
  clearTransientTimers()
  clearTextTimers()
})

  return reactive({
    CHANNELS,
    TABS,
    STICKY_STEPS,
    AUTO_TABS,
    MARQUEE_CHANNELS,
    resolvedMotions,
    motionIds,
    hasMotion,
    isEntranceMotion,
    actionLabel,
    stageAnimKey,
    isDemoActive,
    textMode,
    wordIdx,
    typedText,
    accordionOpen,
    activeTab,
    tabFading,
    stickyStep,
    autoTabIdx,
    autoTabProgress,
    flowPhase,
    chatStep,
    parallaxWave,
    metrics,
    selectTab,
    pickAutoTab,
    triggerFloorMotion,
    orbFrontStyle,
    orbBackStyle
  })
}
