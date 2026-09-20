<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import avatarImg from "@/assets/avatar.png";
import menu from "@/config/menu";
import router from "@/router";
import { useCommonStore } from "@/store/common";

const drawer = ref(null);
const commonStore = useCommonStore();
const { showSnack, snackType, snackText } = storeToRefs(commonStore);

const navigateRoute = (routeName) => {
  router.push({ name: routeName });
};

const logout = async () => {
  await commonStore.logout();
  showSnack.value = true;
  snackType.value = "success";
  snackText.value = "成功登出";
  router.push({ name: "Login" });
};
</script>

<template>
  <v-navigation-drawer v-model="drawer" color="surface" elevation="2" width="264">
    <v-sheet class="drawer-header pa-5 d-flex flex-column" color="surface">
      <div class="d-flex flex-column align-center" :style="{ width: 'fit-content' }">
        <v-avatar class="mb-4" size="64">
          <v-img alt="Avatar" :src="avatarImg"></v-img>
        </v-avatar>
        <div>Welcome!</div>
      </div>
      <div class="d-flex justify-end mt-4">
        <v-btn prepend-icon="mdi-logout" variant="outlined" block @click="logout">Logout</v-btn>
      </div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list nav density="comfortable" class="px-3 py-4">
      <v-list-item
        v-for="(item, idx) in menu"
        :key="idx"
        :prepend-icon="item.icon"
        :title="item.name"
        link
        @click="navigateRoute(item.routeName)"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
