<template>
  <PageBase :show-menu="true">
    <div class="hero-wrapper">
      <section class="hero">
        <div class="sidebar-block" :class="sidebarBlock">
          <AppSidebar />
        </div>

        <div ref="wrap" class="map" :class="mapBlock">
          <AppMap @ready="setMapRef" @update-cursor-position="cursorPosition = $event" />
          <div class="cursor-position" v-if="cursorPosition">
            <span class="lat">Широта: {{ cursorPosition.lat }}</span>
            <span class="lng">Долгота: {{ cursorPosition.lng }}</span>
          </div>
        </div>
      </section>
    </div>
  </PageBase>
</template>

<script setup lang="ts">
import AppMap from '@/components/app/AppMap.vue';
import PageBase from '@/components/pagesBase/PageBase.vue';
// import AppMap from "@/components/map/AppMap.vue";
import AppSidebar from '@/components/app/AppSidebar.vue';
// import PageBase from "@/components/PageBase.vue";
// import { mapGetters, mapActions } from "vuex";
import { useComponentsStore } from '@/stores/components';
import { storeToRefs } from 'pinia';
import { nextTick, onMounted, ref, watch } from 'vue';
import type { LMap } from '@vue-leaflet/vue-leaflet';
const sidebarBlock = ref<string>('collapsed');
const mapBlock = ref('');
const mapRef = ref<typeof LMap>();
const openTimer = ref<number>();
const closeTimer = ref<number>();
const cursorPosition = ref<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
const { sidebarActive } = storeToRefs(useComponentsStore());

const setMapRef = (ref: typeof LMap) => {
  mapRef.value = ref;
};

onMounted(() => {
  if (sidebarActive) {
    mapBlock.value = 'collapsed';
    sidebarBlock.value = '';
  } else {
    mapBlock.value = '';
    sidebarBlock.value = 'collapsed';
  }
});

watch(sidebarActive, () => {
  if (sidebarActive.value) {
    sidebarBlock.value = '';

    clearTimeout(closeTimer.value);

    openTimer.value = Number(
      setTimeout(() => {
        mapBlock.value = 'collapsed';
        nextTick(() => {
          mapRef.value?.leafletObject.invalidateSize();
        });
      }, 300),
    );
  } else {
    mapBlock.value = '';

    nextTick(() => {
      mapRef.value?.leafletObject.invalidateSize();
    });

    clearTimeout(openTimer.value);

    closeTimer.value = Number(
      setTimeout(() => {
        sidebarBlock.value = 'collapsed';
      }, 300),
    );
  }
});
</script>

<style lang="scss">
.cursor-position {
  background: #fff;
  box-shadow: $shadow-small;
  border-radius: 7px;
  padding: 5px 10px;
  position: absolute;
  left: 50px;
  bottom: 10px;
  z-index: 20;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  .lat,
  .lng {
    font-family: monospace;
    display: inline-block;
  }
  .lat {
    margin-right: 10px;
  }
}
.hero {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  &-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    box-shadow: $shadow-big;
  }
}

.map {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;

  height: 100%;
  width: 100%;
  max-width: calc(100% - 50px);
  margin-left: auto;

  &.collapsed {
    max-width: calc(100% - 800px);
  }
}

.sidebar-block {
  position: relative;
  z-index: 5;
  height: 100%;
  max-width: 800px;

  &.collapsed {
    box-shadow: $shadow-big;
    max-width: 50px;
  }
}

@media screen and (max-width: 1440px) {
  .sidebar-block {
    max-width: 650px;
  }

  .map {
    &.collapsed {
      max-width: calc(100% - 650px);
    }
  }
}
</style>
