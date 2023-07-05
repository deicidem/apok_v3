import { ref } from 'vue';
import { defineStore } from 'pinia';
export const useComponentsStore = defineStore('components', () => {
  const sidebarActive = ref<boolean>(false);
  const dataCardActive = ref<boolean>(false);
  const scrollOps = ref(initScrollOps());

  sidebarActive.value = Boolean(localStorage.getItem("isSidebarActive"));

  const changeSidebarState = (newState: boolean) => {
    localStorage.setItem("isSidebarActive", String(newState));
    sidebarActive.value = newState;
  }

  return { sidebarActive, dataCardActive, scrollOps, changeSidebarState };
});
function initScrollOps() {
  return {
    vuescroll: {
      mode: "native",
      sizeStrategy: "percent",
      detectResize: true,
      wheelScrollDuration: 500,
    },
    scrollPanel: {
      scrollingX: false,
      speed: 300,
      easing: "easeOutQuad",
    },
    rail: {
      background: "#000",
      opacity: 0.1,
      size: "6px",
      specifyBorderRadius: false,
      gutterOfEnds: "5px",
      gutterOfSide: "5px",
      keepShow: false,
    },
    bar: {
      onlyShowBarOnScroll: false,
      keepShow: true,
      background: "#6BA2A6",
    },
  };
}
