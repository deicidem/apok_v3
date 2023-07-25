import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Alert } from '@/models/Alert';

export const useAlertsStore = defineStore('alerts', () => {
  const alerts = ref<Array<Alert>>([]);
  const counter = ref<number>(0);

  function increaseCounter() {
    counter.value++;
  }

  function deleteAlert(alertId: number) {
    alerts.value = alerts.value?.filter((e) => e.id != alertId);
  }

  function addAlert(alert: Alert) {
    alert.id = counter.value;

    increaseCounter();

    if (alerts.value?.length >= 3) {
      deleteAlert(alerts.value[0].id);
    }

    alerts.value.push(alert);

    setTimeout(() => {
      deleteAlert(alert.id);
    }, 10000);
  }

  function addErrorAlert(alert: Alert) {
    alert.theme = 'error';
    addAlert(alert);
  }

  function addSuccessAlert(alert: Alert) {
    alert.theme = 'success';
    addAlert(alert);
  }

  function addInfoAlert(alert: Alert) {
    alert.theme = 'info';
    addAlert(alert);
  }

  return { alerts, counter, addAlert, deleteAlert, addInfoAlert, addSuccessAlert, addErrorAlert };
});
