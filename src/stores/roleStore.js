import { defineStore } from "pinia";

export const useRoleStore = defineStore("role", {
    state: () => {
        return {
            settings: {
                recruitmentFunction: {
                    canRead: false,
                    canWrite: false
                },
                applierFunction: {
                    canRead: false,
                    canWrite: false
                },
                systemFunction: {
                    canRead: false,
                    canWriteRolePermission: false,
                    canWriteCompanyInfo: false,
                    canWriteUserPermission: false
                },
                searchFunction: {
                    canSearch: false
                }
            },
            _id: "",
            name: "",
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
            this.$state = data;
        },
        setAdminRole() {
            this.name = "ADMIN";
            this.settings = {
                recruitmentFunction: {
                    canRead: true,
                    canWrite: true
                },
                applierFunction: {
                    canRead: true,
                    canWrite: true
                },
                systemFunction: {
                    canRead: true,
                    canWriteRolePermission: true,
                    canWriteCompanyInfo: true,
                    canWriteUserPermission: true
                },
                searchFunction: {
                    canSearch: true
                }
            }
        }
    },

});