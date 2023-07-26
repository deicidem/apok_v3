<template>
  <header ref="header" class="header">
    <h1 class="title">
      {{ title }}
    </h1>

    <RouterLink v-if="!showMenu" v-slot="{ navigate }" :to="{ name: 'home' }" custom>
      <div class="back" @click="navigate">
        <div class="back-arrow">
          <i class="icon icon-ic_fluent_arrow_left_20_regular"></i>
        </div>
        <span class="back-subtitle">На главную страницу</span>
      </div>
    </RouterLink>

    <div v-if="showMenu" class="header-items">
      <nav class="header-nav">
        <ul>
          <li class="header-nav__item">
            <RouterLink :to="{ name: 'home' }">
              <img :src="logo" alt="Логотип" />
            </RouterLink>
          </li>

          <li class="header-nav__item">
            <a :href="tutorial" target="_blank" download>Руководство пользователя</a>
          </li>
        </ul>
      </nav>

      <div class="header-menu">
        <div v-if="isAuth" class="header-menu__text">Добро пожаловать, {{ user!.firstName }}!</div>

        <div class="header-menu__buttons">
          <div v-if="isAuth" class="header-menu-button">
            <AppButton content-type="icon" size="big" tooltip="Выйти" @click="onLogout"
              ><i class="icon icon-ic_fluent_sign_out_20_regular"></i
            ></AppButton>
          </div>

          <div v-else class="header-menu-button">
            <!-- <RouterLink :to="{ name: 'login' }" custom v-slot="{ navigate }">
              <AppButton content-type="icon" size="big" tooltip="Авторизоваться" @click="navigate">
                <i class="icon icon-ic_fluent_person_20_filled"></i>
              </AppButton>
            </RouterLink> -->
          </div>

          <!-- <div class="header-menu-button" v-if="isAuth && isAdmin">
            <RouterLink :to="{ name: 'admin' }" custom v-slot="{ navigate }">
              <AppButton
                content-type="icon"
                size="big"
                tooltip="Панель администратора"
                @click="navigate"
              >
                <i class="icon icon-ic_fluent_settings_20_regular"></i>
              </AppButton>
            </RouterLink>
          </div> -->
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

defineProps({
  showMenu: {
    type: Boolean,
    default: true,
  },
});

const header = ref<HTMLHtmlElement>();
const theme = ref<string>('');
const title = ref<string>('');
const tutorial = ref<string>('api/docs');

theme.value = import.meta.env.VITE_THEME;
title.value = import.meta.env.VITE_TITLE;

const userStore = useUserStore();
const { user, isAuth, isAdmin } = storeToRefs(userStore);

const logo = computed(() => {
  return (
    new URL('@/assets/img/header-icons/', import.meta.url).pathname + '/' + theme.value + '.svg'
  );
});

const onLogout = async () => {
  if (useRoute().name != 'home') {
    useRouter().push({ name: 'home' });
  }
  await userStore.logout();
};

defineExpose({ header });
</script>

<style lang="scss" scoped>
.title {
  position: relative;
  padding: 10px;
  margin: 0;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 500;
  background: $gradient;
  box-shadow: $shadow-big;
  color: $white;
}

.back {
  position: absolute;
  top: 50%;
  left: 100px;
  transform: translate(0, -50%);
  &-arrow {
    color: $white;
  }
  &-subtitle {
    color: $white;
  }
}

.user-box {
  display: none;
}

.auth-wrapper {
  position: absolute;
  right: 70px;
  top: 170px;
  z-index: 30;
}

.search-box {
  display: none;
}

.header {
  z-index: 10;
  position: relative;

  &-user {
    display: none;
  }

  &-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 100px;
    background: $white;
    box-shadow: $shadow-big;
  }

  &-nav {
    ul {
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0;

      list-style: none;

      li {
        margin-right: 50px;

        a {
          color: $black;
          font-size: 20px;

          img {
            height: 60px;
          }
        }
      }
    }
  }

  &-menu {
    display: flex;
    align-items: center;

    &__text {
      margin-right: 50px;
      font-size: 1.25rem;
      color: $black;
    }

    &__buttons {
      display: flex;
    }

    &-button {
      margin-left: 10px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
}

@media screen and (max-width: 1440px) {
  .title {
    padding: 8px;
    font-size: 1.125rem;
  }

  .header {
    &-items {
      padding: 10px 80px;
    }

    &-menu {
      &__button {
        width: 34px;
        height: 34px;
        margin-right: 16px;
      }

      &__text {
        font-size: 18px;
      }
    }

    &-nav {
      ul {
        li {
          margin-right: 30px;
          a {
            font-size: 18px;

            img {
              height: 50px;
            }
          }
        }
      }
    }
  }

  .back {
    left: 40px;
    &-subtitle {
      font-size: 16px;
    }
  }
}
</style>
