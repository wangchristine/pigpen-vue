<script setup>
import { ref, watch } from "vue";
import { useLotteryStore } from "@/store/lottery";

const props = defineProps({
  openDialog: Boolean,
  selectLotteryId: Number,
  selectLotteryStatusKey: Number,
});
const emit = defineEmits(["update:open-dialog"]);

const lotteryStore = useLotteryStore();
const dialog = ref(props.openDialog);

watch(
  () => props.openDialog,
  (val) => {
    dialog.value = val;
  },
);
watch(dialog, (val) => {
  emit("update:open-dialog", val);
});

const updateStatus = (status) => {
  lotteryStore.updateLotteryStatus(props.selectLotteryId, props.selectLotteryStatusKey, status);
  dialog.value = false;
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="300">
    <v-card>
      <v-card-text class="text-center">有中嗎？</v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn icon size="large" color="green" variant="tonal" class="rounded-circle" @click="updateStatus(1)">
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn icon size="large" color="red" variant="tonal" class="rounded-circle" @click="updateStatus(2)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
