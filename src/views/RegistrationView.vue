<template>
  <PageWithBackground>
    <FormBase>
      <AppForm>
        <template #header> Зарегистрироваться </template>
        <template #body="{ classes }">
          <FormRegistration
            ref="form"
            :classes="classes"
            :pending="pending"
            @changeSubmitAvailable="submitAvailable = $event"
            :needAgreement="true"
          />
        </template>
        <template #actions>
          <div class="mt-5">
            <AppButton
              color="gradient-main"
              size="big"
              class="mr-4"
              :disabled="pending || !submitAvailable"
              @click="onSubmit"
            >
              Зарегистироваться
            </AppButton>

            <RouterLink custom :to="{ name: 'login' }" v-slot="{ navigate }">
              <AppButton
                color="white"
                size="big"
                @click="navigate"
                :disabled="pending"
              >
                Войти
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
import FormRegistration from "@/components/auth/FormRegistration.vue";
import FormBase from "@/components/auth/FormBase.vue";
import AppForm from "@/components/auth/AppForm.vue";
import PageWithBackground from "@/components/PageWithBackground.vue";
export default {
  components: {
    FormRegistration,
    PageWithBackground,
    FormBase,
    AppForm,
  },
  data: () => ({
    pending: false,
    submitAvailable: false,
  }),
  methods: {
    ...mapActions("user", {
      regUser: "regUser",
    }),
    async onSubmit() {
      let data = this.$refs.form.submitForm();

      if (data) {
        this.pending = true;

        try {
          await this.regUser(data);
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
