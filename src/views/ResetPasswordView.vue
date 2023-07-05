<template>
  <PageWithBackground>
    <FormBase>
      <AppForm>
      <template #header> Восстановление пароля </template>
      <template #body="{ classes }">
        <FormResetPassword ref="form" :pending="pending" :classes="classes" />
      </template>
      <template #actions>
        <AppButton
          class="mt-5 w-full"
          color="gradient-main"
          size="big"
          :disabled="pending"
          @click="onSubmit"
        >
          Подтвердить
        </AppButton>
      </template>
      </AppForm>
    </FormBase>
  </PageWithBackground>
</template>

<script>
import { mapActions } from "vuex";
import PageWithBackground from "@/components/PageWithBackground.vue";
import FormResetPassword from "../components/auth/FormResetPassword.vue";
import FormBase from "@/components/auth/FormBase.vue";
import AppForm from "@/components/auth/AppForm.vue";
export default {
  components: {
    FormResetPassword,
    PageWithBackground,
    FormBase,
    AppForm,
  },
  data: () => ({
    pending: false,
  }),
  methods: {
    ...mapActions("user", ["resetPassword"]),
    async onSubmit() {
      let data = this.$refs.form.submitForm();
      console.log(data);
      if (data) {
        this.pending = true;
        try {
          await this.resetPassword({
            ...data,
            token: this.$route.query["token"],
            email: this.$route.query["email"],
          });
          setTimeout(() => {
            this.$router.push({ name: "login" });
          }, 5000);
        } finally {
          this.pending = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.authorize {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: $background-image;
  background-size: cover;
  &-wrapper {
    position: relative;
  }
}
</style>
