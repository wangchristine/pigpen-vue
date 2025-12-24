import { defineStore } from "pinia";
import { ref } from "vue";
import { apiGetLotteries, apiPostAsk } from "@/apis";
import { parseDate } from "@/utils/date";

export const useLotteryStore = defineStore("lottery", () => {
  const lotteryList = ref([]);
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

  const getLotteries = async () => {
    return await apiGetLotteries().then((res) => {
      lotteryList.value = res.data.map((item) => ({
        ...item,
        startDate: parseDate(item.startDate),
        endDate: parseDate(item.endDate),
        announceDates: item.announceDates.map((date) => parseDate(date)),
        createdAt: parseDate(item.createdAt),
      }));
    });
  };

  const addLottery = (data) => {
    data.forEach((item) => {
      const lottery = {
        id: lotteryList.value.length + 1,
        ...item,
        status: item.announceDates.map(() => 0),
        createdAt: new Date(),
      };
      lotteryList.value.push(lottery);
    });
  };

  const editLottery = (data) => {
    let lottery = lotteryList.value.filter((lottery) => lottery.id == data[0].id);

    if (lottery?.id) {
      lotteryList.value[lottery.id] = {
        ...data[0],
        id: lottery.id,
        status: lottery.status,
        createdAt: lottery.createdAt,
      };
    }
  };

  const deleteLottery = (id) => {
    let index = lotteryList.value.findIndex((lottery) => lottery.id == id);

    if (index != -1) {
      lotteryList.value.splice(index, 1);
    }
  };

  const updateLotteryStatus = (id, statusKey, status) => {
    let lotteryIndex = lotteryList.value.findIndex((lottery) => lottery.id == id);

    if (lotteryIndex != -1) {
      let statusIndex = lotteryList.value[lotteryIndex].status.findIndex((status, key) => key == statusKey);

      if (statusIndex != -1) {
        lotteryList.value[lotteryIndex].status[statusIndex] = status;
      }
    }
  };

  const askAI = async (data) => {
    return await apiPostAsk(data).then((res) => {
      formData.value = [
        {
          title: res.data.response.title,
          link: "",
          startDate: res.data.response.startDate,
          endDate: res.data.response.endDate,
          award: res.data.response.award,
          description: res.data.response.description,
          announceDates: res.data.response.announceDates,
          announceLocations: res.data.response.announceLocations,
        },
      ];
      return res.data.response;
    });
  };

  return {
    lotteryList,
    initData,
    formData,

    getLotteries,
    addLottery,
    editLottery,
    deleteLottery,
    updateLotteryStatus,
    askAI,
  };
});
