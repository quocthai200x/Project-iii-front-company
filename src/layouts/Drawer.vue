<template>
  <q-layout view="hHh Lpr lff" style="min-height: 100vh">
    <q-header bordered class="bg-grey-3 q-px-md q-py-sm	">
      <q-toolbar class="row no-wrap fit ">
        <!-- <q-btn flat @click="drawer = !drawer" round dense icon="menu" /> -->
        <q-toolbar-title class="col-2">
          <router-link to="/">
            <div class="row items-center q-gutter-xs">
              <q-img width="60px" src="@/assets/images/just_logo.png"></q-img>

              <div class=" text-weight-medium">
                <span>Thaiwork</span>
              </div>
            </div>
          </router-link>
        </q-toolbar-title>
        <q-toolbar-title class="col-6 q-gutter-md row text-caption text-capitalize text-dark text-weight-bold">
          <div v-for="item, index in navigateHeader" :key="index + 'navigate-header'">
            {{ item.label }}
          </div>
        </q-toolbar-title>
        <q-toolbar-title class="col-4 row justify-end items-center text-dark text-caption q-gutter-md">
          <q-avatar class="bg-grey-1" >
            <q-img width="60px" :ratio="1" fit="contain" :src="companyStore.info.logo"></q-img>
          </q-avatar>
          <div>
            <div class="text-bold text-dark">Doanh nghiệp</div>
            <div class="text-grey-8">
              {{ companyStore.info.name }}
            </div>
          </div>
          
        </q-toolbar-title>


      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="240" :breakpoint="500" bordered @mouseover="miniState = false"
      @mouseout="miniState = true" class="bg-grey-3">
      <q-list class="q-px-lg q-py-xl">

        <template v-for="(menuItem, index) in menuList" :key="'something'+index">
          <q-item @click="navigate(menuItem.link)" clickable active-class="text-negative active-class-drawer"
            :active="link.includes(menuItem.name)" v-ripple>
            <q-item-section>
              <div class="row q-gutter-sm items-center">

                <q-icon size="1em" :name="menuItem.icon" />

                <div class="text-caption text-weight-regular"> {{ menuItem.label }}</div>
              </div>
            </q-item-section>

          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </template>

      </q-list>
    </q-drawer>



    <q-page-container>
      <q-page class="q-pa-xl bg-grey-1">

        <slot></slot>
      </q-page>
    </q-page-container>

    <q-footer class="bg-dark text-white ">
      <!-- <Footer></Footer> -->
    </q-footer>

  </q-layout>

</template>
  
<script >
// import { ref, onMounted } from 'vue'
import { useSearchStore } from "@/stores/searchStore"
import { useUserStore } from "@/stores/userStore"
import { useCompanyStore } from "../stores/companyStore"

import { logout } from "@/apis/auth"
import Footer from "./Footer.vue"

export default {
  components: {
    Footer,
  },
  data() {
    return {
      drawer: false,
      miniState: true,
      menuList: [],
      link: this.$route.name,
      searchStore: useSearchStore(),
      userStore: useUserStore(),
      companyStore: useCompanyStore(),
      navigateHeader: [
        {
          label: "Trang chủ",
        },
        {
          label: "Tìm việc",
        },
        {
          label: "Doanh nghiệp",
        },
        {
          label: "Ứng viên",
        },
      ]
    }
  },
  watch: {
    "$route.name"(newValue, oldValue) {
      // console.log(newValue);
      this.link = newValue;
    },


  },
  created() {
    this.setDrawer()

  },
  methods: {
 
    navigate(link) {

      if (link == 'logout') {
        // logout().then(data => {
        //   if (data) {
        localStorage.removeItem("session")
        this.userStore.$reset();
        // }
        // })
      } else {

        this.$router.push(link)
      }
      // console.log("navigate")
    },
    setDrawer() {
      this.menuList = [
        {
          icon: `space_dashboard`,
          label: 'Tổng quan',
          separator: false,
          link: "/",
          name: "Dashboard"
        },
        {
          icon: `person`,
          label: 'Hồ sơ doanh nghiệp',
          separator: false,
          link: "/company/profile",
          name: "Company Profile"
        },
        {
          icon: `send`,
          label: 'Tạo công việc',
          separator: false,
          link: "/job/new",
          name: "Job Create"
        },
        {
          icon: `work`,
          label: 'Quản lí công việc',
          separator: false,
          link: "/job/management/show",
          name: "Job Management"
        },
        {
          icon: `folder_shared`,
          label: 'Quản lí hồ sơ',
          separator: false,
          link: "/application/management",
          name: "Application Management"
        },
      ]

    }
  }
}
// // const drawer = ref(false);
// // const miniState = ref(true);
// // const menuList = ref([]);
// // const link = ref()
// // console.log(link)

// // const navigate = () => {
// //   console.log("navigate")
// // }

// onMounted(() => {
//     menuList.value =
// })

</script>

<style lang="scss" scoped>
.active-class-drawer {
  background: $negative-opacity-20;
  background-color: 0.2;
  border-radius: 0.5em;

};

</style>