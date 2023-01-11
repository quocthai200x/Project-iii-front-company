<template >
    <div class=" q-px-md">
        
        
        <div class="row">
            
            <div class=" col-8">
                <div class="q-mr-md q-gutter-xs">

                    <div class="text-bold text-capitalize q-mb-xs">Lĩnh vực hoạt động <strong class="text-negative">*</strong>
                    </div>
                    <div class="">
                        <q-select :options="optionTypeWorkings" bg-color="white" outlined color="deep-orange" dense
                        multiple type="text" v-model="typeWorking" label="Lĩnh vực" input-debounce="0"
                        @filter="filterFn" use-input />
                    </div>
                    <div class="row q-mt-md ">
                        
                        <q-btn   class="q-mr-xs" @click="cancel" unelevated outline color="grey-6" size="12px" label="Hủy"></q-btn>
                        <q-btn @click="save" unelevated color="red-6" size="12px" label="Thêm"></q-btn>
                    </div>
                </div>
                </div>
                <div class="col-4">
                    <div class="text-bold text-capitalize q-mb-xs">Các lĩnh vực đã chọn <strong class="text-negative">*</strong>
                            </div>
                    <q-chip removable class="text-caption" v-for="(typeWorking, index) in typeWorkings"
                    :key="'typeWorking-' + index" :label="typeWorking.label" @remove="(state) => remove(index)" square
                    color="red" text-color="white"></q-chip>
                </div>
            </div>
      


    </div>
</template>
<script>


import { useQuasar } from 'quasar'
import { jobDictionary } from '../../assets/dictionary/job';
import { useCompanyStore } from '../../stores/companyStore';

export default {
    data() {
        return {
            optionTypeWorkings: [],
            $q: useQuasar(),
            typeWorkings: [],
            typeWorking: [],
            initOptionWorkings: [],
            companyStore: useCompanyStore()
        }
    },

    created() {
        this.init()


    },
    methods: {
        remove(index) {
            this.typeWorkings.splice(index, 1)
            this.companyStore.info.workingArea = this.typeWorkings.map(element => {
                let field_working = element.value.split('---');
                return ({
                    field: field_working[0],
                    name: field_working[1],
                })
            })

            this.typeWorking = []
        },
        filterFn(val, update) {
            update(() => {
                if (val === '') {
                    this.optionTypeWorkings = this.initOptionWorkings
                }
                else {
                    const needle = val.toLowerCase()
                    this.optionTypeWorkings = this.initOptionWorkings.filter(
                        v => v.label.toLowerCase().indexOf(needle) > -1
                    )
                }
            })
        },

        init() {
            jobDictionary.type.forEach(field => {
                field.workings.forEach(working => {
                    this.initOptionWorkings.push({
                        value: field.field + "---" + working,
                        label: working
                    })
                })
            })
            // console.log(this.userStore.getUserState.info.typeWorking)
            this.typeWorkings = this.companyStore.info.workingArea.map(item => {
                let newItem = {
                    value: item.field + "---" + item.name,
                    label: item.name,
                    isNotRemoveable: false
                }
                return newItem;
            });
            this.optionTypeWorkings = this.initOptionWorkings

        },

        cancel() {
            this.$q.notify({
                message: 'Đã hủy',
                color: 'deep-orange-6',
                position: "bottom-right",
                icon: 'report',
            })

            this.typeWorking = [];
        },
        save() {
            //to do
            if (this.typeWorking.length > 0) {

                // lấy của user ra đã
                this.companyStore.info.workingArea.forEach(everyType => {
                    // check vòng for trùng lặp giá trị
                    this.typeWorking = this.typeWorking.filter(type => {
                        return (type.label !== everyType.name)

                    })

                })
                if (this.typeWorking.length <= 0) {
                    this.$q.notify({
                        message: 'Vui lòng điền thêm kĩ năng trước khi lưu',
                        color: 'deep-orange-6',
                        position: "bottom-right",
                        icon: 'report',
                    })
                } else {
                    let arr = this.typeWorking.map(element => {
                        let field_working = element.value.split('---');
                        return ({
                            field: field_working[0],
                            name: field_working[1],
                        })
                    })
                    this.companyStore.info.workingArea = this.companyStore.info.workingArea.concat(arr)
                    this.typeWorkings = this.typeWorkings.concat(this.typeWorking.map(item => {
                        let newItem = {
                            value: item.value,
                            label: item.label,
                            isNotRemoveable: false
                        }
                        return newItem;
                    }))

                    this.typeWorking = []

                }
                // chuyển đổi lại dạng

            } else {

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