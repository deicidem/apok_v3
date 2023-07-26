<template>
  <div>
    <AppInput
      :class="[classes.item, classes.input, classes.block]"
      :value="email"
      :invalid="
        (!$v.email.email || !$v.email.required) && isFormValid === false
      "
      icon="icon icon-ic_fluent_mail_20_regular"
      label="Электронная почта"
      :error="
        !$v.email.required
          ? 'Введите значение'
          : !$v.email.email
            ? 'Введите корректный почтовый адрес'
            : null
      "
      @input="$v.email.$model = $event"
    />
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
  props: ['pending', 'classes'],
  data() {
    return {
      email: null,
      isFormValid: null,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    submitForm() {
      if (!this.$v.$invalid) {
        this.isFormValid = true;
        return {
          email: this.email,
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
