<template>
  <div class="hero">
    <AppHeader ref="header" :show-menu="showMenu" />
    <div class="content" :style="height">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/app/AppHeader.vue';
import { computed, onMounted, ref } from 'vue';
defineProps({
  showMenu: {
    type: Boolean,
    default: true,
  },
});

const didMount = ref<boolean>(false);
const header = ref<InstanceType<typeof AppHeader>>();
const height = computed(() => {
  const el = header.value;
  console.log(el);

  if (didMount.value) {
    return {
      maxHeight: 'calc(100% - ' + header.value?.header?.offsetHeight + 'px)',
    };
  } else {
    return { maxHeight: 'auto' };
  }
});

onMounted(() => {
  didMount.value = true;
});
</script>

<style>
.hero {
  height: 100%;
}
</style>
