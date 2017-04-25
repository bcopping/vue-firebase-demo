import _ from 'lodash';
import * as firebase from 'firebase';

const state = {
    wages: [],
    wagesFiltered: [],
    employeeNames: [],
    wagesFilterActive: false,
};

const mutations = {
    
    'SET_WAGES' (state, payload) {
        state.wages = payload;
       
    },
    'SET_FILTERED_WAGES' (state, payload) {
        state.wagesFiltered.push(payload);
        _.orderBy(state.wagesFiltered, 'timestamp', ['desc']);
    },
    'FILTER_NAME'(state, payload){
        state.wagesFiltered = _.filter(state.wages, {name: payload}); 
        state.wagesFilterActive = true;
    },
    'REMOVE_FILTER_WAGES'(state){
        state.wagesFiltered = [];
        state.wagesFilterActive = false;
    },
    //gets the expense types and number of items in each type
    'SET_EMPLOYEE_NAMES' (state, payload) {
        
        //push all types into expeseTypesOnly
        state.employeeNames = [];
        
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

       state.employeeNames = types; 
    }
};

const actions = {
    setWages: ({commit}, payload) => {
        commit('SET_WAGES', payload);
    },
    setFilteredWages: ({commit}, payload) => {
        commit('SET_FILTERED_WAGES', payload);
    },
    filterByName: ({commit}, payload) => {
        commit('FILTER_NAME', payload)
    },
    removeFilterWages: ({commit}) => {
        commit('REMOVE_FILTER_WAGES');
    },
    setEmployeeNames: ({commit}, payload) => {
        commit('SET_EMPLOYEE_NAMES', payload)
    }
};

const getters = {
    
    wages: state => {
       return state.wages
    },
    wagesFiltered: state => {
       return state.wagesFiltered
    },
    //returns an array only of expense amounts
    wageAmountsAry: state => {
        const wages = state.wages;
        let wagesOnly = [];
       
        wages.forEach(function(wages){
            var x = wages.wage;
            wagesOnly.push(x);
        });
        
        return wagesOnly
    },
    //returns an array only of wage amounts
    filteredWageAmountsAry: state => {
        const wagesFiltered = state.wagesFiltered;
        let wagesOnly = [];
       
        wagesFiltered.forEach(function(wagesFiltered){
            var x = wagesFiltered.wage;
            wagesOnly.push(x);
        });
        
        return wagesOnly
    },
    //returns an array of expense types only
    employeeNames: state => {
        return state.employeeNames
    },
    wagesFilterActive: state => {
        return state.wagesFilterActive
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};