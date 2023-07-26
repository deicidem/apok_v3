<template>
  <form
    class="c-form"
    @submit.prevent
  >
    <header class="form-block-header">
      <slot name="header" />
    </header>
    <main class="form-block-body">
      <slot
        name="body"
        :classes="{
          itemGroup: 'c-form__item-group',
          item: 'c-form__item',
          input: 'c-form__input',
          button: 'c-form__button',
          link: 'c-form__link',
          checkbox: 'c-form__checkbox',
          block: 'c-form__block',
        }"
      />
    </main>
    <footer class="form-block-footer">
      <slot name="actions" />
    </footer>
  </form>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

.form-block {
  &-header {
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 20px;
  }
}

</style>
