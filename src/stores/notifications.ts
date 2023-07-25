import { ref, computed } from 'vue';
import * as notificationsApi from '@/api/notifications';
import { defineStore } from 'pinia';
import type { Notification, NotificationMap } from '@/models/Notification';
import type { Pagination } from '@/models/Pagination';
import UserChannel from '@/ws/UserChannel';
import { useAlertsStore } from '@/stores/alerts';
import type { Alert } from '@/models/Alert';
import AdminChannel from '@/ws/AdminChannel';
import echo from '@/ws/Echo';

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<Array<Notification>>([]);
  const pagination = ref<Pagination>();
  const paginationSize = ref<number>(8);
  const pending = ref<boolean>(false);
  const unreadCount = ref<number>(0);

  const notificationsMap = computed(() => {
    const map: NotificationMap = {};
    for (let index = 0; index < notifications.value.length; index++) {
      const notification = notifications.value[index];
      map[notification.id] = {
        data: notification,
        index,
      };
    }
    return map;
  });

  function incrementUnreandCount() {
    unreadCount.value += 1;
  }

  function setPending(newValue: boolean) {
    pending.value = newValue;
  }

  async function fetchUnreadCount() {
    unreadCount.value = (await notificationsApi.unreadCount()).data;
  }

  async function fetchNotifications(page: number = 1) {
    setPending(true);
    const res = await notificationsApi.all({
      page,
      size: paginationSize.value,
    });
    fetchUnreadCount();

    const { meta } = res.data;

    if (meta.current_page > meta.last_page) {
      await fetchNotifications(meta.last_page);
      return;
    }

    pagination.value = {
      currentPage: Number(meta.current_page),
      totalPages: 0,
      first: 1,
      total: Number(meta.total),
      last: Number(meta.last_page),
      prev: Number(meta.current_page == 1 ? null : meta.current_page - 1),
      next: Number(meta.current_page == meta.last_page ? null : meta.current_page + 1),
    };

    notifications.value = res.data.data;
    setPending(false);
  }

  async function markAsRead(notificationId: number) {
    await notificationsApi.markAsRead(notificationId);
    notifications.value[notificationsMap.value[notificationId].index].read = true;
    unreadCount.value -= 1;
  }

  async function markAsReadAll() {
    await notificationsApi.markAsReadAll();
    await fetchNotifications(pagination.value?.currentPage);
  }

  async function deleteOne(notificationId: number) {
    setPending(true);
    await notificationsApi.deleteOne(notificationId);
    await fetchNotifications(pagination.value?.currentPage);
  }

  async function deleteAll() {
    setPending(true);
    await notificationsApi.deleteAll();
    await fetchNotifications(pagination.value?.currentPage);
  }

  function connectToEcho() {
    const alertsStore = useAlertsStore();
    UserChannel.channel?.notification((notification: Notification) => {
      if (notification.updateUnread) {
        incrementUnreandCount();
      }
      alertsStore.addInfoAlert({ title: notification.message } as Alert);
    });
    AdminChannel.channel?.listen('UserRegistrated', (notification: Notification) => {
      alertsStore.addInfoAlert({ title: notification.message } as Alert);
    });
    AdminChannel.channel?.listen('ServerOfflineCheck', (notification: Notification) => {
      alertsStore.addInfoAlert({ title: notification.message } as Alert);
    });
  }

  function disconnectFromEcho() {
    echo.disconnect();
  }

  return {
    notifications,
    pagination,
    paginationSize,
    pending,
    unreadCount,
    notificationsMap,
    incrementUnreandCount,
    setPending,
    fetchUnreadCount,
    fetchNotifications,
    markAsRead,
    markAsReadAll,
    deleteOne,
    deleteAll,
    connectToEcho,
    disconnectFromEcho,
  };
});
