import { defineStore } from "pinia";

export const useCompanyStore = defineStore("company", {
    state: () => {
        return {
            isModify: false,
            _id: "",
            info: {
                name: "",
                phone: "",
                location: [],
                size: {
                    label: "",
                    value: 0,
                },
                workingArea: [],
                benefits: [],
                desc :"",
                bannerImage: "",
                aboutLink: "",
                logo: "",
                video: "",
                imageIntro: [],
            },
            blacklistCandidate: [],
            isApproved: false,
            createdAt: "",
            updatedAt: "",
        }
    },

    getters: {
        getUserState(state) {
            return state
        },

    },
    actions: {
        setState(data){
            this.$state = data
        }
    },

});