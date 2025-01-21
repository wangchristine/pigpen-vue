<script setup>
import { ref } from "vue";
import location from "@/config/location";

const initData = {
  title: "",
  award: "",
  link: "",
  description: "",
  startDate: null,
  endDate: null,
  announceDates: [],
  announceLocations: [],
};

const formValid = ref(false);
const fromNow = ref(false);
const formData = ref([initData]);

const rules = ref({
  required: (value) => {
    if (value) {
      if (Array.isArray(value)) {
        if (value.length !== 0) {
          return true;
        } else {
          return "Required";
        }
      } else {
        return true;
      }
    }
    return "Required";
  },
});

const addFormItem = () => {
  formData.value.push(initData);
};

const removeFormItem = (key) => {
  formData.value.splice(key, 1);
};
</script>

<template>
  <v-form v-model="formValid">
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
          <v-col cols="auto" sm="12">活動區間: </v-col>
          <v-col cols="12" md="2">
            <v-checkbox v-model="fromNow">
              <template v-slot:label>即日起</template>
            </v-checkbox>
          </v-col>
          <v-col cols="12" sm="6" md="4" v-if="!fromNow">
            <v-date-input
              v-model="formData[key].startDate"
              label="開始日期"
              prepend-icon=""
              prepend-inner-icon="$calendar"
            ></v-date-input>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-date-input
              v-model="formData[key].endDate"
              label="結束日期*"
              prepend-icon=""
              prepend-inner-icon="$calendar"
              :rules="[rules.required]"
            ></v-date-input>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" sm="6" md="4">
            <v-date-input
              v-model="formData[key].announceDates"
              label="公布日期*"
              prepend-icon=""
              prepend-inner-icon="$calendar"
              :rules="[rules.required]"
              multiple
            ></v-date-input>
            <ul class="announceDateList">
              <li v-for="(date, key) in formData[key].announceDates" :key="key" :title="date">
                {{ date.toLocaleDateString() }}
              </li>
            </ul>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-select
              v-model="formData[key].announceLocations"
              :items="location"
              label="公布地點*"
              multiple
              :rules="[rules.required]"
            ></v-select>
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

<style scoped>
.announceDateList {
  list-style: none;
  padding: 0 10px 10px 10px;
}
</style>
