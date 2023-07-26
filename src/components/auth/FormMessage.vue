<template>
  <div
    class="message"
    :class="{ error }"
  >
    <div class="message-icon">
      <i
        v-if="error"
        class="icon icon-ic_fluent_error_circle_20_regular"
      />
      <i
        v-else
        class="icon icon-ic_fluent_checkmark_circle_20_regular"
      />
    </div>
    <div class="message-text">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['error', 'message'],
};
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  align-items: center;
  left: 0;
  bottom: calc(100% + 20px);
  position: absolute;
  width: 100%;
  padding: 15px;
  background: $gradient-w;
  box-shadow: $shadow-big;
  border-radius: 10px;
  color: $color-main;

  &.error {
    background: $gradient-r;
  }
  &-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    color: $color-main;
    width: 36px;
    height: 36px;
    margin-right: 20px;

    .icon {
      line-height: 0;
    }
  }
  &-icon {
    color: #40c545;
  }
  &.error &-text,
  &.error &-icon {
    color: #fff;
  }

  &-text {
    text-align: left;
    font-size: 16px;
  }
}
</style>
