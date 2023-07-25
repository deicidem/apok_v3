import 'leaflet/dist/leaflet.css';
import { ref, toRef, watch } from "vue";
import L from "leaflet";
import type { AreaPolygon } from '@/models/SearchMapPolygon';
export function usePolygon(a: AreaPolygon) {
  const polygon = ref<L.Polygon>();
  
  const initPolygon = (options?: L.PolylineOptions | undefined) => {
    polygon.value = L.polygon(a.geometry, options);
  }

  const setLatLngs = (latlngs: L.LatLngLiteral[]) => {
    polygon.value?.setLatLngs(latlngs);
  }

  watch(() => a, () => {
    console.log("🚀 ---------------------------------------------------🚀")
    console.log("🚀 ~ file: polygon.ts:17 ~ watch ~ latlngs:", a)
    console.log("🚀 ---------------------------------------------------🚀")
    setLatLngs(a.geometry)
  }, {deep: true})
  
  return {initPolygon, polygon}
}

