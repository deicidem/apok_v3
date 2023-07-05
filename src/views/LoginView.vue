<template>
  <PageWithBackground>
    <FormBase>
      <AppForm>
      <template #header> Войти </template>
      <template #body="{ classes }">
        <FormLogin ref="form" :pending="pending" :classes="classes" />
      </template>
      <template #actions>
        <div class="flex mt-5 flex-col align-stretch">
          <AppButton
            color="gradient-main"
            size="big"
            class="mb-4"
            :disabled="pending"
            @click="onSubmit"
          >
            Войти
          </AppButton>
          <RouterLink
            :to="{ name: 'registration' }"
            custom
            v-slot="{ navigate }"
          >
            <AppButton
              color="white"
              size="big"
              @click="navigate"
              :disabled="pending"
            >
              Зарегистироваться
            </AppButton>
          </RouterLink>
        </div>
      </template>
     </AppForm>
    </FormBase>
  </PageWithBackground>
</template>

<script>
import { mapActions } from "vuex";
import PageWithBackground from "@/components/PageWithBackground.vue";
import FormBase from "@/components/auth/FormBase.vue";
import FormLogin from "@/components/auth/FormLogin.vue";
import AppForm from "@/components/auth/AppForm.vue";

export default {
  components: {
    FormBase,
    FormLogin,
    PageWithBackground,    
    AppForm,
  },
  data: () => ({
    pending: false,
  }),
  methods: {
    ...mapActions("user", {
      authorize: "authorizeUser",
    }),
    async onSubmit() {
      let data = this.$refs.form.submitForm();
      if (data) {
        this.pending = true;
        try {
          await this.authorize(data);

          setTimeout(() => {
            this.$router.push({ name: "home" });
          }, 1500);
        } finally {
          this.pending = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
