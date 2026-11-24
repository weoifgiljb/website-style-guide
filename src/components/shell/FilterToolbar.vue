<script setup>
import { computed } from 'vue'
import { CATEGORIES, ALL_ITEMS } from '../../data/index.js'
import { useCatalogStore } from '../../composables/useCatalogStore.js'

const {
  activeCategory,
  searchQuery,
  selectedIds,
  setCategory,
  openDrawer
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
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜编号或组件名，如 N-05 / OpportunitySection / 跑马灯"
            aria-label="搜编号或组件名"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="search-clear"
            aria-label="清空搜索词"
            @click="searchQuery = ''"
          >
            ×
          </button>
        </div>

        <button type="button" class="blueprint-btn" @click="openDrawer()">
          <span>🧩 整页拼装预览</span>
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
  background: rgba(246, 248, 252, 0.88);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  padding: 10px 24px;
}

.toolbar {
  max-width: 1260px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.filter-tab {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tab:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.tab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 17px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--surface-soft);
  color: var(--text-muted);
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
}

.filter-tab:hover .tab-count {
  background: var(--primary-soft);
  color: var(--primary);
}

.filter-tab.active {
  background: var(--text);
  border-color: var(--text);
  color: #ffffff;
}

.filter-tab.active .tab-count {
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
}

.toolbar-right {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  flex: 1 1 340px;
  justify-content: flex-end;
}

.search-box {
  position: relative;
  flex: 1 1 240px;
  max-width: 320px;
  min-width: 210px;
}

.search-box input {
  width: 100%;
  padding: 7px 30px 7px 34px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-size: 12.5px;
  color: var(--text);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-box input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 13px;
  pointer-events: none;
}

.search-clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background: var(--surface-soft);
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.search-clear:hover {
  background: var(--border);
  color: var(--text);
}

.blueprint-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #bfdbfe;
  background: var(--primary-soft);
  color: var(--primary);
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.blueprint-btn:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: #ffffff;
}

.blueprint-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--primary);
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
}

.blueprint-btn:hover .blueprint-badge {
  background: #ffffff;
  color: var(--primary);
}

@media (max-width: 768px) {
  .toolbar-wrap {
    padding: 10px 16px;
  }

  .toolbar-right {
    justify-content: stretch;
  }

  .search-box {
    max-width: none;
  }
}
</style>
