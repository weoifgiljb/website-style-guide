import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import {
  DEVTOOLS_PRESETS,
  clampWidth,
  clampHeight,
  resolveResponsiveTier
} from '../data/devtoolsPresets.js'

export function useResponsiveStage({ previewViewport, setPreviewViewport }) {
  const presetId = ref(previewViewport.value === 'mobile' ? 'mobile-390' : 'desktop-1280')
  const simWidth = ref(previewViewport.value === 'mobile' ? 390 : 1280)
  const simHeight = ref(null)
  const shellMode = ref(previewViewport.value === 'mobile' ? 'phone' : 'browser')
  const zoomMode = ref('fit')
  const dragLockedScale = ref(null)

  const stageRef = ref(null)
  const transformLayerRef = ref(null)
  const stageInnerWidth = ref(760)
  const naturalFrameHeight = ref(420)
  const isDragging = ref(false)

  const tier = computed(() => resolveResponsiveTier(simWidth.value))
  const outerFrameWidth = computed(() =>
    shellMode.value === 'phone' ? simWidth.value + 12 : simWidth.value
  )

  const effectiveScale = computed(() => {
    if (dragLockedScale.value !== null) return dragLockedScale.value
    if (zoomMode.value !== 'fit') return Number(zoomMode.value) || 1
    if (stageInnerWidth.value <= 0) return 1
    return Math.min(1, Number((stageInnerWidth.value / outerFrameWidth.value).toFixed(3)))
  })

  const scaledBoxStyle = computed(() => ({
    width: `${Math.round(outerFrameWidth.value * effectiveScale.value)}px`,
    height: `${Math.round(naturalFrameHeight.value * effectiveScale.value)}px`
  }))

  const transformLayerStyle = computed(() => ({
    width: `${outerFrameWidth.value}px`,
    transform: effectiveScale.value !== 1 ? `scale(${effectiveScale.value})` : 'none'
  }))

  watch(simWidth, (w) => {
    const nextVp = w < 640 ? 'mobile' : 'desktop'
    if (previewViewport.value !== nextVp) {
      setPreviewViewport(nextVp)
    }
  })

  watch(previewViewport, (vp) => {
    if (vp === 'mobile' && simWidth.value >= 640) {
      applyPresetById('mobile-390')
    } else if (vp === 'desktop' && simWidth.value < 640) {
      applyPresetById('desktop-1280')
    }
  })

  function applyPresetById(id) {
    const preset = DEVTOOLS_PRESETS.find((p) => p.id === id)
    if (!preset) return
    dragLockedScale.value = null
    presetId.value = preset.id
    if (preset.id === 'responsive') {
      shellMode.value = 'responsive'
      return
    }
    simWidth.value = preset.width
    simHeight.value = preset.height
    shellMode.value = preset.shell
  }

  function handleUpdateDimensions({ width, height }) {
    dragLockedScale.value = null
    presetId.value = 'responsive'
    shellMode.value = 'responsive'
    simWidth.value = clampWidth(width)
    simHeight.value = clampHeight(height)
  }

  function handleSnapWidth(width) {
    dragLockedScale.value = null
    presetId.value = 'responsive'
    shellMode.value = 'responsive'
    simWidth.value = clampWidth(width)
  }

  function handleRotateScreen() {
    dragLockedScale.value = null
    const currentH = simHeight.value || (simWidth.value < 640 ? 844 : 800)
    const nextW = clampWidth(currentH)
    const nextH = clampHeight(simWidth.value)
    presetId.value = 'responsive'
    shellMode.value = 'responsive'
    simWidth.value = nextW
    simHeight.value = nextH
  }

  function handleResetHeight() {
    simHeight.value = null
  }

  function handleUpdateZoom(mode) {
    dragLockedScale.value = null
    zoomMode.value = mode
  }

  let activeDragCleanup = null

  function startResize(axis, side, event) {
    event.preventDefault()
    const startX = event.clientX
    const startY = event.clientY
    const startW = simWidth.value
    const startH = simHeight.value || Math.round(naturalFrameHeight.value)
    const startScale = effectiveScale.value || 1

    isDragging.value = true
    presetId.value = 'responsive'
    shellMode.value = 'responsive'
    if (zoomMode.value === 'fit' && startScale < 1) {
      dragLockedScale.value = startScale
    }

    const onMove = (e) => {
      if (axis === 'x' || axis === 'xy') {
        const signedDx = side === 'left' ? startX - e.clientX : e.clientX - startX
        const nextW = clampWidth(startW + (signedDx * 2) / startScale)
        simWidth.value = nextW
        if (zoomMode.value === 'fit' && nextW * startScale > stageInnerWidth.value) {
          dragLockedScale.value = Math.min(1, Number((stageInnerWidth.value / nextW).toFixed(3)))
        }
      }
      if (axis === 'y' || axis === 'xy') {
        const dy = e.clientY - startY
        simHeight.value = clampHeight(startH + dy / startScale)
      }
    }

    const onUp = () => {
      isDragging.value = false
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      activeDragCleanup = null
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    activeDragCleanup = onUp
  }

  let resizeObserver = null

  onMounted(() => {
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        if (stageRef.value) {
          stageInnerWidth.value = Math.max(280, stageRef.value.clientWidth - 68)
        }
        if (transformLayerRef.value) {
          naturalFrameHeight.value = Math.max(220, transformLayerRef.value.offsetHeight)
        }
      })
      if (stageRef.value) resizeObserver.observe(stageRef.value)
      if (transformLayerRef.value) resizeObserver.observe(transformLayerRef.value)
    }
  })

  onUnmounted(() => {
    if (resizeObserver) resizeObserver.disconnect()
    if (activeDragCleanup) activeDragCleanup()
  })

  return {
    presetId,
    simWidth,
    simHeight,
    shellMode,
    zoomMode,
    stageRef,
    transformLayerRef,
    naturalFrameHeight,
    isDragging,
    tier,
    effectiveScale,
    scaledBoxStyle,
    transformLayerStyle,
    applyPresetById,
    handleUpdateDimensions,
    handleSnapWidth,
    handleRotateScreen,
    handleResetHeight,
    handleUpdateZoom,
    startResize
  }
}
