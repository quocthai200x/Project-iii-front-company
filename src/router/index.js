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
      path: '/dang-ki',
      name: "Sign Up",
      component: () => import('../views/Auth/SignUp.vue')
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
    {
        path: '/job/management',
        name: "Job Management",
        component: () => import('../views/Job/JobManagement/Layout.vue'),
        children:[
          {
            path: "show",
            name: "Job Management Show",
            component: ()=> import("../views/Job/JobManagement/Show.vue")
          },
          {
            path: "hidden",
            name: "Job Management Hidden",
            component: ()=> import("../views/Job/JobManagement/Hidden.vue")
          },
          {
            path: "expire",
            name: "Job Management Expire",
            component: ()=> import("../views/Job/JobManagement/Expire.vue")
          },
          {
            path: "draft",
            name: "Job Management Draft",
            component: ()=> import("../views/Job/JobManagement/Draft.vue")
          },
        ]
    },
    {
      path: "/application/management",
      name: "Application Management",
      component: () => import("../views/Application/ApplicationManagement/ApplicationManagement.vue"),
    },
    {
      path: "/application/detail",
      name: "Application Management - Detail",
      component: () => import("../views/Application/ApplicationManagement/ApplicationDetails.vue"),
    },
    {
      path: "/role/management",
      name: "Role Management",
      component: () => import("../views/Role/RoleManagement.vue"),
    },
    {
      path: "/employee/management",
      name: "Employee Management",
      component: () => import("../views/Employee/EmployeeManagement.vue"),
    },
    {
      path: "/candidate/detail",
      name: "Candidate Detail",
      component: () => import("../views/Candidate/CandidateProfile.vue"),
    },
    {
      path: "/candidate/search",
      name: "Candidate Search",
      component: () => import("../views/Candidate/SearchCandidate.vue"),
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