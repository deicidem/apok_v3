import { defineStore, acceptHMRUpdate } from 'pinia';
import { computed, reactive, ref } from 'vue';
import * as coordinatesParses from '@/helpers/coordinates';
import L from 'leaflet';
import type { AreaPolygon, CirclePolygon, FilePolygon } from '@/models/SearchMapPolygon';
import circleToPolygon from '@/helpers/circleToPolygon';


export const useMapSearchStore = defineStore('mapSearch', () => {
  const areaPolygon = reactive<AreaPolygon>({
    geometry: [],
    drawable: false,
    active: true,
  });
  const circlePolygon = reactive<CirclePolygon>({
    geometry: null,
    drawable: false,
    active: false,
    center: {},
  });
  const filePolygon = reactive<FilePolygon>({
    geometry: null,
    active: false,
  });

  const getActivePolygonJson = computed(() => {
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

  const getAreaPolygonFormattedCoordinates = computed(() => {
    return areaPolygon.geometry.map((el) => {
      const coordinate = el as L.LatLngLiteral;
      return {
        lat: coordinatesParses.parseLatToDegrees(coordinate.lat),
        lng: coordinatesParses.parseLngToDegrees(coordinate.lng),
      };
    });
  });

  const addCoordinate = (coordinate: L.LatLng) => {
    // if (areaPolygon.geometry == null)  {
    //   areaPolygon.geometry = new L.Polygon<L.LatLngLiteral>([]);
    // } else {
    areaPolygon.geometry = [
      ...areaPolygon.geometry,  coordinate,
    ];
    // }
  };

  const deleteCoordinate = (index: number) => {
    areaPolygon.geometry?.splice(index, 1);
  };

  const changeCoordinate = (index: number, coordinate: L.LatLng) => {

    areaPolygon.geometry = areaPolygon.geometry.map((el, i) =>
    i == index ? coordinate : el,
  );
  };
  const clearCoordinates = () => {
    areaPolygon.geometry = [];
  };
  const setCircleCenter = (coordinate: L.LatLng) => {
    if (circlePolygon.geometry == null) {
      circlePolygon.geometry = L.circle(coordinate);
    } else {
      circlePolygon.geometry.setLatLng(coordinate);
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
    areaPolygon.active = true;
    circlePolygon.active = false;
    filePolygon.active = false;
    activePolygonFitBounds();
  };

  const activateCirclePolygon = () => {
    areaPolygon.active = false;
    circlePolygon.active = true;
    filePolygon.active = false;
    activePolygonFitBounds();
  };

  const activateFilePolygon = () => {
    areaPolygon.active = false;
    circlePolygon.active = false;
    filePolygon.active = true;
    activePolygonFitBounds();
  };

  const removeFilePolygon = () => {
    filePolygon.geometry = null;
  };

  const removeCirclePolygon = () => {
    circlePolygon.geometry = null;
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
