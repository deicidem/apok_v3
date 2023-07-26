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
            <RouterLink v-slot="{ navigate }" :to="{ name: 'registration' }" custom>
              <AppButton color="white" size="big" :disabled="pending" @click="navigate">
                Зарегистироваться
              </AppButton>
            </RouterLink>
          </div>
        </template>
      </AppForm>
    </FormBase>
  </PageWithBackground>
</template>

<script setup lang="ts">
import PageWithBackground from '@/components/pagesBase/PageWithBackground.vue';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import FormBase from "@/components/auth/FormBase.vue";
// import FormLogin from "@/components/auth/FormLogin.vue";
// import AppForm from "@/components/auth/AppForm.vue";

const pending = ref(false);
const { login } = useUserStore();
const form = ref();
async function onSubmit() {
  let data = form.value.submitForm();
  if (data) {
    pending.value = true;
    try {
      await login(data);

      setTimeout(() => {
        useRouter().push({ name: 'home' });
      }, 1500);
    } finally {
      pending.value = false;
    }
  }
}
</script>

<style lang="scss" scoped></style>
