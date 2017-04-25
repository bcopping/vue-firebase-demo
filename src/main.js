import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueFire from 'vuefire'
import GSignInButton from 'vue-google-signin-button'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App.vue'
import { routes } from './routes'
import { store } from './store/store';
import locale from 'element-ui/lib/locale/lang/en'
import accounting from 'accounting'
    
Vue.filter('currency', function (value, c) {
    return accounting.formatMoney(value, c);
});

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueFire);
Vue.use(GSignInButton)
Vue.use(ElementUI, { locale })

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


