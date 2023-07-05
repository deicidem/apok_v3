<template>
  <PageWithScroll>
    <template #header>
      <RouterLink :to="{name: 'plan'}" custom v-slot="{ navigate }">
        <div class="back" @click="navigate">
          <div class="back-arrow">
            <i class="icon icon-ic_fluent_arrow_left_20_regular"></i>
          </div>
          <span class="back-subtitle">Назад</span>
        </div>
      </RouterLink>

      <h2 class="page-title">
        {{ plan.title }}
      </h2>

      <AppButton
        color="gradient-main"
        :disabled="!(isAuth && isVerified)"
        class="page-button"
        @click="onPlan"
      >
        Запланировать задачу
      </AppButton>
    </template>

    <template #content>
      <div class="plan-wrapper">
        <div class="plan-wrapper__cards">
          <div class="plan-wrapper__card">
            <div class="plan-wrapper__title">Описание</div>

            <div class="plan-wrapper__text" v-html="plan.description"></div>
          </div>

          <div class="plan-wrapper__card">
            <div class="plan-wrapper__title">Требования к данным</div>

            <div class="plan-table">
              <div
                class="plan-table__item"
                v-for="(req, i) in plan.requirements"
                :key="i"
              >
                <p class="plan-table__subtitle">{{ req.title }}:</p>

                <p class="plan-table__text">
                  {{ req.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="plan-wrapper__img">
          <img :src="plan.previewPath" :alt="plan.title"/>
        </div>
      </div>
    </template>
  </PageWithScroll>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PageWithScroll from "@/components/PageWithScroll.vue";

export default {
  components: {
    PageWithScroll,
  },

  methods: {
    ...mapActions("plans", ["selectPlan"]),
    ...mapActions(["setDataCardState"]),
    onPlan() {
      this.selectPlan(this.plan.index);
      this.setDataCardState(true);
      this.$router.push({name: 'plan'});
    },
  },

  computed: {
    ...mapGetters(["scrollOps"]),
    ...mapGetters("user", ["isAuth", "isVerified", "isEmailVerified"]),
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
.plan {
  &-wrapper {
    display: flex;
    align-items: flex-start;

    &__cards {
      display: flex;
      flex-direction: column;
      flex: 1 1 60%;
    }

    &__card {
      margin-bottom: 30px;
      padding: 20px;
      box-shadow: $shadow-big;
      border-radius: 10px;
      overflow: hidden;
      background: $white;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__title {
      font-size: 1.25rem;
      color: $black;
      font-weight: 500;
    }

    &__text {
      margin-top: 20px;
      color: $black;

      p {
        margin: 0;
      }

      ul {
        margin: 0;
      }
    }

    &__img {
      background: $white;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: $shadow-big;
      margin-left: 30px;
      flex: 1 1 40%;

      img {
        object-fit: cover;
        object-position: center;
      }
    }

    .plan-table {
      margin-top: 20px;

      &__item {
        display: flex;
        align-items: center;
        position: relative;
        margin: 6px 0;
      }

      &__line {
        border-top: 1px solid #ebf0f0;
        width: 100%;
      }

      &__img {
        margin-right: 6px;
      }

      &__subtitle {
        margin: 0;
        font-size: 18px;
        color: $color-main;
      }

      &__text {
        position: absolute;
        left: 180px;
        font-size: 14px;
        color: $text-grey;
      }
    }
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
