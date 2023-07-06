<template>
  <LLayerGroup>
    <LMarker
      data-number="id"
      :draggable="drawable"
      @dragend="$emit($event, id)"
      v-for="(marker, id) in geometry"
      :key="id"
      :lat-lng="marker"
    >
      <LIcon :icon-size="[40, 40]" :icon-anchor="[20, 40]" :icon-url="icon">
        <div class="marker-text">{{ id + 1 }}</div>
        <img style="pointer-events: none" :src="icon" alt="" />
      </LIcon>
    </LMarker>

    <LPolygon
      @click="save"
      :key="geometry.length "
      :fill="true"
      :lat-lngs="geometry"
      :color="polygonColor"
    />
  </LLayerGroup>
</template>

<script setup lang="ts">
import type { AreaPolygon } from '@/models/SearchMapPolygon';
import { LIcon, LLayerGroup, LMarker, LPolygon } from '@vue-leaflet/vue-leaflet';
import { computed, ref, watch } from 'vue';
const props = defineProps<{ geometry: L.LatLngExpression[], drawable: boolean }>();
console.log(props.geometry);

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

// watch(props.polygon, () => {
//   points.value = (props.polygon.geometry!.map(el => {
//     const c = el as L.LatLng;
//     return {
//       lat: c.lat,
//       lng: c.lng
//     }
//   });
//   console.log(points.value);
// }, {deep: true  })

const save = () => {
  // let json = props.polygon.geometry!.toGeoJSON();
  // let string = JSON.stringify(json);
  // console.log(string);

  // L.extend(json.properties, polygon.properties);
  // console.log(string);

  // let options = {
  //   folder: "myshapes",
  //   types: {
  //     polygon: "POLYGON",
  //   },
  // };
  // console.log(
  //   SHP.download(
  //     {
  //       type: "FeatureCollection",
  //       features: [json],
  //     },
  //     options
  //   )
  // );
};

// import * as L from "leaflet";
// import { LMarker, LPolygon, LIcon, LLayerGroup } from "vue2-leaflet";

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("@/assets/img/map-icons/geo-markers/" +
//     process.env.VUE_APP_THEME +
//     ".svg"),
//   iconUrl: require("@/assets/img/map-icons/geo-markers/" +
//     process.env.VUE_APP_THEME +
//     ".svg"),
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
//   popupAnchor: null,
//   shadowUrl: null,
//   shadowSize: null,
//   shadowAnchor: null,
// });
// L.Icon.Default;

// export default {
//   props: ["drawable", "polygon", ""],
//   components: {
//     LMarker,
//     LIcon,
//     LPolygon,
//     LLayerGroup,
//   },
//   computed: {
//     icon() {
//       return require("@/assets/img/map-icons/geo-markers/" +
//         process.env.VUE_APP_THEME +
//         ".svg");
//     },
//     polygonColor() {
//       switch (process.env.VUE_APP_THEME) {
//         case "apok":
//           return "#46a1bf";
//         case "avim":
//           return "#899cc5";
//         default:
//           return "#6BA2A6";
//       }
//     },
//   },
//   methods: {
//     save() {
//       let polygon = L.polygon(this.polygon.geometry);
//       let json = polygon.toGeoJSON();
//       let string = JSON.stringify(json);
//       console.log(string);

//       // L.extend(json.properties, polygon.properties);
//       // console.log(string);

//       // let options = {
//       //   folder: "myshapes",
//       //   types: {
//       //     polygon: "POLYGON",
//       //   },
//       // };
//       // console.log(
//       //   SHP.download(
//       //     {
//       //       type: "FeatureCollection",
//       //       features: [json],
//       //     },
//       //     options
//       //   )
//       // );
//     },
//   },
</script>
