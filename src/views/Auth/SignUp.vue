<template >
    <div class="bg-deep-orange-10">

    <div
        class="bg-white"
        style="display: block;margin-top: 20px;margin-right: auto;margin-left: auto;margin-bottom: 20px;width: 70%; min-height: 100vh;">

        <q-list bordered class="rounded-borders">
            <q-expansion-item         default-opened
 switch-toggle-side expand-separator icon="perm_identity" label="Account settings">
                <template v-slot:header>
                    <div class="row">
                        <div class="text-bold q-pa-md text-h6">Thông tin tài khoản</div>
                    </div>
        </template>
                <q-card>
            

                    <q-card-section>
                        <div class="row q-px-md">
                            <div class="col-6">
                                <div class="q-mr-md q-gutter-xs">
                                    <div class="text-bold text-capitalize">Email <strong class="text-negative">*</strong>
                                    </div>
                                    <q-input color="deep-orange" dense type="text" outlined v-model="email" />
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="q-gutter-xs">
                                    <div class="text-bold text-capitalize">Mật khẩu <strong class="text-negative">*</strong>
                                    </div>
                                    <q-input clearable :type="isPwd ? 'password' : 'text'" color="deep-orange" dense
                                        outlined v-model="password">
                                        <template v-slot:append>
                                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                                @click="isPwd = !isPwd" />
                                        </template>
                                    </q-input>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
            <q-separator />

            <q-expansion-item switch-toggle-side expand-separator icon="perm_identity" label="Account settings">
                <template v-slot:header>
                    <div class="row">
                        <div class="text-bold q-pa-md text-h6">Thông tin công ty</div>
                    </div>
        </template>
    
      
        <q-card-section class="">
                <div class="row q-px-md">
                    <div class="col-8">
                        <div class="q-mr-md q-gutter-xs">
                            <div class="text-bold text-capitalize">Tên công ty <strong class="text-negative">*</strong>
                            </div>
                            <q-input color="deep-orange" dense type="text" outlined v-model="companyStore.info.name" />
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
                                            <q-btn @click="showMap(index)" size="sm" color="light-green-3" icon="map" dense
                                                unelevated></q-btn>
                                            <q-tooltip anchor="center middle" self="center middle">Xem bản
                                                đồ</q-tooltip>
                                        </div>
                                        <div>
                                            <q-btn @click="editLocation(index)" size="sm" color="light-blue-3" icon="edit"
                                                dense unelevated></q-btn>
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
                            <div class="text-bold text-capitalize">Quy mô công ty <strong class="text-negative">*</strong>
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
            <q-card-section>
                <div class="q-px-md">
                    <div class="text-bold text-capitalize q-mb-sm">Mô tả<strong class="text-negative">*</strong></div>
                    <q-input dense :rules="[val => val.length <= 10000 || 'Đã dùng tối đa 10000 kí tự']" counter lazy-rules
                        placeholder="Tối đa 10000 kí tự..." :maxlength="10000" type="textarea" outlined color="deep-orange"
                        v-model="companyStore.info.desc">
                    </q-input>
                </div>
            </q-card-section>
            <q-card-section>
                <div class="q-px-md row">
                    <div class="col-3 q-pr-md">
                        <div class="text-bold text-capitalize q-mb-sm">Logo công ty<strong class="text-negative">*</strong>
                        </div>
                        <div class="border">
                            <div class="text-capitalize text-caption text-deep-orange" v-if="!companyStore.info.logo">
                                <i>
                                    Hãy tải lên logo của công ty
                                </i>
                            </div>
                            <q-img @mouseover="visibleLogoOptions = true" @mouseleave="visibleLogoOptions = false"
                                class="cursor-pointer " fit="contain" :ratio="1"
                                :src="companyStore.info.logo ? companyStore.info.logo : '/src/assets/images/logo.png'">
                                <div v-show="visibleLogoOptions"
                                    class="absolute-bottom  text-subtitle2 row justify-center ">
                                    <q-btn flat icon="visibility" @click="showLogo">
                                        <q-tooltip transition-show="scale" transition-hide="scale"
                                            self="center middle">Xem</q-tooltip>
                                    </q-btn>
                                    <q-btn flat icon="edit" @click="openInputLogo">
                                        <q-tooltip transition-show="scale" transition-hide="scale"
                                            self="center middle">Sửa</q-tooltip>
                                    </q-btn>
                                    <q-btn flat icon="delete" @click="deleteLogo">
                                        <q-tooltip transition-show="scale" transition-hide="scale"
                                            self="center middle">Xóa</q-tooltip>
                                    </q-btn>
                                </div>
                            </q-img>
                        </div>
                    </div>
                    <div class="col-9 ">
                        <div>

                            <div class="text-bold text-capitalize q-mb-sm">
                                Hình ảnh công ty<strong class="text-negative">*</strong>
                            </div>
                            <q-btn @click="addNewImageIntro" size="12px" label="Thêm" unelevated color="deep-orange"
                                icon="add"></q-btn>
                        </div>
                        <div class="text-capitalize text-caption text-deep-orange"
                            v-if="companyStore.info.imageIntro.length <= 0">
                            <i>
                                Hãy tải thêm ảnh doanh nghiệp
                            </i>
                        </div>
                        <div class="q-gutter-xs">
                            <q-carousel control-text-color="white" control-type="unelevated" :padding="false"
                                :navigation="false" v-model="slide" transition-prev="slide-right"
                                transition-next="slide-left" swipeable animated control-color="deep-orange" arrows
                                height="300px" class="rounded-borders">
                                <template v-for="(a, indexSlide) in companyStore.info.imageIntro"
                                    :key="indexSlide + '-slide'">
                                    <q-carousel-slide v-if="indexSlide % 4 == 0" :name="indexSlide" class="column no-wrap">
                                        <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                                            <q-img @mouseover="visibleImageIntroOptions[indexSlide + index] = true"
                                                @mouseleave="visibleImageIntroOptions[indexSlide + index] = false"
                                                class="rounded-borders col-3 cursor-pointer " :ratio="1" fit="fill"
                                                v-for="(imageIntro, index) in companyStore.info.imageIntro.slice(indexSlide, indexSlide + 4)"
                                                :key="index + '-intro'" :src="imageIntro">
                                                <div v-show="visibleImageIntroOptions[indexSlide + index]"
                                                    class=" absolute-bottom  text-subtitle2 row justify-center q-gutter-xs ">
                                                    <q-btn flat icon="visibility"
                                                        @click="showImageIntro(index + indexSlide)" dense>
                                                        <q-tooltip transition-show="scale" transition-hide="scale"
                                                            self="center middle">Xem</q-tooltip>
                                                    </q-btn>
                                                    <q-btn flat icon="edit" @click="editImageIntro(index + indexSlide)"
                                                        dense>
                                                        <q-tooltip transition-show="scale" transition-hide="scale"
                                                            self="center middle">Sửa</q-tooltip>
                                                    </q-btn>
                                                    <q-btn flat icon="delete" @click="deleteImageIntro(index + indexSlide)"
                                                        dense>
                                                        <q-tooltip transition-show="scale" transition-hide="scale"
                                                            self="center middle">Xóa</q-tooltip>
                                                    </q-btn>
                                                </div>
                                            </q-img>
                                        </div>
                                    </q-carousel-slide>
                                </template>

                            </q-carousel>

                        </div>
                    </div>

                </div>
            </q-card-section>
            <q-card-section>
                <div class="q-px-md row">
                    <div class="col-3 q-pr-md">
                        <div class="text-bold text-capitalize q-mb-sm">Banner công ty<strong
                                class="text-negative">*</strong></div>
                        <div class="border">
                            <div class="text-capitalize text-caption text-deep-orange"
                                v-if="!companyStore.info.bannerImage">
                                <i>
                                    Hãy tải lên banner của công ty
                                </i>
                            </div>
                            <q-img @mouseover="visibleBannerOptions = true" @mouseleave="visibleBannerOptions = false"
                                class="cursor-pointer " fit="contain" :ratio="1"
                                :src="companyStore.info.bannerImage ? companyStore.info.bannerImage : '/src/assets/images/logo.png'">
                                <div v-show="visibleBannerOptions"
                                    class="absolute-bottom  text-subtitle2 row justify-center ">
                                    <q-btn flat icon="visibility" @click="showBanner">
                                        <q-tooltip transition-show="scale" transition-hide="scale"
                                            self="center middle">Xem</q-tooltip>
                                    </q-btn>
                                    <q-btn flat icon="edit" @click="openInputBanner">
                                        <q-tooltip transition-show="scale" transition-hide="scale"
                                            self="center middle">Sửa</q-tooltip>
                                    </q-btn>
                                    <q-btn flat icon="delete" @click="deleteBanner">
                                        <q-tooltip transition-show="scale" transition-hide="scale"
                                            self="center middle">Xóa</q-tooltip>
                                    </q-btn>
                                </div>
                            </q-img>
                        </div>
                    </div>
                    <div class="col-9 q-gutter-xs">
                        <div class="text-bold text-capitalize q-mb-sm">Video giới thiệu<strong
                                class="text-negative">*</strong></div>
                        <div class="row items-center">
                            <q-input color="deep-orange" label="Link (lấy link youtube nhúng)" class="fit" dense
                                v-model="companyStore.info.video"></q-input>
                        </div>

                        <q-video loading="lazy" :ratio="16 / 9" :src="companyStore.info.video" />
                    </div>
                </div>
            </q-card-section>
            <q-card-section>
              
            </q-card-section>
            
        </q-expansion-item>
        </q-list>



        <q-card>

        
        </q-card>
        <div class=" q-mt-lg text-center">
            **Lưu ý: Hãy điền đầy đủ thông tin trước khi tạo tài khoản

        </div>
        <div class=" q-mt-md row justify-center items-center">
                    <q-btn unelevated color="deep-orange" label="Tạo" size="14px" @click="saveCompanyInfo">
                    </q-btn>
                </div>
        <q-dialog v-model="isShowImageIntro">
            <q-card flat>
                <q-card-section>
                    <q-img :ratio="1" fit="contain" width="400px" :src="companyStore.info.imageIntro[indexShowImageIntro]">
                    </q-img>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Đóng" color="negative" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="isShowLogo">
            <q-card>
                <q-card-section>
                    <q-img :ratio="1" fit="contain" width="400px"
                        :src="companyStore.info.logo ? companyStore.info.logo : '/src/assets/images/logo.png'">
                    </q-img>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Đóng" color="negative" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="isShowBanner">
            <q-card>
                <q-card-section>
                    <q-img :ratio="1" fit="contain" width="400px"
                        :src="companyStore.info.bannerImage ? companyStore.info.bannerImage : '/src/assets/images/logo.png'">
                    </q-img>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Đóng" color="negative" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
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

    </div>
