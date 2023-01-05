import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { Quasar, Notify } from 'quasar'
import moment from 'moment';
// import VueMoment from 'vue-moment';
import VueGoogleMaps from '@fawmi/vue-google-maps'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import { createPinia } from "pinia";
// Import Quasar css
import 'quasar/src/css/index.sass'
import router from "./router"




const myApp = createApp(App)
myApp.config.globalProperties.$moment = moment
myApp.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyB_eracX0VilCOz4eal9dXM2qzJ3TKw-X4',
        // language: 'de',
    }},)
// myApp.use(VueMoment, { moment });
myApp.use(createPinia());
myApp.use(Quasar,{plugins: {Notify}})
myApp.use(router)
myApp.mount('#app')
