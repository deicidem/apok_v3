<template>
  <div class="button__wrapper" :class="classes">
    <button class="button" :disabled="disabled" @click="$emit('click', $event)">
      <slot></slot>
    </button>
    <span class="tooltiptext" :style="tooltipMargin" v-if="tooltip">
      {{ tooltip }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  contentType: {
      type: String,
      validator(value: string) {
        return ["text", "icon"].includes(value);
      },
      default: "text",
    },
    color: {
      type: String,
      validator(value: string) {
        return [
          "gradient-main",
          "gradient-white",
          "gradient-white-red",
          "gradient-red",
          "white",
          "white-red",
        ].includes(value);
      },
      default: "gradient-white",
    },
    size: {
      type: String,
      validator(value: string) {
        return ["small", "default", "big"].includes(value);
      },
      default: "default",
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: String,
      default: null,
    },
    tooltipOffset: {
      type: Object,
      default: () => ({
        left:0,
        right: 0,
        top: 0,
        bottom: 0
      })
    }
})

const classes = computed(() => {
  return {
        [props.contentType]: props.contentType,
        [props.color]: props.color,
        [props.size]: props.size,
        active: props.active,
        disabled: props.disabled,
      };
});

const tooltipMargin = computed(() => {
  let m = props.tooltipOffset;
  return {
    margin: `${m.top}px ${m.right}px ${m.bottom}px ${m.left}px`
  }
});
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  z-index: 0;
  height: 100%;
  width: 100%;
  padding: 0 24px;
  font-family: inherit;
  font-size: 14px;
  color: $white;
  border-radius: 7px;
  border: none;
  box-shadow: $shadow_small;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease-out;
  will-change: transform;
  &::after {
    content: "";
    position: absolute;
    height: 150%;
    width: 200%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease-out;
    z-index: -1;
  }

  &:disabled {
    cursor: no-drop;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: rgba(#eee, 0.5);
    }
  }

  &__wrapper {
    height: 36px;
    position: relative;
    display: inline-block;
    &:hover {
      .tooltiptext {
        display: block;
      }
      .button {
        &:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 2px 6px rgba($black, 0.2);
          &:after {
            left: 100%;
          }
        }
      }
    }

    &:active {
      .button {
        &:not(:disabled) {
          transition: all 0.1s ease-out;
          transform: translateY(1px);
          box-shadow: 0 0px 2px rgba($black, 0.1);
          &:after {
            left: 0%;
          }
        }
      }
    }
    .tooltiptext {
      position: absolute;
      bottom: 120%;
      left: 50%;
      z-index: 10;

      display: none;
      padding: 2px 5px;

      text-align: center;
      word-break: normal;

      color: $color-main-dark;
      font-size: 12px;
      line-height: 1.3;
      background: $gradient-w;
      border-radius: 5px;
      box-shadow: $shadow-small;
      transform: translateX(-50%);
    }
    &.gradient-main {
      .button {
        color: $white;
        &::after {
          background: $gradient;
        }
      }
      &.active {
        .button {
          color: $color-main-dark;
          &::after {
            background: $gradient-w;
          }
        }
      }
    }
    &.gradient-white {
      .button {
        color: $color-main-dark;
        &::after {
          background: $gradient-w;
        }
      }
      &.active {
        .button {
          color: $white;
          &::after {
            background: $gradient;
          }
        }
      }
    }
    &.gradient-red {
      .button {
        color: $white;
        &::after {
          background: $gradient-r;
        }
      }
      .tooltiptext {
        color: $color-red;
      }
    }
    &.gradient-white-red {
      .button {
        color: $color-red;
        &::after {
          background: $gradient-w;
        }
      }
      &.active {
        .button {
          color: $white;
          &::after {
            background: $gradient-r;
          }
        }
      }
      .tooltiptext {
        color: $color-red;
      }
    }
    &.white {
      .button {
        color: $color-main-dark;
        &::after {
          background: $white;
        }
      }
      &.active {
        .button {
          color: $white;
          &::after {
            background: $gradient;
          }
        }
      }
    }
    &.white-red {
      .button {
        color: $color-red;
        &::after {
          background: $white;
        }
      }
      &.active {
        .button {
          color: $white;
          &::after {
            background: $gradient-r;
          }
        }
      }
      .tooltiptext {
        color: $color-red;
      }
    }
    &.icon {
      width: 30px;
      height: 30px;
      .button {
        padding: 0;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    &.big {
      &.icon {
        width: 40px;
        height: 40px;
        .button {
          font-size: 30px;
        }
      }
    }
    &.small {
      height: 28px;
      &.icon {
        width: 28px;
        height: 28px;
        .button {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
