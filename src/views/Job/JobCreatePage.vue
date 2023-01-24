<template >
    <q-card flat class="q-pa-md">
        <div v-if="!roleStore.settings.recruitmentFunction.canWrite" class="text-caption text-capitalize text-negative">
            <i>** Bạn không có quyền thêm công việc</i>
        </div>
  
        <q-stepper header-class="my-special-header-stepper" transition-next="fade" transition-prev="fade"
            transition-duration="300" flat v-model="step" ref="stepper" animated active-color="negative">
            <q-step :name="1" prefix="1" title="Chỉnh sửa việc làm">
                <q-card flat>
                    <q-card-section class="row">
                        <div class="text-bold q-pa-md text-h6">Thông tin công việc </div>

                    </q-card-section>
                    <q-card-section class="">
                        <div class="row q-px-md">
                            <div class="col-8">
                                <div class="q-mr-md q-gutter-xs">
                                    <div class="text-bold text-capitalize">Chức danh <strong
                                            class="text-negative">*</strong>
                                    </div>
                                    <q-input color="deep-orange" dense type="text" outlined
                                        v-model="jobStore.form.name" />
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="q-gutter-xs">
                                    <div class="text-bold text-capitalize">Cấp bậc <strong
                                            class="text-negative">*</strong>
                                    </div>
                                    <q-select class="q-pr-sm" name="size" model-value="size" dense outlined
                                        color="deep-orange" v-model="levelInit" :options="levelOptions" />
                                </div>
                            </div>
                        </div>

                    </q-card-section>
                    <q-card-section>
                        <div class="row fit q-px-md">
                            <div class="col-8">
                                <div class="q-mr-md q-gutter-md">

                                    <div class="text-bold text-capitalize">
                                        <div class="q-mb-sm">
                                            Địa điểm làm việc <strong class="text-negative">*</strong>
                                        </div>
                                        <div class="text-caption">
                                            <q-btn @click="addLocation" class="bg-red-4" align="around" size="12px"
                                                outline color="white" label="Thêm địa điểm" icon="add" />
                                        </div>
                                    </div>

                                    <div class="q-gutter-xs ">

                                        <div class="row  text-capitalize q-my-sm"
                                            v-for="(location, index ) in jobStore.form.workingAddress"
                                            :key="'location-' + index">
                                            <div class="col-2">
                                                <div>
                                                    {{ "Địa điểm " + (index + 1) + ": " }}
                                                </div>

                                            </div>


                                            <div class="col-8">
                                                <div class="q-pr-xs">
                                                    <div>{{
                                                        location.address + ", " + location.ward + ", " +
                                                            location.district
                                                            + ", " + location.province
                                                    }}</div>
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div class=" q-gutter-xs rounded-borders justify-end row">
                                                    <div>
                                                        <q-btn @click="showMap(index)" size="sm" color="light-green-3"
                                                            icon="map" dense unelevated></q-btn>
                                                        <q-tooltip anchor="center middle" self="center middle">Xem bản
                                                            đồ</q-tooltip>
                                                    </div>
                                                    <div>
                                                        <q-btn @click="editLocation(index)" size="sm"
                                                            color="light-blue-3" icon="edit" dense unelevated></q-btn>
                                                        <q-tooltip anchor="center middle" self="center middle">Chỉnh
                                                            sửa</q-tooltip>
                                                    </div>
                                                    <div>
                                                        <q-btn @click="removeLocation(index)" size="sm"
                                                            color="deep-orange-2" icon="backspace" dense
                                                            unelevated></q-btn>
                                                        <q-tooltip anchor="center middle" self="center middle">Xóa địa
                                                            chỉ</q-tooltip>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="text-bold text-capitalize">
                                    <div class="q-mb-sm">
                                        Thời gian hết hạn <strong class="text-negative">*</strong>
                                    </div>
                                    <q-input dense outlined color="deep-orange" v-model="date" mask="date"
                                        :rules="['date']">
                                        <template v-slot:prepend>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                    <q-date color="deep-orange" flat today-btn v-model="date"
                                                        :options="optionsFn">
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Đóng" color="deep-orange"
                                                                flat />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </div>
                            </div>
                        </div>

                    </q-card-section>
                    <q-card-section>
                        <WorkingAreaSelectVue></WorkingAreaSelectVue>
                    </q-card-section>
                    <q-card-section>
                        <BenefitsSelect></BenefitsSelect>
                    </q-card-section>
                    <q-card-section>
                        <JobDescriptionCardVue></JobDescriptionCardVue>
                    </q-card-section>
                    <q-card-section>
                        <RequirementDescriptionCardVue></RequirementDescriptionCardVue>
                    </q-card-section>
                    <q-card-section>
                        <SalaryCardVue></SalaryCardVue>
                    </q-card-section>
                    <q-card-section>
                        <SkillCardVue></SkillCardVue>
                    </q-card-section>
                    <q-card-section>
                        <LanguageCardVue></LanguageCardVue>
                    </q-card-section>
                </q-card>
            </q-step>
            <q-step :name="2" prefix="2" title="Thiết lập quy trình tuyển dụng">
                <RecruitmentProcessCardVue></RecruitmentProcessCardVue>
            </q-step>
            <q-step :name="3" prefix="3" title="Kiểm thử">
                <ReviewJobVue></ReviewJobVue>
            </q-step>
            <template v-slot:navigation>
                <q-stepper-navigation>
                    <div class="q-pa-lg row justify-end">
                        <q-btn v-if="step > 1" flat color="deep-orange" @click="$refs.stepper.previous()"
                            label="Quay lại" class="q-ml-sm" />
                        <q-btn :disable="this.step === 3 && !roleStore.settings.recruitmentFunction.canWrite" unelevated
                            @click="goToNextStep()" color="deep-orange" :label="step === 3 ? 'Hoàn tất' : 'Tiếp tục'" />
                    </div>
                </q-stepper-navigation>
            </template>
        </q-stepper>
        <q-dialog v-model="isShowMap">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Bản đồ</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <GMapMap :center="{ lat: latitude, lng: longitude }" :zoom="18" map-type-id="terrain"
                        style="width: 400px; height: 400px">
                        <GMapMarker :position="{ lat: latitude, lng: longitude }" />
                    </GMapMap>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Đóng" color="negative" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <DialogAddressVue v-model:isShowAddAddress="isShowAddAddress" v-model:isShowEditAddress="isShowEditAddress"
            v-model:indexToDialog="indexToDialog"></DialogAddressVue>
    </q-card>
