<template >
    <div class=" q-px-md">
        <div class="text-bold text-capitalize q-mb-xs">Mức lương <strong class="text-negative">*</strong>
            <span class="text-weight-medium text-italic">
                (USD)
            </span>
        </div>
        <div class="row q-gutter-xs">
            <div>
                <q-select label="Từ" v-model="jobStore.form.salaryRate.from" use-input dense outlined
                    color="deep-orange" input-debounce="0" @new-value="createValue" :options="optionsSalary" />
            </div>
            <div>

                <q-select label="Từ" v-model="jobStore.form.salaryRate.to" use-input dense outlined color="deep-orange"
                    input-debounce="0" @new-value="createValue" :options="optionsSalary" />
            </div>
            <div class="row items-center">
                <q-toggle v-model="jobStore.form.salaryRate.isVisible" color="red" />
                <div>
                        Cho phép hiển thị lương
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useQuasar } from 'quasar'
import { jobDictionary } from '../../assets/dictionary/job'
import { useJobStore } from '../../stores/jobStore'

export default {
    data() {
        return {
            $q: useQuasar(),
            jobStore: useJobStore(),
            optionsSalary: []
        }
    },
    created() {
        this.init()
    },

    methods: {
        init() {
            this.optionsSalary = jobDictionary.salary
        },
        createValue(val, done) {
            let isnum = /^\d+$/.test(val);
            console.log(isnum)
            if (isnum) {
                done(val)
            } else {
                this.$q.notify({
                    message: 'Lương chỉ được phép có chữ số',
                    color: 'deep-orange-6',
                    position: "bottom-right",
                    icon: 'check_circle',
                })
            }
            // this.model = Number(val);
        }
    }
}
</script>
<style lang="scss">

</style>