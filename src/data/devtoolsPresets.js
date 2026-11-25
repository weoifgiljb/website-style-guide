export const DEVTOOLS_PRESETS = [
  {
    id: 'responsive',
    label: '响应（自由拖拽）',
    width: 1280,
    height: null,
    shell: 'responsive'
  },
  {
    id: 'desktop-1440',
    label: '桌面大屏 · 1440 × 900',
    width: 1440,
    height: 900,
    shell: 'browser'
  },
  {
    id: 'desktop-1280',
    label: '标准桌面 · 1280px',
    width: 1280,
    height: null,
    shell: 'browser'
  },
  {
    id: 'tablet-1024',
    label: 'iPad Pro 横屏 · 1024 × 768',
    width: 1024,
    height: 768,
    shell: 'browser'
  },
  {
    id: 'tablet-768',
    label: 'iPad 竖屏 · 768 × 1024',
    width: 768,
    height: 1024,
    shell: 'browser'
  },
  {
    id: 'mobile-430',
    label: 'iPhone Pro Max · 430 × 932',
    width: 430,
    height: 932,
    shell: 'phone'
  },
  {
    id: 'mobile-390',
    label: '标准手机 · 390px（带壳）',
    width: 390,
    height: null,
    shell: 'phone'
  },
  {
    id: 'mobile-375',
    label: 'iPhone SE · 375 × 667',
    width: 375,
    height: 667,
    shell: 'phone'
  }
]

export const BREAKPOINT_STOPS = [
  { width: 375, label: '375', tag: '小屏' },
  { width: 390, label: '390', tag: '手机' },
  { width: 640, label: '640', tag: 'SM' },
  { width: 768, label: '768', tag: '平板' },
  { width: 1024, label: '1024', tag: '笔记本' },
  { width: 1280, label: '1280', tag: '桌面' },
  { width: 1440, label: '1440', tag: '大屏' }
]

export const ZOOM_OPTIONS = [
  { value: 'fit', label: '适应窗口大小' },
  { value: '1', label: '100%' },
  { value: '0.75', label: '75%' },
  { value: '0.5', label: '50%' }
]

export const MIN_SIM_WIDTH = 320
export const MAX_SIM_WIDTH = 1600
export const MIN_SIM_HEIGHT = 420
export const MAX_SIM_HEIGHT = 1400

export function clampWidth(w) {
  const num = Math.round(Number(w) || 1280)
  return Math.min(MAX_SIM_WIDTH, Math.max(MIN_SIM_WIDTH, num))
}

export function clampHeight(h) {
  if (h === null || h === undefined || h === '') return null
  const num = Math.round(Number(h))
  if (!Number.isFinite(num) || num <= 0) return null
  return Math.min(MAX_SIM_HEIGHT, Math.max(MIN_SIM_HEIGHT, num))
}

export function resolveResponsiveTier(width) {
  if (width < 640) {
    return {
      id: 'mobile',
      badge: 'Mobile · 单列流式',
      viewport: 'mobile',
      compact: false
    }
  }
  if (width < 1024) {
    return {
      id: 'tablet',
      badge: 'Tablet · 紧凑双栏',
      viewport: 'desktop',
      compact: true
    }
  }
  return {
    id: 'desktop',
    badge: 'Desktop · 宽屏布局',
    viewport: 'desktop',
    compact: false
  }
}
