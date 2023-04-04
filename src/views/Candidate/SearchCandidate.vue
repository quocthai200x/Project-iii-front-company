<template >
    <div class="row justify-between">
        <q-input style="width: 300px;" v-model="text" color="deep-orange" outlined dense
        placeholder="Tìm theo tên, vị trí, kĩ năng">
        <template v-slot:prepend>
            <q-icon name="search" />
        </template>
    </q-input>
    <q-select class="q-pr-sm" label="Địa chỉ nhà" name="workingLocations" clearable model-value="workingLocations"
    :dense="true" bg-color="grey-3" color="negative" outlined v-model="workingLocations" multiple
    :options="workingLocationsOptions" style="width: 250px" />
    <q-select class="q-pr-sm" label="Nơi làm việc mong muốn " name="workingLocations" clearable
    model-value="workingLocations" :dense="true" bg-color="grey-3" color="negative" outlined
    v-model="workingLocationsTarget" multiple :options="workingLocationsOptions" style="width: 250px" />
    <q-select class="q-pr-md" label="Ngành nghề " name="workingAreas" clearable model-value="workingAreas"
    :dense="true" bg-color="grey-3" color="negative" outlined v-model="workingAreas" multiple
            :options="workingAreasOptions" style="width: 250px" />

        <q-btn :loading="loading" :disable="loading" @click="searchBtnClick" color="deep-orange" unelevated
        label="Tìm kiếm">
    </q-btn>
</div>
<div  v-if="!roleStore.settings.applierFunction.canWrite" class="q-mt-lg">
    <i>Tài khoản không có quyền mời ứng viên. Hãy liên hệ chủ doanh nghiệp để thêm quyền</i>
</div>
<div class="q-mt-md q-gutter-md">

        <q-pagination :disable="loading" v-if="(total / limit) > 1" v-model="pageNumber" :max="(total / limit) + 1"
            :max-pages="6" boundary-numbers outline color="deep-orange" active-design="unelevated"
            active-color="deep-orange" active-text-color="white" />
        <div v-if="loading">
            Đang tải dữ liễu
        </div>
        <div v-else>
            <div>Có {{ total }} kết quả phù hợp</div>
            <div class=" row">
                <div :class="index % 2 == 0 ? 'col-6 q-my-sm q-pr-md' : 'col-6 q-my-sm '" v-for="(user, index) in data"
                    :key="index">
                    <q-card flat class="fit q-pa-md relative-position">
                        <div class="float-right	col justify-between">
                            <q-btn :loading="user.isLoading" @click="popUpInviteCandidate(index)"
                                :disable="!roleStore.settings.applierFunction.canWrite || listJobsName.length == 0 || user.isLoading || user.isInvited" size="10px"
                                unelevated label="Mời" color="deep-orange">

                            </q-btn>

                        </div>

                        <q-card-section class="row">
                            <div class="col-3">
                                <q-avatar size="80px">
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

                                        {{ user.info.positionPresent ? user.info.positionPresent : "Chưa cập nhật" }}
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

        <q-pagination :disable="loading" v-if="(total / limit) > 1" v-model="pageNumber" :max="(total / limit) + 1"
            :max-pages="6" boundary-numbers outline color="deep-orange" active-design="unelevated"
            active-color="deep-orange" active-text-color="white" />
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
                <q-btn @click="cancel" flat label="Đóng"  />
                <q-btn :disable='!roleStore.settings.applierFunction.canWrite' flat label="Mời"
                    @click="inviteCandidate" />

            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script>
import { searchCandidate } from '../../apis/search'
import DrawerVue from '../../layouts/Drawer.vue'
import { useSearchStore } from "../../stores/searchStore"
import { jobDictionary } from "../../assets/dictionary/job"
import { provinceDictionary } from "../../assets/dictionary/location"
// import avatarDefault from "../../../public/static/images/avatar-default.jpg"


