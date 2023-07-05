<template>
  <PageWithBackground>
    <FormBase>
      <AppForm>
      <template #header> Восстановление пароля </template>
      <template #body="{ classes }">
        <FormForgotPassword ref="form" :pending="pending" :classes="classes" />
      </template>
      <template #actions>
        <AppButton
          color="gradient-main"
          class="mt-5 w-full"
          size="big"
          :disabled="pending"
          @click="onSubmit"
        >
          Отправить
        </AppButton>
      </template>
     </AppForm>
    </FormBase>
  </PageWithBackground>
</template>

<script>
import { mapActions } from "vuex";
import PageWithBackground from "@/components/PageWithBackground.vue";
import FormForgotPassword from "@/components/auth/FormForgotPassword.vue";
import FormBase from "@/components/auth/FormBase.vue";
import AppForm from "@/components/auth/AppForm.vue";

export default {
  components: {
    FormForgotPassword,
    PageWithBackground,
    AppForm,
    FormBase,
  },
  data: () => ({
    pending: false,
  }),
  methods: {
    ...mapActions("user", ["forgotPassword"]),
    async onSubmit() {
      let data = this.$refs.form.submitForm();
      console.log(data);
      if (data) {
        this.pending = true;
        try {
          await this.forgotPassword(data);
        } finally {
          this.pending = false;
        }
      }
    },
  },
};
</script>

