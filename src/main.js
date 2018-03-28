import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

import VueFire from 'vuefire'
import GSignInButton from 'vue-google-signin-button'



import { routes } from './routes'
import { store } from './store/store';
import accounting from 'accounting'
import {ServerTable, ClientTable, Event} from 'vue-tables-2';

Vue.filter('currency', function (value, c) {
    return accounting.formatMoney(value, c);
});

Vue.use(VueRouter);
Vue.use(VueFire);
Vue.use(GSignInButton)

Vue.use(ClientTable, {sortIcon: { base:'fa', up:'fa-sort-up', down:'fa-sort-down' }}, false)


const router = new VueRouter({
    routes,
    mode: 'history',
});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})


