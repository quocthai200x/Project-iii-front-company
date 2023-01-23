<template >
    <div>
        <div class="row justify-between ">
            <div>

                <q-select style="width: 300px;" dense color="deep-orange" outlined v-model="jobSelected"
                    :options="listJobsName">
                </q-select>
            </div>
            <div class="q-gutter-md row justify-end">

                <q-input style="width: 300px;" v-model="filter" color="deep-orange" outlined dense
                    placeholder="Tìm theo kí tự trên bảng">
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
                <q-select style="width: 300px;" dense color="deep-orange" outlined v-model="statusSelected"
                    :options="listRecruimentStatusOfJob">
                </q-select>
            </div>
        </div>

        <div class="q-pt-lg">
            <q-table :pagination="myInitialPagination" :filter="filter" separator="vertical" flat
                :rows="listApplicationShow" :columns="columns" row-key="name">
                <template v-slot:header="props">
                    <q-tr :props="props">
                        <q-th v-for="col in props.cols" :key="col.name" :props="props" class="">
                            <span class="text-bold text-subtitle2">
                                {{ col.label }}
                            </span>
                        </q-th>
                    </q-tr>
                </template>
                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td key="Ứng viên" :props="props">
                            <router-link :to="`/application/detail?id=${props.row._id}`">
                                <div class="">

                                    <q-avatar class="q-mr-md">
                                        <img :src="props.row.candidateId.info.avatar" />
                                    </q-avatar>
                                    <span class="cursor-pointer text-bold hover-text">
                                        {{ props.row.candidateId.info.name }}
                                    </span>
                                </div>

                            </router-link>
                        </q-td>
                        <q-td key="Chức danh" :props="props">

                            <div class="">
                                <span v-if="props.row.candidateId.info.positionPresent" class="">
                                    {{ props.row.candidateId.info.positionPresent }}
                                </span>
                                <span v-else>
                                    Chưa cập nhật
                                </span>
                            </div>


                        </q-td>
                        <q-td key="Nơi sinh sống" :props="props">

                            <div class="">
                                <span class="" v-if="props.row.candidateId.info.city">
                                    {{ props.row.candidateId.info.city }}
                                </span>
                                <span v-else>
                                    Chưa cập nhật
                                </span>
                            </div>


                        </q-td>
                        <q-td key="Thời gian tạo" :props="props">

                            <div class="">
                                <span class="">
                                    {{
    $moment((props.row.createdAt)).fromNow()
                                    }}
                                </span>
                            </div>


                        </q-td>
                        <q-td key="Trạng thái" :props="props" v-if="statusSelected == 'Tất cả'">

                            <div class="">
                                <span class=""
                                    v-if="!(props.row.status.value == 2 && this.listRecruitmentProcess[this.listJobsName.indexOf(this.jobSelected)].length > 0)">
                                    {{ props.row.status.name }}
                                </span>
                                <span class="" v-else>
                                    {{ props.row.status.note.name }}
                                </span>

                            </div>


                        </q-td>

                    </q-tr>
                </template>
            </q-table>
        </div>
    </div>
</template>
<script>
import { getApplicationByJobName } from '../../../apis/application';
import { getJobsNameOfCompany } from '../../../apis/job';
import { applicationDictionary } from "../../../assets/dictionary/application"
import Drawer from '../../../layouts/Drawer.vue';

