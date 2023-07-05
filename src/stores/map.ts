import { ref, computed } from 'vue';
// import * as configsApi from '@/api/configs';
import { defineStore } from 'pinia';
// import type { Config, ConfigsMap } from '@/models/Config';

export const useMapStore = defineStore('map', () => {

  
  const zoom = ref<number>(5);
  const center = ref<Array<number>>([45, 35]);
  const bounds = ref([]);
  const needUpdateBounds = ref<boolean>(false);

});

