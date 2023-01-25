<template >
    <div v-if="!roleStore.settings.systemFunction.canRead" class="text-caption text-capitalize text-negative"><i>**
            Bạn không có quyền đọc thông tin</i></div>
    <div v-if="!roleStore.settings.systemFunction.canWriteRolePermission"
        class="text-caption text-capitalize text-negative"><i>**
            Bạn không có quyền cập nhật thông tin</i></div>
    <q-card flat class="q-pa-md">

        <q-card-section class="row justify-between">
            <div class="text-bold  text-h6">Danh sách quyền </div>
            <div class="row q-gutter-xs">
                <q-input style="width: 300px;" v-model="filter" color="deep-orange" outlined dense
                    placeholder="Tìm theo kí tự trên bảng">
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
                <q-btn  :disable='!roleStore.settings.systemFunction.canWriteRolePermission' icon="add" label="Thêm quyền" @click="addRole" outline color="deep-orange"></q-btn>
            </div>

        </q-card-section>
        <q-card-section class="q-pt-lg">
            <q-table :pagination="myInitialPagination" :filter="filter" separator="vertical" flat :rows="listRole"
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
                        <q-td key="Vai trò" :props="props">
                            <div class="">
                                <span class="cursor-pointer text-bold hover-text">
                                    {{ props.row.name }}
                                </span>
                            </div>


                        </q-td>
                        <q-td key="Người dùng" :props="props">
                            <div class="cursor-pointer">
                                <q-tooltip transition-show="scale" transition-hide="scale" anchor="bottom middle"
                                    self="center middle">
                                    <div v-if="props.row.listUserAttachThatRole.length > 0">

                                        <div>Người sử dụng vai trò {{ props.row.name }}</div>
                                        <ul>
                                            <li v-for="(user, index) in props.row.listUserAttachThatRole" :key="index">
                                                {{ user.info.name }}
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-else>
                                        Chưa có người dùng nào
                                    </div>
                                </q-tooltip>
                                <span class=" ">
                                    {{ props.row.listUserAttachThatRole.length }}
                                </span>
                            </div>


                        </q-td>
                        <q-td key="Xem chi tiết" :props="props">
                            <div class="row justify-center">
                                <q-btn @click="popUpRoleEditor(props.row.indexElement)" size="12px" unelevated
                                    color="deep-orange">
                                    Xem chi tiết
                                </q-btn>
                            </div>


                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </q-card-section>
        <q-dialog v-model="popUp">
            <q-card style="width: 80%; height: 80vh;" class="scroll">
                <q-card-section class="bg-deep-orange">

                    <q-input placeholder="Hãy điền tên vai trò"  :disable='!roleStore.settings.systemFunction.canWriteRolePermission'
                        :input-style="{ color: 'white' }" color="white" outlined label="Vai trò" v-model="form.name">

                    </q-input>

                </q-card-section>
                <q-card-section>
                    <div class="text-subtitle1">Cài đặt tuyển dụng</div>
                    <div>
                        <q-toggle :disable='!roleStore.settings.systemFunction.canWriteRolePermission'
                            v-model="form.settings.recruitmentFunction.canRead" color="deep-orange"
                            label="Xem các tin tuyển dụng" keep-color />
                    </div>
                    <di v>
                        <q-toggle :disable='!roleStore.settings.systemFunction.canWriteRolePermission'
                            v-model="form.settings.recruitmentFunction.canWrite" color="deep-orange"
                            label="Cập nhật các tin tuyển dụng" keep-color />
                    </di>
                </q-card-section>
                <q-card-section>
                    <div class="text-subtitle1">Cài đặt quản lí hồ sơ ứng viên</div>
                    <div>
                        <q-toggle :disable='!roleStore.settings.systemFunction.canWriteRolePermission'
                            v-model="form.settings.applierFunction.canRead" color="deep-orange"
                            label="Xem hồ sơ ứng viên, danh sách ứng tuyển" keep-color />
                    </div>
                    <div>
                        <q-toggle :disable='!roleStore.settings.systemFunction.canWriteRolePermission'
                            v-model="form.settings.applierFunction.canWrite" color="deep-orange"
                            label="Cập nhật các trạng thái của hồ sơ ứng viên, nêu ý kiến cho ứng viên đó" keep-color />
                    </div>
                </q-card-section>
                <q-card-section>
                    <div class="text-subtitle1">Cài đặt tài khoản công ty</div>
                    <div>
                        <q-toggle :disable='!roleStore.settings.systemFunction.canWriteRolePermission'
                            v-model="form.settings.systemFunction.canRead" color="deep-orange"
                            label="Xem các cài đặt hệ thống bao gồm: Thông tin công ty, thông tin nhân viên, thông tin quyền"
                            keep-color />
                    </div>
                    <div>
                        <q-toggle :disable='!roleStore.settings.systemFunction.canWriteRolePermission'
                            v-model="form.settings.systemFunction.canWriteCompanyInfo" color="deep-orange"
                            label="Cập nhật thông tin công ty" keep-color />
                    </div>
                    <div>
                        <q-toggle :disable='!roleStore.settings.systemFunction.canWriteRolePermission'
                            v-model="form.settings.systemFunction.canWriteRolePermission" color="deep-orange"
                            label="Cập nhật thông tin quyền hạn của các vai trò" keep-color />
                    </div>
                    <div>
                        <q-toggle :disable='!roleStore.settings.systemFunction.canWriteRolePermission'
                            v-model="form.settings.systemFunction.canWriteUserPermission" color="deep-orange"
                            label="Cập nhật quyền của các nhân viên" keep-color />
                    </div>
                </q-card-section>

                <q-card-section>
                    <div class="text-subtitle1">Cài đặt tìm kiếm</div>
                    <div>
                        <q-toggle :disable='!roleStore.settings.systemFunction.canWriteRolePermission'
                            v-model="form.settings.searchFunction.canSearch" color="deep-orange"
                            label="Tìm kiếm, xem các thông tin về ứng viên" keep-color />
                    </div>
                </q-card-section>

                <q-card-actions align="right" class="text-negative">
                    <q-btn flat label="Đóng" v-close-popup />
                    <q-btn :disable='!roleStore.settings.systemFunction.canWriteRolePermission' flat :label="indexChoose<0?'Thêm':'Cập nhật'"
                        v-close-popup @click="editRole(indexChoose)" />
                </q-card-actions>

            </q-card>
        </q-dialog>
    </q-card>
