<script setup>
import { ref } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
  },
  timeout: {
    type: Number,
    default: 4000,
  },
});
const snackbar = ref(props.show);
</script>

<template>
  <div class="text-center">
    <v-snackbar v-model="snackbar" :timeout="timeout" location="top" color="deep-purple-lighten-4">
      {{ text }}
    </v-snackbar>
  </div>
</template>
