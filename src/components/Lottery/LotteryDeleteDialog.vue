<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  openDialog: Boolean,
});
const emit = defineEmits(["update:open-dialog", "confirm"]);

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

const confirmDelete = () => {
  emit("confirm");
  dialog.value = false;
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="300">
    <v-card>
      <v-card-text class="text-center">確定要刪除此抽獎活動嗎？</v-card-text>
      <v-card-actions class="d-flex justify-center ga-2">
        <v-btn variant="text" @click="dialog = false">取消</v-btn>
        <v-btn color="error" variant="flat" @click="confirmDelete">刪除</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
