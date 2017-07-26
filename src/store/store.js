import Vue from 'vue';
import Vuex from 'vuex';

import login from './modules/login'
import expenses from './modules/expenses'
import wages from './modules/wages'
import dividends from './modules/dividends'
import invoices from './modules/invoices'
import people from './modules/people'
import companyInformation from './modules/companyInformation'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
    },
    modules: {
        login,
        expenses,
        wages,
        dividends,
        invoices,
        people,
        companyInformation
    }
});
