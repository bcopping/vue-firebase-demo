import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

import VueFire from 'vuefire'
import GSignInButton from 'vue-google-signin-button'

import { DatePicker, Table, TableColumn, Dialog, Button, Tooltip, Notification} from 'element-ui'

import { routes } from './routes'
import { store } from './store/store';

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

import accounting from 'accounting'

import {ServerTable, ClientTable, Event} from 'vue-tables-2';

Vue.filter('currency', function (value, c) {
    return accounting.formatMoney(value, c);
});



Vue.use(VueRouter);

Vue.use(VueFire);
Vue.use(GSignInButton)
Vue.use(Table)
Vue.use(DatePicker)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Tooltip)
Vue.use(ClientTable, {}, false)
Vue.prototype.$notify = Notification

locale.use(lang)

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


