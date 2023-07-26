<template>
  <div>
    <AppInput
      :class="[classes.item, classes.input, classes.block]"
      type="password"
      :invalid="
        (!$v.password.password.minLength || !$v.password.password.required)
          && isFormValid === false
      "
      icon="icon icon-ic_fluent_lock_closed_20_regular"
      label="Пароль"
      :error="
        !$v.password.password.required
          ? 'Введите значение'
          : !$v.password.password.minLength
            ? 'Пароль должен содержать не меньше 8 символов'
            : null
      "
      @input="$v.password.password.$model = $event"
    />

    <AppInput
      :class="[classes.item, classes.input, classes.block]"
      :value="password.confirm"
      type="password"
      :invalid="
        (!$v.password.confirm.sameAsPassword
          || !$v.password.confirm.required)
          && isFormValid === false
      "
      icon="icon icon-ic_fluent_lock_closed_20_regular"
      label="Повторите пароль"
      :error="
        !$v.password.confirm.required
          ? 'Введите значение'
          : !$v.password.confirm.sameAsPassword
            ? 'Пароли не совпадают'
            : null
      "
      @input="$v.password.confirm.$model = $event"
    />
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators';

export default {
  props: ['pending', 'classes'],
  data() {
    return {
      password: {
        password: null,
        confirm: null,
      },
      isFormValid: null,
    };
  },
  validations: {
    password: {
      password: {
        required,
        minLength: minLength(8),
      },
      confirm: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
  methods: {
    submitForm() {
      if (!this.$v.$invalid) {
        this.isFormValid = true;
        return {
          password: this.password,
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
</style>
