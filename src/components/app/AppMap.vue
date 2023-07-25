<template>
  <div class="absolute right-0 top-0 z-10 h-full w-full ml-auto">
    <LMap
      ref="map"
      class="absolute right-0 top-0 z-10 h-full w-full ml-auto"
      :center="[47.41322, -1.219482]"
      :zoom="3"
      :options="{ attributionControl: false }"
      @ready="onReady"
      @click="onClick($event)"
    >
      <LTileLayer :url="url" />
      <LControlZoom position="bottomleft" />

      <MapAreaPolygon
        v-if="areaPolygon.active && areaPolygon.geometry"
        :geometry="areaPolygon.geometry"
        :drawable="areaPolygon.drawable"
        @drag="onMarkerMove"
      />
    </LMap>
  </div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import { useConfigsStore } from '@/stores/configs';
import { useMapSearchStore } from '@/stores/mapSearch';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { LMap, LTileLayer, LControlZoom } from '@vue-leaflet/vue-leaflet';
import type { LeafletMouseEvent } from 'leaflet';
import MapAreaPolygon from '@/components/map/MapAreaPolygon.vue';

const emit = defineEmits<{
  (e: 'ready', ref: typeof LMap): void;
}>();

const polygonsStore = useMapSearchStore();
const { areaPolygon } = storeToRefs(polygonsStore);
const url = storeToRefs(useConfigsStore()).configsMap.value['open_street_maps_server'].value;
const map = ref<typeof LMap>();

const onClick = ($event: LeafletMouseEvent) => {
  if (map.value!.$el.isEqualNode($event.originalEvent.target) && areaPolygon.value.drawable) {
    polygonsStore.addCoordinate($event.latlng);
  }
};

const onMarkerMove = (latlng: L.LatLng, index: number) => {
  polygonsStore.changeCoordinate(index, latlng);
};

const onReady = () => {
  emit('ready', map.value as typeof LMap);
};
</script>

<style lang="scss">
.view-image {
  object-position: top left;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.resize-line {
  stroke: #f59927;
  stroke-width: 4px;
  stroke-linejoin: round;
  cursor: ew-resize;
  &.horizontal {
    cursor: ns-resize;
  }
}
.leaflet-control-zoom {
  border: none !important;
  background: #fff !important;
  box-shadow: $shadow-small !important;
  border-radius: 7px !important;
}
</style>

<style lang="scss" scoped>
.marker-text {
  color: $color-main-dark;
  font-size: 16px;
  position: absolute;
  top: 45%;
  font-weight: 700;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
