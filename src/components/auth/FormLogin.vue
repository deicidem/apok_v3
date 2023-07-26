<template>
  <div>
    <AppInput
      type="email"
      :class="[classes.item, classes.input, classes.block]"
      :value="login"
      :invalid="
        (!$v.login.email || !$v.login.required) && isFormValid === false
      "
      icon="icon icon-ic_fluent_person_20_regular"
      label="Электронная почта"
      :error="
        !$v.login.required
          ? 'Введите значение'
          : !$v.login.email
            ? 'Введите корректный почтовый адрес'
            : null
      "
      @input="$v.login.$model = $event"
    />

    <div :class="classes.block">
      <AppInput
        :class="[classes.item, classes.input]"
        :value="password"
        type="password"
        :invalid="
          (!$v.password.minLength || !$v.password.required)
            && isFormValid === false
        "
        icon="icon icon-ic_fluent_lock_closed_20_regular"
        label="Пароль"
        :error="
          !$v.password.required
            ? 'Введите значение'
            : !$v.password.minLength
              ? 'Пароль должен содержать не менее 8 символов'
              : null
        "
        @input="$v.password.$model = $event"
      />
      <RouterLink
        class="c-form__link"
        :to="{ name: 'forgot-password' }"
      >
        Забыли пароль?
      </RouterLink>
    </div>

    <div :class="classes.itemGroup">
      <AppCheckbox
        :model-value="remember"
        @change="remember = $event"
      />
      <span :class="classes.checkbox">Запомнить меня</span>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import AppCheckbox from '@/components/controls/AppCheckbox.vue';

export default {
  components: {
    AppCheckbox,
  },
  props: ['pending', 'classes'],
  data() {
    return {
      login: null,
      password: null,
      remember: false,
      isFormValid: null,
    };
  },
  validations: {
    login: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
  methods: {
    submitForm() {
      if (!this.$v.$invalid) {
        this.isFormValid = true;
        // this.$emit("submit", {
        //   email: this.login,
        //   password: this.password,
        //   remember: this.remember,
        // });
        return {
          email: this.login,
          password: this.password,
          remember: this.remember,
        };
      }
      this.isFormValid = false;
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/form-layout.scss";

.c-button {
  margin-bottom: 15px;
}
</style>
