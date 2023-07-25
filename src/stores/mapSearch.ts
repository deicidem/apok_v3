import { defineStore, acceptHMRUpdate } from 'pinia';
import { computed, reactive, ref } from 'vue';
import * as coordinatesParses from '@/helpers/coordinates';
import L from 'leaflet';
import type { AreaPolygon, CirclePolygon, FilePolygon } from '@/models/SearchMapPolygon';
import circleToPolygon from '@/helpers/circleToPolygon';

export const useMapSearchStore = defineStore('mapSearch', () => {
  const areaPolygon: AreaPolygon = reactive({
    geometry: [],
    drawable: false,
    active: true,
  });
  const circlePolygon: CirclePolygon = reactive({
    geometry: null,
    drawable: false,
    active: false,
    center: {},
  });
  const filePolygon: FilePolygon = reactive({
    geometry: null,
    active: false,
  });

  const activePolygonJson = computed(() => {
    let json = null;
    if (areaPolygon.active && areaPolygon.geometry) {
      json = L.polygon(areaPolygon.geometry).toGeoJSON();
    } else if (circlePolygon.active && circlePolygon.geometry) {
      const circle: L.Circle<any> = circlePolygon.geometry as L.Circle;
      json = circleToPolygon(circle).toGeoJSON();
    } else if (filePolygon.active && filePolygon.geometry) {
      json = filePolygon.geometry.toGeoJSON();
    } else {
      return null;
    }
    return JSON.stringify(json);
  });

  const areaPolygonFormattedCoordinates = computed(() => {
    return areaPolygon.geometry.map((el) => {
      const coordinate = el as L.LatLngLiteral;
      return {
        lat: coordinatesParses.parseLatToDegrees(coordinate.lat),
        lng: coordinatesParses.parseLngToDegrees(coordinate.lng),
      };
    });
  });

  function addCoordinate(coordinate: L.LatLng) {
    // if (areaPolygon.geometry == null)  {
    //   areaPolygon.geometry = new L.Polygon<L.LatLngLiteral>([]);
    // } else {
    areaPolygon.geometry = [...areaPolygon.geometry, coordinate];
    // }
  }

  function deleteCoordinate(index: number) {
    areaPolygon.geometry?.splice(index, 1);
  }

  function changeCoordinate(index: number, coordinate: L.LatLng) {
    areaPolygon.geometry = areaPolygon.geometry.map((el, i) => (i == index ? coordinate : el));
  }
  function clearCoordinates() {
    areaPolygon.geometry = [];
  }
  function setCircleCenter(coordinate: L.LatLng) {
    if (circlePolygon.geometry == null) {
      circlePolygon.geometry = L.circle(coordinate);
    } else {
      circlePolygon.geometry.setLatLng(coordinate);
    }
  }

  function activePolygonFitBounds() {
    if (activePolygonJson.value) {
      const geoJson = L.geoJSON(JSON.parse(activePolygonJson.value));
      const bounds = geoJson.getBounds();
      // commit("setBounds", bounds);
      // commit('setZoom', {value: getters.getZoom - 1});
      // commit("setNeedUpdateBounds", true);
    }
  }

  function activateAreaPolygon() {
    areaPolygon.active = true;
    circlePolygon.active = false;
    filePolygon.active = false;
    activePolygonFitBounds();
  }

  function activateCirclePolygon() {
    areaPolygon.active = false;
    circlePolygon.active = true;
    filePolygon.active = false;
    activePolygonFitBounds();
  }

  function activateFilePolygon() {
    areaPolygon.active = false;
    circlePolygon.active = false;
    filePolygon.active = true;
    activePolygonFitBounds();
  }

  function removeFilePolygon() {
    filePolygon.geometry = null;
  }

  function removeCirclePolygon() {
    circlePolygon.geometry = null;
  }

  function clearPolygons() {
    removeFilePolygon();
    removeCirclePolygon();
    clearCoordinates();
  }

  return {
    areaPolygon,
    circlePolygon,
    filePolygon,
    activePolygonJson,
    areaPolygonFormattedCoordinates,
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
