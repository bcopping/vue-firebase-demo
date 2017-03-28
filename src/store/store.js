import Vue from 'vue';
import Vuex from 'vuex';

import stocks from './modules/stocks'
import login from './modules/login'
import expenses from './modules/expenses'

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
        stocks,
        login,
        expenses
    }
});