<script setup>
import { ref } from "vue";

const valid = ref(false);
const fromNow = ref(false);

const formData = ref({
  title: "",
  link: "",
  date: null,
});

const rules = ref({
  required: (value) => {
    if (value) return true;
    return "Required";
  },
});
</script>

<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field v-model="formData.title" :rules="[rules.required]" label="Title*"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field v-model="formData.link" :rules="[rules.required]" label="Link*"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" md="2">
          <v-checkbox v-model="fromNow">
            <template v-slot:label> from now ~ </template>
          </v-checkbox>
        </v-col>
        <v-col cols="12" md="4" v-if="!fromNow">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-text-field
                v-model="formData.startDate"
                label="開始日期"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="props"
              ></v-text-field>
            </template>
            <v-date-picker v-model="formData.startDate" show-adjacent-months></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="4">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-text-field
                v-model="formData.endDate"
                label="結束日期*"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="props"
                :rules="[rules.required]"
              ></v-text-field>
            </template>
            <v-date-picker v-model="formData.endDate" show-adjacent-months></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<style scoped></style>
