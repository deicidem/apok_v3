import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue';

export const useMapDzzsStore = defineStore('mapDzzs', () => {
  const geoJsonPolygons = ref([]);
  const images = ref([]);
 return {}
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useMapDzzsStore, import.meta.hot))
}
