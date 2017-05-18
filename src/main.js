import Vue from 'vue'
import VueRouter from 'vue-router'

import VueFire from 'vuefire'
import GSignInButton from 'vue-google-signin-button'

import { DatePicker, Table, TableColumn, Dialog, Button, Tooltip} from 'element-ui'


import App from './App.vue'
import { routes } from './routes'
import { store } from './store/store';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import accounting from 'accounting'
    
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
locale.use(lang)

const router = new VueRouter({
	routes,
  mode: 'history',
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})


