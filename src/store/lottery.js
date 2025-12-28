import { defineStore } from "pinia";
import { ref } from "vue";
import { apiDeleteLottery, apiGetLotteries, apiGetLottery, apiPostAsk, apiPostLottery, apiPutLottery } from "@/apis";
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
  const formData = ref({ ...initData.value });

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

  const addLottery = async (data) => {
    return await apiPostLottery(data);
  };

  const getLottery = async (id) => {
    return await apiGetLottery(id);
  };

  const editLottery = async (data, id) => {
    return await apiPutLottery(data, id);
  };

  const deleteLottery = async (id) => {
    return await apiDeleteLottery(id);
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
      formData.value = {
        title: res.data.response.title,
        link: "",
        startDate: res.data.response.startDate,
        endDate: res.data.response.endDate,
        award: res.data.response.award,
        description: res.data.response.description,
        announceDates: res.data.response.announceDates,
        announceLocations: res.data.response.announceLocations,
      };
      return res.data.response;
    });
  };

  return {
    lotteryList,
    initData,
    formData,

    getLotteries,
    addLottery,
    getLottery,
    editLottery,
    deleteLottery,
    updateLotteryStatus,
    askAI,
  };
});
