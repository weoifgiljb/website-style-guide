import { reactive } from 'vue'

export function useAnchoredTooltip() {
  const tooltipState = reactive({
    visible: false,
    title: '',
    badge: '',
    tip: '',
    anim: 'scroll-enter',
    placement: 'auto',
    anchorRect: null
  })

  function showTooltip({
    title = '',
    badge = '',
    tip = '',
    anim = 'scroll-enter',
    placement = 'auto',
    currentTarget
  } = {}) {
    if (!currentTarget) return
    const rect = currentTarget.getBoundingClientRect()
    tooltipState.title = title
    tooltipState.badge = badge
    tooltipState.tip = tip
    tooltipState.anim = anim
    tooltipState.placement = placement
    tooltipState.anchorRect = {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      width: rect.width,
      height: rect.height
    }
    tooltipState.visible = true
  }

  function hideTooltip() {
    tooltipState.visible = false
  }

  return { tooltipState, showTooltip, hideTooltip }
}
