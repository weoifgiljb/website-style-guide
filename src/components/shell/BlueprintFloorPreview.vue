<script setup>
import { Sparkles } from 'lucide-vue-next'
import { LAYOUT_DEMO_MAP } from '../demos/index.js'
import { useFloorMotionPlayers } from '../../composables/useFloorMotionPlayers.js'
import FloorMotionOverlay from './blueprint/FloorMotionOverlay.vue'

const props = defineProps({
  floorIndex: { type: Number, required: true },
  layoutItem: { type: Object, required: true },
  motionItem: { type: Object, default: null },
  motionItems: { type: Array, default: () => [] },
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayKey: { type: Number, default: 0 },
  scrollRatio: { type: Number, default: 0 }
})

const emit = defineEmits(['hover-motion', 'leave-motion'])

const players = useFloorMotionPlayers(props)
</script>

<template>
  <div
    class="blueprint-floor"
    :class="{
      'has-hover-lift': players.hasMotion('M-05'),
      'has-border-glow': players.hasMotion('M-06'),
      'has-img-zoom': players.hasMotion('M-07'),
      'is-demo': players.isDemoActive
    }"
  >
    <div class="floor-strip">
      <span class="strip-title">
        F{{ floorIndex + 1 }} · {{ layoutItem.code }} {{ layoutItem.name }}
      </span>
      <div v-if="players.resolvedMotions.length > 0" class="strip-right">
        <span
          v-for="m in players.resolvedMotions"
          :key="m.id"
          class="strip-motion-pill"
          @mouseenter="emit('hover-motion', m, $event)"
          @mouseleave="emit('leave-motion')"
        >
          <Sparkles :size="11" :stroke-width="2" aria-hidden="true" />
          <span>{{ m.code }} {{ m.name }}</span>
        </span>
        <button type="button" class="strip-action-btn" @click="players.triggerFloorMotion">
          {{ players.actionLabel }}
        </button>
      </div>
    </div>

    <div
      :key="players.isEntranceMotion ? players.stageAnimKey : 'steady'"
      class="floor-stage-inner"
      :class="{
        'anim-bp-fade-up': players.hasMotion('M-01') && !players.hasMotion('M-02'),
        'anim-bp-stagger': players.hasMotion('M-02'),
        'anim-bp-zoom': players.hasMotion('M-03') && !players.hasMotion('M-01') && !players.hasMotion('M-02'),
        'has-parallax': players.hasMotion('M-11')
      }"
    >
      <FloorMotionOverlay :players="players" :viewport="viewport">
      <!-- Core Layout Host -->
      <div
        class="floor-layout-host"
        :class="{
          'is-zoom-clip': players.hasMotion('M-07'),
          'is-tab-fade': players.hasMotion('M-09') && players.tabFading,
          'has-sticky-step': players.hasMotion('M-10') || players.hasMotion('M-15'),
          [`sticky-accent-${players.stickyStep}`]: players.hasMotion('M-10'),
          [`sticky-accent-${players.autoTabIdx}`]: players.hasMotion('M-15') && !players.hasMotion('M-10')
        }"
      >
        <component
          :is="LAYOUT_DEMO_MAP[layoutItem.demoKey]"
          v-if="LAYOUT_DEMO_MAP[layoutItem.demoKey]"
          :viewport="viewport"
          :compact="compact"
        />
      </div>
      </FloorMotionOverlay>
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
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 11px; font-weight: 600; color: var(--primary);
  background: var(--primary-soft); border: 1px solid #bfdbfe;
  padding: 1px 8px; border-radius: 999px; cursor: help;
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
.floor-layout-host { transition: opacity 0.2s ease, box-shadow 0.25s ease; }
.floor-layout-host.is-tab-fade { opacity: 0.42; }

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

@keyframes bpFadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
@keyframes bpZoomIn { from { opacity: 0; transform: scale(0.86); } to { opacity: 1; transform: scale(1); } }
</style>
