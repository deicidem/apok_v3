<template>
  <div class="hero">
    <AppHeader :show-menu="showMenu" ref="header"/>
    <div class="content" :style="height">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/app/AppHeader.vue";
import { computed, onMounted, ref } from "vue";
defineProps({
  showMenu: {
      type: Boolean,
      default: true,
  },
})

const didMount = ref<boolean>();
const header = ref<typeof AppHeader>();
const height = computed(() => {
  if (didMount.value) {
        return {
          maxHeight: "100%"
            // "calc(100% - " + header.value?.re.offsetHeight + "px)",
        };
      } else {
        return { maxHeight: "auto" };
      }
})

onMounted(() => {
  didMount.value = true;

})
</script>

<style>
.hero {
  height: 100%;
}
</style>
