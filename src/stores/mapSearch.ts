import { defineStore, acceptHMRUpdate } from 'pinia';
import { computed, ref } from 'vue';
import * as coordinatesParses from '@/helpers/coordinates';
import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import type { AreaPolygon, CirclePolygon, FilePolygon } from '@/models/SearchMapPolygon';
export const useMapSearchStore = defineStore('mapSearch', () => {
  const areaPolygon = ref<AreaPolygon>({
    geometry: null,
    drawable: false,
    active: true,
  });
  const circlePolygon = ref<CirclePolygon>({
    geometry: null,
    drawable: false,
    active: false,
    center: {},
  });
  const filePolygon = ref<FilePolygon>({
    geometry: null,
    active: false,
  });

  const getActivePolygonJson = computed(() => {
    let json = null;
    if (areaPolygon.value.active && areaPolygon.value.geometry) {
      json = areaPolygon.value.geometry.toGeoJSON();
    } else if (circlePolygon.value.active && circlePolygon.value.geometry) {
      const circle = circlePolygon.value.geometry;
      json = L.PM.Utils.circleToPolygon(circle, 60).toGeoJSON();
    } else if (filePolygon.value.active && filePolygon.value.geometry) {
      json = filePolygon.value.geometry.toGeoJSON();
    } else {
      return null;
    }
    return JSON.stringify(json);
  });

  const getAreaPolygonFormattedCoordinates = computed(() => {
    return areaPolygon.value.geometry?.getLatLngs().map((el: L.LatLngLiteral) => {
      return {
        lat: coordinatesParses.parseLatToDegrees(el.lat),
        lng: coordinatesParses.parseLngToDegrees(el.lng),
      };
    });
  });

  const addCoordinate = (coordinate: L.LatLng) => {
    areaPolygon.value.geometry?.addLatLng(coordinate);
  };

  const deleteCoordinate = (index: number) => {
    areaPolygon.value.geometry?.setLatLngs(areaPolygon.value.geometry.getLatLngs());
  };

  const changeCoordinate = (index: number, coordinate: L.LatLng) => {
    areaPolygon.value!.geometry![index] = coordinate;
  };
  const clearCoordinates = () => {
    areaPolygon.value.geometry = [];
  };
  const setCircleCenter = (coordinate: L.LatLng) => {
    if (circlePolygon.value.geometry == null) {
      circlePolygon.value.geometry = L.circle(coordinate);
    } else {
      circlePolygon.value.geometry.setLatLng(coordinate);
    }
  };

  const activePolygonFitBounds = () => {
    if (getActivePolygonJson.value) {
      const geoJson = L.geoJSON(JSON.parse(getActivePolygonJson.value));
      const bounds = geoJson.getBounds();
      // commit("setBounds", bounds);
      // commit('setZoom', {value: getters.getZoom - 1});
      // commit("setNeedUpdateBounds", true);
    }
  };

  const activateAreaPolygon = () => {
    areaPolygon.value.active = true;
    circlePolygon.value.active = false;
    filePolygon.value.active = false;
    activePolygonFitBounds();
  };

  const activateCirclePolygon = () => {
    areaPolygon.value.active = false;
    circlePolygon.value.active = true;
    filePolygon.value.active = false;
    activePolygonFitBounds();
  };

  const activateFilePolygon = () => {
    areaPolygon.value.active = false;
    circlePolygon.value.active = false;
    filePolygon.value.active = true;
    activePolygonFitBounds();
  };

  const removeFilePolygon = () => {
    filePolygon.value.geometry = null;
  };

  const removeCirclePolygon = () => {
    circlePolygon.value.geometry = null;
  };

  const clearPolygons = () => {
    removeFilePolygon();
    removeCirclePolygon();
    clearCoordinates();
  };

  return {
    areaPolygon,
    circlePolygon,
    filePolygon,
    getActivePolygonJson,
    getAreaPolygonFormattedCoordinates,
    addCoordinate,
    deleteCoordinate,
    changeCoordinate,
    clearCoordinates,
    setCircleCenter,
    activePolygonFitBounds,
    activateAreaPolygon,
    activateCirclePolygon,
    activateFilePolygon,
    removeFilePolygon,
    removeCirclePolygon,
    clearPolygons,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapSearchStore, import.meta.hot));
}

