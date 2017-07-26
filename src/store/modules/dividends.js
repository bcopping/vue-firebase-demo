

import filter from 'lodash/filter'
import uniq from 'lodash/uniq'

import * as firebase from 'firebase/app';

const state = {
    dividends: [],
    dividendsFiltered: [],
    dividendNames: [],
    dividendsFilterActive: false,
    dividendsTradingYear: [],
    dividendsTradingYearActive: false,
    dividendsViewingTradingYear: '',


};

const mutations = {

    'SET_DIVIDENDS' (state, payload) {
        state.dividends = payload;
    },
    'FILTER_DIVIDEND_NAME'(state, payload){

        if(state.dividendsTradingYearActive == true){
            state.dividendsFiltered = filter(state.dividendsTradingYear, {name: payload});
        }
        else {
            state.dividendsFiltered = filter(state.dividends, {name: payload});
        }

        state.dividendsFilterActive = true;


    },
    'FILTER_DIVIDEND_TRADING_YEAR'(state, payload){
        state.dividendsTradingYear = filter(state.dividends, {tradingYear: Number(payload)});
        state.dividendsTradingYearActive = true;
        state.dividendsViewingTradingYear = payload;
    },
    'REMOVE_FILTER_DIVIDENDS'(state){
        state.dividendsFiltered = [];
        state.dividendsFilterActive = false;
    },
    'SHOW_ALL_INVOICES'(state){
        state.dividendsTradingYearActive = false;
    },
    //gets the expense types and number of items in each type
    'SET_DIVIDEND_NAMES' (state, payload) {

        //push all types into expeseTypesOnly
        state.dividendNames = [];

        var array_elements = []
        var types = []
        var dividends

        if (state.dividendsTradingYearActive === true){
            dividends = state.dividendsTradingYear
        }
        else {
            dividends = state.dividends
        }

        state.dividendNames = []


        state.dividends.forEach(function(payload){
            let x = payload.name;
            state.dividendNames.push(x);
            state.dividendNames = uniq(state.dividendNames);
        });
        dividends.forEach(function(payload){
            let x = payload.name;
            array_elements.push(x);
        });


        array_elements.sort();

        var current = null;
        var cnt = 0;

        for (var i = 0; i < array_elements.length; i++) {

            if (array_elements[i] != current) {
                if (cnt > 0) {
                    types.push({name:current, count:cnt})
                }
                current = array_elements[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {

            types.push({name:current, count:cnt})
        }

       state.dividendNames = types;
    }
};

const actions = {
    setDividends: ({commit}, payload) => {
        commit('SET_DIVIDENDS', payload);
    },
    filterDividendTradingYear: ({commit}, payload) => {
        commit('FILTER_DIVIDEND_TRADING_YEAR', payload)
    },
    filterByDividendName: ({commit}, payload) => {
        commit('FILTER_DIVIDEND_NAME', payload)
    },
    removeFilterDividends: ({commit}) => {
        commit('REMOVE_FILTER_DIVIDENDS');
    },
    setDividendNames: ({commit}, payload) => {
        commit('SET_DIVIDEND_NAMES', payload)
    },
    showAllDividends: ({commit}) => {
        commit('SHOW_ALL_INVOICES')
    }
};

const getters = {

    dividends: state => {
       return state.dividends
    },
    dividendsFiltered: state => {
       return state.dividendsFiltered
    },
    dividendsViewingTradingYear: state => {
        return state.dividendsViewingTradingYear
    },
    //returns an array only of expense amounts
    dividendAmountsAry: state => {
        const dividends = state.dividends;
        let dividendsOnly = [];

        dividends.forEach(function(dividends){
            var x = dividends.dividend;
            dividendsOnly.push(x);
        });

        return dividendsOnly
    },
    //returns an array only of dividend amounts
    filteredDividendAmountsAry: state => {
        const dividendsFiltered = state.dividendsFiltered;
        let dividendsOnly = [];

        dividendsFiltered.forEach(function(dividendsFiltered){
            var x = dividendsFiltered.dividend;
            dividendsOnly.push(x);
        });

        return dividendsOnly
    },
    //returns an array of dividend names only
    dividendNames: state => {
        return state.dividendNames
    },
    dividendsFilterActive: state => {
        return state.dividendsFilterActive
    },
    //current trading year
    dividendsTradingYear: state => {
        return state.dividendsTradingYear
    },
    //true or false
    dividendsTradingYearActive: state => {
        return state.dividendsTradingYearActive
    },

    //returns an array only of invoice amounts
    tradingYearDividendAmountsAry: state => {
        const dividendsFiltered = state.dividendsTradingYear
        let dividendsOnly = [];

        dividendsFiltered.forEach(function(dividendsFiltered){
            var x = dividendsFiltered.dividend;
            dividendsOnly.push(x);
        });

        return dividendsOnly
    },

};

export default {
    state,
    mutations,
    actions,
    getters
};
