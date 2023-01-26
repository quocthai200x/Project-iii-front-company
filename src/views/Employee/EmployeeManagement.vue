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
                <q-select style="width: 300px;" v-model="selectedRole" :options="listRole"
                    :option-value="opt => Object(opt) === opt && 'name' in opt ? opt.name : null"
                    :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : '- Null -'"
                    color="deep-orange" outlined dense placeholder="Tìm theo kí tự trên bảng">

                </q-select>
                <q-btn :loading="addEmployeeLoading"
                    :disable='addEmployeeLoading || !roleStore.settings.systemFunction.canWriteUserPermission'
                    icon="add" label="Mời" @click="inviteUser" outline color="deep-orange"></q-btn>
            </div>

        </q-card-section>
        <q-card-section class="q-pt-lg">
            <q-table :pagination="myInitialPagination" :filter="filter" separator="vertical" flat :rows="listUserShow"
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
                    <q-tr @click="popUpDetail(props.row.indexElement)" :props="props" class="cursor-pointer hover">
                        <q-td key="Người dùng" :props="props">
                            <div class="hover-text">
                                {{ props.row.info.name }}
                            </div>
                        </q-td>
                        <q-td key="Email" :props="props">
                            <div class="hover-text">
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
    <q-dialog v-model="popUpInvitePeople">
        <q-card flat style="width: 80%" class="scroll">
            <form @submit.prevent.stop="addEmployee">

                <q-card-section>
                    <div class="text-h6 text-bold">Thêm người dùng</div>
                </q-card-section>
                <q-card-section>
                    <div class="q-gutter-sm">
                        <div>Email</div>
                        <q-input ref="email" type="email" v-model="form.email" color="deep-orange" outlined dense
                            placeholder="Nhập E-mail/ Ví dụ: example@something.com"
                            :rules="[val => !!val || 'Yêu cầu nhập E-mail', isValidEmail]">
                        </q-input>
                    </div>
                </q-card-section>
                <q-card-section>
                    <div class="q-gutter-sm">
                        <div>Tên người dùng</div>
                        <q-input ref="name" v-model="form.name" color="deep-orange" outlined dense
                            placeholder="Nhập tên. Ví dụ: Nguyxxx XXXX XXX T"
                            :rules="[val => !!val || 'Yêu cầu nhập tên người dùng']">
                        </q-input>
                    </div>
                </q-card-section>
                <q-card-section>
                    <div class="q-gutter-sm">
                        <div>Vai trò</div>
                        <q-select v-model="form.roleName" color="deep-orange" outlined dense :options="optionRole">
                        </q-select>
                    </div>
                </q-card-section>
                <q-card-actions align="right" class="text-negative q-mt-xl">
                    <q-btn flat label="Đóng" v-close-popup />
                    <q-btn :disable='!roleStore.settings.systemFunction.canWriteRolePermission' flat label="Thêm"
                        @click="addEmployee" />

                </q-card-actions>
            </form>
        </q-card>
    </q-dialog>
    <q-dialog v-if="indexChoose >= 0" v-model="popUpEmployeeDetail">
        <q-card flat style="width: 80vw;">
            <q-card-section>
                <div class="text-h6 text-bold">Thay đổi vai trò</div>
            </q-card-section>
            <q-card-section>
                <div class="q-gutter-sm">
                    <div>Email</div>
                    <q-input ref="email" type="email" v-model="form.email" color="deep-orange" outlined dense disable
                        placeholder="Nhập E-mail/ Ví dụ: example@something.com"
                        :rules="[val => !!val || 'Yêu cầu nhập E-mail', isValidEmail]">
                    </q-input>
                </div>
            </q-card-section>
            <q-card-section>
                <div class="q-gutter-sm">
                    <div>Tên người dùng</div>
                    <q-input disable ref="name" v-model="form.name" color="deep-orange" outlined dense
                        placeholder="Nhập tên. Ví dụ: Nguyxxx XXXX XXX T"
                        :rules="[val => !!val || 'Yêu cầu nhập tên người dùng']">
                    </q-input>
                </div>
            </q-card-section>

            <q-card-section>
                <div class="q-gutter-sm">
                    <div>Vai trò</div>
                    <q-select v-model="form.roleName" color="deep-orange" outlined dense :options="optionRole">
                    </q-select>
                </div>
            </q-card-section>

            <q-card-actions align="right" class="text-negative q-mt-xl">
                <q-btn flat label="Đóng" v-close-popup />
                <q-btn v-close-popup :disable='!roleStore.settings.systemFunction.canWriteRolePermission' flat
                    label="Cập nhật" @click="attachRoleEmployee" />

            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script>
