import { defineStore } from "pinia";
import { ref } from "vue";

export const useLotteryStore = defineStore("lottery", () => {
  const lotteryList = ref([]);

  const addLottery = (data) => {
    data.forEach((lottery) => {
      lottery.status = [];
      lottery.announceDates.forEach(() => {
        lottery.status.push(0);
      });
      lottery.createdAt = new Date();
      lotteryList.value.push(lottery);
    });
  };

  return {
    lotteryList,

    addLottery,
  };
});
