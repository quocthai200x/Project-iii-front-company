<template>
    <q-card flat class="q-pa-md">
        <q-card-section class="row">
            <div class="text-bold  text-h6">Danh sách công việc </div>
        </q-card-section>
        <div class="row justify-end q-mx-md">
            <div class="q-gutter-xs ">
                <q-select class="z-index-999" style="width: 300px;" dense color="deep-orange" outlined v-model="statusSelected"
                    :options="optionsStatus">
                    <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                            <q-item-section>
                                <q-item-label v-html="scope.opt.label"></q-item-label>
                             
                            </q-item-section>
                            <q-item-section avatar>
                                <q-chip v-if="scope.opt.icon != 0" color="red-6" size="12px" text-color="white"
                                    :label="scope.opt.icon">

                                </q-chip>
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
            </div>
        </div>
        <q-card-section class="margin-top-negative">
            <router-view>

            </router-view>
        </q-card-section>

    </q-card>
</template>
<script>
import DrawerVue from '../../../layouts/Drawer.vue'
import { getCountJobByStatus } from "../../../apis/job"
export default {
    watch: {
        "statusSelected"(newValue, oldValue) {
            console.log(newValue)
            if (newValue.value != oldValue.value) {
                if (newValue.value == this.optionsStatus[0].value) {
                    this.$router.push("/job/management/show")
                }
                if (newValue.value == this.optionsStatus[1].value) {
                    this.$router.push("/job/management/hidden")
                }
                if (newValue.value == this.optionsStatus[2].value) {
                    this.$router.push("/job/management/draft")
                }
                if (newValue.value == this.optionsStatus[3].value) {
                    this.$router.push("/job/management/expire")
                }
            }
        },
        "$route.name"(newValue) {
            
            if (newValue.includes("Show")) {
                this.statusSelected = this.optionsStatus[0]
            }
            if (newValue.includes("Hidden")) {
                this.statusSelected = this.optionsStatus[1]
            }
            if (newValue.includes("Draft")) {
                this.statusSelected = this.optionsStatus[2]
            }
            if (newValue.includes("Expire")) {
                this.statusSelected = this.optionsStatus[3]
            }
        }
    },
    data() {
        return {
            optionsStatus: [
                {
                    label: "Đang hiển thị",
                    value: "Đang hiển thị",
                    icon: "",
                },
                {
                    label: "Đang ẩn",
                    value: "Đang ẩn",
                    icon: "",
                },
                {
                    label: "Nháp",
                    value: "Nháp",
                    icon: "",
                },
                {
                    label: "Hết hạn trong 7 ngày",
                    value: "Hết hạn trong 7 ngày",
                    icon: "",
                },

            ],
            statusSelected: {
                label: "Đang hiển thị",
                value: "Đang hiển thị",
                icon: "",
            },
        }
    },
    created() {
        this.$emit('update:layout', DrawerVue);
        this.init()
    },
    methods: {

        init() {
            getCountJobByStatus().then(getCounts => {
                if (getCounts.show > 0) {
                    this.optionsStatus[0].icon = getCounts.show
                }
                if (getCounts.hidden > 0) {
                    this.optionsStatus[1].icon = getCounts.hidden

                }
                if (getCounts.draft > 0) {
                    this.optionsStatus[2].icon = getCounts.draft

                }

                if (getCounts.expiredIn7days > 0) {
                    this.optionsStatus[3].icon = getCounts.expiredIn7days

                }
                // this.countJobByStatus.expiredIn7days.value = getCounts.expiredIn7days;

            })

            if (this.$route.name.includes("Show")) {
                this.statusSelected = this.optionsStatus[0]
            }
            if (this.$route.name.includes("Hidden")) {
                this.statusSelected = this.optionsStatus[1]
            }
            if (this.$route.name.includes("Draft")) {
                this.statusSelected = this.optionsStatus[2]
            }
            if (this.$route.name.includes("Expire")) {
                this.statusSelected = this.optionsStatus[3]
            }
            // console.log(this.suggestCandidateFound)

        }
    }
}
</script>
<style lang="scss">
.z-index-999 {
    z-index: 999;
    display: flex;
    flex-direction: row;
    justify-content: end;
}

// .z-index-999{
//     z-index: 999;
// }

// .margin-top-negative {
//     margin-top: -40px;
// }
</style>