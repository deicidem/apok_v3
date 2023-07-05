<template>
  <AppLoader
    v-if="!loaded"
    :showLabel="true"
    :loaderSize="150"
    class="absolute bottom-2/3 right-2/4 translate-x-2/4 translate-y-2/4"
  />
  <!-- <div class="wrapper" v-else>
    <PortalTarget name="popup" />
    <RouterView />
    
  </div> -->
  <div class="wrapper" v-else>
    <div id="popup-target"></div>
    <RouterView />
    <AppAlertsList
      class="app-alerts"
      :alerts="alerts"
      @delete="deleteAlert"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useConfigsStore } from '@/stores/configs';
import { useSatellitesStore } from '@/stores/satellites';
import { useGroupTypesStore } from '@/stores/groupTypes';
import { useRolesStore } from '@/stores/roles';
import { useDataTypesStore } from '@/stores/dataTypes';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import AppLoader from '@/components/controls/AppLoader.vue';
import AppAlertsList from '@/components/app/AppAlertsList.vue';
import { storeToRefs } from 'pinia';
import { useAlertsStore } from '@/stores/alerts';
// import AppAlertsList from "@/components/AppAlertsList.vue";
// import AppLoader from "@/components/controls/AppLoader.vue";
// import "vue2-dropzone/dist/vue2Dropzone.min.css";
// import { mapGetters, mapActions } from "vuex";
const loaded = ref<Boolean>(false);

const {alerts} = storeToRefs(useAlertsStore());
const {deleteAlert} = useAlertsStore();

onMounted(async () => {
  const userStore = useUserStore();
  userStore
    .setCookie()
    .then(() => {
      return Promise.all([
        useConfigsStore().fetchConfigs(),
        useSatellitesStore().fetchSatellites(),
        useGroupTypesStore().fetchGroupTypes(),
        useRolesStore().fetchRoles(),
        useDataTypesStore().fetchDataTypes(),
        useDataTypesStore().fetchDataTypes(),
      ]).finally(() => {
        return userStore.auth();
      });
    })
    .finally(async () => {
      loaded.value = true;
      const params = new URLSearchParams(window.location.search);
      if (params.has('emailUrl')) {
        const url: string |null = params.get('emailUrl');
        const signature: string |null = params.get('signature');
        // if (userStore.isAuth) {
        //   await userStore.verifyEmail(`${url}&signature=${signature}`);
        // } else {
        //   userStore.emailVerificationLink = `${url}&signature=${signature}`;
        //   useRouter().push({name: "login"});
        // }
      }
      // connectToEcho()
    });
  // await usePlansStore().fetchPlans();
});
// export default {
//   components: {
//     AppAlertsList,
//     AppLoader,
//   },
//   data: () => ({
//     showVerificationPopup: false,
//     loaded: false,
//   }),
//   computed: {
//     ...mapGetters("alerts", ["getAlerts"]),
//     ...mapGetters("user", ["isAuth"]),
//   },

//   methods: {
//     ...mapActions("alerts", ["deleteAlert"]),
//     ...mapActions("notifications", ["connectToEcho"]),
//     ...mapActions("user", ["verifyEmail", "setEmailVerificationLink"]),
//     onSend(a) {
//       console.log(a);
//     },
//   },

//   async mounted() {
//     let store = this.$store;

//     await store
//       .dispatch("user/setCookie")
//       .then(() => {
//         return Promise.all([
//           store.dispatch("plans/load"),
//           store.dispatch("satellites/fetchSatellites"),
//           store.dispatch("groupTypes/fetchGroupTypes"),
//           store.dispatch("roles/fetchRoles"),
//           store.dispatch("dataTypes/fetchDataTypes"),
//           store.dispatch("configs/fetchConfigs"),
//         ]).finally(() => {
//           return store
//             .dispatch("user/auth")
//             .then(() => store.dispatch("notifications/fetchUnreadCount"));
//         });
//       })
//       .finally(async () => {
//         this.loaded = true;
//         let params = new URLSearchParams(window.location.search);
//         console.log(this.isAuth);
//         if (params.has("emailUrl")) {
//           let url = params.get("emailUrl");
//           let signature = params.get("signature");
//           if (this.isAuth) {
//             await this.verifyEmail(`${url}&signature=${signature}`);
//           } else {
//             this.setEmailVerificationLink(`${url}&signature=${signature}`);
//             this.$router.push({ name: "login" });
//           }
//         }
//         this.connectToEcho();
//       });
//   },
// };
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}
html,
body {
  padding: 0;
  margin: 0;
  min-width: 1024px;
  width: 100%;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  overflow: visible;
  background: $white-dark;
  min-height: 100vh;
}

header,
nav,
section,
footer,
main,
article {
  display: block;
}

a {
  text-decoration: none;
}

input::-ms-reveal,
input::-ms-clear {
  display: none;
}

img {
  display: block;
  object-fit: cover;
  object-position: center;
  width: 100%;
}

svg:focus {
  outline: none;
}

.content {
  height: 100%;
  padding: 20px;
  max-height: 100%;
  flex: 1 1 auto;
  background: $white-dark;
}

.dzz-name {
  word-break: break-word;
}

.icon {
  line-height: 0;
}

.back {
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &-arrow {
    display: flex;
    color: $color-main;
    font-size: 24px;
  }

  &-subtitle {
    margin: 0 0 0 10px;
    font-size: 18px;
    color: $color-main;
  }

  &-arrow-w {
    display: flex;
    color: $white;
    font-size: 24px;
  }

  &-subtitle-w {
    margin: 0 0 0 10px;
    font-size: 18px;
    color: $white;
  }
}

/*_____________________vueScroll______________*/

.__vuescroll {
  display: flex;
  flex-direction: column;
}

.__panel {
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
  }

  /* ie 10+ */
  & {
    -ms-overflow-style: none;
  }
  width: 100%;
}

.__bar-is-vertical {
  background: $color-main !important;
}
</style>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.app-alerts {
  position: absolute;
  right: 40px;
  bottom: 40px;
  z-index: 1000;
}
</style>
