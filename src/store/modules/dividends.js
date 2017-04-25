
import _ from 'lodash';
import * as firebase from 'firebase';

const state = {
    dividends: [],
    dividendsFiltered: [],
    dividendNames: [],
    dividendsFilterActive: false,
};

const mutations = {
    
    'SET_DIVIDENDS' (state, payload) {
        state.dividends = payload;
       
    },
    'SET_FILTERED_DIVIDENDS' (state, payload) {
        state.dividendsFiltered.push(payload);
        _.orderBy(state.dividendsFiltered, 'timestamp', ['desc']);
    },
    'FILTER_DIVIDEND_NAME'(state, payload){
        state.dividendsFiltered = _.filter(state.dividends, {name: payload}); 
        state.dividendsFilterActive = true;
    },
    'REMOVE_FILTER_DIVIDENDS'(state){
        state.dividendsFiltered = [];
        state.dividendsFilterActive = false;
    },
    //gets the expense types and number of items in each type
    'SET_DIVIDEND_NAMES' (state, payload) {
        
        //push all types into expeseTypesOnly
        state.dividendNames = [];
        
        var array_elements = []
        var types = []

        payload.forEach(function(payload){
            var x = payload.name;
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
    setFilteredDividends: ({commit}, payload) => {
        commit('SET_FILTERED_DIVIDENDS', payload);
    },
    filterByDividendName: ({commit}, payload) => {
        commit('FILTER_DIVIDEND_NAME', payload)
    },
    removeFilterDividends: ({commit}) => {
        commit('REMOVE_FILTER_DIVIDENDS');
    },
    setDividendNames: ({commit}, payload) => {
        commit('SET_DIVIDEND_NAMES', payload)
    }
};

const getters = {
    
    dividends: state => {
       return state.dividends
    },
    dividendsFiltered: state => {
       return state.dividendsFiltered
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
    //returns an array of expense types only
    dividendNames: state => {
        return state.dividendNames
    },
    dividendsFilterActive: state => {
        return state.dividendsFilterActive
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};