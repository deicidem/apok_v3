<template>
  <div class="absolute right-0 top-0 z-10 h-full w-full ml-auto">
    <!-- <div class="cursor-position" v-if="cursorPosition">
      <span class="lat">Широта: {{ cursorPosition.lat }}</span>
      <span class="lng">Долгота: {{ cursorPosition.lng }}</span>
    </div> -->
    <LMap
      class="absolute right-0 top-0 z-10 h-full w-full ml-auto"
      ref="map"
    >
      <LTileLayer :url="url" :attribution="attribution" />
      <LControlZoom position="bottomleft" />

      <MapAreaPolygon v-if="polygon.active"
        :polygon="polygon"
        :drawable="drawable"
      />

    </LMap>
  </div>
</template>

<script setup lang="ts">
import { useConfigsStore } from '@/stores/configs';
import { useMapSearchStore } from '@/stores/mapSearch';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const attribution = ref('&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors"');

const polygonsStore = useMapSearchStore();
const {areaPolygon} = storeToRefs(polygonsStore);
const url = storeToRefs(useConfigsStore()).getConfigsMap.value["open_street_maps_server"]

const polygonColor = computed(() => {
  switch (import.meta.env.VITE_THEME) {
    case "apok":
      return "#46a1bf";
    case "avim":
      return "#899cc5";
    default:
      return "#6BA2A6";
  }
})

const icon = computed(() => {
  return (
    new URL('@/assets/img/map-icons/geo-markers/', import.meta.url).pathname + '/' + import.meta.env.VITE_THEME + '.svg'
  )
})

// import { mapGetters, mapActions } from "vuex";
// import { parseLatToDegrees, parseLngToDegrees } from "@/helpers/coordinates";
// // import * as SHP from "shp-write";
// import "leaflet/dist/leaflet.css";
// import * as L from "leaflet";
// import {
//   LMap,
//   LTileLayer,
//   LMarker,
//   LIcon,
//   LImageOverlay,
//   LGeoJson,
//   LCircle,
//   LControlZoom,
//   LControl,
//   LPolyline,
//   LPolygon,
// } from "vue2-leaflet";
// // import MapAreaPolygon from '@/components/map/MapAreaPolygon.vue';
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
//   name: "AppMap",
//   components: {
//     LMap,
//     LTileLayer,
//     LMarker,
//     LIcon,
//     LImageOverlay,
//     LPolyline,
//     LGeoJson,
//     LCircle,
//     LControlZoom,
//     LControl,
//     LPolygon,
//     // MapAreaPolygon
//   },
//   data() {
//     return {
//       attribution:
//         '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
//       cursorPosition: null,
//       cursorUpdate: null,
//       lineActive: null,
//       lineActiveIndex: null,
//     };
//   },
//   computed: {
//     ...mapGetters("map", {
//       polygon: "getAreaPolygon",
//       drawable: "getAreaPolygonDrawable",
//       center: "getCenter",
//       bounds: "getBounds",
//       zoom: "getZoom",
//       circle: "getCirclePolygon",
//       geoJsons: "getGeoJsonPolygons",
//       images: "getImages",
//       viewImages: "getViewImages",
//       filePolygon: "getFilePolygon",
//       needUpdateBounds: "getNeedUpdateBounds",
//       mapHasObjects: "mapHasObjects",
//     }),

//     ...mapGetters("configs", ["getConfigsMap"]),

//     url() {
//       return this.getConfigsMap["open_street_maps_server"];
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

//     icon() {
//       return require("@/assets/img/map-icons/geo-markers/" +
//         process.env.VUE_APP_THEME +
//         ".svg");
//     },

//     maxBounds() {
//       return L.latLngBounds([
//         [-90, -180],
//         [90, 180],
//       ]);
//     },

