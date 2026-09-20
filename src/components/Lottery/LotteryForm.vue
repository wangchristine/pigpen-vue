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
          <v-card class="form-card" variant="outlined">
            <v-card-title class="form-section-title">基本資料</v-card-title>
            <v-card-text class="pa-4 pa-sm-6">
              <v-row dense>
                <v-col cols="12">
                  <v-text-field v-model="formData.title" :rules="[rules.required]" label="活動名稱*"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="formData.link" :rules="[rules.required]" label="活動連結*"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider />

            <v-card-title class="form-section-title">活動期間</v-card-title>
            <v-card-text class="pa-4 pa-sm-6 pt-0">
              <v-row dense align="center">
                <v-col cols="12" md="2">
                  <v-checkbox v-model="fromNow" density="compact" hide-details>
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
            </v-card-text>

            <v-divider />

            <v-card-title class="form-section-title">活動內容</v-card-title>
            <v-card-text class="pa-4 pa-sm-6 pt-0">
              <v-row dense>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.award"
                    :rules="[rules.required]"
                    rows="3"
                    auto-grow
                    max-rows="6"
                    label="獎項內容*"
                    no-resize
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.description"
                    :rules="[rules.required]"
                    rows="5"
                    auto-grow
                    max-rows="10"
                    label="活動描述*"
                    no-resize
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider />

            <v-card-title class="form-section-title">公布設定</v-card-title>
            <v-card-text class="pa-4 pa-sm-6 pt-0">
              <v-row dense>
                <v-col cols="12" sm="6">
                  <v-date-input
                    v-model="formData.announceDates"
                    label="公布日期*"
                    prepend-icon=""
                    prepend-inner-icon="$calendar"
                    :rules="[rules.required]"
                    @update:model-value="(dates) => (formData.announceDates = [...dates].sort((a, b) => a - b))"
                    multiple
                  ></v-date-input>
                  <div v-if="formData.announceDates.length" class="announce-date-list">
                    <v-chip
                      v-for="date in formData.announceDates"
                      :key="date"
                      size="small"
                      variant="tonal"
                      color="primary"
                      rounded="pill"
                    >
                      {{ formatDate(date) }}
                    </v-chip>
                  </div>
                  <div v-else class="text-caption text-medium-emphasis">尚未選擇公布日期</div>
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
      <v-divider class="my-2" />
      <div class="submit-actions">
        <v-btn type="submit" size="large" variant="flat" color="primary">儲存</v-btn>
      </div>
    </v-form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 1040px;
  margin: 0 auto;
  padding: 16px 16px 24px;
}

.form-section-title {
  padding: 20px 24px 12px;
  font-size: 18px;
  font-weight: 500;
}

.announce-date-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.submit-actions {
  display: flex;
  justify-content: flex-end;
}

.submit-actions .v-btn {
  min-width: 160px;
}

@media (max-width: 599px) {
  .form-container {
    padding: 12px 8px 20px;
  }

  .form-section-title {
    padding: 16px 16px 8px;
  }

  .submit-actions .v-btn {
    width: 100%;
  }
}
</style>
