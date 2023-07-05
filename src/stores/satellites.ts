import { computed, ref } from 'vue';
import * as satellitesApi from '@/api/satellites';
import { defineStore } from 'pinia';
import type { Satellite, SatellitesMap } from '@/models/Satellite';

export const useSatellitesStore = defineStore('satellites', () => {
  const satellites = ref<Array<Satellite>>([]);

  const getSatellitesMap = computed<SatellitesMap>(() => {
    const obj: SatellitesMap = {};
    satellites.value.forEach((item) => {
      obj[item.type.toString()] = item;
    });
    return obj;
  });

  const fetchSatellites = async () => {
    satellites.value = (await satellitesApi.all()).data.data;
  };

  return { satellites, getSatellitesMap, fetchSatellites };
});
