import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            activity: {
                searchHistory: [],
                companyViewed: [],
                companyFollowed: [],
                jobViewed: [],
                jobSaved: [],
                jobApplied: [],
                notification: []
            },
            info: {
                ward: "",
                allowSearchInfo: false,
                positionPresent: "",
                levelPresent: "",
                yearExperienced: 0,
                workingLocationTarget: [],
                salaryTarget: 0,
                address: "",
                country: "",
                district: "",
                city: "",
                CV: "",
                skills: [],
                avatar: "",
                dob: "",
                desc: "",
                typeWorking: [],
                experiences: [],
                education: [],
                foreignLanguage: [],
                name: "",
                phone: ""
            },
            _id: "",
            email: "",
            roleNumber: 0,
            // isForgotPassword: false,
            createdAt: "",
            updatedAt: "",
            flagGet: false,
        }
    },

    getters: {
        getUserState(state) {
            return state
        },

    },
    actions: {
        
        setFlagGet(){
            this.flagGet = !this.flagGet
        },
        setState({email, _id,info, activity,roleNumber, createdAt, updatedAt}){
           
            this.email = email;
            this._id = _id;
            this.info= info;
            this.activity = activity;
            this.roleNumber = roleNumber;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;

        },
        setInfo(value) {
            this.info = value;

        },
        setActivity(value) {
            this.activity = value
        
        },
    },

});