</template>
<script>
import DialogAddressVue from '../../components/Company/DialogAddress.vue'
import { useCompanyStore } from "../../stores/companyStore"
import { companyDictionary } from "../../assets/dictionary/company"
import WorkingAreaSelectVue from '../../components/Company/WorkingAreaSelect.vue'
import BenefitsSelectVue from '../../components/Company/BenefitsSelect.vue'
import { registerAdmin } from "../../apis/auth"

import { useQuasar, QSpinnerFacebook } from 'quasar'
import SignUpLayoutVue from '../../layouts/SignUpLayout.vue'

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
            email: "",
            password: "",
            isPwd: true,
            $q: useQuasar(),
            bannerInput: null,
            isShowBanner: false,
            visibleBannerOptions: false,
            visibleImageIntroOptions: [],
            visibleLogoOptions: false,
            slide: 0,
            indexEditImageIntro: -1,
            editImageInput: null,
            isShowImageIntro: false,
            indexShowImageIntro: -1,
            logoInput: null,
            addImageIntroInput: null,
            isShowLogo: false,
            companyStore: useCompanyStore(),
            // roleStore: useRoleStore(),
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

        this.$emit("update:layout", SignUpLayoutVue)
        this.logoInput = cloudinary.createUploadWidget({
            cloudName: 'thai-networking',
            uploadPreset: 'gj08ngug'
        }, (error, result) => {
            // this.avatarFile = null;
            // console.log(result)
            if (!error && result && result.event === "success") {
                // this.avatarFile = result.info;
                this.companyStore.info.logo = result.info.url
            }
        }
        )
        this.bannerInput = cloudinary.createUploadWidget({
            cloudName: 'thai-networking',
            uploadPreset: 'gj08ngug'
        }, (error, result) => {
            // this.avatarFile = null;
            // console.log(result)
            if (!error && result && result.event === "success") {
                // this.avatarFile = result.info;
                this.companyStore.info.bannerImage = result.info.url
            }
        }
        )
        this.addImageIntroInput = cloudinary.createUploadWidget({
            cloudName: 'thai-networking',
            uploadPreset: 'gj08ngug',
            multiple: true,
        }, (error, result) => {
            // this.avatarFile = null;
            // console.log(result)
            if (!error && result && result.event === "success") {
                this.companyStore.info.imageIntro.push(result.info.url)
                this.visibleImageIntroOptions.push(false)
            }
        })
        this.editImageInput = cloudinary.createUploadWidget({
            cloudName: 'thai-networking',
            uploadPreset: 'gj08ngug'
        }, (error, result) => {
            // this.avatarFile = null;
            // console.log(result)
            if (!error && result && result.event === "success") {
                // this.avatarFile = result.info;
                this.companyStore.info.imageIntro[this.indexEditImageIntro] = result.info.url
                this.indexEditImageIntro = -1;
            }
        }
        )

    },
    methods: {
        validateEmail(email) {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        },
        saveCompanyInfo() {
            let canSubmit = true;
            if (!this.validateEmail(this.email) || !this.password) {
                canSubmit = false
            }
            if (canSubmit) {

                this.$q.loading.show({
                    spinner: QSpinnerFacebook,
                    spinnerColor: 'deep-orange',
                    spinnerSize: 140,
                    message: 'Đang đăng kí. Vui lòng chờ...',
                })
                // console.log(this.companyStore.info)
                registerAdmin({ email: this.email, password: this.password, companyData: this.companyStore.info })
                    .then(data => {
                        this.$q.loading.hide();
                        if (data) {
                            this.$q.notify({
                                message: 'Tạo thành công',
                                color: 'green-6',
                                position: "bottom-right",
                                icon: 'check_circle',
                            })
                            this.$router.push('/dang-nhap')
                        } else {
                            this.$q.notify({
                                message: 'Tạo tài khoản thất bại',
                                color: 'deep-orange-6',
                                position: "bottom-right",
                                icon: 'report',
                            })
                        }
                    })
            } else {
                this.$q.notify({
                    message: 'Vui lòng kiểm tra lại thông tin',
                    color: 'deep-orange-6',
                    position: "bottom-right",
                    icon: 'report',
                })
            }
        },
        addNewImageIntro() {
            this.slide = 0
            this.addImageIntroInput.open();
        },
        showImageIntro(index) {
            this.isShowImageIntro = true;
            this.indexShowImageIntro = index;
        },
        editImageIntro(index) {
            this.indexEditImageIntro = index;
            this.editImageInput.open();
        },
        deleteImageIntro(index) {
            // console.log(index)
            this.companyStore.info.imageIntro.splice(index, 1)
            this.visibleImageIntroOptions.splice(index, 1)
            if (index % 4 == 0 && index != 0) {
                // console.log("hi")
                this.slide = this.slide - 4
            }
        },
        deleteLogo() {
            this.companyStore.info.logo = "";
        },
        showLogo() {
            this.isShowLogo = true;
        },
        openInputLogo() {
            this.logoInput.open()
        },
        showBanner() {
            this.isShowBanner = true;
        },
        openInputBanner() {
            this.bannerInput.open()
        },
        deleteBanner() {
            this.companyStore.info.bannerImage = "";
        },
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
.border {
    border-color: black;
    border-width: 1px;
}
</style>