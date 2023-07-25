import { ref } from 'vue';
import * as rolesApi from '@/api/roles';
import { defineStore } from 'pinia';
import type { Role } from '@/models/Role';

export const useRolesStore = defineStore('roles', () => {
  const roles = ref<Array<Role>>([]);

  async function fetchRoles() {
    roles.value = (await rolesApi.all()).data.data;
  }

  return { roles, fetchRoles };
});
