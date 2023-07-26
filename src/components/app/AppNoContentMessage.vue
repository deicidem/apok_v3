<template>
  <div class="message">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.message {
  text-align: center;
  font-size: 22px;
  line-height: 1.3;
  background: $white;
  color: #555;
  border-radius: 10px;
  padding: 30px 20px;
  width: 100%;
  box-shadow: $shadow-big;
}
</style>
