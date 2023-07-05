<template>
  <AppPopup class="fullscreen-popup" @close="$emit('close')">
    <template #header>{{title}}</template>
    <template #body>
      <div class="fullscreen-image" >
        <img :src="imagePath" :alt="title"/>
      </div>
    </template>
  </AppPopup>  
</template>

<script>
import AppPopup from "@/components/AppPopup.vue";
export default {
  components: {
    AppPopup
  },
  props: ["title", "imagePath"]
}
</script>

<style lang="scss" scoped>
  .fullscreen-popup::v-deep .popup {
    height: 90vh;
    width: 90vw;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
  } 
  .fullscreen-popup::v-deep .popup-body {
    flex: 1 1 auto;
  } 
  .fullscreen-image {
    position: relative;
    height: 100%;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    background: #fff;
    & img {
      width: calc(100% - 30px);
      height: calc(100% - 30px);
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      position: absolute;
      object-fit: contain;
    }
  }
</style>