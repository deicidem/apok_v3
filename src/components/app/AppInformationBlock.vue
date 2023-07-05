<template>
  <div class="information-block__wrapper">
    <h3 class="information-block__title">{{ title }}</h3>
    <div class="information-block">
      <table class="information-block__table">
        <tbody>
          <slot name="table"></slot>
        </tbody>
      </table>

      <div class="information-block__buttons_top">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title']
};
</script>

<style lang="scss" scoped>
.information-block{
  &__wrapper {
    position: relative;
    background: $white;
    border-radius: 10px;
    box-shadow: $shadow-small;
    margin-bottom: 20px;
    padding: 20px;
    flex: 1 1 auto;
  }
  &__title {
    margin: 0 0 5px;
    font-size: 18px;
    font-weight: 400;
  }
  &__table {
      font-size: 14px;
      border-collapse: collapse;
      tr {
        margin: 0;
      }
      td {
        word-break: break-word;
        padding: 7px;
        vertical-align: top;
        &:first-child {
          color: $color-main;
          padding-left: 0;
          max-width: 300px;
          word-break: initial;
        }

        & span {
          word-break: break-word;

          display: inline-block;
          
          border-radius: 7px;
          min-width: 100px;
          max-width: 100%;
        }

        & .editable {
          display: inline-block;
          border: 1px solid transparent;
          padding: 3px;
          width: 100%;
          border-radius: 7px;
          border: 1px solid rgb($color-main, 0.2);
          box-shadow: $shadow-small;
          color: $text-grey;
          padding-left: 10px;
          padding-right: 10px;
          &:focus-visible {
            border: 1px solid $color-main;
            outline: none;
          }
        }
      }
    }

    &__buttons {
      margin-top: 20px;
      display: flex;
      &_top {
        position: absolute;
        display: flex;
        top: 20px;
        right: 20px;
      }
    }

    &__button {
      margin-bottom: 10px;
      margin-right: 10px;
      flex: 1 1 auto;
      
      &:last-child {
        margin-right: 0;
      }
    }
}
</style>