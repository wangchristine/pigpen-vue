<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import LotteryDeleteDialog from "@/components/Lottery/LotteryDeleteDialog.vue";
import LotteryListItem from "@/components/Lottery/LotteryListItem.vue";
import LotteryStatusDialog from "@/components/Lottery/LotteryStatusDialog.vue";
import router from "@/router";
import { useLotteryStore } from "@/store/lottery";

const lotteryStore = useLotteryStore();
const { lotteryList } = storeToRefs(lotteryStore);
const statusDialog = ref(false);
const selectLotteryId = ref(null);
const selectLotteryStatusKey = ref(null);
const deleteDialog = ref(false);
const selectDeleteLotteryId = ref(null);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  try {
    await lotteryStore.getLotteries();
  } finally {
    isLoading.value = false;
  }
});

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

const deleteLottery = async (id) => {
  await lotteryStore.deleteLottery(id);
  await lotteryStore.getLotteries();
};

const confirmDeleteLottery = async (id) => {
  selectDeleteLotteryId.value = id;
  deleteDialog.value = true;
};

const deleteSelectedLottery = async () => {
  await deleteLottery(selectDeleteLotteryId.value);
};
</script>

<template>
  <v-app-bar color="surface" flat>
    <v-app-bar-title>Lottery</v-app-bar-title>
    <template #append>
      <v-btn
        prepend-icon="mdi-plus"
        variant="flat"
        color="primary"
        class="mr-2"
        @click="router.push({ name: 'LotteryCreate' })"
      >
        新增
      </v-btn>
    </template>
  </v-app-bar>
  <v-container class="index-container py-4 py-sm-8 px-4 px-sm-6" fluid>
    <v-progress-linear v-if="isLoading" color="primary" indeterminate class="mb-4" />
    <v-row v-else class="lottery-sections">
      <v-col cols="12">
        <v-card class="lottery-section" variant="outlined">
          <v-card-title class="section-title d-flex align-center justify-space-between">
            <span class="section-title-label">進行中</span>
            <v-chip size="small" color="primary" variant="flat" rounded="pill">{{ inProcessLottery.length }}</v-chip>
          </v-card-title>
          <v-list v-if="inProcessLottery.length" class="py-0">
            <template v-for="(lottery, key) in inProcessLottery" :key="lottery.id">
              <LotteryListItem
                :lottery="lottery"
                is-in-process
                @open-status="openStatusDialog"
                @edit="router.push({ name: 'LotteryEdit', params: { id: $event } })"
                @delete="confirmDeleteLottery"
              />
              <v-divider v-if="key !== inProcessLottery.length - 1" />
            </template>
          </v-list>
          <div v-else class="empty-state">
            <v-icon size="36" color="primary">mdi-ticket-confirmation-outline</v-icon>
            <div class="text-body-1 mt-2">目前沒有進行中的抽獎活動</div>
            <v-btn
              prepend-icon="mdi-plus"
              variant="flat"
              color="primary"
              class="mt-4"
              @click="router.push({ name: 'LotteryCreate' })"
            >
              新增
            </v-btn>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card class="lottery-section" variant="outlined">
          <v-card-title class="section-title d-flex align-center justify-space-between">
            <span class="section-title-label">歷史紀錄</span>
            <v-chip size="small" color="primary" variant="flat" rounded="pill">{{ historyLottery.length }}</v-chip>
          </v-card-title>
          <v-list v-if="historyLottery.length" class="py-0">
            <template v-for="(lottery, key) in historyLottery" :key="lottery.id">
              <LotteryListItem :lottery="lottery" />
              <v-divider v-if="key !== historyLottery.length - 1" />
            </template>
          </v-list>
          <div v-else class="empty-state">
            <v-icon size="36" color="primary">mdi-history</v-icon>
            <div class="text-body-1 mt-2">目前沒有歷史紀錄</div>
          </div>
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
  <LotteryDeleteDialog
    :open-dialog="deleteDialog"
    @update:open-dialog="deleteDialog = $event"
    @confirm="deleteSelectedLottery"
  />
</template>

<style scoped>
.index-container {
  max-width: 1200px;
  margin: 0 auto;
}

.lottery-section {
  background-color: rgb(var(--v-theme-surface));
}

.lottery-sections {
  row-gap: 20px;
}

.section-title {
  padding: 18px 20px;
  font-size: 18px;
  font-weight: 500;
}

.section-title-label {
  color: rgb(var(--v-theme-primary));
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  padding: 24px;
  background-color: rgb(var(--v-theme-surface));
  color: rgba(235, 235, 235, 0.68);
  text-align: center;
}
</style>
