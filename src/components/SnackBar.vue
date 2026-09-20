<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useCommonStore } from "@/store/common";

const props = defineProps({
  timeout: {
    type: Number,
    default: 4000,
  },
});

const commonStore = useCommonStore();
const { showSnack, snackType, snackText } = storeToRefs(commonStore);

const colors = ref({
  info: "info",
  success: "success",
  error: "error",
});

const toggleSnack = () => {
  showSnack.value = !showSnack.value;
};
</script>

<template>
  <div class="text-center">
    <v-snackbar
      :model-value="showSnack"
      :timeout="props.timeout"
      location="top"
      :color="colors[snackType]"
      @update:model-value="() => toggleSnack()"
    >
      {{ snackText }}
    </v-snackbar>
  </div>
</template>
