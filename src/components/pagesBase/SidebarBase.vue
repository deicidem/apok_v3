<template>
  <div class="c">
    <header class="c-header">
      <slot name="header"></slot>
    </header>

    <slot name="popups"></slot>

    <AppLoader
      v-show="!loaded"
      :loader-size="100"
      class="absolute bottom-2/3 right-2/4 translate-x-2/4 translate-y-2/4"
    />

    <vuescroll v-show="loaded" :ops="scrollOps">
      <slot name="content"></slot>
    </vuescroll>
  </div>
</template>

<script setup lang="ts">
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
import AppLoader from '@/components/controls/AppLoader.vue';
import { useComponentsStore } from '@/stores/components';
import { storeToRefs } from 'pinia';

defineProps<{ loaded: boolean }>();

const { scrollOps } = storeToRefs(useComponentsStore());
</script>

<style lang="scss" scoped>
.c {
  display: flex;
  flex-direction: column;
  max-height: 100%;

  &-header {
    position: relative;
    margin: 0;
    padding: 6px;
    background: $gradient;
    box-shadow: $shadow-small;
  }

  &-title {
    margin: 0;
    color: $white;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
  }
}

:slotted(.c-title) {
  margin: 0;
  color: $white;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
}

.__rail-is-vertical {
  bottom: 5px !important;
  top: 5px !important;
  right: 5px !important;
}

@media screen and (max-width: 1440px) {
  .c {
    &-title {
      font-size: 16px;
    }
  }
}
</style>
