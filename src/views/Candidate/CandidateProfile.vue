<template >
    <div v-if="loading">
        ĐỢi chút
    </div>
    <div v-else>
        <div v-if="isDataValid">
            <div class="row">
                <div class="col-8 q-pr-md">
                    <q-card class="q-pa-md" flat>
                        <q-card-section class="row relative-position">
                            <div class="col-3 q-pr-md">
                                <q-avatar size="150px">
                                    <img style="object-fit:cover;"
                                        :src="userData.info.avatar ? userData.info.avatar : avatarDefault" />
                                </q-avatar>
                            </div>
                            <div class="col-9 col justify-between">
                                <div class="text-bold text-h6">
                                    <span>{{ userData.info.name }}</span>
                                </div>
                                <div>
                                    <span>
                                        {{
                                            userData.info.positionPresent ? userData.info.positionPresent : "Chưa cập nhật"
                                        }}
                                    </span>
                                </div>
                                <div class="q-mt-md"></div>
                                <div class="q-gutter-md row items-center">
                                    <div class="q-gutter-xs row items-center">

                                        <q-icon name="email">
                                        </q-icon>
                                        <span>{{ userData.email }}</span>
                                    </div>
                                    <div class="q-gutter-xs row items-center">
                                        <q-icon name="phone">
                                        </q-icon>
                                        <span>{{ userData.info.phone }}</span>
                                    </div>
                                    <div class="q-gutter-xs row items-center">
                                        <q-icon name="cake">
                                        </q-icon>
                                        <span>{{ $moment(userData.info.dob).format("DD-MM-YYYY") }}</span>
                                    </div>
                                </div>
                                <div class="q-gutter-md row items-center">
                                    <div class="q-gutter-xs row items-center">
                                        <q-icon name="home">
                                        </q-icon>
                                        <span>
                                            {{
                                                Array(userData.info.address, userData.info.ward, userData.info.district,
                                                userData.info.city).join(", ")
                                            }}
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div class="absolute-right">

                                <q-btn :loading="inviteUserLoading" @click="inviteThisCandidate"
                                    :disable="!roleStore.settings.applierFunction.canWrite || listJobsName.length == 0 || inviteUserLoading || isInvited"
                                    size="14px" unelevated label="Mời" color="deep-orange">
                                </q-btn>
                            </div>


                        </q-card-section>
                        <q-card-section>
                            <div class="text-bold text-subtitle1">
                                <span>Mô tả bản thân</span>
                            </div>
                            <q-separator></q-separator>
                            <ul>
                                <li>
                                    <span>Mức lương mong muốn: {{ userData.info.salaryTarget }}$</span>
                                </li>
                                <li>
                                    <span>Nơi làm việc mong muốn: {{
                                        userData.info.workingLocationTarget.join(', ')
                                    }}</span>
                                </li>
                                <li>
                                    <span>Trình độ công việc: {{ userData.info.levelPresent }}</span>
                                </li>
                                <li>
                                    <span>Trình độ học vấn: {{ userData.info.educationLevel }}</span>
                                </li>
                                <li>
                                    <span>Số năm kinh nghiệm: {{ userData.info.yearExperienced }}+</span>
                                </li>
                                <li>
                                    <span>Ngành nghề hoạt động: {{
                                        userData.info.typeWorking.map(element => element.name).join(', ')
                                    }}</span>
                                </li>
                                <li>
                                    <span>Kĩ năng: {{
                                        userData.info.skills.join(', ')
                                    }}</span>
                                </li>
                            </ul>
                        </q-card-section>
                        <q-card-section>
                            <div class="text-bold text-subtitle1 ">
                                <span>Giới thiệu</span>
                            </div>
                            <q-separator></q-separator>
                            <div>
                                <span>{{ userData.info.desc }}</span>
                            </div>
                        </q-card-section>

                        <q-card-section class="q-mb-md">
                            <div class="text-subtitle1 text-bold">Kinh nghiệm làm việc</div>
                            <q-separator></q-separator>
                            <div v-if="userData.info.experiences.length != 0">
                                <div v-for="(item, index) in userData.info.experiences" :key="index" class="q-my-sm">
                                    <div class="text-bold">
                                        <div class="">
                                            <span>
                                                {{ item.position }}
                                            </span>
                                            <span> - </span>
                                            <span>
                                                {{ item.company }}
                                            </span>
                                        </div>
                                        <div>
                                            <span>{{ $moment(item.from).format("MM/YYYY") }}</span>
                                            <span> - </span>
                                            <span>{{ $moment(item.to).format("MM/YYYY") }}</span>
                                        </div>
                                    </div>
                                    <div>
                                        {{ item.desc }}
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                Chưa cập nhật
                            </div>
                        </q-card-section>
                        <q-card-section class="q-mb-md">
                            <div class="text-subtitle1 text-bold">Học vấn</div>
                            <q-separator></q-separator>
                            <div v-if="userData.info.education.length != 0">
                                <div v-for="(item, index) in userData.info.education" :key="index" class="q-my-sm">
                                    <div class="text-bold">
                                        <div class="">
                                            <span>
                                                {{ item.certificate }}
                                            </span>
                                            <span> - </span>

                                            <span>
                                                {{ item.major }}
                                            </span>
                                            <span> - </span>
                                            <span>
                                                {{ item.college }}
                                            </span>
                                        </div>
                                        <div>
                                            <span>{{ $moment(item.from).format("MM/YYYY") }}</span>
                                            <span> - </span>
                                            <span>{{ $moment(item.to).format("MM/YYYY") }}</span>
                                        </div>
                                    </div>
                                    <div>
                                        {{ item.desc }}
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                Chưa cập nhật
                            </div>
                        </q-card-section>
                        <q-card-section class="q-mb-md">
                            <div class="text-subtitle1 text-bold">Ngoại ngữ</div>
                            <q-separator></q-separator>
                            <div v-if="userData.info.foreignLanguage.length != 0">
                                <div v-for="(item, index) in userData.info.foreignLanguage" :key="index"
                                    class="q-my-sm">
                                    <div class="text-bold">
                                        <div class="">
                                            <span>
                                                {{ item.name }}
                                            </span>
                                            <span> - </span>

                                            <span>
                                                {{ item.level }}
                                            </span>

                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div v-else>
                                Chưa cập nhật
                            </div>
                        </q-card-section>

                    </q-card>
                </div>
                <div class="col-4">
                    <div class="" v-for="(user, index) in suggestCandidateList" :key="index">
                        <q-card flat class="fit q-pa-md relative-position q-mb-md">
                            <div class="float-right	col justify-between">
                                <q-btn :loading="user.isLoading" @click="popUpInviteCandidate(index)"
                                    :disable="!roleStore.settings.applierFunction.canWrite || listJobsName.length == 0 || user.isLoading || user.isInvited"
                                    size="10px" unelevated label="Mời" color="deep-orange">

                                </q-btn>

                            </div>

                            <q-card-section class="row">
                                <div class="col-3">
                                    <q-avatar size="60px">
                                        <img style="object-fit:cover;"
                                            :src="user.info.avatar ? user.info.avatar : '../../../public/static/images/avatar-default.jpg'" />
                                    </q-avatar>
                                </div>
                                <div class="col-9">
                                    <div class="text-bold ">
                                        <span class="cursor-pointer hover-text">
                                            <router-link :to="`/candidate/detail?id=${user._id}`">

                                                <span class="">
                                                    {{ user.info.name ? user.info.name : "Chưa cập nhật tên" }}
                                                </span>
                                                <span v-if="user.info.dob">
                                                    <span>
                                                        -
                                                    </span>
                                                    <span>
                                                        {{ $moment().diff($moment(user.info.dob), 'years') }}
                                                    </span>
                                                    <span>
                                                        tuổi
                                                    </span>

                                                </span>

                                            </router-link>
                                        </span>
                                    </div>
                                    <div>
                                        <span>

                                            {{
                                                user.info.positionPresent ? user.info.positionPresent : "Chưa cập nhật"
                                            }}
                                        </span>

                                    </div>
                                    <div>
                                        <span v-if="user.info.yearExperienced">
                                            {{ user.info.yearExperienced }}
                                            <span>Năm kinh nghiệm</span>
                                        </span>
                                        <span v-else> Chưa có năm kinh nghiệm</span>
                                    </div>
                                    <div>
                                        <span v-if="user.info.salaryTarget">
                                            <span>Lương mong muốn: </span>
                                            {{ user.info.salaryTarget }}
                                            <span>$</span>

                                        </span>
                                        <span v-else> Chưa có mức lương mong muốn</span>
                                    </div>
                                    <div>
                                        <span v-if="user.info.city">
                                            <span>Nơi ở: </span>
                                            {{ user.info.city }}
                                        </span>
                                        <span v-else> Chưa cập nhật nơi ở</span>
                                    </div>
                                    <div>
                                        <span>Lĩnh vực: </span>
                                        <span v-for="(item, index) in user.info.typeWorking " :key="index">
                                            <span>
                                                {{ item.name }}
                                            </span>
                                            <span v-if="index != user.info.typeWorking.length - 1">
                                                {{ ", " }}
                                            </span>

                                        </span>
                                    </div>
                                    <div>
                                        <span>Kỹ năng: </span>
                                        <span v-for="(item, index) in user.info.skills " :key="index">
                                            <span>
                                                {{ item }}
                                            </span>
                                            <span v-if="index != user.info.skills.length - 1">
                                                {{ ", " }}
                                            </span>

                                        </span>
                                    </div>
                                </div>

                            </q-card-section>
                        </q-card>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            Lỗi khi tải ứng viên
        </div>
    </div>
    <q-dialog v-model="popUp">
        <q-card flat style="width: 80%" class="scroll">
            <q-card-section>
                <div class="q-gutter-sm">
                    <div>Mời vào việc</div>
                    <q-select v-model="jobSelected" color="deep-orange" outlined dense :options="listJobsName">
                    </q-select>
                </div>
            </q-card-section>
            <q-card-actions align="right" class="text-negative q-mt-xl">
                <q-btn @click="cancel" flat label="Đóng" />
                <q-btn :disable='!roleStore.settings.applierFunction.canWrite' flat label="Mời"
                    @click="inviteCandidate" />

            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script>
