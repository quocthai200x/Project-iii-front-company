<template >

    <q-dialog v-model="isShow" persistent>
        <q-card style="min-width: 350px">
            <q-card-section>
                <div v-if="isShowAddAddress" class="text-h6 text-bold text-capitalize">Thêm địa chỉ</div>
                <div v-if="isShowEditAddress" class="text-h6 text-bold text-capitalize">Sửa địa chỉ</div>
            </q-card-section>
            <q-card-section>
                <div class="row q-mb-md">
                    <div class="col-6">
                        <div class="q-pr-sm">
                            <q-select color="deep-orange" :options="optionProvince" dense type="text" outlined
                                v-model="province" label="Thành phố/Tỉnh" />
                        </div>
                    </div>
                    <div class="col-6">
                        <div>
                            <q-select color="deep-orange" :options="optionDistrict" dense type="text" outlined
                                v-model="district" label="Quận/Huyện" :disable="!province" />
                        </div>
                    </div>
                </div>
                <div class="row q-mb-md">
                    <div class="col-6">
                        <div class="q-pr-sm">
                            <q-select color="deep-orange" :options="optionWard" dense type="text" outlined
                                v-model="ward" label="Phường/Xã" :disable="!province || !district" />
                        </div>
                    </div>
                    <div class="col-6">
                        <div>
                            <q-input color="deep-orange" dense type="text" outlined v-model="address" label="Địa chỉ"
                                :disable="(!province || !district || !ward)" />
                        </div>
                    </div>
                </div>
            </q-card-section>

            <q-card-section class="">
                <div class="row justify-between items-center">
                    <div class="text-bold text-capitalize">Chọn vị trí bản đồ</div>
                    <div class="row items-center">


                    </div>
                </div>
                <GMapMap :center="{ lat: latitude, lng: longitude }" :zoom="16" map-style-id="terrain"
                    :options="mapOptions" ref="mapRef" @click="handleMapClick" style="width: 400px; height: 300px">
                    <GMapMarker :position="{ lat: latitude, lng: longitude }" :clickable="true" :draggable="true"
                        @drag="handleMarkerDrag" @click="panToMarker" />
                </GMapMap>

            </q-card-section>


            <q-card-actions align="right" class="text-negative">
                <q-btn @click="cancel" flat label="Đóng" v-close-popup />
                <q-btn v-if="isShowAddAddress" @click="addAddress" flat label="Thêm"
                    v-close-popup="!isShowAddAddress" />
                <q-btn v-if="isShowEditAddress" @click="editAddress" flat label="Sửa"
                    v-close-popup="!isShowEditAddress" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script>

import { ref } from 'vue'
import { useQuasar } from "quasar"

import { locationDictionary } from "@/assets/dictionary/location"

import { useRoleStore } from '../../stores/roleStore'
import { useJobStore } from '../../stores/jobStore'


export default {
    props: {
        indexToDialog: Number,
        isShowAddAddress: Boolean,
        isShowEditAddress: Boolean,
    },

    data() {
        return {
            jobStore: useJobStore(),
            $q: useQuasar(),
            mapOptions: {
                disableDefaultUI: true,
            },
            indexToDialogData: this.indexToDialog,
            isShow: false,
            address: "",
            ward: "",
            district: "",
            province: "",

            latitude: 21.02839897378743,
            longitude: 105.85258311027324,

            roleStore: useRoleStore(),
            optionProvince: [],
            optionDistrict: [],
            optionWard: [],
        }
    },
    created() {
        this.getOptionProvince()
        this.getOptionDistrict();
        this.getOptionWard();


    },
    watch: {
        "isShowAddAddress"(newValue) {
            this.isShow = newValue

        },
        "isShowEditAddress"(newValue) {
            this.isShow = newValue
            if (newValue) {
                this.province = this.jobStore.form.workingAddress[this.indexToDialog].province;
                this.district = this.jobStore.form.workingAddress[this.indexToDialog].district;
                this.ward = this.jobStore.form.workingAddress[this.indexToDialog].ward;
                this.address = this.jobStore.form.workingAddress[this.indexToDialog].address;
                this.latitude = this.jobStore.form.workingAddress[this.indexToDialog].latitude;
                this.longitude = this.jobStore.form.workingAddress[this.indexToDialog].longitude;


            }
        },
        "province"(newValue, oldValue) {
            if (newValue != oldValue && oldValue) {
                this.district = "";
                this.ward = "";
            }
            this.getOptionDistrict()
        },
        "district"(newValue, oldValue) {
            if (newValue != oldValue && oldValue) {

                this.ward = "";
            }
            this.getOptionWard()
        }

    },
    methods: {

        handleMarkerDrag(e) {
            this.latitude = e.latLng.lat();
            this.longitude = e.latLng.lng();
        },
        //Moves the map view port to marker
        panToMarker() {
            this.$refs.mapRef.panTo({ lat: this.langitude, lng: this.longitude });
            this.$refs.mapRef.setZoom(18);
        },

        handleMapClick(e) {
            this.latitude = e.latLng.lat();
            this.longitude = e.latLng.lng();
            console.log(e);
        },

        cancel() {
            this.resetData();
            this.$emit('update:indexToDialog', -1)
            this.$emit('update:isShowAddAddress', false)
            this.$emit('update:isShowEditAddress', false)
        },
        addAddress() {
            // BALBLA
            if (this.isShow && this.address && this.district && this.ward && this.province) {
                let objectLocation = {

                    address: this.address,
                    district: this.district,
                    ward: this.ward,
                    province: this.province,
                    latitude: this.latitude,
                    longitude: this.longitude,
                }

                this.jobStore.form.workingAddress.unshift(objectLocation)
                this.resetData();
                this.$emit('update:isShowAddAddress', false)
            } else {
                this.$q.notify({
                    message: 'Cần điền đầy đủ thông tin',
                    color: 'deep-orange-6',
                    position: "bottom-right",
                    icon: 'check_circle',
                })
            }
        },
        editAddress() {
            if (this.isShow && this.address && this.district && this.ward && this.province) {
                let objectLocation = {

                    address: this.address,
                    district: this.district,
                    ward: this.ward,
                    province: this.province,
                    latitude: this.latitude,
                    longitude: this.longitude,
                }



                this.jobStore.form.workingAddress.splice(this.indexToDialog, 1);
                this.jobStore.form.workingAddress.unshift(objectLocation)
                this.resetData();
                this.$emit('update:isShowEditAddress', false)

                // to do


            }
            else {
                this.$q.notify({
                    message: 'Cần điền đầy đủ thông tin',
                    color: 'deep-orange-6',
                    position: "bottom-right",
                    icon: 'check_circle',
                })
            }
        },
        resetData() {
            this.address = "";
            this.ward = "";
            this.district = "";
            this.province = "";
            this.latitude = 21.02839897378743;
            this.longitude = 105.85258311027324;

        },
        getOptionDistrict() {
            if (this.province) {
                locationDictionary.forEach(province => {
                    if (province.name == this.province) {
                        this.optionDistrict = province.level2s.map(district => {
                            return district.name
                        })
                    }
                })
            }

        },
        getOptionWard() {
            if (this.province && this.district) {
                locationDictionary.forEach(province => {
                    if (province.name == this.province) {
                        province.level2s.forEach(district => {
                            if (district.name == this.district) {
                                this.optionWard = district.level3s.map(ward => {
                                    return ward.name
                                })
                            }
                        })
                    }
                })
            }
        },
        getOptionProvince() {
            this.optionProvince = locationDictionary.map(province => {
                return (province.name)
            })
        },
    }
}
</script>
<style lang="">
    
</style>