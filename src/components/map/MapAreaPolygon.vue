<template>
  <LLayerGroup>
    <LMarker
      v-for="(marker, index) in geometry"
      :key="index"
      data-number="index"
      :draggable="drawable"
      :lat-lng="marker"
      @dragend="$emit('drag', $event.target.getLatLng(), index)"
    >
      <LIcon class-name="marker" :icon-size="[40, 40]" :icon-anchor="[20, 40]" :icon-url="icon">
        <div class="marker-text">{{ index + 1 }}</div>
        <img class="marker-icon" :src="icon" alt="" />
      </LIcon>
    </LMarker>

    <LPolygon :key="geometry.length" :fill="true" :lat-lngs="geometry" :color="polygonColor" />
  </LLayerGroup>
</template>

<script setup lang="ts">
import { LIcon, LLayerGroup, LMarker, LPolygon } from '@vue-leaflet/vue-leaflet';
import { computed } from 'vue';
import L from 'leaflet';

defineProps<{ geometry: L.LatLngExpression[]; drawable: boolean }>();

defineEmits<{
  (e: 'drag', latlng: L.LatLng, index: number): void;
}>();

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    new URL('@/assets/img/map-icons/geo-markers/', import.meta.url).pathname +
    '/' +
    import.meta.env.VITE_THEME +
    '.svg',
  iconUrl:
    new URL('@/assets/img/map-icons/geo-markers/', import.meta.url).pathname +
    '/' +
    import.meta.env.VITE_THEME +
    '.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});
L.Icon.Default;

const polygonColor = computed(() => {
  switch (import.meta.env.VITE_THEME) {
    case 'apok':
      return '#46a1bf';
    case 'avim':
      return '#899cc5';
    default:
      return '#6BA2A6';
  }
});

const icon = computed(() => {
  return (
    new URL('@/assets/img/map-icons/geo-markers/', import.meta.url).pathname +
    '/' +
    import.meta.env.VITE_THEME +
    '.svg'
  );
});
</script>

<style lang="scss" scoped>
.marker {
  background: none;
  border: none;
  &-text {
    color: $color-main-dark;
    font-size: 16px;
    position: absolute;
    top: 45%;
    font-weight: 700;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &-icon {
    width: 40px;
    height: 40px;
    pointer-events: none;
  }
}
</style>