import { getJobsNameOfCompany } from '../../apis/job'
import { searchCandidate } from '../../apis/search'
import { getCandidate } from '../../apis/user'
import DrawerVue from '../../layouts/Drawer.vue'
import { useRoleStore } from '../../stores/roleStore'
import { useSearchStore } from '../../stores/searchStore'



// import avatarDefault from "../../../public/static/images/avatar-default.jpg"
import { useQuasar } from 'quasar'
import { invite } from '../../apis/application'

export default {
    data() {
        return {
            $q: useQuasar(),
            userData: {

            },
            loading: false,
            isDataValid: false,
            searchStore: useSearchStore(),
            suggestCandidateList: [],
            roleStore: useRoleStore(),
            listJobsName: [],
            jobSelected: "",
            popUp: false,
            // avatarDefault: avatarDefault,
            indexChoose: -1,
            inviteUserLoading: false,
            isInvited: false,

        }
    },
    async created() {
        this.$emit("update:layout", DrawerVue)
        if (this.$route.query.id) {
            this.loading = true;
            const [candidateData, suggestCandidate, listJobsName] = await Promise.all([
                getCandidate({ userId: this.$route.query.id }),
                searchCandidate({ text: this.searchStore.text, filter: this.searchStore.filter, limit: 5, pageNumber: 0 }),
                getJobsNameOfCompany(),
            ])
            if (candidateData && suggestCandidate && listJobsName) {
                this.userData = candidateData.userData;
                this.isInvited = candidateData.isApplied;
                this.isDataValid = true;
                this.listJobsName = listJobsName.map(element=>element.info.name);
                this.jobSelected = this.listJobsName[0];
                this.suggestCandidateList = suggestCandidate.data.map(element => {
                    return {
                        ...element,
                        isInvited: false,
                        isLoading: false,
                    }
                })
            }

            this.loading = false;
        } else {
            this.$router.push('/candidate/search')
        }
    },
    methods: {
        inviteThisCandidate() {
            this.popUp = true;
            this.indexChoose = -1
        },
        popUpInviteCandidate(index) {
            // this.data[index].isInvited = true
            // this.data[index].isLoading = true
            this.popUp = true;
            this.indexChoose = index;
        },
        inviteCandidate() {
            if (this.indexChoose >= 0) {
                this.suggestCandidateList[this.indexChoose].isLoading = true
                invite({ jobName: this.jobSelected, candidateEmail: this.data[this.indexChoose].email }).then(data => {
                    if (data) {
                        this.$q.notify({
                            message: `Mời ứng viên '${this.suggestCandidateList[this.indexChoose].info.name}' vào công việc '${this.jobSelected}' thành công`,
                            color: 'green-6',
                            position: "bottom-right",
                            icon: 'check_circle',
                        })
                        this.suggestCandidateList[this.indexChoose].isInvited = true
                    } else {
                        this.$q.notify({
                            message: `Mời ứng viên '${this.suggestCandidateList[this.indexChoose].info.name}' vào công việc '${this.jobSelected}' thất bại`,
                            color: 'deep-orange-6',
                            position: "bottom-right",
                            icon: 'check_circle',
                        })
                    }
                    this.suggestCandidateList[this.indexChoose].isLoading = false
                })
                this.popUp = false;
            } else {
                this.inviteUserLoading = true
                invite({ jobName: this.jobSelected, candidateEmail: this.userData.email }).then(data => {
                    if (data) {
                        this.$q.notify({
                            message: `Mời ứng viên '${this.userData.info.name}' vào công việc '${this.jobSelected}' thành công`,
                            color: 'green-6',
                            position: "bottom-right",
                            icon: 'check_circle',
                        })
                        this.isInvited = true
                    } else {
                        this.$q.notify({
                            message: `Mời ứng viên '${this.userData.info.name}' vào công việc '${this.jobSelected}' thất bại`,
                            color: 'deep-orange-6',
                            position: "bottom-right",
                            icon: 'check_circle',
                        })
                    }
                    this.inviteUserLoading = false
                })
                this.popUp = false;
            }

        },
        cancel() {
            this.popUp = false;
            // this.data[index].isLoading = 
        },
    }
}
</script>
<style lang="scss">
hover-text {
    color: $dark;
}

.hover-text:hover {
    span {
        transition: ease-in-out 200ms;
        color: $deep-orange;
    }
}
</style>