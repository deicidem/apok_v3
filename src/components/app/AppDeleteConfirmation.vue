<template>
  <AppPopup class="confirm" @close="_cancel" v-if="showPopup">
    <template #header>
      {{ title }}
    </template>
    <template #body>
        <div class="confirm-text">{{ message }}</div>
        <div class="confirm-buttons">
          <AppButton class="confirm-button" color="white" @click="_cancel"
            >Отмена</AppButton
          >
          <AppButton
            class="confirm-button"
            color="gradient-red"
            @click="_confirm"
            >{{ actionMessage }}</AppButton
          >
        </div>
    </template>
  </AppPopup>
</template>

<script>
import AppPopup from "@/components/AppPopup.vue";

export default {
  components: {
    AppPopup,
  },
  data: () => ({
    title: null,
    message: null,
    actionMessage: null,
    showPopup: false,
    resolvePromise: null,
    rejectPromise: null,
  }),

  methods: {
    show(opts = {}) {
      this.title = opts.title;
      this.message = opts.message;
      this.actionMessage = opts.actionMessage;
      this.showPopup = true;

      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },

    _confirm() {
      this.showPopup = false;
      this.resolvePromise(true);
    },

    _cancel() {
      this.showPopup = false;
      this.resolvePromise(false);
    },
  },
};
</script>

<style scoped lang="scss">
.confirm::v-deep .popup {
  width: 400px;
}
.confirm {
  text-align: center;
  &-button {
    flex: 1 1 auto;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
  &-buttons {
    margin-top: 20px;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
  }

  &-title {
    margin: 0;
    line-height: 1.5;
    color: $black;
    font-weight: 500;
    font-size: 18px;
  }

  &-text {
    color: $text-grey;
    font-weight: 400;
    font-size: 14px;
    margin: 10px auto 10px 0;
  }

  &-cross {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    cursor: pointer;
    color: $color-red;

    &:hover {
      color: lighten($color: $color-red, $amount: 10);
    }
  }
}
</style>
