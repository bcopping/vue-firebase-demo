import Home from './components/Home.vue'
import Header from './components/Header.vue'
import { store } from './store/store';

const Expenses = resolve => {
	//webpack will recognise and require the file only if we need it
	require.ensure(['./components/Expenses.vue'], ()=>{
		resolve(require('./components/Expenses.vue'));
	});
}

const Wages = resolve => {
	require.ensure(['./components/Wages.vue'], ()=>{
		resolve(require('./components/Wages.vue'));
	});
}

const Dividends = resolve => {
	require.ensure(['./components/Dividends.vue'], ()=>{
		resolve(require('./components/Dividends.vue'));
	});
}

const Invoices = resolve => {
	require.ensure(['./components/Invoices.vue'], ()=>{
		resolve(require('./components/Invoices.vue'));
	});
}

const Login = resolve => {
	require.ensure(['./components/logon/Login.vue'], ()=>{
		resolve(require('./components/logon/Login.vue'));
	});
}

const Company = resolve => {
	require.ensure(['./components/Company.vue'], ()=>{
		resolve(require('./components/Company.vue'));
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
        name: 'expenses',
        path: '/expenses',
        components: {
            default: Expenses,
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
        name: 'wages',
        path: '/wages',
        components: {
            default: Wages,
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
        name: 'invoices',
        path: '/invoices',
        components: {
            default: Invoices,
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
        name: 'dividends',
        path: '/dividends',
        components: {
            default: Dividends,
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
        name: 'company',
        path: '/company',
        components: {
            default: Company,
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
        name: 'logon',
        path: '/logon',
        components: {
            default: Login,
            'app-header': Header
        }

    }
];