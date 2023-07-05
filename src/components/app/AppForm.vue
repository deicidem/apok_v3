<template>
  <form class="c-form" @submit.prevent="$emit('submit')">
    <slot
      :classes="{
        itemGroup: 'c-form__item-group',
        item: 'c-form__item',
        input: 'c-form__input',
        button: 'c-form__button',
        link: 'c-form__link',
        checkbox: 'c-form__checkbox',
        block: 'c-form__block'
      }"
    ></slot>
  </form>
</template>

<script></script>

<style lang="scss" scoped>
.c-form .c-form__item::v-deep .c-input {
  height: 50px;
}
.c {
  &-form {
    &__block {
      width: 100%;
      margin-bottom: 25px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &__item-group {
      display: flex;
      width: 100%;
      margin-bottom: 25px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &__item-group &__input {
      width: calc(50% - 15px);
      margin-right: 30px;
      &:last-child {
        margin-right: 0;
      }
    }
    &__link {
      font-size: 12px;
      margin-left: 15px;
      margin-top: 5px;
      color: $color-main;
      appearance: none;
    }
    &__item {
      min-height: 40px;
      font-size: 16px;
    }
    &__button {
      margin-right: 30px;
      &:last-child {
        margin-right: 0;
      }
    }
    &__checkbox {
      margin-left: 10px;
      color: $text-grey;
      font-size: 14px;
      line-height: 20px;
      a {
        color: $color-main;
        text-decoration: underline;
      }
    }
  }
}
</style>
