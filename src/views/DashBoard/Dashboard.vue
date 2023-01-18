<template >
    <div class="row ">
        <div class="col-6">
            <q-card flat>
                <div class="text-bold q-pa-md text-subtitle2">Trạng thái tin đăng </div>
                <q-card-section>
                    <q-list class="row" flat>
                        <q-item v-for="(value, key, index) in countJobByStatus" :key="key"
                            class="q-ma-none q-pa-none col-4">
                            <router-link :to="value.link" class="fit">
                                <q-item-section style="borderRadius: 8px" class="q-ma-xs rounded-border"
                                    :style="{ backgroundColor: color(index) }">
                                    <div class="q-pa-md">

                                        <q-animate :animation="{ type: 'bounceIn' }" class="display-4 text-bold text-h6"
                                            :color="color(index)">
                                            {{ value.value }}
                                        </q-animate>
                                        <p class="caption">{{ value.name }}</p>
                                    </div>
                                </q-item-section>
                            </router-link>
                        </q-item>
                    </q-list>
                </q-card-section>
            </q-card>
        </div>
        <div class="col-6 ">
            <div class="q-ml-sm fit ">
                <q-card v-if="suggestCandidateFound.total > 0" flat >
                    <div class="row justify-between  q-pa-md">
                        <div class="text-bold text-subtitle2">Ứng viên cập nhật </div>
                        <div class="text-negative">{{ (slide.valueOf()+1).toString().concat("/").concat(suggestCandidateFound.total.toString()) }}</div>
                    </div>
                    <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable
                        animated infinite :autoplay="autoplay" control-color="dark" padding arrows class="bg-none "
                        height="250px"
                        >
                        <q-carousel-slide v-for="(candidate, index) in suggestCandidateFound.data" :name="index"
                            :key="'candidate-' + index" class="">
                            <div class="row">
                                <div class="col-4">
                                    <div class="q-pa-md">

                                        <q-avatar v-if="candidate.info.avatar" class="fit">
                                            <q-img width="100%" :ratio="1" :src="candidate.info.avatar" />
                                        </q-avatar>
                                        <q-avatar v-else class="fit">
                                            <q-img width="100%" :ratio="1" src="@/assets/images/avatar-default.jpg" />
                                        </q-avatar>
                                    </div>
                                </div>
                                <div class="col-8">
                                    <div class="q-pa-md">
                                        <div class="row">
                                            <div class="q-mr-xs">Tên: </div>
                                            <div class="text-weight-bold text-uppercase	">{{ candidate.info.name }}</div>
                                        </div>
                                        <div class="row">
                                            <div class="q-mr-xs">Vị trí: </div>
                                            <div v-if="candidate.info.positionPresent" class=" text-uppercase	">{{ candidate.info.positionPresent }}</div>
                                            <div v-else  class=" text-capitalize	">Chưa cập nhật</div>
                                        </div>
                                        <div class="row">
                                            <div class="q-mr-xs">Kinh nghiệm: </div>
                                            <div v-if="candidate.info.yearExperienced>0" class="	">{{ candidate.info.yearExperienced.toString().concat(" năm") }}</div>
                                            <div v-else  class=" text-capitalize	">Chưa cập nhật</div>
                                        </div>
                                        <div class="row">
                                            <div class="q-mr-xs">Địa điểm: </div>
                                            <div v-if="candidate.info.city" class="text-capitalize	">{{ candidate.info.city}}</div>
                                            <div v-else  class=" text-capitalize	">Chưa cập nhật</div>
                                        </div>
                                        <div class="row">
                                            <div class="q-mr-xs">Lương: </div>
                                            <div  v-if="candidate.info.salaryTarget>0" class="text-capitalize	">{{ candidate.info.salaryTarget.toString().concat("$")}}</div>
                                            <div v-else  class="text-capitalize	">Chưa cập nhật</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </q-carousel-slide>

                    </q-carousel>

                </q-card>
                <q-card v-else flat class="fit ">
                    <div class="text-bold  q-pa-md text-subtitle2">Ứng viên cập nhật </div>
                    <div class="q-pa-md q-gutter-sm text-center ">
                        <div>
                            <q-icon name="search" color="grey-6" size="4.4em" />
                        </div>
                        <div class="text-grey-4">
                            <i>
                                Hiện không có gợi ý nào phù hợp
                            </i>
                        </div>
                        </div>
                 
                </q-card>
            </div>
        </div>
    </div>
</template>
<script>

import DrawerVue from '../../layouts/Drawer.vue'
import { getCountJobByStatus } from "../../apis/job"
import { suggestCandidate } from "../../apis/search"
import { ref } from 'vue'

export default {
    data() {
        return {
            countJobByStatus: {
                draft: {
                    value: 0,
                    name: "Nháp",
                    link: "/job/management/draft"
                },
                expiredIn7days: {
                    value: 0,
                    name: "Hết hạn trong 7 ngày",
                    link: "/job/management/expire"

                },
                hidden: {
                    value: 0,
                    name: "Ẩn",
                    link: "/job/management/hidden"

                },
                show: {
                    value: 0,
                    name: "Đang hiển thị",
                    link: "/job/management/show"

                },
            },
            suggestCandidateFound: {
                data: [],
                total: 0,
            },
            slide: ref(0),
            autoplay: ref(true),


        }
    },
    async created() {
        this.$emit("update:layout", DrawerVue)
        const init = await this.init();
        console.log("Hello xong created")

    },
    methods: {
        async init() {
            let getCounts = await getCountJobByStatus()
            this.suggestCandidateFound = await suggestCandidate();
            // console.log(this.suggestCandidateFound)
            this.countJobByStatus.draft.value = getCounts.draft;
            this.countJobByStatus.expiredIn7days.value = getCounts.expiredIn7days;
            this.countJobByStatus.show.value = getCounts.show;
            this.countJobByStatus.hidden.value = getCounts.draft;

            // console.log(countJobByStatus)
        },
        color(index) {
            // Assign a color from the colors array to each property in the object
            const colors = [
                'rgba(255, 0, 0, 0.2)',
                'rgba(0, 255, 0, 0.2)',
                'rgba(0, 0, 255, 0.2)',
                'rgba(255, 255, 0, 0.2)',
                'rgba(255, 0, 255, 0.2)',
                'rgba(0, 255, 255, 0.2)'
            ];
            return colors[index % colors.length];
        }
    },
    computed: {

    }
}
</script>
<style lang="scss">

</style>