<template >
    <div>
        <q-select style="width: 300px;" dense color="deep-orange" outlined v-model="jobSelected"
            :options="listJobsName">
        </q-select>
        <div>
            {{ listRecruitmentProcess[listJobsName.indexOf(jobSelected)] }}
        </div>
        <div>
            {{ listApplication }}
        </div>
    </div>
</template>
<script>
import { getApplicationByJobName } from '../../../apis/application';
import { getJobsNameOfCompany } from '../../../apis/job';

import Drawer from '../../../layouts/Drawer.vue';

export default {
    data() {
        return {
            listApplication: [],
            listJobsName: [],
            jobSelected: "",
            listRecruitmentProcess: []
        }
    },
    watch: {
        "jobSelected"(newValue, oldValue) {
            if (newValue != oldValue && this.listJobsName.includes(newValue)) {
                console.log("hi")
                this.$router.push({ path: '/application/management', query: { job: newValue}})
                this.fetchApplicationByJob()
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
            getApplicationByJobName({ jobName: this.jobSelected }).then(data => {
                if (data) {
                    this.listApplication = data;
                    console.log(this.listApplication)
                }
            })
        }
    }
}
</script>
<style lang="">
    
</style>