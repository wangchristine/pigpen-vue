<script setup>
import { ref } from "vue";

const valid = ref(false);

const formData = ref({
  title: "",
  link: "",
  date: null,
});

const rules = ref({
  title: [
    (value) => {
      if (value) return true;
      return "Title is required.";
    },
  ],
  link: [
    (value) => {
      if (value) return true;
      return "Link is required.";
    },
  ],
});
</script>

<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="8">
          <v-text-field v-model="formData.title" :rules="rules.title" label="Title*" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="formData.link" :rules="rules.link" label="Link*" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-text-field
                v-model="formData.date"
                label="選擇日期"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="props"
              ></v-text-field>
            </template>
            <v-date-picker v-model="formData.date" show-adjacent-months></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<style scoped></style>
