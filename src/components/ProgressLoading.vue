<script setup>
import { useCommonStore } from "@/store/common";
import { storeToRefs } from "pinia";

const commonStore = useCommonStore();
const { isProgressLoading } = storeToRefs(commonStore);
</script>

<template>
  <v-progress-linear
  v-if="isProgressLoading"
  color="deep-purple-lighten-1"
  height="3"
  indeterminate
  absolute
/>
</template>
