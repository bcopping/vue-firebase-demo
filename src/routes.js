import Home from './components/Home.vue'
import Header from './components/Header.vue'
import { store } from './store/store';

const Stocks = resolve => {
	//webpack will recognise and require the file only if we need it
	require.ensure(['./components/stocks/Stocks.vue'], ()=>{
		resolve(require('./components/stocks/Stocks.vue'));
	});
}

const Login = resolve => {
	//webpack will recognise and require the file only if we need it
	require.ensure(['./components/logon/Login.vue'], ()=>{
		resolve(require('./components/logon/Login.vue'));
	});
}

export const routes = [
    
	{ 
        path: '', 
        name: 'home', 
        components: {
			default: Home,
			'app-header': Header
		},
        beforeEnter: (to, from, next) => {
            //if the user is logged in then go to homepage
            if (store.getters.login) {
                next();
            }
            else {
                next({path: 'logon'});
            }
        }
	},
   
    {
        path: '/stocks',
        components: {
            default: Stocks,
            'app-header': Header
        }

    },

    {
        name: 'logon',
        path: '/logon',
        components: {
            default: Login,
            'app-header': Header
        }

    }
];