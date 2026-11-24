<script setup>
defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false }
})
</script>

<template>
  <div class="layout-s03" :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }">
    <div class="ma-row">
      <div class="ma-txt">
        <span class="ma-tag">01 智能分流</span>
        <div class="ma-t"></div>
        <div class="ma-l"></div>
        <div class="ma-l short"></div>
      </div>
      <div class="ma-img">功能图 01</div>
    </div>
    <div class="ma-row is-reverse">
      <div class="ma-img">功能图 02</div>
      <div class="ma-txt">
        <span class="ma-tag">02 实时翻译</span>
        <div class="ma-t"></div>
        <div class="ma-l"></div>
        <div class="ma-l short"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-s03 {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ma-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 11px 14px;
  box-shadow: var(--shadow-sm);
  box-sizing: border-box;
}

.ma-txt {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.ma-tag {
  font-size: 10px;
  font-weight: 700;
  color: var(--primary);
  line-height: 1.25;
}

.ma-t {
  height: 8px;
  width: 78%;
  border-radius: 3px;
  background: #1e293b;
}

.ma-l {
  height: 5.5px;
  width: 100%;
  border-radius: 3px;
  background: var(--border-strong);
}

.ma-l.short {
  width: 68%;
}

.ma-img {
  height: 48px;
  border-radius: 7px;
  background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
  border: 1px solid #c7d2fe;
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 700;
  color: var(--primary);
  min-width: 0;
}

.layout-s03.is-compact {
  gap: 6px;
}

.layout-s03.is-compact .ma-row {
  padding: 8px 10px;
  gap: 8px;
}

.layout-s03.is-compact .ma-img {
  height: 36px;
  font-size: 10px;
}

.layout-s03.is-mobile {
  gap: 7px;
}

.layout-s03.is-mobile .ma-row {
  grid-template-columns: 1fr;
  padding: 9px 10px;
  gap: 7px;
}

.layout-s03.is-mobile .ma-img {
  order: -1;
  height: 36px;
  font-size: 10px;
}
</style>