//     // Активные шторки активных viewImages
//     activeSliders() {
//       return this.viewImages
//         .map((el, i) => ({ data: el, index: i }))
//         .filter((el) => el.data.sliderActive);
//     },
//     // Активные viewImages
//     activeViewImages() {
//       return this.viewImages
//         .map((el, i) => ({ data: el, index: i }))
//         .filter((el) => el.data.active);
//     },
//     // Координаты шторки в зависимости от того вертикальная она или горизонтальная
//     sliderLatLng: () => (img) => {
//       if (img.sliderHorizontal) {
//         return [
//           {
//             lng: img.bounds._southWest.lng,
//             lat: img.sliderCoordinate ?? img.bounds._southWest.lat,
//           },
//           {
//             lng: img.bounds._northEast.lng,
//             lat: img.sliderCoordinate ?? img.bounds._southWest.lat,
//           },
//         ];
//       }
//       return [
//         {
//           lng: img.sliderCoordinate ?? img.bounds._northEast.lng,
//           lat: img.bounds._northEast.lat,
//         },
//         {
//           lng: img.sliderCoordinate ?? img.bounds._northEast.lng,
//           lat: img.bounds._southWest.lat,
//         },
//       ];
//     },
//   },
//   methods: {
//     ...mapActions("map", [
//       "addCoordinate",
//       "changeCoordinate",
//       "setCenter",
//       "setZoom",
//       "setBounds",
//       "setNeedUpdateBounds",
//       "setCircleCenter",
//       "updateViewImage",
//       "clearMap",
//     ]),

//     onReady(e) {
//       this.$emit("ready", this.$refs.map);
//       this.setBounds(e.getBounds());
//     },

//     // Отключение перемещения карты при перемещении шторки
//     onSetLineState(e, value, i = 0) {
//       if (value) {
//         this.$refs.map.mapObject.dragging.disable();
//       } else {
//         this.$refs.map.mapObject.dragging.enable();
//       }
//       this.lineActive = value;
//       this.lineActiveIndex = i;
//     },

//     // Перемещение шторки
//     onMouseMove(e) {
//       if (this.lineActive) {
//         let i = this.lineActiveIndex;
//         let image = this.$refs.viewImages[i].mapObject._image;
//         let viewImage = this.viewImages[i];

//         // Если выходит за рамки то ничего не делаем
//         if (!viewImage.bounds.contains(e.latlng)) {
//           return;
//         }

//         let northEast = viewImage.bounds._northEast;
//         let southWest = viewImage.bounds._southWest;
//         let center = viewImage.bounds.getCenter();

//         if (viewImage.sliderHorizontal) {
//           let top = new L.LatLng(northEast.lat, center.lng);
//           let bottom = new L.LatLng(southWest.lat, center.lng);

//           let absolute = top.distanceTo(bottom);
//           let sliderCoordinate = e.latlng.lat;

//           // Координата текущего положения шторки
//           let currentCentered = new L.LatLng(sliderCoordinate, center.lng);

//           let current = top.distanceTo(currentCentered);

//           // положение шторки относительно верха изображения
//           let k = current / absolute;
//           image.style.height = viewImage.initialHeight * k + "px";

//           // меняем координату шторки
//           this.updateViewImage({
//             index: i,
//             width: viewImage.initialWidth,
//             height: viewImage.initialHeight,
//             lng: sliderCoordinate,
//           });
//         } else {
//           let left = new L.LatLng(center.lat, southWest.lng);
//           let right = new L.LatLng(center.lat, northEast.lng);

//           let absolute = left.distanceTo(right);

//           let sliderCoordinate = e.latlng.lng;

//           // Координата текущего положения шторки
//           let currentCentered = new L.LatLng(center.lat, sliderCoordinate);
//           let current = left.distanceTo(currentCentered);

//           // положение шторки относительно левого края изображения
//           let k = current / absolute;
//           image.style.width = viewImage.initialWidth * k + "px";

//           // меняем координату шторки
//           this.updateViewImage({
//             index: i,
//             width: viewImage.initialWidth,
//             height: viewImage.initialHeight,
//             lng: sliderCoordinate,
//           });
//         }
//       }

//       let lat = parseLatToDegrees(e.latlng.lat);
//       let lng = parseLngToDegrees(e.latlng.lng);
//       // return {lat, lng}
//       // console.log(lat, lng);
//       // // return { lat, lng };
//       // // if (this.cursorUpdate == null) {
//       // this.cursorPosition = { lat, lng };
//       // this.cursorUpdate = Date.now();
//       // } else {
//       // if (Date.now() - this.cursorUpdate > 100) {
//       this.$emit("updateCursorPosition", { lat, lng });
//       // this.cursorUpdate = Date.now();
//       // }
//       // }
//     },

