import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import {routes} from './config/routes'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Notifications from 'vue-notification'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Notifications);

const router = new VueRouter({routes});

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
