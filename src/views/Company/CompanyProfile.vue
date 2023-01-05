<template >
    <div>
        <q-card flat>
            <q-card-section class="row">
                <div class="text-bold q-pa-md text-h6">Thông tin công ty </div>
            </q-card-section>
            <q-card-section class="">
                <div class="row q-px-md">
                    <div class="col-8">
                        <div class="q-mr-md q-gutter-xs">
                            <div class="text-bold text-capitalize">Tên công ty <strong class="text-negative">*</strong>
                            </div>
                            <q-input color="deep-orange" readonly dense type="text" outlined
                                v-model="companyStore.info.name" />
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="q-gutter-xs">
                            <div class="text-bold text-capitalize">Điện thoại <strong class="text-negative">*</strong>
                            </div>
                            <q-input clearable type="tel" color="deep-orange" dense outlined
                                v-model="companyStore.info.phone" />
                        </div>
                    </div>
                </div>
            </q-card-section>
            <q-card-section class="">
                <div class="row q-px-md">
                    <div class="col-8">
                        <div class="q-mr-md q-gutter-md">

                            <div class="text-bold text-capitalize">
                                <div class="q-mb-sm">
                                    Địa chỉ công ty <strong class="text-negative">*</strong>
                                </div>
                                <div class="text-caption">
                                    <q-btn @click="addLocation" class="bg-red-4" align="around" size="12px" outline
                                        color="white" label="Thêm địa chỉ" icon="add" />
                                </div>
                            </div>

                            <div class="q-gutter-xs">

                                <div class="row text-capitalize q-my-sm"
                                    v-for="(location, index ) in companyStore.info.location" :key="'location-' + index">
                                    <span></span>
                                    <div class=" col-2">
                                        <div class="q-pr-xs">
                                            <i>
                                                {{ index == 0 ? "Trụ sở:" : `Chi nhánh ${index}:` }}
                                            </i>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <div class="q-pr-xs">
                                            <div>{{
                                                location.address + ", " + location.ward + ", " + location.district
                                                    + ", " + location.province
                                            }}</div>
                                        </div>
                                    </div>
                                    <div class="col-2 q-gutter-xs rounded-borders row justify-end">
                                        <div>
                                            <q-btn @click="showMap(index)" size="sm" color="light-green-3" icon="map"
                                                dense unelevated></q-btn>
                                            <q-tooltip anchor="center middle" self="center middle">Xem bản
                                                đồ</q-tooltip>
                                        </div>
                                        <div>
                                            <q-btn @click="editLocation(index)" size="sm" color="light-blue-3"
                                                icon="edit" dense unelevated></q-btn>
                                            <q-tooltip anchor="center middle" self="center middle">Chỉnh sửa</q-tooltip>
                                        </div>
                                        <div>
                                            <q-btn @click="removeLocation(index)" size="sm" color="deep-orange-2"
                                                icon="backspace" dense unelevated></q-btn>
                                            <q-tooltip anchor="center middle" self="center middle">Xóa địa
                                                chỉ</q-tooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="q-gutter-xs">
                            <div class="text-bold text-capitalize">Quy mô công ty <strong
                                    class="text-negative">*</strong>
                            </div>
                            <q-select class="q-pr-sm" name="size" model-value="size" dense outlined color="deep-orange"
                                v-model="companyStore.info.size" :options="sizeOptions" />
                        </div>
                    </div>
                </div>
            </q-card-section>
            <q-card-section>
                <WorkingAreaSelectVue></WorkingAreaSelectVue>
            </q-card-section>
            <q-card-section>
                <BenefitsSelectVue></BenefitsSelectVue>
            </q-card-section>
        </q-card>
        <q-dialog v-model="isShowMap">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Bản đồ</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <GMapMap :center="{ lat: latitude, lng: longitude }" :zoom="18" map-type-id="terrain"
                        style="width: 400px; height: 400px">
                        <GMapMarker :position="{ lat: latitude, lng: longitude }" />
                    </GMapMap>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Đóng" color="negative" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <DialogAddressVue v-model:isShowAddAddress="isShowAddAddress" v-model:isShowEditAddress="isShowEditAddress"
            v-model:indexToDialog="indexToDialog"></DialogAddressVue>
    </div>
</template>
<script>
import DialogAddressVue from '../../components/DialogAddress.vue'
import DrawerVue from '../../layouts/Drawer.vue'
import { useCompanyStore } from "../../stores/companyStore"
import { useRoleStore } from '../../stores/roleStore'
import { companyDictionary } from "../../assets/dictionary/company"
import WorkingAreaSelectVue from '../../components/WorkingAreaSelect.vue'
import BenefitsSelectVue from '../../components/BenefitsSelect.vue'

export default {
    name: "Company Profile",
    components: {
        DialogAddressVue,
        WorkingAreaSelectVue,
        BenefitsSelectVue
    },
    watch: {
        "isShowAddAddress"(newVal) {
            console.log(newVal)
        },
        "companyStore.info"(newVal, oldValue) {
            console.log("OK sửa")
            this.companyStore.isModify = true;
        }
    },


    data() {
        return {
            companyStore: useCompanyStore(),
            roleStore: useRoleStore(),
            longitude: 0,
            latitude: 0,
            isShowMap: false,
            isShowAddAddress: false,
            isShowEditAddress: false,
            indexToDialog: -1,
            sizeOptions: companyDictionary.size
        }
    },
    created() {
        this.$emit("update:layout", DrawerVue)
        let index = this.companyStore.info.location.findIndex(x => x.isHeadquarter === true);
        if (index > -1) {
            let element = this.companyStore.info.location[index];
            this.companyStore.info.location.splice(index, 1);
            this.companyStore.info.location.unshift(element);
        }

    },
    methods: {
        showMap(index) {

            this.longitude = this.companyStore.info.location[index].longitude;
            this.latitude = this.companyStore.info.location[index].latitude;
            this.isShowMap = true;
        },
        removeLocation(index) {
            this.companyStore.info.location.splice(index, 1)
            console.log(this.companyStore.info.location)
            //    this.companyStore.info.location = 
        },
        editLocation(index) {
            this.isShowEditAddress = true
            this.indexToDialog = index;

        },
        addLocation() {
            this.isShowAddAddress = true
            console.log(this.isShowAddAddress)
        }
    }


}
</script>
<style lang="scss">

</style>