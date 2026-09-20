<script setup>
import { storeToRefs } from "pinia";
import { useCommonStore } from "@/store/common";

const commonStore = useCommonStore();
const { isProgressLoading } = storeToRefs(commonStore);
</script>

<template>
  <v-progress-linear v-if="isProgressLoading" color="primary" height="3" indeterminate absolute />
</template>
