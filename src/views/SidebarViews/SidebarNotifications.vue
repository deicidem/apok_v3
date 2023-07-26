<template>
  <SidebarBase :loaded="loaded">
    <template #header>
      <h2 class="c-title">Мои уведомления</h2>
    </template>
    <template #content>
      <div class="c-wrapper">
        <template v-if="notifications && notifications.length > 0">
          <div class="c-buttons mb-6">
            <AppButton :disabled="pending" color="white-red" class="mr-4 flex-1" @click="deleteAll">
              Удалить все
            </AppButton>
            <AppButton :disabled="pending" color="white" class="flex-1" @click="markAsReadAll">
              Прочитать все
            </AppButton>
          </div>
          <!-- <NotificationCard
            v-for="item in getNotifications"
            :key="item.id"
            :message="item.message"
            :type="item.type"
            :disabled="isPending"
            :read="item.read"
            :date="item.date"
            @read="markAsRead(item.id)"
            @delete="deleteOne(item.id)"
          />
          <AppPagination
            :page-count="getPagination.last"
            :current-page="getPagination.currentPage"
            :disabled="isPending"
            @changePage="fetchNotifications"
          /> -->
        </template>
        <template v-else>
          <AppNoContentMessage>
            На данный момент у вас нет <br />
            никаких уведомлений
          </AppNoContentMessage>
        </template>
      </div>
    </template>
  </SidebarBase>
</template>

<script setup lang="ts">
import AppButton from '@/components/controls/AppButton.vue';
import AppNoContentMessage from '@/components/app/AppNoContentMessage.vue';
import SidebarBase from '@/components/pagesBase/SidebarBase.vue';

import { useNotificationsStore } from '@/stores/notifications';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const notificationsStore = useNotificationsStore();
const { notifications, pagination, pending } = storeToRefs(notificationsStore);
const { deleteOne, deleteAll, fetchNotifications, markAsRead, markAsReadAll } = notificationsStore;

const loaded = ref(false);

onMounted(async () => {
  // await notificationsStore.fetchNotifications();
  loaded.value = true;
});
</script>

<style lang="scss" scoped>
.c {
  &-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-wrapper {
    margin: 30px;
  }
}
@media screen and (max-width: 1440px) {
  .notification {
    &-wrapper {
      margin: 20px;
    }
  }
}
</style>
