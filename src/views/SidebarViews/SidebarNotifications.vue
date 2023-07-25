<template>
  <SidebarBase :loaded="loaded">
    <template #header>
      <h2 class="c-title">
        Мои уведомления
      </h2>
    </template>
    <template #content>
      <div class="c-wrapper">
        <template
          v-if="getNotifications && getNotifications.length > 0"
        >
          <div class="c-buttons mb-6">
            <AppButton
              :disabled="isPending"
              color="white-red"
              class="mr-4 flex-1"
              @click="deleteAll"
            >
              Удалить все
            </AppButton>
            <AppButton
              :disabled="isPending"
              color="white"
              class="flex-1"
              @click="markAsReadAll"
            >
              Прочитать все
            </AppButton>
          </div>
          <NotificationCard
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
          />
        </template>
        <template v-else>
          <AppNoContentMessage>
            На данный момент у вас нет <br> никаких уведомлений
          </AppNoContentMessage>
        </template>
      </div>
    </template>
  </SidebarBase>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SidebarBase from '@/components/SidebarBase.vue';
import AppPagination from '@/components/controls/AppPagination.vue';
import NotificationCard from '@/components/notification/NotificationCard.vue';
import AppNoContentMessage from '@/components/AppNoContentMessage.vue';

export default {
  components: {
    NotificationCard,
    SidebarBase,
    AppNoContentMessage,
    AppPagination,
  },
  data: () => ({
    loaded: false,
  }),
  async mounted() {
    await this.fetchNotifications();
    this.loaded = true;
  },
  computed: {
    ...mapGetters('notifications', [
      'getNotifications',
      'getPagination',
      'isPending',
    ]),
  },
  methods: {
    ...mapActions('notifications', [
      'deleteOne',
      'deleteAll',
      'fetchNotifications',
      'markAsRead',
      'markAsReadAll',
    ]),
  },
};
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
