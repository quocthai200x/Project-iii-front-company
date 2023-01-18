<template>
    <div>

        <q-input style="width: 300px;" v-model="filter" color="deep-orange" outlined dense placeholder="Tìm theo tên">
            <template v-slot:prepend>
                <q-icon name="search" />
            </template>
        </q-input>

        <div class="q-pt-lg">
            <q-table separator="vertical" flat :rows="data" :columns="columns" row-key="name">
                <template v-slot:header="props">
                    <q-tr :props="props">
                        <q-th v-for="col in props.cols" :key="col.name" :props="props" class="">
                            {{ col.label }}
                        </q-th>
                    </q-tr>
                </template>
            </q-table>
        </div>


    </div>
</template>
<script>
import { getJobByStatus } from "../../../apis/job"
export default {
    data() {
        let columns = [
            {
                name: 'name',
                required: true,
                label: 'Tên công việc',
                align: 'left',
                field: row => row.info.name,
                format: val => `${val}`,
                sortable: true
            },
            {
                name: 'location',
                required: true,
                label: 'Địa điểm',
                align: 'left',
                field: row => row.info.workingAddress,
                format: val => {
                    if(val){
                        let arr = []
                        val.forEach(location => {
                            arr.push(location.province)
                        })
                        return arr.join(", ")
                    }
                },
                sortable: true
            },

        ]
        return {
            filter: "",
            data: [],
            loadData: false,
            columns,
        }
    },
    created() {
        this.getJobs()
    },
    methods: {
        getJobs() {
            this.loadData = true
            getJobByStatus({ status: "draft" }).then(data => {
                if (data) {
                    this.data = data
                }
                // console.log(this.data)
                this.loadData = false

            })

        }
    },
}
</script>
<style lang="">
    
</style>