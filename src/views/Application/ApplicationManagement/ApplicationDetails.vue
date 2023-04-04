<template >
    
    <div v-if="!roleStore.settings.applierFunction.canRead" class="text-caption text-capitalize text-negative"><i>**
            Bạn không có quyền đọc thông tin</i></div>
    <div v-if="!roleStore.settings.applierFunction.canWrite" class="text-caption text-capitalize text-negative"><i>**
            Bạn không có quyền sửa thông tin</i></div>
    <q-card flat class="q-pa-md">
        <q-card-section class="row">
            <div class="text-bold  text-h6">Chi tiết ứng tuyển </div>
        </q-card-section>
        <q-card-section v-if="loading">
            Đang tải
        </q-card-section>
        <q-card-section v-if="application._id && !loading" class="row">
            <div class="col-8 ">
                <div class="row q-gutter-md q-mb-xl">
                    <q-avatar size="100px">
                        <img :src="application.candidateId.info.avatar" />
                    </q-avatar>
                    <div class="">
                        <div class="text-capitalize text-bold text-subtitle1 q-mb-md">
                            <span class="cursor-pointer hover-text" @click="popUpCandidateInfo = true">{{
                                "Ứng viên: " +
                                application.candidateId.info.name
                            }}</span>
                        </div>
                        <div class="">
                            <span>{{ "Công việc hiện tại: " + application.candidateId.info.positionPresent }}</span>
                        </div>
                        <div class="">
                            <span>{{ "Đang sinh sống ở: " + application.candidateId.info.city }}</span>
                        </div>
                        <div class="">
                            <span>{{ "Năm sinh: " + $moment(application.candidateId.info.dob).year() }}</span>
                        </div>
                        <div class="">
                            <span>{{ "Thời gian ứng tuyển: " + $moment((application.createdAt)).fromNow() }}</span>
                        </div>
                        <div v-if="application.candidateComment" class="row">

                            <q-rating disable v-model="application.candidateComment.rate" :max="5" size="32px" />

                            <div>{{ application.candidateComment.content }}</div>
                        </div>
                    </div>
                    <!-- {{ application.candidateId.info }} -->
                </div>
                <div class="row no-wrap q-gutter-md">
                    <q-avatar size="100px">
                        <img :src="companyStore.info.logo ? companyStore.info.logo : '../../../../public/static/images/logo.png'" />
                    </q-avatar>
                    <div class="">
                        <div class="text-capitalize text-bold text-subtitle1 q-mb-md">
                            <span>{{ "Công việc: " + application.jobId.info.name }}</span>
                        </div>
                        <div class="">
                            <span>{{ "Công ty: " + companyStore.info.name }}</span>
                        </div>
                        <div class="">
                            <span>{{ "Trình độ công việc: " + application.jobId.info.level.name }}</span>
                        </div>
                        <div class="">
                            <span>{{ "Nơi làm việc: " }}</span>
                            <ul class="q-mt-xs">
                                <li v-for="(location, index ) in application.jobId.info.workingAddress" :key="index">
                                    <span class="text-capitalize text-caption">
                                        {{
                                            location.address + ", " + location.ward + ", " + location.district + ", " +
                                            location.province
                                        }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="">
                            <div class="">
                                <span>{{ "Ứng tuyển: " + countTurnIn }}</span>
                            </div>
                            <div class="">
                                <span>{{ "Chờ phỏng vấn: " + countApprove }}</span>
                            </div>
                            <div class="">
                                <span>{{ "Đang phỏng vấn: " + countInterview }}</span>
                            </div>
                            <div class="">
                                <span>{{ "Đang offer: " + countOffer }}</span>
                            </div>
                            <div class="">
                                <span>{{ "Nhận việc: " + countGetHired }}</span>
                            </div>
                            <div class="">
                                <span>{{ "Bị từ chối: " + countNotQualify }}</span>
                            </div>
                            <div class="">
                                <span>{{ "Từ chối: " + countRejectByUser }}</span>
                            </div>
                        </div>
                        <div>
                            <div v-if="application.companyComment" class="q-mt-md ">
                                <div>Ý kiến của công ty về ứng viên: </div>
                                <div>

                                    <q-rating disable v-model="application.companyComment.rate" :max="5" size="16px" />
                                </div>

                                <div class="text-italic">{{ application.companyComment.content }}</div>
                            </div>

                        </div>
                    </div>
                    <!-- {{ application.jobId.info }} -->
                </div>
            </div>
            <div class="col-4">
                <div>
                    <q-select dense v-model="selectAction" :options="optionSelect" option-value="value" option-label="name"
                        option-disable="inactive" emit-value map-options outlined color="deep-orange"
                        style="min-width: 250px; max-width: 300px" />
                </div>
                <div class="q-mt-md">
                    <span>
                        Kết quả:
                    </span>
                    <span>
                        {{
                            this.application.status.value == 2
                            && this.application.jobId.info.recruitmentProcess.length > 0 ?
                            this.application.status.note.name
                            :
                            this.application.status.name
                        }}
                    </span>
                </div>
            </div>

        </q-card-section>
        <q-card-section v-if="!loading" class="row justify-center">
            <div style="width: 80%" v-if="!application.companyComment && (application.status.value >= 4)">
                <q-btn @click="prompt = true" class="fit" color="negative" outline label="Đánh giá ứng viên"></q-btn>
            </div>
        </q-card-section>
    </q-card>

    <q-dialog v-model="popUpCandidateInfo">
        <div v-if="!loading">
            <CandidateCVVue :candidateDetail="application.candidateId.info"></CandidateCVVue>
        </div>
    </q-dialog>
    <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
            <q-card-section>
                <div class="text-h6">Hãy nêu ý kiến của bạn</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <div>
                    <q-rating v-model="rating" :max="5" size="32px" />
                </div>
                <div style="max-width: 400px; max-height: 600px">
                    <q-input maxlength="600" autogrow color="negative" dense v-model="comment" autofocus />
                </div>
            </q-card-section>

            <q-card-actions align="right" class="text-negative">
                <q-btn flat label="Đóng" v-close-popup />
                <q-btn flat label="Thêm" v-close-popup @click="addComment" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import Drawer from '../../../layouts/Drawer.vue';
import { approveByCompany, changeStatusApplication, companyComment, getOne, rejectByCompany } from "../../../apis/application"
import { useCompanyStore } from '../../../stores/companyStore';
import { applicationDictionary } from '../../../assets/dictionary/application';
import CandidateCVVue from '../../../components/Candidate/CandidateCV.vue';
import { useRoleStore } from '../../../stores/roleStore';
// import Logo from "../../../../public/static/images/logo.png"

export default {
    components: {
        CandidateCVVue,
    },
    created() {
        this.$emit("update:layout", Drawer)
        if (this.roleStore.settings.applierFunction.canRead) {
            this.init();
        }

    },
    data() {
        return {
            // Logo: Logo,
            prompt: false,
            comment: "",
            rating: 3,
            roleStore: useRoleStore(),
            popUpCandidateInfo: false,
            loading: true,
            selectAction: "Hành động",
            companyStore: useCompanyStore(),
            countTurnIn: 0,
            countApprove: 0,
            countInterview: 0,
            countOffer: 0,
            countGetHired: 0,
            countRejectByUser: 0,
            countNotQualify: 0,
            application: {

            },
            optionSelect: [],

        }
    },
    watch: {
        "selectAction"(newValue, oldValue) {
            if (newValue == applicationDictionary.status.approve.value) {
                this.approve()
            }
            if (newValue == applicationDictionary.status.interview.value || newValue.toString().includes('---')) {
                if (this.application.jobId.info.recruitmentProcess.length == 0) {
                    this.interview();
                } else {
                    let [inter, indexRound] = newValue.split("---")
                    this.continueInterview(parseInt(indexRound))
                }
            }
            if (newValue == applicationDictionary.status.offer.value) {
                this.offer()
            }
            if (newValue == applicationDictionary.status.notQualify.value) {
                this.reject()
            }
        }
    },
    methods: {
        addComment() {
            companyComment({
                comment: {
                    rate: this.rating,
                    content: this.comment
                },
                id: this.application._id
            }).then(data => {
                if (data) {

                    this.application.companyComment = {
                        content: this.comment,
                        rate: this.rating,
                    }
                    this.$q.notify({
                        message: "Ý kiến thành công",
                        color: 'green-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                    this.rating = 3
                    this.comment = ""
                } else {
                    this.$q.notify({
                        message: 'Thất bại',
                        color: 'deep-orange-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                }
            })
        },
        continueInterview(index) {
            changeStatusApplication({ id: this.application._id, type: "continue-interview", interviewIndex: index }).then(data => {
                if (data) {
                    this.application.status = {
                        ...applicationDictionary.status.interview,
                        note: {
                            value: index,
                            name: this.application.jobId.info.recruitmentProcess[index].name
                        }
                    }
                    this.$q.notify({
                        message: 'Vào phỏng vấn thành công',
                        color: 'green-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                    this.initSelect();
                } else {
                    this.$q.notify({
                        message: 'Thất bại',
                        color: 'deep-orange-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                }
            })
        },
        interview() {
            changeStatusApplication({ id: this.application._id, type: "set-interview", interviewIndex: 99 }).then(data => {
                if (data) {
                    this.application.status = applicationDictionary.status.interview
                    this.$q.notify({
                        message: 'Vào phỏng vấn thành công',
                        color: 'green-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                    this.initSelect();
                } else {
                    this.$q.notify({
                        message: 'Thất bại',
                        color: 'deep-orange-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                }
            })
        },
        init() {
            // console.log(this.optionSelect)
            let applicationId = this.$route.query.id;
            getOne({ id: applicationId }).then(data => {
                if (data) {
                    this.countTurnIn = data.countTurnIn
                    this.countApprove = data.countApprove
                    this.countInterview = data.countInterview
                    this.countOffer = data.countOffer
                    this.countGetHired = data.countGetHired
                    this.countRejectByUser = data.countRejectByUser
                    this.countNotQualify = data.countNotQualify
                    this.application = data.data
                } else {
                }
                this.loading = false;
                // console.log(this.application)
                this.initSelect()
            })
        },
        offer() {
            changeStatusApplication({ id: this.application._id, type: "offer", interviewIndex: 99 }).then(data => {
                if (data) {
                    this.application.status = applicationDictionary.status.offer
                    this.$q.notify({
                        message: 'Đề nghị thành công',
                        color: 'green-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                    this.initSelect();
                } else {
                    this.$q.notify({
                        message: 'Thất bại',
                        color: 'deep-orange-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                }
            })
        },
        reject() {
            rejectByCompany({ applicationId: this.application._id }).then(data => {
                if (data) {
                    this.application.status = applicationDictionary.status.notQualify
                    this.$q.notify({
                        message: 'Từ chối thành công',
                        color: 'green-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                    this.initSelect();
                } else {
                    this.$q.notify({
                        message: 'Thất bại',
                        color: 'deep-orange-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                }
            })
        },
        approve() {
            approveByCompany({ applicationId: this.application._id }).then(data => {
                if (data) {
                    this.application.status = applicationDictionary.status.approve
                    this.$q.notify({
                        message: 'Duyệt thành công',
                        color: 'green-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                    this.initSelect();
                } else {
                    this.$q.notify({
                        message: 'Thất bại',
                        color: 'deep-orange-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                }
            })

        },
        initSelect() {
            this.optionSelect = [];
            // nút approve
            this.optionSelect.push({
                name: "Đậu hồ sơ",
                value: applicationDictionary.status.approve.value,
                inactive: !(applicationDictionary.created.isUser(this.application.createdBy) && this.application.status.value == applicationDictionary.status.turnIn.value)
            })
            // các nút interview
            // console.log(this.application.jobId)
            if (this.application.jobId.info.recruitmentProcess.length == 0) {
                // nút interview như bth
                this.optionSelect.push({
                    name: "Phỏng vấn",
                    value: applicationDictionary.status.interview.value,
                    inactive: this.application.status.value == applicationDictionary.status.approve.value
                })
            } else {
                // nút interview đc thành các vòng
                this.application.jobId.info.recruitmentProcess.forEach((round, index) => {

                    this.optionSelect.push({
                        name: (index + 1) + ". " + round.name,
                        value: applicationDictionary.status.interview.value + '---' + index,
                        inactive: !(this.application.status.value == applicationDictionary.status.approve.value
                            || (
                                this.application.status.value == applicationDictionary.status.interview.value
                                && this.application.status.note.value < index
                            ))
                    })
                })
            }
            this.optionSelect.push({
                name: "Đề nghị nhận việc",
                value: applicationDictionary.status.offer.value,
                inactive: this.application.status.value != applicationDictionary.status.interview.value
            })

            // từ chối hồ sơ
            this.optionSelect.push({
                name: "Từ chối hồ sơ",
                value: applicationDictionary.status.notQualify.value,
                inactive: this.application.status.value >= 4
            })

            if (!this.roleStore.settings.applierFunction.canWrite) {
                this.optionSelect.forEach(element => {
                    element.inactive = true;
                })
            }
            // console.log(this.optionSelect)
        }
    }
}
</script>
<style lang="scss">
.hover-text:hover {
    color: $deep-orange;
    transition: ease-in-out 200ms;
}
</style>