export default {

    data() {
        let columns = [

            {
                name: 'Ứng viên',
                required: true,
                label: 'Ứng viên',
                align: 'left',
                field: row => row.candidateId.info.name,
                format: val => `${val}`,
                sortable: true
            },
            {
                name: 'Chức danh',
                required: true,
                label: 'Chức danh',
                align: 'left',
                field: row => row.candidateId.info.positionPresent,
                format: val => `${val}`,
                sortable: true
            },
            {
                name: 'Nơi sinh sống',
                required: true,
                label: 'Nơi sinh sống',
                align: 'left',
                field: row => row.candidateId.info.city,
                format: val => `${val}`,
                sortable: true
            },
            {
                name: 'Thời gian tạo',
                required: true,
                label: 'Ứng tuyển vào',
                align: 'left',
                field: row => this.$moment((row.createdAt)).fromNow(),
                format: val => `${val}`,
                sortable: true
            },
            {
                name: 'Trạng thái',
                label: 'Trạng thái',
                align: 'left',
                field: row => {
                    if (row.status.value == 2 && this.listRecruitmentProcess[this.listJobsName.indexOf(this.jobSelected)].length > 0) {
                        return row.status.note.name
                    } else {
                        return row.status.name
                    }
                },
                format: val => `${val}`,
                sortable: true
            },


        ]
        return {
            filter: "",
            columns,
            myInitialPagination: {
                rowsPerPage: 10
            },
            listApplication: [],
            listApplicationShow: [],
            listJobsName: [],
            jobSelected: "",
            statusSelected: "Tất cả",
            listRecruimentStatusOfJob: [],
            listRecruitmentProcess: []
        }
    },

    watch: {
        "listApplication"(newValue, oldValue) {
            this.listApplicationShow = [...this.listApplication];
            this.initStatus();
        },
        "statusSelected"(newValue, oldValue) {
            // modify column table
            if (newValue == "Tất cả") {
                // chưa có cột trạng thái
                if (!this.columns.some(element => element.name == "Trạng thái")) {
                    this.columns.push(
                        {
                            name: 'Trạng thái',
                            label: 'Trạng thái',
                            align: 'left',
                            field: row => {
                                if (row.status.value == 2 && this.listRecruitmentProcess[this.listJobsName.indexOf(this.jobSelected)].length > 0) {
                                    return row.status.note.name
                                } else {
                                    return row.status.name
                                }
                            },
                            format: val => `${val}`,
                            sortable: true
                        },
                    )
                }
            } else {
                this.columns = this.columns.filter(element => element.name != "Trạng thái")
            }

            // filter application

            this.listApplicationShow = this.listApplication.filter(element => {
                if (element.status.name == newValue) {
                    return element
                } else if (element.status.note.name == newValue) {

                    return element
                } else if (newValue == "Tất cả") {
                    return element
                }
            })
        },
        "jobSelected"(newValue, oldValue) {
            if (newValue != oldValue && this.listJobsName.includes(newValue)) {
                this.$router.push({ path: '/application/management', query: { job: newValue } })
                this.fetchApplicationByJob()
                // console.log("hi")

            }
        },
        "$route.query.job"(newValue, oldValue) {
            if (newValue != oldValue && newValue) {
                this.jobSelected = newValue;
            }
        }
    },
    created() {
        this.$emit("update:layout", Drawer)
        this.init();

    },
    methods: {
        init() {
            getJobsNameOfCompany().then(data => {
                if (data) {
                    data.forEach(element => {
                        this.listJobsName.push(element.info.name)
                        this.listRecruitmentProcess.push(element.info.recruitmentProcess)
                    })

                    if (this.$route.query.job && this.listJobsName.includes(this.$route.query.job)) {
                        this.jobSelected = this.$route.query.job
                    } else {
                        this.jobSelected = this.listJobsName[0]
                    }
                }
            })
        },
        fetchApplicationByJob() {
            if (this.jobSelected) {
                getApplicationByJobName({ jobName: this.jobSelected }).then(data => {
                    if (data) {
                        this.listApplication = data;
                    }
                })

            }

        },
        initStatus() {
            this.listRecruimentStatusOfJob = [];
            let recruitmentProcessIfNeeded = [... this.listRecruitmentProcess[this.listJobsName.indexOf(this.jobSelected)]]
            this.statusSelected = "Tất cả"
            this.listRecruimentStatusOfJob.push("Tất cả")
            for (const key in applicationDictionary.status) {
                if (Object.hasOwnProperty.call(applicationDictionary.status, key)) {
                    const element = applicationDictionary.status[key];
                    if (element.value == 2 && recruitmentProcessIfNeeded.length > 0) {
                        recruitmentProcessIfNeeded.forEach(process => {
                            this.listRecruimentStatusOfJob.push(process.name)
                        })
                    }
                    else {
                        this.listRecruimentStatusOfJob.push(element.name)
                    }
                }
            }
            // console.log(this.listApplication)

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