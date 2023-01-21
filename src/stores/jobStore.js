import { defineStore } from "pinia";

export const useJobStore = defineStore("job", {
    state: () => {
        return {
            form: {
                name: "",
                level: {
                    name: "",
                    level: 0
                },
                benefits: [],
                type: [],
                workingAddress: [],
                desc: "",
                requirement: "",
                salaryRate: {
                    isVisible: false,
                    from: 0,
                    to: 0
                },
                keyword: [],
                languageRecruitment: [],
                emailReceive: [],
                outdate:"",
                recruitmentProcess: []

            },
            

        }
    },

});
