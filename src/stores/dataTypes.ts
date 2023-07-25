import { ref } from 'vue';
import * as dataTypesApi from '@/api/dataTypes';
import { defineStore } from 'pinia';
import type { DataType } from '@/models/DataType';

export const useDataTypesStore = defineStore('dataTypes', () => {
  const dataTypes = ref<Array<DataType>>([]);

  async function fetchDataTypes() {
    dataTypes.value = (await dataTypesApi.all()).data.data;
  }

  return { dataTypes, fetchDataTypes };
});
