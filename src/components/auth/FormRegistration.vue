<template>
  <div>
    <div :class="classes.itemGroup">
      <AppInput
        :class="[classes.item, classes.input]"
        :value="firstName"
        :invalid="!$v.firstName.required && isFormValid === false"
        icon="icon icon-ic_fluent_person_20_regular"
        label="Имя"
        :error="!$v.firstName.required ? 'Введите значение' : null"
        @input="$v.firstName.$model = $event"
      />

      <AppInput
        :class="[classes.item, classes.input]"
        :value="lastName"
        :invalid="!$v.lastName.required && isFormValid === false"
        icon="icon icon-ic_fluent_person_20_regular"
        label="Фамилия"
        :error="!$v.lastName.required ? 'Введите значение' : null"
        @input="$v.lastName.$model = $event"
      />
    </div>
    <div :class="classes.itemGroup">
      <AppInput
        :class="[classes.item, classes.input]"
        :value="phone"
        :invalid="
          (!$v.phone.numeric || !$v.phone.required) && isFormValid === false
        "
        icon="icon icon-ic_fluent_call_20_regular"
        label="Контактный номер"
        :error="
          !$v.phone.required
            ? 'Введите значение'
            : !$v.phone.numeric
              ? 'Поле принимает на вход только цифры'
              : null
        "
        @input="$v.phone.$model = $event"
      />

      <AppInput
        type="email"
        name="email"
        :class="[classes.item, classes.input]"
        :value="mail"
        :invalid="
          (!$v.mail.email || !$v.mail.required) && isFormValid === false
        "
        icon="icon icon-ic_fluent_mail_20_regular"
        label="Электронная почта"
        :error="
          !$v.mail.required
            ? 'Введите значение'
            : !$v.mail.email
              ? 'Введите корректный почтовый адрес'
              : null
        "
        @input="$v.mail.$model = $event"
      />
    </div>

    <div :class="classes.itemGroup">
      <AppInput
        :class="[classes.item, classes.input]"
        :value="organisation"
        :invalid="!$v.organisation.required && isFormValid === false"
        icon="icon icon-ic_fluent_people_team_20_regular"
        label="Организация"
        :error="
          !$v.organisation.required && isFormValid === false
            ? 'Введите значение'
            : null
        "
        @input="$v.organisation.$model = $event"
      />
    </div>

    <div :class="classes.itemGroup">
      <AppInput
        :class="[classes.item, classes.input]"
        :value="password.password"
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
        :class="[classes.item, classes.input]"
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

    <div
      v-if="needAgreement"
      :class="classes.itemGroup"
    >
      <AppCheckbox
        class="mr-5"
        @change="$emit('changeSubmitAvailable', $event)"
      />
      <span>
        Cогласие на
        <RouterLink
          :to="{ name: 'policy-privacy' }"
          target="_blank"
        >
          обработку персональных данных
        </RouterLink>
      </span>
    </div>

    <!-- <div :class="classes.itemGroup"></div>  -->
  </div>
</template>

<script>
import {
  required,
  minLength,
  sameAs,
  email,
  numeric,
} from 'vuelidate/lib/validators';

export default {
  props: ['title', 'pending', 'isCreation', 'classes', 'needAgreement'],

  data() {
    return {
      firstName: null,
      lastName: null,
      mail: null,
      organisation: null,
      phone: null,
      password: {
        password: null,
        confirm: null,
      },
      isFormValid: null,
      agree: false,
    };
  },

  validations() {
    return {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      phone: {
        required,
        numeric,
      },
      mail: {
        required,
        email,
      },
      organisation: {
        required,
      },
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
    };
  },

  methods: {
    submitForm() {
      if (!this.$v.$invalid) {
        this.isFormValid = true;
        // this.$emit("submit", {
        //   firstName: this.firstName,
        //   lastName: this.lastName,
        //   email: this.mail,
        //   password: this.password,
        //   organisation: this.organisation,
        //   phoneNumber: this.phone,
        // });
        return {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.mail,
          password: this.password,
          organisation: this.organisation,
          phoneNumber: this.phone,
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
