import { ref } from "vue";

const rules = ref({
  required: (value) => {
    if (value) {
      if (Array.isArray(value)) {
        if (value.length !== 0) {
          return true;
        } else {
          return "Required";
        }
      } else {
        return true;
      }
    }
    return "Required";
  },
  beforeDate: (compareDate) => (date) => {
    if (!compareDate) return true;
    if (date > compareDate) {
      return "須小於日期";
    }
    return true;
  },
  afterDate: (compareDate) => (date) => {
    if (!compareDate) return true;
    if (date < compareDate) {
      return "須大於日期";
    }
    return true;
  },
});

export default rules;
