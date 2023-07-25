<template>
  <div class="sidebar_wrap" :class="{ active: sidebarActive }">
    <div class="sidebar" :class="{ active: sidebarActive }">
      <!-- <PlanData v-if="isAuth && isVerified" /> -->

      <div class="sidebar-content">
        <RouterView> </RouterView>
      </div>
    </div>

    <div class="sidebar-collapsed">
      <div class="sidebar-collapsed__item" @click="toggleSidebar()">
        <div class="sidebar-collapsed__link">
          <i v-if="sidebarActive" class="icon icon-ic_fluent_arrow_minimize_20_regular"></i>

          <i v-else class="icon icon-ic_fluent_arrow_maximize_20_regular"></i>
        </div>
      </div>

      <div
        v-for="(route, i) in routes"
        v-show="isRouteVisible(route)"
        :key="i"
        class="sidebar-collapsed__item"
        @click="openSidebar"
      >
        <RouterLink v-slot="{ navigate, isActive }" :to="{ name: route.name }" custom>
          <div :class="{ active: isActive }" class="sidebar-collapsed__link" @click="navigate">
            <i class="icon" :class="route.icon"></i>
            <!-- 
            <div
              class="notification"
              v-if="route.title == 'Мои уведомления'"
              v-show="getUnreadCount > 0"
            >
              <div class="notification-number">{{ getUnreadCount }}</div>
            </div> -->
          </div>
        </RouterLink>

        <div class="sidebar-collapsed__link__name">{{ route.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import PlanData from '@/components/plan/PlanData.vue';
import { computed, onMounted, reactive } from 'vue';
import { useComponentsStore } from '@/stores/components';
import { useConfigsStore } from '@/stores/configs';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const componentsStore = useComponentsStore();
const configsStore = useConfigsStore();
const userStore = useUserStore();
const { isAuth, isVerified } = storeToRefs(userStore);
const { sidebarActive } = storeToRefs(componentsStore);
type Route = {
  title: string;
  name: string;
  requiresAuth: boolean;
  requiresVerification: boolean;
  icon: string;
};

const routes: Route[] = reactive([
  {
    title: 'Мои задачи',
    name: 'tasks',
    requiresAuth: true,
    requiresVerification: true,
    icon: 'icon-ic_fluent_clipboard_bullet_list_ltr_20_regular',
  },
  {
    title: 'Доступные задачи',
    name: 'plan',
    requiresAuth: false,
    requiresVerification: false,
    icon: 'icon-ic_fluent_apps_list_detail_20_regular',
  },
  {
    title: 'Поиск снимков',
    name: 'search',
    requiresAuth: false,
    requiresVerification: false,
    icon: 'icon-ic_fluent_search_20_regular',
  },
  {
    title: 'Мои уведомления',
    name: 'notifications',
    requiresAuth: true,
    requiresVerification: true,
    icon: 'icon-ic_fluent_alert_20_regular',
  },
  {
    title: 'Мои файлы',
    name: 'files',
    requiresAuth: true,
    requiresVerification: true,
    icon: 'icon-ic_fluent_folder_20_regular',
  },
  {
    title: 'Личный кабинет',
    name: 'user',
    requiresAuth: true,
    requiresVerification: false,
    icon: 'icon-ic_fluent_person_20_regular',
  },
  {
    title: 'Мои группы',
    name: 'groups',
    requiresAuth: true,
    requiresVerification: true,
    icon: 'icon-ic_fluent_people_team_20_regular',
  },
  {
    title: 'Мои снимки',
    name: 'dzzs',
    requiresAuth: true,
    requiresVerification: true,
    icon: 'icon-ic_fluent_image_20_regular',
  },
]);

const isRouteVisible = computed(() => {
  return (route: Route) => {
    let res = true;
    if (route.requiresAuth && res) {
      res = isAuth.value;
    }
    if (route.requiresVerification && res) {
      res = isVerified.value;
    }
    return res;
  };
});

const openSidebar = () => {
  componentsStore.changeSidebarState(true);
};

const closeSidebar = () => {
  componentsStore.changeSidebarState(false);
};

const toggleSidebar = () => {
  if (sidebarActive.value) {
    closeSidebar();
  } else {
    openSidebar();
  }
};

onMounted(() => {
  if (configsStore.configsMap['need_verification_to_view_dzzs'].value) {
    routes.forEach((route: Route) => {
      if (route.name == 'search') {
        route.requiresAuth = true;
        route.requiresVerification = true;
      }
    });
  }
});
</script>

<style lang="scss" scoped>
.notification {
  position: absolute;
  top: 8px;
  right: 4px;

  &-number {
    width: 16px;
    height: 16px;

    color: $white;
    font-size: 10px;
    background: $gradient-r;
    border-radius: 50%;
    text-align: center;
    line-height: 160%;
  }

  &-wrapper {
    position: relative;
  }
}

.slide {
  &-enter {
    transform: translateX(-100%);
  }

  &-enter-active {
    transition: all 0.3s ease;
  }

  &-enter-to {
    transform: translateX(0);
  }

  &-leave {
    transform: translateX(0);
  }

  &-leave-active {
    transition: all 0.3s ease;
  }

  &-leave-to {
    transform: translateX(-100%);
  }
}

.fade {
  &-enter-active,
  &-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  &-enter,
  &-leave-active {
    opacity: 0;
  }
}

.sidebar {
  position: absolute;
  left: 50px;
  display: block;
  height: 100%;
  width: calc(100% - 50px);
  z-index: 5;
  box-shadow: $shadow-big;
  transition: transform 0.3s ease-out;
  transform: translateX(-100%);

  &.active {
    transform: translateX(0);
  }

  &-title {
    position: relative;
    margin: 0;
    padding: 6px;
    background: $gradient;
    color: $white;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    box-shadow: $shadow-small;
  }

  &-content {
    position: relative;
    height: 100%;
    background: $white-dark;
    overflow: hidden;
  }

  &-open {
    margin-top: 6px;
  }

  &__box {
    display: flex;
  }

  &__item {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    border-top: 1px solid transparent;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    transition: background-color 0.2s ease-out;

    &:focus-within {
      background: #384342;
      box-sizing: border-box;
      border-top: 1px solid $white;
      border-left: 1px solid $white;
      border-right: 1px solid $white;
    }
  }

  &-close {
    justify-content: flex-end;

    i:hover {
      color: #384342;
      transition: all 0.4s ease-out;
    }
  }

  &-collapsed {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    height: 100%;
    width: 50px;
    background: $white;
    box-shadow: $shadow-small;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__item {
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
    }

    &__link {
      width: 50px;
      height: 50px;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease-out;
      color: $color-main-dark;
      cursor: pointer;

      &.active,
      &:hover,
      &:focus-visible {
        color: $color-main-light;
      }
      &.active .icon {
        background: $gradient;
        color: #fff;
        border-radius: 7px;
        padding: 3px;
        box-shadow: $shadow-small;
      }
      &:hover + &__name {
        visibility: inherit;
        z-index: -1;
        opacity: 1;
      }

      &__name {
        position: absolute;
        z-index: 2;
        left: 100%;

        display: inline-block;
        white-space: nowrap;
        padding: 5px 10px;

        font-weight: 400;
        font-size: 12px;
        line-height: 20px;

        visibility: hidden;
        opacity: 0;
        border-left: 1px solid rgba(#000, 0.1);

        color: $color-main;
        background: $white;
        box-shadow: $shadow-small;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        transition: all 0.2s ease-out;
      }
    }
  }
}
</style>
