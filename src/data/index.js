import { CATEGORIES, PAGE_PRESETS } from './categories.js'
import { LAYOUT_ITEMS } from './layouts.js'
import { MOTION_ITEMS } from './motions.js'
import { PITFALL_ITEMS } from './pitfalls.js'

export const ALL_ITEMS = [...LAYOUT_ITEMS, ...MOTION_ITEMS, ...PITFALL_ITEMS]

export const ITEMS_BY_ID = ALL_ITEMS.reduce((acc, item) => {
  acc[item.id] = item
  return acc
}, {})

export { CATEGORIES, PAGE_PRESETS, LAYOUT_ITEMS, MOTION_ITEMS, PITFALL_ITEMS }
