import 'leaflet/dist/leaflet.css';
import { ref } from "vue";
import L from "leaflet";

export function useMap() {
  const map = ref<L.Map>();

  type mapOptions = {
    center: number[],
    zoom?: number | undefined,
    options?: L.ZoomPanOptions | undefined
  }
  
  const initMap = (element : string | HTMLElement, options: mapOptions) => {
    map.value = L.map(element).setView(options.center as L.LatLngExpression, options.zoom, options.options);
    return map.value;
  }
  
  const setTileLayer = (url: string, options: L.TileLayerOptions) => {
    L.tileLayer(url,options).addTo(map.value!);
  }
  
  return {initMap, setTileLayer, map}
}

