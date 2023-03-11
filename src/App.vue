<template>
  <div id="app">
    <component v-if="canLoadComponent" :is="layout">
      <router-view v-model:layout="layout" />
    </component>
    <div v-else class="q-gutter-md row justify-center items-center window-height	window-width	">
      <q-spinner-cube color="negative" size="8em" />

    </div>
  </div>
</template>

<script>
import { getMe } from "./apis/auth"
import { getAllApplicationIn_User } from "./apis/application"
import { roleDictionary } from "./assets/dictionary/role"
import { useUserStore } from "./stores/userStore"
import { useRoleStore } from "./stores/roleStore"
import { useCompanyStore } from "./stores/companyStore"
import { useJobStore } from "./stores/jobStore"

export default {
  name: "App",
  data() {
    return {
      canLoadComponent: false,
      layout: 'div', 
      userStore: useUserStore(), 
      companyStore: useCompanyStore(), 
      roleStore: useRoleStore(),
      jobStore: useJobStore(),
      listNotCheck: ["/dang-ki",'/dang-nhap'],
      
    }
  },
  async created() {
    setTimeout(()=>{console.log(this.$route)},0)
    // console.log(this.$route)
    if(this.listNotCheck.includes(this.$route.path)){
      this.canLoadComponent = true
    }else{
      await this.checkUserExisted();
    }
  },

  methods: {
    async checkUserExisted() {
      const data = await getMe()
     
      if (data) {

        let { email, _id, info, activity, roleNumber, createdAt, updatedAt, } = data.user;
        if (data && (roleDictionary.isAdmin(roleNumber) || roleDictionary.isEmployee(roleNumber))) {
          this.userStore.setState({ email, _id, info, activity, roleNumber, createdAt, updatedAt })
          this.companyStore.setState(data.user.companyId);
          this.jobStore.form.benefits = data.user.companyId.info.benefits;
          if (roleDictionary.isAdmin(roleNumber)) {
            this.roleStore.setAdminRole()
          } else if (roleDictionary.isEmployee(roleNumber)) {
            this.roleStore.setState(data.user.roleId);
          }

        } else {
          this.$router.push("/dang-nhap")
        }
      } else {
        this.$router.push("/dang-nhap")

      }
      this.canLoadComponent = true
    }

  }
} 
</script>
<style lang="scss">
#app{
  background: white;
}
</style>
  