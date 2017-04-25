import Vue from 'vue';
import Vuex from 'vuex';

import login from './modules/login'
import expenses from './modules/expenses'
import wages from './modules/wages'
import dividends from './modules/dividends'
import invoices from './modules/invoices'
import people from './modules/people'
import companyInformation from './modules/companyInformation'

import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
    },
    actions,
    getters,
    mutations,
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