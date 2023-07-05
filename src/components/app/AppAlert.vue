<template>
  <div class="alert" :class="theme">
    <div class="alert__badge">
      <i
        v-if="theme == 'error'"
        class="icon icon-ic_fluent_error_circle_20_regular"
      ></i>
      <i
        v-else-if="theme == 'success'"
        class="icon icon-ic_fluent_checkmark_circle_20_regular"
      ></i>
      <i v-else class="icon icon-ic_fluent_info_20_regular"></i>
    </div>
    <div class="alert__content">
      <h5 class="alert__title">{{ title }}</h5>
      <div class="alert__text">{{ message }}</div>
    </div>
    <div class="alert__cross" @click="$emit('close')">
      <i class="icon icon-ic_fluent_dismiss_20_regular"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Alert } from '@/models/Alert';
defineProps<{title: Alert["title"], theme: Alert["theme"], message: Alert["message"]}>()
</script>

<style scoped lang="scss">
.alert {
  position: relative;
  width: 420px;
  border-radius: 10px;
  box-shadow: $shadow-big;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }
  &.error {
    .alert {
      &__badge {
        background: $color-red;
      }
    }
  }
  &.success {
    .alert {
      &__badge {
        background: $color-green;
      }
    }
  }
  &.info {
    .alert {
      &__badge {
        background: $color-main;
      }
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 auto;
    background: #fff;
    padding: 5px 30px 5px 10px;
  }
  &__badge {
    min-height: 50px;
    min-width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      font-size: 32px;

      color: #fff;
    }
  }
  &__title {
    margin: 0;
    line-height: 1.5;
    color: $text-grey;
    font-weight: 500;
    font-size: 16px;
  }

  &__text {
    color: $text-grey;
    font-weight: 400;
    font-size: 12px;
  }

  &__cross {
    display: flex;
    position: absolute;
    right: 5px;
    top: 5px;
    color: $text-grey;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
