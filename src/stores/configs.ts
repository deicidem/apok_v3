import { ref, computed } from 'vue';
import * as configsApi from '@/api/configs';
import { defineStore } from 'pinia';
import type { Config, ConfigsMap } from '@/models/Config';

export const useConfigsStore = defineStore('configs', () => {
  const configs = ref<Array<Config>>([]);

  const getConfigsMap = computed<ConfigsMap>(() => {
    const obj: ConfigsMap = {};
    configs.value.forEach((item) => {
      obj[item.name.toString()] = item;
    });
    return obj;
  });

  const fetchConfigs = async () => {
    configs.value = (await configsApi.all()).data.data;
  };

  return { configs, getConfigsMap, fetchConfigs };
});
