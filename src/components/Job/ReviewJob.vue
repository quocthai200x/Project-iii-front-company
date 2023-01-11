<template >
    <div class="q-mx-lg q-my-sm row q-gutter-lg justify-between">
        <div class="col-7">
            <div class='q-mb-xl'>
                <div v-if="jobStore.form.benefits.length > 0">
                    <div class="text-h6 q-mb-xs">Các phúc lợi dành cho bạn(được liệt kê theo cài đặt của công ty)</div>
                    <div class="q-mb-xs" v-for="(item, index) in jobStore.form.benefits" :key="'benefits' + index">
                        <q-icon :name="item.svg" color="black" size="24px" class="q-mr-sm" />
                        <span class=" cursor-pointer">
                            {{ item.label }}
                            <q-tooltip :delay="100" anchor="center end" self="center left">
                            {{ item.desc }}
                        </q-tooltip>
                        </span>
                    </div>
                </div>
            </div>
            <div class='q-mb-xl'>
                <div class="text-h6 q-mb-xs">Mô tả công việc</div>
                <div>
                    <span class="text-justify" v-html="jobStore.form.desc"></span>
                </div>

            </div>
            <div class='q-mb-xl'>
                <div class="text-h6 q-mb-xs">Yêu cầu công việc</div>
                <div>
                    <span class="text-justify" v-html=" jobStore.form.requirement"></span>
                </div>

            </div>
            <div class='q-mb-xl'>
                <div class="text-h6 q-mb-xs">Nơi làm việc</div>
                <div v-for="(location, index) in jobStore.form.workingAddress" :key="'working-address-' + index">
                    <q-icon name="place" color="black" size="24px" class="q-mr-sm" />
                    <span>{{ location.address + ", " }}</span>
                    <span>{{ location.ward + ", " }} </span>
                    <span>{{ location.district + ", " }}</span>
                    <span>{{ location.province }}</span>
                </div>

            </div>
            <div class="q-mb-xl" v-if="jobStore.form.recruitmentProcess.length > 0">
                <div class="text-h6 q-mb-xs">Quy trình phỏng vấn</div>
                <div v-for="(item, indexJDre) in jobStore.form.recruitmentProcess" :key="indexJDre+'jd-re'">
                    <span>{{indexJDre + 1  + ". "}}</span>
                    <span>
                        {{ item }}
                    </span>
                </div>
            </div>
            <div class='q-mb-xl'>
                <div class="text-h6 q-mb-xs">Từ khóa</div>
                <div class="row">
                    <q-chip :label="companyStore.info.name" class='text-caption' outline square dense color="red"
                        text-color="white">
                    </q-chip>
                    <q-chip v-for="(item, index) in jobStore.form.keyword" :key="'keyword-tag-' + index" :label="item"
                        class='text-caption' outline square dense color="red" text-color="white">
                    </q-chip>
                    <q-chip v-for="(item, index) in jobStore.form.type" :key="'keyword-tag-' + index"
                        :label="item.name" class='text-caption' outline square dense color="red" text-color="white">
                    </q-chip>
                </div>
            </div>
        </div>
        <div class="col-4 ">
            <div class="info-detail-card col q-pa-md  rounded-borders	">
                <div class="row no-wrap q-my-sm">
                    <q-icon name="calendar_today" color="" size="24px" class="q-mr-sm" />
                    <div>
                        <div>
                            <span class="info-detail-card-title">Ngày tạo</span>
                        </div>
                        <div>
                            <span> {{ $moment((new Date())).format("DD-MM-YYYY") }}</span>
                        </div>
                    </div>
                </div>
                <q-separator />
                <div class="row no-wrap q-my-sm">
                    <q-icon name="work" color="" size="24px" class="q-mr-sm" />
                    <div>
                        <div>
                            <span class="info-detail-card-title">Cấp bậc</span>
                        </div>
                        <div>
                            <span> {{ jobStore.form.level.name }}</span>
                        </div>
                    </div>
                </div>
                <q-separator />
                <div class="row no-wrap q-my-sm">
                    <q-icon name="category" color="" size="24px" class="q-mr-sm" />
                    <div>
                        <div>
                            <span class="info-detail-card-title">Phân loại</span>
                        </div>
                        <div>
                            <span v-for="(item, index) in jobStore.form.type" :key="'type-' + index">
                                {{ item.name }}<span v-if="index < jobStore.form.type.length - 1">{{ ", " }}</span>
                            </span>
                        </div>
                    </div>

                </div>
                <q-separator />
                <div class="row no-wrap q-my-sm">
                    <q-icon name="manage_accounts" color="" size="24px" class="q-mr-sm" />
                    <div>
                        <div>
                            <span class="info-detail-card-title">Kỹ năng</span>
                        </div>
                        <div>
                            <span v-for="(item, index) in jobStore.form.keyword" :key="'key-' + index">
                                {{ item }}<span v-if="index < jobStore.form.keyword.length - 1">{{ ", " }}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <q-separator />
                <div class="row no-wrap q-my-sm">
                    <q-icon name="language" color="" size="24px" class="q-mr-sm" />
                    <div>
                        <div>
                            <span class="info-detail-card-title">Ngôn ngữ sử dụng</span>
                        </div>
                        <div>
                            <span v-for="(item, index) in jobStore.form.languageRecruitment" :key="'lang-' + index">
                                {{ item }}<span v-if="index < jobStore.form.languageRecruitment.length - 1">{{ ", "
                                }}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <q-separator />
            </div>
            <div class="col map q-mt-xl">
                <GMapMap v-for="(workingAdd, index) in jobStore.form.workingAddress" :key="'map-'+index" :center="{ lat: workingAdd.latitude, lng: workingAdd.longitude }" :zoom="100" map-type-id="terrain"
                    style="width: 100%; height: 400px">
                    <GMapMarker :position="{lat: workingAdd.latitude, lng: workingAdd.longitude}"  />
                </GMapMap>
            </div>
        </div>


    </div>
</template>
<script>

import {useJobStore} from "../../stores/jobStore"
import { useCompanyStore } from "../../stores/companyStore";
export default {
  
    data() {
        return {
            jobStore: useJobStore(),
            companyStore:useCompanyStore(),
        }
    },
    created(){
        console.log(this.jobStore.form.benefits)
    }
}
</script>
<style lang="">
    
</style>