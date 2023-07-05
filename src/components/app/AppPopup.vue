<template>
  <div class="popup-overlay">
    <div class="popup"  v-on-clickaway="away">
      <slot name="close" :close="close">
        <div class="popup-close" @click="close()">
          <i class="icon icon-ic_fluent_dismiss_20_filled"></i>
        </div>
      </slot>
      <header class="popup-header">
        <slot name="header"></slot>
      </header>
      <main class="popup-body">
        <slot name="body"></slot>
      </main>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "@/directives/vue-clickaway.js";
export default {
  mixins: [clickaway],
  inheritAttrs: false,
  methods: {
    away() {
      this.close();
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  background: $gradient-w;
  border-radius: 10px;
  box-shadow: $shadow-big;
  padding: 25px 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &-close {
    padding: 7px;
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 22px;
    color: $color-main;
    transition: color 0.2s ease-out;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      cursor: pointer;
      color: $color-main-light;
    }
  }
  &-overlay {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(#000, 0.3);
  }
  &-header:not(:empty) {
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>