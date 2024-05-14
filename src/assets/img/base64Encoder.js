// import { ref } from "vue";
import { defineStore } from "pinia";
export const useBaseStore = defineStore("store", {
  state: () => ({
    baseEncoder: [],
  }),
  actions: {
    async base64Encoder(files) {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.baseEncoder = reader.result;
      };
      reader.readAsDataURL(files);
      console.log(this.baseEncoder);
    },
  },
});
