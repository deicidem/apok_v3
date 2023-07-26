<template>
  <PageBase>
    <div class="page">
      <header class="page-header">
        <slot name="header"></slot>
      </header>
      <div class="page-content-wrapper">
        <vuescroll :ops="scrollOps">
          <div class="page-content">
            <slot name="content"></slot>
          </div>
        </vuescroll>
      </div>
    </div>
  </PageBase>
</template>

<script setup lang="ts">
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
import PageBase from '@/components/pagesBase/PageBase.vue';
import { storeToRefs } from 'pinia';
import { useComponentsStore } from '@/stores/components';

const { scrollOps } = storeToRefs(useComponentsStore());
</script>

<style lang="scss">
.page {
  position: relative;
  height: 100%;
  max-height: 100%;
  padding: 40px;
  box-shadow: $shadow-big;
  border-radius: 25px;
  overflow: hidden;
  background: $gradient-w;

  &-title {
    margin: 0 auto;
    font-size: 24px;
    color: $black;
    font-weight: 400;
    display: flex;
    align-items: center;
  }

  &-content {
    padding: 10px 50px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    &-wrapper {
      padding: 30px 0 30px 0;
      margin: 0 auto;
      height: 100%;
      max-width: 1700px;
    }
  }

  &-header {
    display: flex;
    justify-content: space-between;
    margin: 4px auto;
    max-width: 1600px;
  }

  &-button {
    height: 45px;
    width: 270px;
    font-size: 1.125rem;
  }
}

@media screen and (max-width: 1440px) {
  .plan {
    height: 700px;

    &-title {
      font-size: 18px;
    }

    &-wrapper {
      max-width: 1200px;

      &__header {
        max-width: 1200px;
      }
    }
  }
}
</style>
