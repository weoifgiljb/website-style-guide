<script setup>
import { useCatalogStore } from '../../composables/useCatalogStore.js'

const { toastVisible, toastMessage } = useCatalogStore()
</script>

<template>
  <div
    class="toast-notice"
    :class="{ show: toastVisible }"
    role="status"
    aria-live="polite"
  >
    {{ toastMessage }}
  </div>
</template>

<style scoped>
.toast-notice {
  position: fixed;
  bottom: 92px;
  left: 50%;
  transform: translate(-50%, 14px);
  opacity: 0;
  pointer-events: none;
  z-index: 120;
  background: #0f172a;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  padding: 10px 18px;
  border-radius: 999px;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.28);
  transition: opacity 0.24s var(--ease), transform 0.24s var(--ease);
}

.toast-notice.show {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>