//     onSetZoom($event) {
//       if (this.zoom == $event) {
//         return;
//       }
//       this.setZoom($event);

//       this.viewImages.forEach((el, i) => {
//         this.onUpdateViewImage(i);
//       });
//     },

//     // Обновление слайдера после отрисовки изображения
//     onUpdateViewImage(i) {
//       let viewImage = this.viewImages[i];
//       let image = this.$refs.viewImages[i].mapObject._image;
//       console.log(this.$refs.viewImages[i].mapObject.getElement());
//       // if (viewImage.initialWidth == null) {
//       //   this.updateViewImage({
//       //     index: i,
//       //     width: image.width,
//       //     height: image.height,
//       //     lng: viewImage.sliderCoordinate,
//       //   });
//       // }
//       if (viewImage.sliderActive) {
//         let northEast = viewImage.bounds._northEast;
//         let southWest = viewImage.bounds._southWest;
//         let center = viewImage.bounds.getCenter();

//         if (viewImage.sliderHorizontal) {
//           this.$refs.lines[i]?.mapObject._path.classList.add("horizontal");

//           let top = new L.LatLng(northEast.lat, center.lng);
//           let bottom = new L.LatLng(southWest.lat, center.lng);
//           let absolute = top.distanceTo(bottom);

//           let currentCentered = new L.LatLng(
//             viewImage.sliderCoordinate ?? southWest.lat,
//             center.lng
//           );

//           let current = top.distanceTo(currentCentered);
//           let k = current / absolute;

//           this.updateViewImage({
//             index: i,
//             width: image.width,
//             height: image.height,
//             lng: viewImage.sliderCoordinate,
//           });

//           image.style.height = image.height * k + "px";
//         } else {
//           this.$refs.lines[i]?.mapObject._path.classList.remove("horizontal");

//           let left = new L.LatLng(center.lat, southWest.lng);
//           let right = new L.LatLng(center.lat, northEast.lng);
//           let absolute = left.distanceTo(right);

//           let currentCentered = new L.LatLng(
//             center.lat,
//             viewImage.sliderCoordinate ?? northEast.lng
//           );

//           let current = left.distanceTo(currentCentered);
//           let k = current / absolute;

//           this.updateViewImage({
//             index: i,
//             width: image.width,
//             height: image.height,
//             lng: viewImage.sliderCoordinate,
//           });
//           image.style.width = image.width * k + "px";
//           console.log(this.$refs.viewImages[i].mapObject.getElement());
//         }
//       } else {
//         this.updateViewImage({
//           index: i,
//           width: image.width,
//           height: image.height,
//           lng: viewImage.sliderCoordinate,
//         });
//       }
//     },

//     updateCenter(center) {
//       this.$refs.map.mapObject.invalidateSize();
//       this.setCenter(center);
//     },

//     updateBounds(bounds) {
//       this.setBounds(bounds);
//     },

//     // Добавление маркеров
//     onClick($event) {
//       if (this.$refs.map.$el.isEqualNode($event.originalEvent.target)) {
//         if (this.drawable) {
//           this.addCoordinate($event.latlng);
//         }
//       }
//       if (this.circle.drawable) {
//         this.setCircleCenter($event.latlng);
//       }
//     },

//     // Изменение размеров полигона
//     handleMarkerDragEnd($event, id) {
//       if (this.drawable) {
//         this.changeCoordinate({ id, latlng: $event.target._latlng });
//       }
//     },

//     handleMarkerDrag($event, id) {
//       if (this.drawable) {
//         this.changeCoordinate({ id, latlng: $event.latlng });
//       }
//     },

//     // Сохранение файла
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
//   watch: {
//     needUpdateBounds(b, a) {
//       if (b) {
//         this.$refs.map.mapObject.flyToBounds(this.bounds, {
//           duration: 1.5,
//           maxZoom: this.$refs.map.mapObject.getBoundsZoom(this.bounds) - 1,
//         });
//         this.setNeedUpdateBounds(false);
//       }
//       return a;
//     },
//   },
// };
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
