<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import SectionMapScene from './tooltip/scenes/SectionMapScene.vue'
import EnterScenes from './tooltip/scenes/EnterScenes.vue'
import SwitchScenes from './tooltip/scenes/SwitchScenes.vue'
import LoopScenes from './tooltip/scenes/LoopScenes.vue'
import ContentScenes from './tooltip/scenes/ContentScenes.vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: '' },
  badge: { type: String, default: '' },
  tip: { type: String, default: '' },
  anim: { type: String, default: 'scroll-enter' },
  placement: { type: String, default: 'auto' },
  anchorRect: { type: Object, default: null }
})

const counterVal = ref(18)
const activeSlot = ref(0)
let loopTimer = null

const SECTION_ANIMS = new Set([
  'sec-hero',
  'sec-feature',
  'sec-bento',
  'sec-flow',
  'sec-tabs',
  'sec-other'
])

const sceneComponent = computed(() => {
  const anim = props.anim
  if (SECTION_ANIMS.has(anim)) return SectionMapScene
  if (anim === 'scroll-enter' || anim === 'scroll-scrub' || anim === 'hover-react') return EnterScenes
  if (anim === 'auto-progress' || anim === 'click-switch' || anim === 'smooth-expand') return SwitchScenes
  if (anim === 'loop-pulse' || anim === 'path-pulse' || anim === 'spotlight-glow' || anim === 'float-pulse') {
    return LoopScenes
  }
  return ContentScenes
})

function clearLoop() {
  if (loopTimer) {
    clearInterval(loopTimer)
    loopTimer = null
  }
}

function startMiniLoop() {
  clearLoop()
  activeSlot.value = 0
  counterVal.value = 24
  loopTimer = setInterval(() => {
    activeSlot.value = (activeSlot.value + 1) % 2
    counterVal.value = activeSlot.value === 0 ? 36 : 98
  }, 1150)
}

watch(
  () => [props.visible, props.anim],
  ([vis]) => {
    if (vis) {
      startMiniLoop()
    } else {
      clearLoop()
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  clearLoop()
})

const isRightSide = computed(() => {
  const rect = props.anchorRect
  if (!rect || props.placement !== 'right') return false
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const rightEdge = rect.right ?? rect.left + rect.width
  return vw - rightEdge > 272
})

const tooltipStyle = computed(() => {
  const rect = props.anchorRect
  if (!rect) return { left: '50%', top: '50%' }
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800

  if (isRightSide.value) {
    const rightEdge = rect.right ?? rect.left + rect.width
    const rowHeight = rect.height ?? (rect.bottom - rect.top)
    const centerY = Math.min(vh - 96, Math.max(96, rect.top + rowHeight / 2))
    return {
      left: `${rightEdge + 12}px`,
      top: `${centerY}px`,
      transform: 'translate(0, -50%)'
    }
  }

  const halfWidth = 128
  const centerX = Math.min(vw - halfWidth - 12, Math.max(halfWidth + 12, rect.left + rect.width / 2))
  const placeBelow = rect.top < 172

  if (placeBelow) {
    return {
      left: `${centerX}px`,
      top: `${rect.bottom + 10}px`,
      transform: 'translate(-50%, 0)'
    }
  }
  return {
    left: `${centerX}px`,
    top: `${rect.top - 10}px`,
    transform: 'translate(-50%, -100%)'
  }
})

const isBelow = computed(
  () => !isRightSide.value && Boolean(props.anchorRect && props.anchorRect.top < 172)
)
</script>

<template>
  <Teleport to="body">
    <Transition name="mt-pop">
      <div
        v-if="props.visible && props.anchorRect"
        class="motion-tooltip"
        :class="{ 'is-below': isBelow, 'is-right': isRightSide }"
        :style="tooltipStyle"
        role="tooltip"
      >
        <div class="mt-stage">
          <component
            :is="sceneComponent"
            :anim="props.anim"
            :active-slot="activeSlot"
            :counter-val="counterVal"
          />
        </div>

        <div class="mt-caption">
          <div class="mt-head-row">
            <span class="mt-title">{{ props.title }}</span>
            <span v-if="props.badge" class="mt-where-badge">📍 {{ props.badge }}</span>
          </div>
          <div class="mt-tip">{{ props.tip }}</div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.motion-tooltip {
  position: fixed;
  z-index: 260;
  width: 252px;
  background: #0f172a;
  color: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 18px 36px -8px rgba(15, 23, 42, 0.42);
  pointer-events: none;
}

.motion-tooltip::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -5px;
  width: 9px;
  height: 9px;
  background: #0f172a;
  border-right: 1px solid rgba(148, 163, 184, 0.28);
  border-bottom: 1px solid rgba(148, 163, 184, 0.28);
  transform: translateX(-50%) rotate(45deg);
}

.motion-tooltip.is-below::after {
  bottom: auto;
  top: -5px;
  transform: translateX(-50%) rotate(225deg);
}

.motion-tooltip.is-right::after {
  left: -5px;
  bottom: auto;
  top: 50%;
  transform: translateY(-50%) rotate(135deg);
}

.mt-stage {
  height: 92px;
  background: #f8fafc;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 8px;
  color: #0f172a;
}

.mt-caption {
  padding: 7px 4px 2px;
}

.mt-head-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 3px;
}

.mt-title {
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
}

.mt-where-badge {
  font-size: 10px;
  font-weight: 600;
  color: #93c5fd;
  background: rgba(37, 99, 235, 0.24);
  border: 1px solid rgba(96, 165, 250, 0.35);
  padding: 1px 6px;
  border-radius: 999px;
  white-space: nowrap;
}

.mt-tip {
  font-size: 11px;
  color: #cbd5e1;
  line-height: 1.4;
}

.scene {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.mt-pop-enter-active,
.mt-pop-leave-active {
  transition: opacity 0.14s ease;
}

.mt-pop-enter-from,
.mt-pop-leave-to {
  opacity: 0;
}
</style>
