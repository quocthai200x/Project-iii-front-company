<template >
    <div class=" q-px-md">

        <div class="text-bold text-capitalize q-mb-xs">Kĩ năng cần thiết <strong class="text-negative">*</strong>
        </div>
        <!-- <div>
            <q-btn v-show="!isEdit" class="q-my-md" @click="turnEditMode" outline color="negative" icon="add_circle"
                label="Thêm kĩ năng"></q-btn>
        </div> -->


        <div >
            <div  class=" q-mb-md">
                <div class="row">
                    <div class="col-10">
                        <q-select :options="optionSKills" bg-color="white" outlined color="deep-orange" dense
                            max-values="4" multiple type="text" v-model="skill" label="Kĩ năng (tối đa 4/ 1 lần)"
                            input-debounce="0" @filter="filterFn" use-input />
                    </div>
                    <div class="col-2 row justify-end q-gutter-xs">

                        <q-btn @click="cancel" unelevated outline color="grey-6" size="12px" label="Hủy"></q-btn>
                        <q-btn @click="save" unelevated color="red-6" size="12px"
                            label="Thêm"></q-btn>
                    </div>
                </div>
            </div>
            <q-chip removable class="text-caption" v-for="(skill, index) in skills" :key="'skill-' + index"
                :label="skill.name" @remove="(state) => remove(index)" square color="red" text-color="white"></q-chip>
        </div>



    </div>
</template>
<script>
import { useQuasar } from 'quasar'
import { jobDictionary } from '@/assets/dictionary/job';
import { useJobStore } from '../../stores/jobStore';

export default {
    data() {
        return {
            jobStore: useJobStore(),
            // isEdit: false,

            optionSKills: [],
            $q: useQuasar(),
            skills: [],
            skill: [],
        }
    },
    // watch: {
    //     "jobStore.form.keyword"(newValue){
    //         console.log(newValue)
    //     }
    // },
    created() {
        this.init()


    },
    methods: {
        remove(index) {
            this.skills.splice(index, 1)
            this.jobStore.form.keyword = this.skills.map(element => element.name)


            this.skill = []

        },
        filterFn(val, update) {
            update(() => {
                if (val === '') {
                    this.optionSKills = jobDictionary.skills
                }
                else {
                    const needle = val.toLowerCase()
                    this.optionSKills = jobDictionary.skills.filter(
                        v => v.toLowerCase().indexOf(needle) > -1
                    )
                }
            })
        },

        init() {
            this.skills = this.jobStore.form.keyword.map(item => {
                let newItem = {
                    name: item,
                    isNotRemoveable: false
                }
                return newItem;
            });
            this.optionSKills = jobDictionary.skills

        },
        // turnEditMode() {
        //     this.isEdit = true
        // },
        cancel() {
            // this.$q.notify({
            //     message: 'Đã hủy',
            //     color: 'deep-orange-6',
            //     position: "bottom-right",
            //     icon: 'report',
            // })
            // this.isEdit = false
            this.skill = [];
        },
        save() {
            if (this.skill.length > 0) {

                this.jobStore.form.keyword.forEach(everySkill => {
                    if (this.skill.includes(everySkill)) {
                        this.skill.splice(this.skill.indexOf(everySkill), 1)
                    }
                })
                this.jobStore.form.keyword = this.jobStore.form.keyword.concat(this.skill)
                this.skills = this.skills.concat(this.skill.map(item => {
                    let newItem = {
                        name: item,
                        isNotRemoveable: false
                    }
                    return newItem;
                }))
                this.skill = [];
                // this.isEdit = false
            } else {
                // this.isEdit = false;
                this.$q.notify({
                    message: 'Vui lòng điền thêm kĩ năng trước khi lưu',
                    color: 'deep-orange-6',
                    position: "bottom-right",
                    icon: 'report',
                })
            }

        },
    }

}
</script>
<style lang="scss">

</style>