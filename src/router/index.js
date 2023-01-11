import * as VueRouter from "vue-router"



const routes = [
    {
        path: '/',
        name: "Dashboard",
        component: () => import('../views/DashBoard/Dashboard.vue')
    },
    {
        path: '/dang-nhap',
        name: "Sign In",
        component: () => import('../views/Auth/SignIn.vue')
    },
    {
        path: '/company/profile',
        name: "Company Profile",
        component: () => import('../views/Company/CompanyProfile.vue')
    },
    {
        path: '/job/new',
        name: "Job Create",
        component: () => import('../views/Job/JobCreatePage.vue')
    },
   

]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
    scrollBehavior(to, from, savedPosition) {
        // console.log(to, from);
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})





export default router