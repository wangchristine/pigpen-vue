<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import router from "@/router";
import { useLotteryStore } from "@/store/lottery";

const lotteryStore = useLotteryStore();
const { lotteryList } = storeToRefs(lotteryStore);

const inProcessLottery = ref([]);
const historyLottery = ref([]);

for (let i = 0; i < lotteryList.value.length; i++) {
  let isInProcessLottery = true;
  for (let j = 0; j < lotteryList.value[i].status.length; j++) {
    if (lotteryList.value[i].status[j] == 0) {
      isInProcessLottery = true;
      break;
    } else {
      isInProcessLottery = false;
    }
  }
  if (isInProcessLottery) {
    inProcessLottery.value.push(lotteryList.value[i]);
  } else {
    historyLottery.value.push(lotteryList.value[i]);
  }
}
</script>

<template>
  <v-app-bar>
    <v-app-bar-title>Lottery</v-app-bar-title>
    <template #append>
      <v-btn
        prepend-icon="mdi-plus"
        variant="tonal"
        color="deep-purple-lighten-3"
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
              <v-list-item lines="three">
                <template #prepend>
                  <template v-for="(status, key2) in lottery.status" :key="key2">
                    <template v-if="status == 0">
                      <v-avatar v-if="new Date() < lottery.announceDates[key2]" color="deep-purple-lighten-3">
                        尚未
                      </v-avatar>
                      <v-avatar v-else color="deep-purple-lighten-1">開獎</v-avatar>
                    </template>
                    <template v-else>
                      <v-avatar v-if="status == 1" color="deep-purple-darken-2">中獎</v-avatar>
                      <v-avatar v-if="status == 2" color="grey-darken-3">未中</v-avatar>
                    </template>
                  </template>
                </template>
                <template #title>{{ lottery.title }}</template>
                <template #subtitle>
                  {{ lottery.startDate.toLocaleDateString() }} ~ {{ lottery.endDate.toLocaleDateString() }} |
                  {{ lottery.award.slice(0, 100) }}
                  {{ lottery.award.length > 100 ? "......" : "" }}
                  <br />
                  公布日期:
                  <template v-for="(date, key2) in lottery.announceDates" :key="key2">
                    {{ date.toLocaleDateString() }}
                    <template v-if="key2 !== lottery.announceDates.length - 1">, </template>
                  </template>
                </template>
              </v-list-item>
              <v-divider v-if="key1 !== inProcessLottery.length - 1" :key="`divider-${key1}`" inset></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-expansion-panels>
            <v-expansion-panel title="歷史紀錄">
              <template #text>
                <template v-for="(lottery, key1) in historyLottery" :key="key1">
                  <v-list-item lines="three">
                    <template #prepend>
                      <template v-for="(status, key2) in lottery.status" :key="key2">
                        <v-avatar v-if="status == 1" color="deep-purple-darken-2">中獎</v-avatar>
                        <v-avatar v-if="status == 2" color="grey-darken-3">未中</v-avatar>
                      </template>
                    </template>
                    <template #title>{{ lottery.title }}</template>
                    <template #subtitle>
                      {{ lottery.startDate.toLocaleDateString() }} ~ {{ lottery.endDate.toLocaleDateString() }} |
                      {{ lottery.award.slice(0, 100) }}
                      {{ lottery.award.length > 100 ? "......" : "" }}
                      <br />
                      公布日期:
                      <template v-for="(date, key2) in lottery.announceDates" :key="key2">
                        {{ date.toLocaleDateString() }}
                        <template v-if="key2 !== lottery.announceDates.length - 1">, </template>
                      </template>
                    </template>
                  </v-list-item>
                  <v-divider v-if="key1 !== historyLottery.length - 1" :key="`divider-${key1}`" inset></v-divider>
                </template>
              </template>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.add-lottery {
  position: fixed;
  bottom: 120px;
  right: 80px;
}
</style>
