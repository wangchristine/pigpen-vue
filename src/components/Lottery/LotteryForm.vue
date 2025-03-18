<script setup>
import { ref, watch } from "vue";
import { useLotteryStore } from "@/store/lottery";
import location from "@/config/location";
import rules from "@/utils/formRule";

const initData = {
  title: "",
  link: "",
  startDate: null,
  endDate: null,
  award: "",
  description: "",
  announceDates: [],
  announceLocations: [],
};

const lotteryStore = useLotteryStore();
const formValid = ref(false);
const fromNow = ref([false]);
const formData = ref([{ ...initData }]);

const addFormItem = () => {
  formData.value.push({ ...initData });
  fromNow.value.push(false);
};

const removeFormItem = (key) => {
  formData.value.splice(key, 1);
  fromNow.value.splice(key, 1);
};

watch(
  fromNow,
  (data) => {
    data.forEach((isFromNow, key) => {
      if (isFromNow) {
        const now = new Date();
        formData.value[key].startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      }
    });
  },
  { deep: true },
);

const addLottery = () => {
  if (formValid.value) {
    console.log(formData.value);

    lotteryStore.addLottery(formData.value);
  }
};
</script>

<template>
  <v-form v-model="formValid" @submit.prevent="addLottery">
    <template v-for="(item, key) in formData" :key="key">
      <h2>
        task {{ key + 1 }}
        <v-btn
          v-if="formData.length > 1"
          size="small"
          variant="tonal"
          color="deep-purple-lighten-3"
          @click="removeFormItem(key)"
        >
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </h2>
      <br />
      <v-row dense>
        <v-col cols="12" md="8">
          <v-text-field v-model="formData[key].title" :rules="[rules.required]" label="Title*"></v-text-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" md="8">
          <v-text-field v-model="formData[key].link" :rules="[rules.required]" label="Link*"></v-text-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="auto" sm="12">活動區間: </v-col>
        <v-col cols="12" md="2">
          <v-checkbox v-model="fromNow[key]">
            <template v-slot:label>即日起</template>
          </v-checkbox>
        </v-col>
        <v-col cols="12" sm="6" md="4" v-if="!fromNow[key]">
          <v-date-input
            v-model="formData[key].startDate"
            label="開始日期*"
            prepend-icon=""
            prepend-inner-icon="$calendar"
            :rules="[rules.required]"
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
        <v-col cols="12" md="8">
          <v-textarea
            v-model="formData[key].award"
            :rules="[rules.required]"
            rows="3"
            label="Award*"
            no-resize
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" md="8">
          <v-textarea
            v-model="formData[key].description"
            :rules="[rules.required]"
            rows="5"
            label="Description*"
            no-resize
          ></v-textarea>
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
            <li v-for="date in formData[key].announceDates" :key="date" :title="date">
              - {{ date.toLocaleDateString() }}
            </li>
          </ul>
        </v-col>
        <v-col cols="12" sm="6">
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
    <hr color="#b39ddb" />
    <v-btn variant="tonal" color="deep-purple-lighten-3" @click="addFormItem">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-row>
      <v-col cols="12">
        <v-btn type="submit" class="float-right" variant="tonal" color="deep-purple-lighten-3">Save</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped>
.announceDateList {
  list-style: none;
  padding: 0 10px 10px 10px;
  font-size: 16px;
}
</style>
