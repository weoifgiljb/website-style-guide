<script setup>
import { computed } from 'vue'
import { Search, X, Compass, Layers } from 'lucide-vue-next'
import { CATEGORIES, ALL_ITEMS } from '../../data/index.js'
import { useCatalogStore } from '../../composables/useCatalogStore.js'

const {
  activeCategory,
  searchQuery,
  selectedIds,
  setCategory,
  openDrawer,
  openCompetitorModal
} = useCatalogStore()

const categoryCounts = computed(() => {
  const counts = { all: ALL_ITEMS.length }
  for (const cat of CATEGORIES) {
    if (cat.id !== 'all') {
      counts[cat.id] = ALL_ITEMS.filter((item) => item.cat === cat.id).length
    }
  }
  return counts
})
</script>

<template>
  <div class="toolbar-wrap">
    <div class="toolbar">
      <div class="filter-tabs" role="tablist" aria-label="样式与动效分类筛选">
        <button
          v-for="cat in CATEGORIES"
          :key="cat.id"
          type="button"
          role="tab"
          class="filter-tab"
          :class="{ active: activeCategory === cat.id }"
          :aria-selected="activeCategory === cat.id"
          @click="setCategory(cat.id)"
        >
          <span class="tab-text">{{ cat.tabLabel }}</span>
          <span class="tab-count">{{ categoryCounts[cat.id] || 0 }}</span>
        </button>
      </div>

      <div class="toolbar-right">
        <div class="search-box">
          <Search :size="14" :stroke-width="1.8" class="search-icon" aria-hidden="true" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜编号或名称，如 S-08 / Bento / 跑马灯"
            aria-label="搜编号或名称"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="search-clear"
            aria-label="清空搜索词"
            @click="searchQuery = ''"
          >
            <X :size="12" :stroke-width="2" aria-hidden="true" />
          </button>
        </div>

        <button type="button" class="competitor-btn" @click="openCompetitorModal()">
          <Compass :size="14" :stroke-width="1.8" aria-hidden="true" />
          <span>参考外部动效</span>
        </button>

        <button type="button" class="blueprint-btn" @click="openDrawer()">
          <Layers :size="14" :stroke-width="1.8" aria-hidden="true" />
          <span>整页拼装预览</span>
          <span v-if="selectedIds.length > 0" class="blueprint-badge">
            {{ selectedIds.length }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toolbar-wrap {
  position: sticky;
  top: 0;
  z-index: 30;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  padding: 0 24px;
}

.toolbar {
  max-width: 1260px;
  margin: 0 auto;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.filter-tabs {
  display: flex;
  align-items: center;
  gap: 2px;
  overflow-x: auto;
  scrollbar-width: none;
  flex-shrink: 1;
  min-width: 0;
}

.filter-tabs::-webkit-scrollbar {
  display: none;
}

.filter-tab {
  position: relative;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  height: 52px;
  padding: 0 11px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.18s ease;
}

.filter-tab::after {
  content: '';
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 0;
  height: 2px;
  border-radius: 2px 2px 0 0;
  background: transparent;
  transition: background 0.18s ease;
}

.filter-tab:hover {
  color: var(--text);
}

.tab-count {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
  transition: color 0.18s ease;
}

.filter-tab.active {
  color: var(--primary);
  font-weight: 600;
}

.filter-tab.active::after {
  background: var(--primary);
}

.filter-tab.active .tab-count {
  color: var(--primary);
  font-weight: 600;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.search-box {
  position: relative;
  width: 248px;
}

.search-box input {
  width: 100%;
  height: 34px;
  padding: 0 28px 0 32px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface-subtle, #f8fafc);
  font-size: 12.5px;
  color: var(--text);
  outline: none;
  transition: border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
}

.search-box input::placeholder {
  color: var(--text-muted);
}

.search-box input:focus {
  background: var(--surface);
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.search-clear {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.16s ease, color 0.16s ease;
}

.search-clear:hover {
  background: var(--surface-soft);
  color: var(--text);
}

.competitor-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 34px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  padding: 0 11px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.18s ease, color 0.18s ease, background 0.18s ease;
}

.competitor-btn:hover {
  border-color: var(--border-strong);
  background: var(--surface-subtle, #f8fafc);
  color: var(--text);
}

.blueprint-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  border: 1px solid var(--primary);
  background: var(--primary);
  color: #ffffff;
  padding: 0 13px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease;
}

.blueprint-btn:hover {
  background: var(--primary-hover);
  border-color: var(--primary-hover);
}

.blueprint-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 17px;
  padding: 0 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.22);
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 1080px) {
  .toolbar {
    flex-wrap: wrap;
    padding: 6px 0 10px;
    gap: 8px;
  }

  .filter-tabs {
    width: 100%;
    border-bottom: 1px solid var(--border);
  }

  .filter-tab {
    height: 40px;
  }

  .toolbar-right {
    width: 100%;
    justify-content: space-between;
  }

  .search-box {
    flex: 1 1 180px;
    width: auto;
  }
}

@media (max-width: 640px) {
  .toolbar-wrap {
    padding: 0 16px;
  }

  .toolbar-right {
    flex-wrap: wrap;
  }

  .search-box {
    flex: 1 1 100%;
  }

  .competitor-btn,
  .blueprint-btn {
    flex: 1 1 auto;
    justify-content: center;
  }
}
</style>
