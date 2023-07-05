import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';

export const useMapTasksStore = defineStore('mapTasks', () => {
  const viewImages = ref([]);
  return {};
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapTasksStore, import.meta.hot));
}
