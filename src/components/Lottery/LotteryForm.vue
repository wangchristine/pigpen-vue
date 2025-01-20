<script setup>
import { ref } from "vue";

const valid = ref(false);
const fromNow = ref(false);

const formData = ref([
  {
    title: "",
    award: "",
    link: "",
    description: "",
    startDate: null,
    endDate: null,
  },
]);

const rules = ref({
  required: (value) => {
    if (value) return true;
    return "Required";
  },
});

const addFormItem = () => {
  formData.value.push({
    title: "",
    award: "",
    link: "",
    description: "",
    startDate: null,
    endDate: null,
  });
};

const removeFormItem = (key) => {
  formData.value.splice(key, 1);
};
</script>

<template>
  <v-form v-model="valid">
    <v-container>
      <template v-for="(item, key) in formData" :key="key">
        <h2>
          task {{ key + 1 }}
          <v-btn v-if="formData.length > 1" size="small" @click="removeFormItem(key)">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </h2>
        <v-row dense>
          <v-col cols="12" md="8">
            <v-text-field v-model="formData[key].title" :rules="[rules.required]" label="Title*"></v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" md="8">
            <v-textarea v-model="formData[key].award" :rules="[rules.required]" rows="3" label="Award*"></v-textarea>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" md="8">
            <v-text-field v-model="formData[key].link" :rules="[rules.required]" label="Link*"></v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" md="8">
            <v-textarea
              v-model="formData[key].description"
              :rules="[rules.required]"
              rows="5"
              label="Description*"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="auto">
            活動區間:
          </v-col>
          <v-col cols="auto">
            <v-checkbox v-model="fromNow">
              <template v-slot:label>即日起</template>
            </v-checkbox>
          </v-col>
          <v-col cols="6" md="4" v-if="!fromNow">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-model="formData[key].startDate"
                  label="開始日期"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="props"
                ></v-text-field>
              </template>
              <v-date-picker v-model="formData[key].startDate" show-adjacent-months></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6" md="4">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-model="formData[key].endDate"
                  label="結束日期*"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="props"
                  :rules="[rules.required]"
                ></v-text-field>
              </template>
              <v-date-picker v-model="formData[key].endDate" show-adjacent-months></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-divider v-if="key !== formData.length - 1" style="margin: 12px 0"></v-divider>
      </template>
      <hr />
      <v-btn @click="addFormItem">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-container>
  </v-form>
</template>

<style scoped></style>
