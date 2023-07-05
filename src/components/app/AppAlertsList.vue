<template>
  <div class="alerts">
    <transition-group class="alerts-list" tag="div" name="alert-item">
      <AppAlert
        v-for="item in alerts"
        :key="item.id"
        :title="item.title"
        :message="item.message"
        :theme="item.theme"
        class="alert-item"
        @close="$emit('delete', item.id)"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import AppAlert from '@/components/app/AppAlert.vue';
import type { Alert } from '@/models/Alert';
defineProps<{alerts: Array<Alert>}>()
</script>

<style lang="scss" scoped>
.alert-item-leave-to {
  opacity: 0;
}
.alert-item-enter {
  opacity: 0;
  transform: translateX(50px);
}
.alert-item-leave-active {
  z-index: -1;
  position: absolute;
}
.alert-item {
  transition: all 0.5s ease-out;
  will-change: transform;
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
    &.alert-item-leave-active {
      position: relative;
    }
  }
}
</style>