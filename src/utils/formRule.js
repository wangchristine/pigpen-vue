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
});

export default rules;
