<template lang="">
    <div>{{message}}</div>
    
    <div>
        <input v-model="email">
        <input v-model="password">
        <button @click="_login_">Login</button>
        <button @click="_getMe_">Get ME</button>
        <button @click="_getAllEmailCompany_">get all email</button>
        <button @click="_create10kCompany_">Create 10k company</button>
        <button @click="_createJobWith10KCompany_">Create Job Now</button>
        <button @click="_getAllSKills">Get All Skills</button>

    </div>
</template>
<script>
import { login, getMe, registerAdmin } from "@/apis/auth"
import { getAllEmailCompany } from "@/apis/user"
import { createJob } from "@/apis/job"
import { getAllSkills } from "@/apis/test"


import { faker } from '@faker-js/faker';
import { jobDictionary } from "@/assets/dictionary/job"
export default {
    data() {
        return {
            email: "",
            password: "",
            message: "",
            emails: []
        }
    },
    methods: {
        _getAllSKills(){
            getAllSkills().then(data=>console.log(data))
        },
        _getAllEmailCompany_() {
            getAllEmailCompany().then(data => {
                this.emails = data
                this.emails.forEach(email=>{
                    console.log(email.email)
                })
            })
            // this._createJobs_();
        },
        _createJobWith10KCompany_() {
            for (let i = 0; i < this.emails.length; i++) {
                login({ email: this.emails[i].email, password: "123456" }).then(data => {
                // console.log(data);
                let random = Math.floor(Math.random() * 3) + 3;
                for (let index = 0; index < random; index++) {
                    let level = this._randomProperty(jobDictionary.level)
                    const provinces = ["Thành phố Hà Nội", "Tỉnh Hà Giang", "Tỉnh Cao Bằng", "Tỉnh Bắc Kạn", 'Tỉnh Điện Biên'];
                    const districts = ['Quận Ba Đình', 'Quận Long Biên', 'Quận Tây Hồ', 'Quận Hoàn Kiếm', 'Quận Hai Bà Trưng'];
                    const wards = ['Phường Bách Khoa', 'Phường Phúc Xá', 'Phường Trúc Bạch', 'Phường Vĩnh Phúc', "Phường Bách Khoa"]
                    const random2 = Math.floor(Math.random() * provinces.length);
                    const salaryRate = this._randomSalaryRate();
                    const randomKeyword = this._randomKeyword();
                    let jobData = {
                        name: faker.name.jobTitle(),
                        level: level,
                        type: this._randomArrayWorkingArea(),
                        workingAddress: {
                            address: "Số 15 ngõ 84 phố Võ Thị Sáu",
                            district: districts[random2],
                            ward: wards[random2],
                            province: provinces[random2],
                            latitude: faker.address.latitude(),
                            longitude: faker.address.longitude(),
                        },
                        desc: faker.lorem.words(200),
                        requirement: faker.lorem.words(200),
                        salaryRate: salaryRate,
                        keyword: randomKeyword,
                        languageRecruitment: ["Tiếng Việt", "Tiếng Anh"],
                        emailReceive: [],
                        outdate: faker.date.between('2022-11-29T00:00:00.000Z', '2023-01-06T00:00:00.000Z')


                    }
                    createJob(jobData).then(res => this.message = email + " ---- "+res.info.name)

                }

            })
                
            }
            
        },
        
        _randomProperty(obj) {
            let keys = Object.keys(obj);
            return obj[keys[keys.length * Math.random() << 0]];
        },
        _randomSalaryRate() {
            let random = Math.floor(Math.random() * 2000);
            let random2 = Math.floor(Math.random() * 4000);
            let salaryRate = {
                isVisible: Math.random() < 0.5,
                from: random,
                to: random2 + random
            };
            return salaryRate;

        },
        _login_() {
            login({ email: this.email, password: this.password }).then(data => {
                // console.log(data)
            })
        },
        _getMe_() {
            getMe().then(data => {
                console.log(data)
            })
        },
        _create10kCompany_() {
            // this.message = "start";
            let range = 10000
            for (let index = 0; index < range; index++) {
                this._createCompany_();
            }
        },
        _createCompany_() {
            const provinces = ["Thành phố Hà Nội", "Tỉnh Hà Giang", "Tỉnh Cao Bằng", "Tỉnh Bắc Kạn", 'Tỉnh Điện Biên'];
            const districts = ['Quận Ba Đình', 'Quận Long Biên', 'Quận Tây Hồ', 'Quận Hoàn Kiếm', 'Quận Hai Bà Trưng'];
            const wards = ['Phường Bách Khoa', 'Phường Phúc Xá', 'Phường Trúc Bạch', 'Phường Vĩnh Phúc', "Phường Bách Khoa"]
            const random = Math.floor(Math.random() * provinces.length);
            const random2 = Math.floor(Math.random() * provinces.length);


            const sizes = [100, 500, 1000, 10000]
            // console.log("1k nao")
            let benefits = this._randomBenefits({ randomNumber: random2 })
            let email = faker.internet.email();
            let companyData = {
                name: faker.company.name(),
                phone: faker.phone.number('+84 91 ### ## ##'),
                location: [
                    {
                        address: "Số 12 Tạ Quang Bửu",
                        district: districts[random],
                        ward: wards[random],
                        province: provinces[random],
                        latitude: faker.address.latitude(),
                        longitude: faker.address.longitude(),
                        isHeadquarter: true
                    },
                    {
                        address: "Số 12 Tạ Quang Bửu",
                        district: districts[random2],
                        ward: wards[random2],
                        province: provinces[random2],
                        latitude: faker.address.latitude(),
                        longitude: faker.address.longitude(),
                        isHeadquarter: false
                    }
                ],
                size: sizes[random],
                workingArea: this._randomArrayWorkingArea({ randomNumber: random }),
                benefits: benefits,
                desc: faker.lorem.words(200),
                logo: faker.image.imageUrl(320, 240, 'logo,company', true),
                video: 'https://www.youtube.com/watch?v=7tz4Ya6gzG4',
                imageIntro: this._randomImageIntro(),

            }
            let password = "123456"
            registerAdmin({ email, password, companyData }).then(data => {
                // this.message = Number(this.message) + 1;
                // this.email = email
            })

        },
        _randomArrayWorkingArea() {
            let randomSize = Math.floor(Math.random() * 4) + 2;
            let array = [];
            for (let index = 0; index < randomSize; index++) {
                const randomJobField = Math.floor(Math.random() * jobDictionary.type.length);
                const randomJobName = Math.floor(Math.random() * jobDictionary.type[randomJobField].workings.length);
                const getJobField = jobDictionary.type[randomJobField].field;
                const getJobName = jobDictionary.type[randomJobField].workings[randomJobName];
                array.push({
                    field: getJobField,
                    name: getJobName,
                })
            }
            return array
        },



        _randomBenefits({ randomNumber }) {
            let array = [];
            const benefits = ["Gym", "Coffee", "Bể bơi", "Bữa chiều", "Du lịch"]
            for (let index = 0; index < randomNumber; index++) {
                array.push(benefits[index])
            }
            return array
        },
        _randomImageIntro() {
            let array = [];
            for (let index = 0; index < 5; index++) {
                array.push(faker.image.imageUrl(1280, 720, 'life,company', true))
            }
            return array;
        },
        _randomKeyword() {
            let array = [];
            let randomSize = Math.floor(Math.random() * 6) + 4;
            for (let index = 0; index < randomSize; index++) {
                array.push(faker.name.jobArea());
            }
            return array;
        },
    },
}
</script>
<style lang="">
    
</style>