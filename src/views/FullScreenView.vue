<template>
  <PageWithScroll :show-menu="true">
    <template #header>
      <RouterLink :to="{name: 'tasks'}" custom v-slot="{ navigate }">
        <div class="back" @click="navigate">
          <div class="back-arrow">
            <i class="icon icon-ic_fluent_arrow_left_20_regular"></i>
          </div>

          <span class="back-subtitle">Назад</span>
        </div>
      </RouterLink>

      <h2 class="page-title">
        {{ $route.query.title }}
      </h2>

      <AppButton color="gradient-main" class="page-button">
        <a
          :href="$route.query.downloadPath"
          target="_blank"
          class="link"
          download
        >
          Скачать
        </a>
      </AppButton>
    </template>

    <template #content>
      <img :src="$route.query.path" :alt="$route.query.title" class="image" />
    </template>
  </PageWithScroll>
</template>

<script>
import { mapGetters } from "vuex";
import PageWithScroll from "../components/PageWithScroll.vue";
export default {
  components: {
    PageWithScroll,
  },

  computed: {
    ...mapGetters(["scrollOps"]),

    id() {
      return +this.$route.params.id;
    },

    plan() {
      return this.$store.getters["plans/plan"](this.id);
    },

    itemImage() {
      const fileName = this.plan.image.toLowerCase();
      return require(`@/assets/img/${fileName}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  color: $white;
}

.image {
  width: auto;
  max-width: 100%;
  background: $white;
  border-radius: 10px;
  box-shadow: $shadow-big;

  &-wrapper {
    padding: 0 50px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 100%;
  }
}

@media screen and (max-width: 1440px) {
  .plan {
    height: 700px;

    &-title {
      font-size: 18px;
    }

    &-wrapper {
      max-width: 1200px;

      &__header {
        max-width: 1200px;
      }
    }
  }
}
</style>