import { invite } from "../../apis/application"
import { getJobsNameOfCompany } from '../../apis/job'
import { useRoleStore } from '../../stores/roleStore'
import { useQuasar } from 'quasar'
export default {
    data() {
        let array = [];
        jobDictionary.type.forEach(field => {
            field.workings.forEach(working => {
                array.push(working)
            })
        })
        let array2 = provinceDictionary.map(province => {
            let label = province.replace(/Thành phố |Tỉnh /gi, "")
            return ({
                value: province,
                label: label
            })
        })
        return {
            $q: useQuasar(),
            roleStore: useRoleStore(),
            // avatarDefault: avatarDefault,
            limit: 20,
            text: '',
            pageNumber: 1,
            filter: {

            },
            loading: false,
            isAnyError: false,
            searchStore: useSearchStore(),
            data: [],
            total: 0,
            workingLocationsOptions: array2,
            workingAreasOptions: array,
            workingLocations: [],
            workingAreas: [],
            workingLocationsTarget: [],
            newSearch: true,
            listJobsName: [],
            jobSelected: "",
            popUp: false,
            indexChoose: -1,
        }
    },
    watch: {
        "workingLocations"(newValue, oldValue) {
            if (newValue) {
                this.filter['info.city'] = {
                    $in: newValue.map(element => element.value)
                }
            } else {
                delete this.filter['info.city']
            }
        },
        "workingLocationsTarget"(newValue, oldValue) {

            if (newValue) {
                this.filter['info.workingLocationTarget'] = {
                    $in: newValue.map(element => element.value)
                }
            } else {
                delete this.filter['info.workingLocationTarget']
            }
        },
        "workingAreas"(newValue, oldValue) {
            if (newValue) {
                this.filter['info.typeWorking.name'] = {
                    $all: newValue
                }
            }
            else {
                delete this.filter['info.typeWorking.name']
            }

        },
        "searchStore.text"(newValue, oldValue) {
            if (newValue != oldValue) {
                this.$router.push({ path: '/candidate/search', query: { q: newValue, pageNumber: 0 } })
            }
        },
        // search

        "pageNumber"(newValue, oldValue) {
            if (!this.newSearch) {
                this.searchStore.pageNumber = newValue - 1;
                this.search()
            }
        },


    },
    created() {
        this.$emit("update:layout", DrawerVue)
        this.init();
    },
    methods: {
        popUpInviteCandidate(index) {
            // this.data[index].isInvited = true
            // this.data[index].isLoading = true
            this.popUp = true;
            this.indexChoose = index;
        },
        inviteCandidate(){
            this.data[this.indexChoose].isLoading = true
            invite({jobName: this.jobSelected, candidateEmail: this.data[this.indexChoose].email}).then(data=>{
                if(data){
                    this.$q.notify({
                        message: `Mời ứng viên '${this.data[this.indexChoose].info.name}' vào công việc '${this.jobSelected}' thành công`,
                        color: 'green-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                    this.data[this.indexChoose].isInvited = true
                }else{
                    this.$q.notify({
                        message: `Mời ứng viên '${this.data[this.indexChoose].info.name}' vào công việc '${this.jobSelected}' thất bại`,
                        color: 'deep-orange-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                }
                this.data[this.indexChoose].isLoading = false
            })
            this.popUp = false;
        },
        cancel(){
            this.popUp = false;
            // this.data[index].isLoading = 
        },
        init() {

            // tổng kết từ link trước
            getJobsNameOfCompany().then(data => {
                if (data) {
                    data.forEach(element => {
                        this.listJobsName.push(element.info.name)
                    })
                    this.jobSelected = this.listJobsName[0]
                }
            })
            if (this.$route.query.q) {
                this.searchStore.text = this.$route.query.q

            };
            if (this.searchStore.text) {
                this.text = this.$route.query.q
            }
            if (this.$route.query.pageNumber) {
                this.searchStore.pageNumber = parseInt(this.$route.query.pageNumber)
            };
            if (this.searchStore.pageNumber) {
                this.pageNumber = parseInt(this.$route.query.pageNumber) + 1
            }
            this.filter = this.searchStore.filter;
            this.initialAccordingFilterInit()

            //và gán vào store sau đó mới search
            setTimeout(() => {
                this.search()
            }, 0)
        },
        initialAccordingFilterInit() {
            if (this.searchStore.filter["info.city"]) {
                if (this.searchStore.filter["info.city"].$in.length > 0) {
                    this.workingLocations = this.searchStore.filter["info.city"].$in.map(element => {
                        let label = element.replace(/Thành phố |Tỉnh /gi, "")
                        return ({
                            value: element,
                            label: label
                        })
                    })
                }
            }
            if (this.searchStore.filter["info.workingLocationTarget"]) {
                if (this.searchStore.filter["info.workingLocationTarget"].$in.length > 0) {
                    this.workingLocationsTarget = this.searchStore.filter["info.workingLocationTarget"].$in.map(element => {
                        let label = element.replace(/Thành phố |Tỉnh /gi, "")
                        return ({
                            value: element,
                            label: label
                        })
                    })
                }
            }
            if (this.searchStore.filter["info.typeWorking.name"]) {
                if (this.searchStore.filter["info.typeWorking.name"].$all.length > 0) {
                    this.workingAreas = this.searchStore.filter["info.typeWorking.name"].$all
                }
            }
        },
        searchBtnClick() {
            this.searchStore.text = this.text;
            this.searchStore.filter = this.filter;
            this.searchStore.pageNumber = 0;
            this.pageNumber = 1;
            this.newSearch = true;
            setTimeout(() => {
                this.search()
            }, 0)


        },
        search() {
            this.loading = true;
            this.isAnyError = false;
         
            this.$router.push({ path: '/candidate/search', query: { q: this.searchStore.text, pageNumber: this.searchStore.pageNumber } })
            searchCandidate({ text: this.searchStore.text, filter: this.searchStore.filter, pageNumber: this.searchStore.pageNumber, limit: this.limit }).then(data => {
                if (data) {
                    this.isAnyError = false;
                    this.data = data.data.map(element => {
                        return {
                            ...element,
                            isInvited: false,
                            isLoading: false,
                        }
                    })
                    this.total = data.total;
                    this.newSearch = false;
                } else {
                    this.isAnyError = true;
                }
                this.loading = false;
            })
        }
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