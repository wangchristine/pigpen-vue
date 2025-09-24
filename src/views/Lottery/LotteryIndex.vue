<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import LotteryStatusDialog from "@/components/Lottery/LotteryStatusDialog.vue";
import router from "@/router";
import { useLotteryStore } from "@/store/lottery";

const lotteryStore = useLotteryStore();
const { lotteryList } = storeToRefs(lotteryStore);
const statusDialog = ref(false);
const selectLotteryId = ref(null);
const selectLotteryStatusKey = ref(null);

const inProcessLottery = computed(() =>
  lotteryList.value.filter((lottery) => lottery.status.some((status) => status == 0)),
);
const historyLottery = computed(() =>
  lotteryList.value.filter((lottery) => !lottery.status.some((status) => status == 0)),
);

const openStatusDialog = (id, statusKey) => {
  statusDialog.value = true;
  selectLotteryId.value = id;
  selectLotteryStatusKey.value = statusKey;
};

const deleteLottery = (id) => {
  lotteryStore.deleteLottery(id);
};
</script>

<template>
  <v-app-bar>
    <v-app-bar-title>Lottery</v-app-bar-title>
    <template #append>
      <v-btn
        prepend-icon="mdi-plus"
        variant="tonal"
        color="deep-purple-lighten-3"
        class="mr-2"
        @click="router.push({ name: 'LotteryCreate' })"
      >
        Add
      </v-btn>
    </template>
  </v-app-bar>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-list>
            <v-list-subheader title="進行中"></v-list-subheader>
            <template v-for="(lottery, key1) in inProcessLottery" :key="key1">
              <v-list-item class="flex-column align-start py-4">
                <div class="status-row d-flex gap-2 mb-2">
                  <template v-for="(status, key2) in lottery.status" :key="key2">
                    <template v-if="status == 0">
                      <v-avatar v-if="new Date() < lottery.announceDates[key2]" color="info">尚未</v-avatar>
                      <v-btn v-else size="small" icon color="warning" class="rounded-circle" style="font-size: 16px">
                        <v-avatar color="warning" @click="openStatusDialog(lottery.id, key2)">開獎</v-avatar>
                      </v-btn>
                    </template>
                    <template v-else>
                      <v-avatar v-if="status == 1" color="green accent-3">中獎</v-avatar>
                      <v-avatar v-if="status == 2" color="error">未中</v-avatar>
                    </template>
                  </template>
                </div>
                <div class="text-row d-flex flex-column flex-sm-row justify-space-between align-center w-100">
                  <div class="text-content mb-2 mb-sm-0">
                    <div class="title">{{ lottery.title }}</div>
                    <div class="subtitle">
                      {{ lottery.startDate.toLocaleDateString() }} ~ {{ lottery.endDate.toLocaleDateString() }} |
                      {{ lottery.award.slice(0, 100) }}
                      {{ lottery.award.length > 100 ? "......" : "" }}
                      <br />
                      公布日期:
                      <template v-for="(date, key2) in lottery.announceDates" :key="key2">
                        {{ date.toLocaleDateString() }}
                        <template v-if="key2 !== lottery.announceDates.length - 1">, </template>
                      </template>
                    </div>
                  </div>
                  <div class="action-buttons d-flex gap-2">
                    <v-btn
                      class="px-2 mr-1"
                      variant="tonal"
                      color="deep-purple-lighten-3"
                      @click="router.push({ name: 'LotteryEdit', params: { id: lottery.id } })"
                    >
                      修改
                    </v-btn>
                    <v-btn
                      class="px-2"
                      variant="tonal"
                      color="deep-purple-lighten-3"
                      @click="deleteLottery(lottery.id)"
                    >
                      刪除
                    </v-btn>
                  </div>
                </div>
              </v-list-item>
              <v-divider v-if="key1 !== inProcessLottery.length - 1" :key="`divider-${key1}`" inset></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-list>
            <v-list-subheader title="歷史紀錄"></v-list-subheader>
            <template v-for="(lottery, key1) in historyLottery" :key="key1">
              <v-list-item class="flex-column align-start py-4">
                <div class="status-row d-flex gap-2 mb-2">
                  <template v-for="(status, key2) in lottery.status" :key="key2">
                    <v-avatar v-if="status == 1" color="green accent-3">中獎</v-avatar>
                    <v-avatar v-if="status == 2" color="error">未中</v-avatar>
                  </template>
                </div>
                <div class="text-row d-flex justify-space-between align-center w-100">
                  <div class="text-content">
                    <div class="title">{{ lottery.title }}</div>
                    <div class="subtitle">
                      {{ lottery.startDate.toLocaleDateString() }} ~ {{ lottery.endDate.toLocaleDateString() }} |
                      {{ lottery.award.slice(0, 100) }}
                      {{ lottery.award.length > 100 ? "......" : "" }}
                      <br />
                      公布日期:
                      <template v-for="(date, key2) in lottery.announceDates" :key="key2">
                        {{ date.toLocaleDateString() }}
                        <template v-if="key2 !== lottery.announceDates.length - 1">, </template>
                      </template>
                    </div>
                  </div>
                </div>
              </v-list-item>
              <v-divider v-if="key1 !== historyLottery.length - 1" :key="`divider-${key1}`" inset></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <LotteryStatusDialog
    :open-dialog="statusDialog"
    :select-lottery-id="selectLotteryId"
    :select-lottery-status-key="selectLotteryStatusKey"
    @update:open-dialog="statusDialog = $event"
  />
</template>

<style scoped>
.status-row {
  flex-wrap: wrap;
}

.title {
  font-size: 16px;
}

.subtitle {
  font-size: 14px;
  opacity: 0.7;
}
</style>
