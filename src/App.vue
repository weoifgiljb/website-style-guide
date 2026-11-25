<script setup>
import { computed } from 'vue'
import { RotateCcw } from 'lucide-vue-next'
import { CATEGORIES } from './data/index.js'
import { useCatalogStore } from './composables/useCatalogStore.js'
import HeroHeader from './components/shell/HeroHeader.vue'
import FilterToolbar from './components/shell/FilterToolbar.vue'
import PresetShowcaseStrip from './components/shell/PresetShowcaseStrip.vue'
import CatalogCard from './components/shell/CatalogCard.vue'
import ComboFloatingBar from './components/shell/ComboFloatingBar.vue'
import PageBlueprintDrawer from './components/shell/PageBlueprintDrawer.vue'
import CompetitorPromptModal from './components/shell/CompetitorPromptModal.vue'
import ToastNotice from './components/shell/ToastNotice.vue'

const {
  replayTick,
  activeCategory,
  searchQuery,
  filteredItems,
  isSelected,
  setCategory,
  toggleSelect,
  copyText
} = useCatalogStore()

const showPresetStrip = computed(
  () =>
    !searchQuery.value.trim() &&
    (activeCategory.value === 'all' || activeCategory.value === 'style')
)

const visibleSections = computed(() =>
  CATEGORIES.slice(1)
    .map((cat) => ({
      ...cat,
      items: filteredItems.value.filter((item) => item.cat === cat.id)
    }))
    .filter((section) => section.items.length > 0)
)

function handleCopyCard(item) {
  const prefix = item.code ? `${item.code} ` : ''
  copyText(item.prompt, `已复制「${prefix}${item.name}」参数规格话术`)
}

function resetFilters() {
  searchQuery.value = ''
  setCategory('all')
}
</script>

<template>
  <div class="app-shell">
    <HeroHeader />
    <FilterToolbar />

    <main class="main">
      <div class="container">
      <PresetShowcaseStrip v-if="showPresetStrip" />

      <template v-if="visibleSections.length > 0">
        <section
          v-for="section in visibleSections"
          :key="section.id"
          class="category-section"
        >
          <div class="cat-header">
            <div class="cat-title-group">
              <h2 class="cat-title">{{ section.sectionTitle }}</h2>
              <span class="cat-count">{{ section.items.length }}</span>
            </div>
            <span v-if="section.sectionDesc" class="cat-desc">{{ section.sectionDesc }}</span>
          </div>

          <div class="grid">
            <CatalogCard
              v-for="item in section.items"
              :key="item.id"
              :item="item"
              :selected="isSelected(item.id)"
              :replay-tick="replayTick"
              @toggle="toggleSelect"
              @copy="handleCopyCard"
            />
          </div>
        </section>
      </template>

      <div v-else class="empty-state">
        <p>没有找到匹配的版式或动效，换个关键词试试（比如：S-08、Intercom、读条、流光、跑马灯）</p>
        <button type="button" class="reset-btn" @click="resetFilters">
          <RotateCcw :size="14" :stroke-width="1.8" aria-hidden="true" />
          <span>重置筛选条件</span>
        </button>
      </div>
      </div>
    </main>

    <ComboFloatingBar />
    <PageBlueprintDrawer />
    <CompetitorPromptModal />
    <ToastNotice />
  </div>
</template>

<style scoped>
.main {
  padding: 28px 24px 64px;
}

.category-section {
  margin-bottom: 56px;
}

.category-section:last-of-type {
  margin-bottom: 16px;
}

.cat-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
}

.cat-title-group {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
}

.cat-title {
  font-size: 17.5px;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--text);
}

.cat-count {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}

.cat-desc {
  font-size: 12.5px;
  color: var(--text-muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.empty-state {
  text-align: center;
  padding: 64px 20px;
  background: var(--surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 13.5px;
}

.reset-btn {
  margin-top: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  padding: 7px 14px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.18s ease, background 0.18s ease;
}

.reset-btn:hover {
  border-color: var(--border-strong);
  background: var(--surface-soft);
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .main {
    padding: 20px 16px 48px;
  }

  .category-section {
    margin-bottom: 40px;
  }
}
</style>
