<template>
    <div v-if="!roleStore.settings.systemFunction.canRead" class="text-caption text-capitalize text-negative"><i>**
            Bạn không có quyền đọc thông tin</i></div>
    <div v-if="!roleStore.settings.systemFunction.canWriteUserPermission"
        class="text-caption text-capitalize text-negative"><i>**
            Bạn không có quyền cập nhật người dùng</i></div>
    <q-card flat class="q-pa-md">

        <q-card-section class="row justify-between">
            <div class="text-bold  text-h6">Danh sách nhân viên </div>
            <div class="row q-gutter-xs">
                <q-input style="width: 300px;" v-model="filter" color="deep-orange" outlined dense
                    placeholder="Tìm theo kí tự trên bảng">
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
                <q-select style="width: 300px;" v-model="selectedRole" 
                :options="listRole"
                :option-value="opt => Object(opt) === opt && 'name' in opt ? opt.name : null"
                :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : '- Null -'"
                color="deep-orange" outlined dense
                    placeholder="Tìm theo kí tự trên bảng">

                </q-select>
                <q-btn :disable='!roleStore.settings.systemFunction.canWriteUserPermission' icon="add" label="Mời"
                    @click="inviteUser" outline color="deep-orange"></q-btn>
            </div>

        </q-card-section>
        <q-card-section class="q-pt-lg">
            <q-table :pagination="myInitialPagination" :filter="filter" separator="vertical" flat 
                :rows="listUserShow"
                :columns="columns" row-key="name">
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
                        <q-td key="Người dùng" :props="props">
                            <div>
                                {{ props.row.info.name }}
                            </div>
                        </q-td>
                        <q-td key="Email" :props="props">
                            <div>
                                {{ props.row.email }}
                            </div>
                        </q-td>
                        <q-td key="Vai trò" :props="props">
                            <div>
                                {{ props.row.roleId.name }}
                            </div>
                        </q-td>
                        <q-td key="Cập nhật gần đây" :props="props">
                            <div>
                                {{ $moment(props.row.updatedAt).format("DD-MM-YYYY") }}
                            </div>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </q-card-section>
    </q-card>
</template>
<script>
import { useQuasar } from 'quasar'
import DrawerVue from '../../layouts/Drawer.vue'
import { useRoleStore } from '../../stores/roleStore'
import { getAllEmployeeOfCompany } from "../../apis/user"
import { getAllOnlyRoleNameOfCompany } from '../../apis/role'

export default {
    data() {
        let columns = [
            {
                name: 'Người dùng',
                required: true,
                label: 'Người dùng',
                align: 'left',
                field: row => row.info.name,
                format: val => `${val}`,
                sortable: true
            },
            {
                name: 'Email',
                required: true,
                label: 'Email',
                align: 'left',
                field: row => row.email,
                format: val => `${val}`,
                sortable: true
            },
            {
                name: 'Vai trò',
                required: true,
                label: 'Vai trò',
                align: 'left',
                field: row => row.roleId.name,
                format: val => `${val}`,
                sortable: true
            },
            {
                name: 'Cập nhật gần đây',
                required: true,
                label: 'Cập nhật gần đây',
                align: 'left',
                field: row => row.roleId.name,
                format: val => `${val}`,
                sortable: true
            },
        ]
        return {
            filter: "",
            indexChoose: -1,
            myInitialPagination: {
                rowsPerPage: 10
            },
            columns,
            roleStore: useRoleStore(),
            listUser: [],
            listUserShow: [],
            listRole: [],
            $q: useQuasar(),
            selectedRole: {
                name: "Tất cả vai trò"
            }
        }
    },
    created() {
        this.$emit("update:layout", DrawerVue)
        if (this.roleStore.settings.systemFunction.canRead) {
            this.init()
        } else {

        }
    },
    watch:{
        "selectedRole"(newValue, oldValue){
            if(newValue != oldValue){
                if(newValue.name == "Tất cả vai trò"){                   
                    this.listUserShow = this.listUser.map(element=>element)
                }
                else{
                    this.listUserShow = this.listUser.filter(element=> element.roleId.name == newValue.name)
                }
            }
        },
        "listUser"(newValue, oldValue){
            this.listUserShow = newValue
          
        }
    },
    methods: {
        inviteUser(){
            
        },
        async init() {
            const [listEmployee, listRoleName] = await Promise.all([
                getAllEmployeeOfCompany(),
                getAllOnlyRoleNameOfCompany()
            ])
            if (listEmployee && listRoleName) {

                this.listUser = listEmployee
                this.listRole = listRoleName
                this.listRole.unshift({
                    name: "Tất cả vai trò"
                })
            } else {
                this.$q.notify({
                    message: 'Lấy dữ liệu thất bại',
                    color: 'deep-orange-6',
                    position: "bottom-right",
                    icon: 'check_circle',
                })
            }

        }
    }
}
</script>
<style lang="scss">

</style>