<template>
  <div class="loader-wrapper">
    <div class="loader" :style="{ height: `${loaderSize}px`, width: `${loaderSize}px` }">
      <figure>
        <div v-for="i in 8" :key="i">
          <span
            :style="{
              left: `${particleSize}px`,
              top: `${particleSize}px`,
              width: `${particleSize}px`,
              height: `${particleSize}px`,
            }"
          ></span>
        </div>
      </figure>
    </div>
    <div v-if="showLabel" class="loader-text">
      Загрузка<span>{{ dots }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  loaderSize: {
    type: Number,
    default: 100,
  },
  showLabel: {
    type: Boolean,
    default: false,
  },
});

const dotsCount = ref<number>(0);
const dotsInterval = ref<number>(0);

const particleSize = computed(() => {
  return Math.round(props.loaderSize * 0.12);
});

const dots = computed(() => {
  let dots: string = '';
  for (let i = 0; i < dotsCount.value; i++) {
    dots += '.';
  }
  return dots;
});

onMounted(() => {
  dotsInterval.value = Number(
    setInterval(() => {
      if (dotsCount.value > 2) {
        dotsCount.value = 0;
      } else {
        dotsCount.value++;
      }
    }, 500),
  );
});
</script>

<style lang="scss" scoped>
.loader {
  z-index: 10;
  position: relative;
  &-text {
    text-align: center;
    color: $color-main;
    font-weight: 700;
    font-size: 24px;
    span {
      position: absolute;
    }
  }
  figure {
    margin: 0;
    transform: translate(-50%, -50%) rotate(0deg) scale(1.4, 1.4);
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 150px;
    box-sizing: border-box;
    animation: rotation 15s infinite linear;
  }

  figure div span {
    content: '';
    background: $color-main;
    box-sizing: border-box;
    position: absolute;
    animation: shuffle 2s infinite;
    border-radius: 2px;
  }

  figure div:nth-child(1) {
    transform: rotate(0deg);
  }

  figure div:nth-child(1) span {
    animation-delay: -0.5s;
  }

  figure div:nth-child(2) {
    transform: rotate(45deg);
  }

  figure div:nth-child(2) span {
    animation-delay: -1s;
  }

  figure div:nth-child(3) {
    transform: rotate(90deg);
  }

  figure div:nth-child(3) span {
    animation-delay: -1.5s;
  }

  figure div:nth-child(4) {
    transform: rotate(135deg);
  }

  figure div:nth-child(4) span {
    animation-delay: -2s;
  }

  figure div:nth-child(5) {
    transform: rotate(180deg);
  }

  figure div:nth-child(5) span {
    animation-delay: -2.5s;
  }

  figure div:nth-child(6) {
    transform: rotate(225deg);
  }

  figure div:nth-child(6) span {
    animation-delay: -3s;
  }

  figure div:nth-child(7) {
    transform: rotate(270deg);
  }

  figure div:nth-child(7) span {
    animation-delay: -3.5s;
  }

  figure div:nth-child(8) {
    transform: rotate(315deg);
  }

  figure div:nth-child(8) span {
    animation-delay: -4;
  }

  @keyframes rotation {
    100% {
      transform: translate(-50%, -50%) rotate(-360deg) scale(1.4, 1.4);
    }
  }

  @keyframes shuffle {
    50% {
      transform: scale(0.4, 0.4) rotate(-90deg);
      border-radius: 50%;
    }
  }
}
</style>
