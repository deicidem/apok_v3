<template>
  <PageBase :show-menu="false">
    <div class="c">
      <AdminSidebar></AdminSidebar>
      <RouterView :key="$route.fullPath"></RouterView>
    </div>
  </PageBase>
</template>

<script>
import AdminSidebar from "@/components/admin/AdminSidebar.vue";
import PageBase from "@/components/PageBase.vue";

export default {
  components: {
    AdminSidebar,
    PageBase,
  },
};
</script>

<style lang="scss" scoped>
.c {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
}
</style>
