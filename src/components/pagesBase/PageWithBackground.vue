<template>
  <PageBase :show-menu="false">
    <section class="page">
      <slot></slot>
    </section>
  </PageBase>
</template>

<script setup lang="ts">
import PageBase from '@/components/pagesBase/PageBase.vue';
</script>

<style lang="scss" scoped>
.page {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: $background-image;
  background-size: cover;
}
</style>