import { useQuasar } from 'quasar'
import DrawerVue from '../../layouts/Drawer.vue'
import { useRoleStore } from '../../stores/roleStore'
import { attachRole, getAllEmployeeOfCompany } from "../../apis/user"
import { getAllOnlyRoleNameOfCompany } from '../../apis/role'
import { registerEmployee } from '../../apis/auth'

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
            optionRole: [],
            form: {
                email: '',
                name: "",
                roleName: "",
            },
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
            },
            popUpInvitePeople: false,
            addEmployeeLoading: false,
            popUpEmployeeDetail: false,
        }
    },
    created() {
        this.$emit("update:layout", DrawerVue)
        if (this.roleStore.settings.systemFunction.canRead) {
            this.init()
        } else {

        }
    },
    watch: {
        "selectedRole"(newValue, oldValue) {
            if (newValue != oldValue) {
                if (newValue.name == "Tất cả vai trò") {
                    this.listUserShow = this.listUser.map(element => element)
                }
                else {
                    this.listUserShow = this.listUser.filter(element => element.roleId.name == newValue.name)
                }
            }
        },
        "listUser"(newValue, oldValue) {
            this.listUserShow = newValue

        }
    },
    methods: {
        popUpDetail(index) {
            this.indexChoose = index;
            this.form.email = this.listUser[index].email.slice();
            this.form.name = this.listUser[index].info.name.slice();
            this.form.roleName = this.listUser[index].roleId.name.slice();
            this.popUpEmployeeDetail = true;

        },
        attachRoleEmployee() {
            console.log(this.form)
            console.log(this.listUser[this.indexChoose])
            if (this.form.roleName != this.listUser[this.indexChoose].roleId.name) {
                attachRole({ targetEmail: this.form.email, roleName: this.form.roleName }).then(data => {
                    if (data) {
                        this.$q.notify({
                            message: `Cập nhật vai trò '${this.form.roleName}' cho '${this.form.email}' thành công`,
                            color: 'green-6',
                            position: "bottom-right",
                            icon: 'check_circle',
                        })
                        this.listUser[this.indexChoose].roleId.name = data.roleInfo.name;
                    } else {
                        this.$q.notify({
                            message: 'Có xảy ra lỗi khi thay đổi vai trò',
                            color: 'deep-orange-6',
                            position: "bottom-right",
                            icon: 'check_circle',
                        })
                    }
                    this.clearForm();
                    this.indexChoose = -1;

                })
            } else {
                this.clearForm();
                this.indexChoose = -1;
            }
        },
        isValidEmail() {
            const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
            return emailPattern.test(this.form.email) || 'Yêu cầu nhập đúng dạng E-mail';
        },
        addEmployee() {
            this.$refs.name.validate()
            this.$refs.email.validate()

            if (this.$refs.name.hasError || this.$refs.email.hasError) {
                this.formHasError = true
            }
            else {
                this.popUpInvitePeople = false;
                this.addEmployeeLoading = true;
                registerEmployee({ email: this.form.email, roleName: this.form.roleName, name: this.form.name }).then(data => {
                    if (data) {
                        this.listUser.unshift(data)
                        this.listUser.forEach((element, index) => {
                            return {
                                ...element,
                                indexElement: index,
                            }
                        })
                        this.clearForm()
                    } else {
                        this.$q.notify({
                            message: 'Có xảy ra lỗi khi thêm người dùng',
                            color: 'deep-orange-6',
                            position: "bottom-right",
                            icon: 'check_circle',
                        })
                    }
                    this.addEmployeeLoading = false;
                })
            }

        },
        clearForm() {
            this.form.email = "";
            this.form.name = "";
            this.form.roleName = this.optionRole[0]
        },
        inviteUser() {
            if (this.listRole.length > 0) {
                this.form.roleName = this.optionRole[0].slice()
                this.popUpInvitePeople = true;
            } else {
                this.$q.notify({
                    message: 'Hãy tạo vai trò trước khi tạo người dùng',
                    color: 'deep-orange-6',
                    position: "bottom-right",
                    icon: 'check_circle',
                })
            }
        },
        async init() {
            const [listEmployee, listRoleName] = await Promise.all([
                getAllEmployeeOfCompany(),
                getAllOnlyRoleNameOfCompany()
            ])
            if (listEmployee && listRoleName) {
                this.listUser = listEmployee.map((element, index) => {
                    return {
                        ...element,
                        indexElement: index,
                    }
                })
                this.optionRole = listRoleName.map(element => element.name)
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
.hover {
    color: $dark
}

.hover:hover {
    .hover-text {
        color: $deep-orange;
        transition: ease-in-out 200ms;
    }
}
</style>