<script setup>
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { onMounted } from "vue";
import { nextTick } from "vue";
import location from "@/config/location";
import router from "@/router";
import { useCommonStore } from "@/store/common";
import { useLotteryStore } from "@/store/lottery";
import { formatDate } from "@/utils/date";
import rules from "@/utils/formRule";

const props = defineProps({ isEditMode: Boolean });
const commonStore = useCommonStore();
const lotteryStore = useLotteryStore();
const formRef = ref(null);
const formValid = ref(false);
const fromNow = ref(false);

const { showSnack, snackType, snackText } = storeToRefs(commonStore);
const { formData } = storeToRefs(lotteryStore);

watch(fromNow, (isFromNow) => {
  if (isFromNow) {
    const now = new Date();
    formData.value.startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else {
    formData.value.startDate = null;
  }
});

const submitForm = async () => {
  if (formValid.value) {
    console.log(formData.value);

    if (props.isEditMode) {
      await lotteryStore.editLottery(formData.value, formData.value.id);
      showSnack.value = true;
      snackType.value = "success";
      snackText.value = "修改成功";
    } else {
      await lotteryStore.addLottery(formData.value);
      showSnack.value = true;
      snackType.value = "success";
      snackText.value = "新增成功";
    }

    router.push({ name: "Lottery" });
  }
};

onMounted(() => {
  nextTick(() => {
    formRef.value.resetValidation();
  });
});
</script>

<template>
  <div class="form-container">
    <v-form ref="formRef" v-model="formValid" @submit.prevent="submitForm">
      <v-row>
        <v-col cols="12">
          <v-card class="pa-sm-3">
            <v-card-text>
              <v-row dense>
                <v-col cols="12">
                  <v-text-field v-model="formData.title" :rules="[rules.required]" label="Title*"></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <v-text-field v-model="formData.link" :rules="[rules.required]" label="Link*"></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="auto" sm="12">活動區間: </v-col>
                <v-col cols="12" md="2">
                  <v-checkbox v-model="fromNow">
                    <template #label>即日起</template>
                  </v-checkbox>
                </v-col>
                <v-col cols="12" sm="6" md="5">
                  <v-date-input
                    v-model="formData.startDate"
                    label="開始日期*"
                    prepend-icon=""
                    prepend-inner-icon="$calendar"
                    :rules="[rules.required, rules.beforeDate(formData.endDate)]"
                  ></v-date-input>
                </v-col>
                <v-col cols="12" sm="6" md="5">
                  <v-date-input
                    v-model="formData.endDate"
                    label="結束日期*"
                    prepend-icon=""
                    prepend-inner-icon="$calendar"
                    :rules="[rules.required, rules.afterDate(formData.startDate)]"
                  ></v-date-input>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.award"
                    :rules="[rules.required]"
                    rows="3"
                    label="Award*"
                    no-resize
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.description"
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
                    v-model="formData.announceDates"
                    label="公布日期*"
                    prepend-icon=""
                    prepend-inner-icon="$calendar"
                    :rules="[rules.required]"
                    @update:model-value="(dates) => (formData.announceDates = [...dates].sort((a, b) => a - b))"
                    multiple
                  ></v-date-input>
                  <ul class="announceDateList">
                    <li v-for="date in formData.announceDates" :key="date" :title="date">- {{ formatDate(date) }}</li>
                  </ul>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="formData.announceLocations"
                    :items="location"
                    label="公布地點*"
                    multiple
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <hr color="#b39ddb" />
      <v-row>
        <v-col cols="12">
          <v-btn type="submit" size="large" variant="tonal" color="deep-purple-lighten-3" block>儲存</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px 10px 10px;
}

.announceDateList {
  list-style: none;
  padding: 0 10px 10px 10px;
  font-size: 16px;
}
</style>
