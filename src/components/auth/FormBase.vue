<template>
  <div class="form-block">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

.form-block {
  background: $gradient-w;
  border-radius: 10px;
  box-shadow: $shadow-big;
  padding: 25px 40px;
}

</style>