</template>
<script>
import DrawerVue from '../../layouts/Drawer.vue'
import { useJobStore } from "../../stores/jobStore"
import { useRoleStore } from '../../stores/roleStore'
import { jobDictionary } from "../../assets/dictionary/job"
import WorkingAreaSelectVue from '../../components/Job/WorkingAreaSelect.vue'
import DialogAddressVue from '../../components/Job/DialogAddress.vue'
import JobDescriptionCardVue from '../../components/Job/JobDescriptionCard.vue'
import RequirementDescriptionCardVue from '../../components/Job/RequirementDescriptionCard.vue'
import SalaryCardVue from '../../components/Job/SalaryCard.vue'
import SkillCardVue from '../../components/Job/SkillCard.vue'
import LanguageCardVue from '../../components/Job/LanguageCard.vue'
import { useQuasar, QSpinnerFacebook  } from 'quasar'

import RecruitmentProcessCardVue from '../../components/Job/RecruitmentProcessCard.vue'
import BenefitsSelect from '../../components/Job/BenefitsSelect.vue'
import ReviewJobVue from '../../components/Job/ReviewJob.vue'
import { createJob } from "../../apis/job"

export default {
    components: {
        ReviewJobVue,
        LanguageCardVue,
        JobDescriptionCardVue,
        WorkingAreaSelectVue,
        DialogAddressVue,
        RequirementDescriptionCardVue,
        SalaryCardVue,
        SkillCardVue,
        RecruitmentProcessCardVue,
        BenefitsSelect
    },
    data() {
        return {

            $q: useQuasar(),
            date: "",
            longitude: 0,
            latitude: 0,
            isShowMap: false,
            isShowAddAddress: false,
            isShowEditAddress: false,
            indexToDialog: -1,
            levelInit: {
                label: "",
                value: 0,
            },
            jobStore: useJobStore(),
            roleStore: useRoleStore(),
            step: 1,
            levelOptions: [],
        }
    },
    watch: {
        "levelInit"(newValue) {
            this.jobStore.form.level = {
                name: newValue.label,
                level: newValue.value
            }
        },
        "date"(newValue) {
            this.jobStore.form.outdate = newValue

        }
    },
    created() {
        this.$emit("update:layout", DrawerVue);
        this.init();
    },
    methods: {
        optionsFn(date) {
            return date >= this.$moment(new Date()).format("YYYY/MM/DD")
        },
        init() {
            for (const level in jobDictionary.level) {
                if (Object.hasOwnProperty.call(jobDictionary.level, level)) {
                    const element = jobDictionary.level[level];
                    this.levelOptions.push({
                        label: element.name,
                        value: element.level,
                    })

                }
            };
            this.levelInit = {
                label: jobDictionary.level.intern.name,
                value: jobDictionary.level.intern.level,
            }
            this.date = this.$moment(new Date()).format("YYYY/MM/DD")
            // console.log(this.date)

        },
        showMap(index) {

            this.longitude = this.jobStore.form.workingAddress[index].longitude;
            this.latitude = this.jobStore.form.workingAddress[index].latitude;
            this.isShowMap = true;
        },
        removeLocation(index) {
            this.jobStore.form.workingAddress.splice(index, 1)
            console.log(this.jobStore.form.workingAddress)
            //    this.jobStore.form.workingAddress = 
        },
        editLocation(index) {
            this.isShowEditAddress = true
            this.indexToDialog = index;

        },
        addLocation() {
            this.isShowAddAddress = true
            console.log(this.isShowAddAddress)
        },
        goToNextStep() {
            // console.log("fsdfjsd")
            let hasCheck = true;
            if (this.step == 3) {
                let saveObject = {
                    ...this.jobStore.form
                }
                saveObject.recruitmentProcess = this.jobStore.form.recruitmentProcess.map((element, index) => {
                    return ({
                        name: element, value: index
                    })
                })
                this.$q.loading.show({
                    spinner: QSpinnerFacebook,
                    spinnerColor: 'deep-orange',
                    spinnerSize: 140,
                    message: 'Đang cập nhật. Vui lòng chờ...',
                })
                createJob(saveObject).then(data => {
                    if (data) {
                        this.$q.notify({
                            message: `Tạo công việc ${data.info.name} thành công với trạng thái Nháp`,
                            color: 'green-6',
                            position: "bottom-right",
                            icon: 'check_circle',
                        })
                        this.jobStore.$reset()
                        this.$router.push("/")
                    } else {
                        this.$q.notify({
                            message: 'Cập nhật thất bại',
                            color: 'deep-orange-6',
                            position: "bottom-right",
                            icon: 'report',
                        })
                    }
                    this.$q.loading.hide()

                })
                // this.jobStore.form.
            }
            if (this.step == 1) {
                hasCheck = this.checkFormJobFilled()
            }
            if (hasCheck && this.step != 3) {
                this.$refs.stepper.next()
            }
        },
        checkFormJobFilled() {
            let { name, level, type, workingAddress, desc, requirement, keyword, outdate } = this.jobStore.form
            let isAllFilled = true;

            if (!name) {
                this.notifyWithMessage("Thiếu chức danh công việc")
                isAllFilled = false;
            }
            if (!level.name) {
                this.notifyWithMessage("Thiếu cấp bậc công việc")
                isAllFilled = false;
            }
            if (type.length == 0) {
                this.notifyWithMessage("Thiếu lĩnh vực hoạt động")
                isAllFilled = false;
            }
            if (workingAddress.length == 0) {
                this.notifyWithMessage("Thiếu địa điểm làm việc")
                isAllFilled = false;
            }
            if (!desc) {
                this.notifyWithMessage("Thiếu mô tả công việc")
                isAllFilled = false;
            }
            if (!requirement) {
                this.notifyWithMessage("Thiếu yêu cầu công việc")
                isAllFilled = false;
            }
            if (keyword.length == 0) {
                this.notifyWithMessage("Thiếu kỹ năng cần thiết")
                isAllFilled = false;
            }
            if (!outdate) {
                this.notifyWithMessage("Thiếu ngày hết hạn tin tuyển dụng")
                isAllFilled = false;
            }



            return isAllFilled;
        },
        notifyWithMessage(message) {
            this.$q.notify({
                message,
                color: 'deep-orange-6',
                position: "bottom-right",
                icon: 'report',
            })
        }
    }
}
</script>
<style lang="scss">
.my-special-header-stepper {
    margin-left: 15vw;
    margin-right: 15vw;

}
</style>