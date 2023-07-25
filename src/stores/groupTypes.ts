import { ref } from 'vue';
import * as groupTypesApi from '@/api/groupTypes';
import { defineStore } from 'pinia';
import type { GroupType } from '@/models/GroupType';

export const useGroupTypesStore = defineStore('groupTypes', () => {
  const groupTypes = ref<Array<GroupType>>([]);

  async function fetchGroupTypes() {
    groupTypes.value = (await groupTypesApi.all()).data.data;
  }

  return { groupTypes, fetchGroupTypes };
});
