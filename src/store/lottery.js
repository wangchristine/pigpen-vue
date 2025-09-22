import { defineStore } from "pinia";
import { ref } from "vue";
import { apiPostAsk } from "@/apis";

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
    editLottery,
    deleteLottery,
    askAI,
  };
});
