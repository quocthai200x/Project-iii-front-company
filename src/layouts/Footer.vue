<template >
    <div class=" p-container q-py-lg ">
        <div class="row justify-between">
            <div class="col q-gutter-xs">
                <div class="text-h6 text-bold">Thai-networking</div>
                <div v-for="(aboutUs, index) in dataAboutUs" :key="index + 'about-us'">
                    <div>
                        <span>
                            <a :href="aboutUs.link" class="hover">
                                {{ aboutUs.label }}
                            </a>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col q-gutter-xs">
                <div class="text-h6 text-bold">Dành cho nhà tuyển dụng</div>
                <div v-for="(employer, index) in dataEmployer" :key="index + 'employer'">
                    <div>
                        <span>
                            <a :href="employer.link" class="hover">

                                {{ employer.label }}
                            </a>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col q-gutter-xs">
                <div class="text-h6 text-bold">Việc làm theo khu vực</div>
                <div v-for="(area, index) in dataJobByArea" :key="index + 'area-job'">
                    <div>
                        <span>
                            <a :href="area.link" class="hover">
                                {{ area.label }}
                            </a>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col q-gutter-xs">
                <div class="text-h6 text-bold">Việc làm theo lĩnh vực</div>
                <div v-for="(type, index) in dataJobByType" :key="index + 'type-job'">
                    <div>
                        <span>
                            <a :href="type.link" class="hover">
                                {{ type.label }}
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center text-grey-6">
            <div>
                <span>
                    Copyright © Công Ty Thai Pate Vietnam
                </span>
            </div>
            <div>
                <span>
                    Tòa 15, phố Võ Thị Sáu, Quận Hai Bà Trưng, Thành phố Hà Nội
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dataAboutUs: [
                {
                    label: "Về Thai-networking",
                    link: "https://www.youtube.com/",
                },
                {
                    label: "Liên Hệ",
                    link: "https://www.youtube.com/",
                }, {
                    label: "Hỏi Đáp",
                    link: "https://www.youtube.com/",
                }, {
                    label: "Thỏa Thuận Sử Dụng",
                    link: "https://www.youtube.com/",
                }, {
                    label: "Quy Chế Bảo Mật",
                    link: "https://www.youtube.com/",
                },
                {
                    label: "Quy Chế Hoạt Động Sàn Giao Dịch Thương Mại Điện Tử Thai-networking",
                    link: "https://www.youtube.com/",
                },
            ],
            dataEmployer: [
                {
                    label: "Đăng tuyển dụng",
                    link: "https://www.youtube.com/",
                },
                {
                    label: "Tìm kiếm hồ sơ",
                    link: "https://www.youtube.com/",
                },
                {
                    label: "Liên hệ",
                    link: "https://www.youtube.com/",
                },
            ],
            dataJobByArea: [
                {
                    label: "Hà Nội",
                    link: "/viec-lam?q=--tai--Thành%20phố%20Hà%20Nội"
                },
                {
                    label: "Hồ Chí Minh",
                    link: "/viec-lam?q=--tai--Thành%20phố%20Hồ%20Chí%20Min"
                },
                {
                    label: "Hải Phòng",
                    link: "/viec-lam?q=--tai--Thành%20phố%20Hải%20Phòng"
                },
                {
                    label: "Đà Nẵng",
                    link: "/viec-lam?q=--tai--Thành%20phố%20Cần%20Thơ"
                },
            ],
            dataJobByType: [
                {
                    label: "Kế toán",
                    link: "/viec-lam?q=--nganh--Kế%20toán"
                },
                {
                    label: "Ngân hàng",
                    link: "/viec-lam?q=--nganh--Ngân%20hàng"
                },
                {
                    label: "IT - Phần mềm",
                    link: "/viec-lam?q=--nganh--IT%20-%20Phần%20mềm"
                },
                {
                    label: "IT - Phần cứng/ mạng",
                    link: "/viec-lam?q=--nganh--IT%20-%20Phần%20cứng/Mạng"
                },
            ]
        }
    }
}
</script>
<style lang="scss">
.hover {
    color: rgb(201, 201, 201);
    font-weight: 300;
}

.hover:hover {
    color: $warning;
    transition: 200ms all;
}
</style>