</template>
<script>
import DrawerVue from '../../layouts/Drawer.vue'
import { useRoleStore } from '../../stores/roleStore'
import { getAllRoleOfCompany, updateRole, createRole } from "../../apis/role"
import { useQuasar } from 'quasar'

export default {
    data() {
        let columns = [

            {
                name: 'Vai trò',
                required: true,
                label: 'Vai trò',
                align: 'left',
                field: row => row.name,
                format: val => `${val}`,
                sortable: true
            },
            {
                name: 'Người dùng',
                required: true,
                label: 'Người dùng',
                align: 'left',
                field: row => row.listUserAttachThatRole.length,
                format: val => `${val}`,
                sortable: true
            },
            {
                name: 'Xem chi tiết',
                required: true,
                label: 'Hành động',
                align: 'left',
                // field: row => row.listUserAttachThatRole.length,
                // format: val => `${val}`,
                // sortable: true
            },
        ]
        return {
            form: {
                settings: {
                    recruitmentFunction: {
                        canRead: true,
                        canWrite: false
                    },
                    applierFunction: {
                        canRead: true,
                        canWrite: false
                    },
                    systemFunction: {
                        canRead: true,
                        canWriteRolePermission: false,
                        canWriteCompanyInfo: false,
                        canWriteUserPermission: false
                    },
                    searchFunction: {
                        canSearch: true
                    }
                },
                name: "",
            },
            popUp: false,
            filter: "",
            indexChoose: -1,
            myInitialPagination: {
                rowsPerPage: 10
            },
            columns,
            roleStore: useRoleStore(),
            listRole: [],
            $q: useQuasar(),
        }
    },
    created() {
        this.$emit("update:layout", DrawerVue)
        if (this.roleStore.settings.systemFunction.canRead) {
            this.init()
        }else{

        }
    },
    watch: {
        "popUp"(newValue) {
            if (!newValue) {
                this.indexChoose = -1

            }
        },
        "form.settings.recruitmentFunction.canRead"(newValue) {
            if (!newValue) {
                this.form.settings.recruitmentFunction.canWrite = false;
            }
        },
        "form.settings.recruitmentFunction.canWrite"(newValue) {
            if (newValue) {
                this.form.settings.recruitmentFunction.canRead = true;
            }
        },
        "form.settings.applierFunction.canRead"(newValue) {
            if (!newValue) {
                this.form.settings.applierFunction.canWrite = false;
            }
        },
        "form.settings.applierFunction.canWrite"(newValue) {
            if (newValue) {
                this.form.settings.applierFunction.canRead = true;
            }
        },

        "form.settings.systemFunction.canWriteCompanyInfo"(newValue) {
            if (newValue) {
                this.form.settings.systemFunction.canRead = true;
            }
        },
        "form.settings.systemFunction.canWriteRolePermission"(newValue) {
            if (newValue) {
                this.form.settings.systemFunction.canRead = true;
            }
        },
        "form.settings.systemFunction.canWriteUserPermission"(newValue) {
            if (newValue) {
                this.form.settings.systemFunction.canRead = true;
            }
        },
        "form.settings.systemFunction.canRead"(newValue) {
            if (!newValue) {
                this.form.settings.systemFunction.canWriteCompanyInfo = false;
                this.form.settings.systemFunction.canWriteRolePermission = false;
                this.form.settings.systemFunction.canWriteUserPermission = false;
            }
        },



    },
    methods: {
        addRole() {
            this.clearPopUpEditor();
            this.popUp = true;

        },
        clearPopUpEditor(){
            this.indexChoose = -1
            this.form = {
                settings: {
                    recruitmentFunction: {
                        canRead: true,
                        canWrite: false
                    },
                    applierFunction: {
                        canRead: true,
                        canWrite: false
                    },
                    systemFunction: {
                        canRead: true,
                        canWriteRolePermission: false,
                        canWriteCompanyInfo: false,
                        canWriteUserPermission: false
                    },
                    searchFunction: {
                        canSearch: true
                    }
                },
                name: "",
            }
        },
        editRole(index) {
            if(index>=0){
                updateRole({ roleName: this.listRole[this.indexChoose].name, roleSetting: this.form.settings, newName: this.form.name })
                .then(data => {
                    if (data) {
                        this.listRole[index].name = data.name
                        this.listRole[index].settings = data.settings
                        this.$q.notify({
                            message: `Cập nhật '${data.name}' thành công `,
                            color: 'green-6',
                            position: "bottom-right",
                            icon: 'check_circle',
                        })
                    } else {
                        this.$q.notify({
                            message: 'Cập nhật thất bại',
                            color: 'deep-orange-6',
                            position: "bottom-right",
                            icon: 'check_circle',
                        })
                    }
                })
            }else{
                createRole({name: this.form.name, settings: this.form.settings}).then(data=>{
                    if(data){
                        data.listUserAttachThatRole = [];
                        this.listRole.unshift(data);
                        this.listRole.forEach((element, index)=> element.indexElement = index)
                        this.$q.notify({
                            message: `Cập nhật '${data.name}' thành công `,
                            color: 'green-6',
                            position: "bottom-right",
                            icon: 'check_circle',
                        })
                    }else{
                        this.$q.notify({
                            message: 'Cập nhật thất bại',
                            color: 'deep-orange-6',
                            position: "bottom-right",
                            icon: 'check_circle',
                        })
                    }
                })
            }

        },
        init() {
            getAllRoleOfCompany().then(data => {
                if (data) {
                    this.listRole = data.rolesFound.map((element, index) => {
                        element.indexElement = index;
                        element.listUserAttachThatRole = data.users[index]
                        return element
                    }
                    );

                } else {
                    this.$q.notify({
                        message: 'Lấy dữ liệu thất bại',
                        color: 'deep-orange-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                }
            })
        },
        popUpRoleEditor(index) {
            this.popUp = true;
            this.indexChoose = index;
            this.form.settings = {
                ...this.listRole[index].settings
            }
            this.form.name = this.listRole[index].name.slice()
        }
    }
}
</script>
<style lang="">
    
</style>