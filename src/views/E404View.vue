<template>
  <PageWithScroll :show-menu="true">
    <template #header>
      <h1 class="page-title">Страница не найдена</h1>
    </template>
    <template #content>
      <div class="error-content">
        <p class="error-number">404</p>
        <p class="error-text">
          Неверный адрес, либо страница больше не существует
        </p>
        <p class="error-text">
          Перейдите на
          <RouterLink class="error-link" :to="{name: 'home'}"
            >главную страницу</RouterLink
          >
          сайта
        </p>
      </div>
    </template>
  </PageWithScroll>
</template>

<script>
import PageWithScroll from "@/components/PageWithScroll.vue";
export default {
  components: {
    PageWithScroll,
  },
};
</script>

<style scoped lang="scss">
.error {
  &-number {
    color: $color-main;
    font-size: 200px;
    text-align: center;
    margin-top: 100px;
    margin-bottom: 0;
  }

  &-text {
    margin-top: 10px;
    font-size: 16px;
    color: $black;
    text-align: center;
  }

  &-link {
    color: $color-main;
    border-bottom: 1px solid $color-main;
  }
}
</style>
