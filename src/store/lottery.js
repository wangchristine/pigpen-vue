import { defineStore } from "pinia";
import { ref } from "vue";
import { apiPostAsk } from "@/apis";

export const useLotteryStore = defineStore("lottery", () => {
  const initData = ref({
    title: "",
    link: "",
    startDate: null,
    endDate: null,
    award: "",
    description: "",
    announceDates: [],
    announceLocations: [],
  });
  const formData = ref([{ ...initData.value }]);

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

  const askAI = async (data) => {
    return await apiPostAsk(data).then((res) => {
      formData.value = [
        {
          title: res.data.response.title,
          link: "",
          startDate: null,
          endDate: null,
          award: "",
          description: res.data.response.description,
          announceDates: [],
          announceLocations: [],
        },
      ];
      return res.data.response;
    });
  };

  return {
    lotteryList,
    initData,
    formData,

    addLottery,
    askAI,
  };
});
