<template >
    <div class=" q-px-md">

        <div class="text-bold text-capitalize q-mb-xs"> Ngôn ngữ cần thiết <strong class="text-negative">*</strong>
        </div>
        <!-- <div>
            <q-btn v-show="!isEdit" class="q-my-md" @click="turnEditMode" outline color="negative" icon="add_circle"
                label="Thêm kĩ năng"></q-btn>
        </div> -->


        <div >
            <div  class=" q-mb-md">
                <div class="row">
                    <div class="col-10">
                        <q-select :options="optionLanguagues" bg-color="white" outlined color="deep-orange" dense
                             multiple type="text" v-model="language" label="Ngôn ngữ"
                            input-debounce="0" @filter="filterFn" use-input />
                    </div>
                    <div class="col-2 row justify-end q-gutter-xs">

                        <q-btn @click="cancel" unelevated outline color="grey-6" size="12px" label="Hủy"></q-btn>
                        <q-btn @click="save" unelevated color="red-6" size="12px"
                            label="Thêm"></q-btn>
                    </div>
                </div>
            </div>
            <q-chip removable class="text-caption" v-for="(language, index) in Languagues" :key="'language-' + index"
                :label="language.name" @remove="(state) => remove(index)" square color="red" text-color="white"></q-chip>
        </div>



    </div>
</template>
<script>
import { useQuasar } from 'quasar'
import { jobDictionary } from '../../assets/dictionary/job';
import { useJobStore } from '../../stores/jobStore';

export default {
    data() {
        return {
            jobStore: useJobStore(),
            // isEdit: false,

            optionLanguagues: [],
            $q: useQuasar(),
            Languagues: [],
            language: [],
        }
    },
    watch: {
        "jobStore.form.languageRecruitment"(newValue){
            console.log(newValue)
        }
    },
    created() {
        this.init()


    },
    methods: {
        remove(index) {
            this.Languagues.splice(index, 1)
            this.jobStore.form.languageRecruitment = this.Languagues.map(element => element.name)


            this.language = []

        },
        filterFn(val, update) {
            update(() => {
                if (val === '') {
                    this.optionLanguagues = jobDictionary.languague
                }
                else {
                    const needle = val.toLowerCase()
                    this.optionLanguagues = jobDictionary.languague.filter(
                        v => v.toLowerCase().indexOf(needle) > -1
                    )
                }
            })
        },

        init() {
            this.Languagues = this.jobStore.form.languageRecruitment.map(item => {
                let newItem = {
                    name: item,
                    isNotRemoveable: false
                }
                return newItem;
            });
            this.optionLanguagues = jobDictionary.languague

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
            this.language = [];
        },
        save() {
            if (this.language.length > 0) {

                this.jobStore.form.languageRecruitment.forEach(everylanguage => {
                    if (this.language.includes(everylanguage)) {
                        this.language.splice(this.language.indexOf(everylanguage), 1)
                    }
                })
                this.jobStore.form.languageRecruitment = this.jobStore.form.languageRecruitment.concat(this.language)
                this.Languagues = this.Languagues.concat(this.language.map(item => {
                    let newItem = {
                        name: item,
                        isNotRemoveable: false
                    }
                    return newItem;
                }))
                this.language = [];
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