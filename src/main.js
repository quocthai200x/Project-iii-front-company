import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { Quasar, Notify ,Loading} from 'quasar'
import moment from 'moment';
// import VueMoment from 'vue-moment';
import VueGoogleMaps from '@fawmi/vue-google-maps'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import { createPinia } from "pinia";
// Import Quasar css
import 'quasar/src/css/index.sass'
import router from "./router"
import langVi from 'quasar/lang/vi'




const myApp = createApp(App)

moment.updateLocale('en', {
    relativeTime : {
        future: "trong %s giây",
        past:   "%s trước",
        s: function (number, withoutSuffix, key, isFuture){
            return '00:' + (number<10 ? '0':'') + number + ' phút';
        },
        m:  "01:00 phút",
        mm: function (number, withoutSuffix, key, isFuture){
            return (number<10 ? '0':'') + number + ':00' + ' phút';
        },
        h:  "1 giờ",
        hh: "%d giờ",
        d:  "1 ngày",
        dd: "%d ngày",
        M:  "1 tháng",
        MM: "%d tháng",
        y:  "1 năm",
        yy: "%d năm"
    }
});


myApp.config.globalProperties.$moment = moment
myApp.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyB_eracX0VilCOz4eal9dXM2qzJ3TKw-X4',
        // language: 'de',
    }},)
// myApp.use(VueMoment, { moment });
myApp.use(createPinia());
myApp.use(Quasar,{
    plugins: {Notify, Loading},
    lang: langVi
})
myApp.use(router)
myApp.mount('#app')
