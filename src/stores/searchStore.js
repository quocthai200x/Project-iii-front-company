import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  state: () => {
    return {
      text: "",
      filter: {

      },
      pageNumber: 0,
      toggle: false
    };
  },
  getters: {
    getSearchState(state) {
      return state
    },

  },
  actions: {
    setToggle(){
      this.toggle = !this.toggle;
    },
    setTextValue(value) {
      this.text = value;
    
    },
    setPageNumberValue(value){
      this.pageNumber= value
    },
    setFilterValue(value) {
      this.filter = { ...value }
    },
    getText(){
      return this.text
    }


  },

});