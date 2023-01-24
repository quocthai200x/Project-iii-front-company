<template >
    <q-card style="height: 80vh" class="scroll ">
        <q-card-section>
            <div class="row">
                <div class="col-2">
                    <q-avatar rounded size="90px">
                        <img :src="candidateDetail.avatar" />
                    </q-avatar>
                </div>
                <div class="col-10 q-pl-md ">
                    <div class="text-bold text-h6 ">
                        {{ candidateDetail.name }}
                    </div>
                    <div class="q-mb-md">
                        {{ candidateDetail.positionPresent ? candidateDetail.positionPresent : "Chưa có chức danh" }}
                    </div>

                    <div class="row items-center q-mb-xs">
                        <div class="q-gutter-xs row items-center">
                            <q-icon name="smartphone" size="16px"></q-icon>
                            <span>
                                {{ candidateDetail.phone ? candidateDetail.phone : "xxx-xxx-xxxx" }}
                            </span>
                        </div>
                        <div class="q-gutter-xs row items-center q-ml-md">
                            <q-icon name="cake" size="16px"></q-icon>
                            <span>
                                {{ $moment(candidateDetail.dob).format("DD-MM-YYYY") }}
                            </span>
                        </div>
                    </div>
                    <div class="q-gutter-sm row items-center">
                        <q-icon name="home" size="16px"></q-icon>
                        <span v-if="candidateDetail.country == 'Việt Nam'">
                            <span v-if="candidateDetail.address">
                                {{
                                    candidateDetail.address + ", " + candidateDetail.ward + ", " +
                                        candidateDetail.district + ", " + candidateDetail.city
                                }}
                            </span>
                        </span>
                        <span v-else>
                            Quốc tế
                        </span>
                    </div>
                    <div class="q-gutter-sm row items-center">

                    </div>
                </div>
            </div>
        </q-card-section>
        <q-card-section class="q-mb-md">
            <div class="text-h6">Mô tả bản thân</div>
            <q-separator></q-separator>
            <div>
                {{ candidateDetail.desc }}
            </div>
        </q-card-section>
        <q-card-section class="q-mb-md">
            <div class="text-h6">Lĩnh vực liên quan</div>
            <q-separator></q-separator>
            <div v-if="candidateDetail.typeWorking.length != 0">
                <q-chip v-for="(item, index) in candidateDetail.typeWorking" :key="index" :label="item.name"></q-chip>
            </div>
            <div v-else>
                Chưa cập nhật
            </div>
        </q-card-section>
        <q-card-section class="q-mb-md">
            <div class="text-h6">Kĩ năng đang có</div>
            <q-separator></q-separator>
            <div v-if="candidateDetail.skills.length != 0">
                <q-chip v-for="(item, index) in candidateDetail.skills" :key="index" :label="item"></q-chip>
            </div>
            <div v-else>
                Chưa cập nhật
            </div>
        </q-card-section>
        <q-card-section class="q-mb-md">
            <div class="text-h6">Kinh nghiệm làm việc</div>
            <q-separator></q-separator>
            <div v-if="candidateDetail.experiences.length != 0">
                <div v-for="(item, index) in candidateDetail.experiences" :key="index" class="q-my-sm">
                    <div class="text-bold">
                        <div class="">
                            <span>
                                {{ item.position }}
                            </span>
                            <span> - </span>
                            <span>
                                {{ item.company }}
                            </span>
                        </div>
                        <div>
                            <span>{{ $moment(item.from).format("MM/YYYY") }}</span>
                            <span> - </span>
                            <span>{{ $moment(item.to).format("MM/YYYY") }}</span>
                        </div>
                    </div>
                    <div>
                        {{ item.desc }}
                    </div>
                </div>
            </div>
            <div v-else>
                Chưa cập nhật
            </div>
        </q-card-section>
        <q-card-section class="q-mb-md">
            <div class="text-h6">Học vấn</div>
            <q-separator></q-separator>
            <div v-if="candidateDetail.education.length != 0">
                <div v-for="(item, index) in candidateDetail.education" :key="index" class="q-my-sm">
                    <div class="text-bold">
                        <div class="">
                            <span>
                                {{ item.certificate }}
                            </span>
                            <span> - </span>

                            <span>
                                {{ item.major }}
                            </span>
                            <span> - </span>
                            <span>
                                {{ item.college }}
                            </span>
                        </div>
                        <div>
                            <span>{{ $moment(item.from).format("MM/YYYY") }}</span>
                            <span> - </span>
                            <span>{{ $moment(item.to).format("MM/YYYY") }}</span>
                        </div>
                    </div>
                    <div>
                        {{ item.desc }}
                    </div>
                </div>
            </div>
            <div v-else>
                Chưa cập nhật
            </div>
        </q-card-section>
        <q-card-section class="q-mb-md">
            <div class="text-h6">Ngoại ngữ</div>
            <q-separator></q-separator>
            <div v-if="candidateDetail.foreignLanguage.length != 0">
                <div v-for="(item, index) in candidateDetail.foreignLanguage" :key="index" class="q-my-sm">
                    <div class="text-bold">
                        <div class="">
                            <span>
                                {{ item.name }}
                            </span>
                            <span> - </span>

                            <span>
                                {{ item.level }}
                            </span>

                        </div>

                    </div>

                </div>
            </div>
            <div v-else>
                Chưa cập nhật
            </div>
        </q-card-section>

       
    </q-card>
</template>
<script>
export default {
    props: {
        candidateDetail: Object
    },
    created() {
        console.log(this.candidateDetail)
    }
}
</script>
<style lang="scss">
.hover-text:hover {
    color: $deep-orange;
    transition: ease-in-out 200ms;
}
</style>