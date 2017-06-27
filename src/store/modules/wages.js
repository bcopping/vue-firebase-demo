import * as firebase from 'firebase/app';


import filter from 'lodash/filter'
import uniq from 'lodash/uniq'

const state = {
    wages: [],
    wagesFiltered: [],
    employeeNames: [],
    wagesFilterActive: false,
    wagesTradingYear: [],
    wagesTradingYearActive: false,
    wagesViewingTradingYear: ''
};

const mutations = {
    
    'SET_WAGES' (state, payload) {
        
        state.wages = payload;
       console.log('STATE WAGES = ', state.wages);
    },
    'FILTER_NAME'(state, payload){
        if(state.wagesTradingYearActive == true){
            state.wagesFiltered = filter(state.wagesTradingYear, {name: payload}); 
        }
        else {
            state.wagesFiltered = filter(state.wages, {name: payload});
        }

        state.wagesFilterActive = true;
    },
    'FILTER_WAGES_TRADING_YEAR'(state, payload){
        console.log('FILTER WAGES TRADING YEAR', payload);
        console.log(payload);
        state.wagesTradingYear = filter(state.wages, {tradingYear: Number(payload)}); 
        console.log(state.wagesTradingYear);
        state.wagesTradingYearActive = true;
        state.wagesViewingTradingYear = payload;
    },
    'REMOVE_FILTER_WAGES'(state){
        state.wagesFiltered = [];
        state.wagesFilterActive = false;
    },
    'SHOW_ALL_WAGES'(state){
        state.wagesTradingYearActive = false;
    },
    //gets the expense types and number of items in each type
    'SET_EMPLOYEE_NAMES' (state, payload) {
        
        //push all types into expeseTypesOnly
        state.employeeNames = [];
        
        var array_elements = []
        var types = []
        var wages 

        if (state.wagesTradingYearActive === true){
            wages = state.wagesTradingYear
        }
        else {
            wages = state.wages
        }

        state.employeeNames = []

        
        state.wages.forEach(function(payload){
            let x = payload.name;
            state.employeeNames.push(x);
            state.employeeNames = uniq(state.employeeNames);
        });  
        wages.forEach(function(payload){
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

       state.employeeNames = types; 
    }
};

const actions = {
    setWages: ({commit}, payload) => {
        commit('SET_WAGES', payload);
    },
    filterByName: ({commit}, payload) => {
        commit('FILTER_NAME', payload)
    },
    removeFilterWages: ({commit}) => {
        commit('REMOVE_FILTER_WAGES');
    },
    setEmployeeNames: ({commit}, payload) => {
        commit('SET_EMPLOYEE_NAMES', payload)
    },
    filterWagesTradingYear: ({commit}, payload) => {
        commit('FILTER_WAGES_TRADING_YEAR', payload)
    },
    showAllWages: ({commit}) => {
        commit('SHOW_ALL_WAGES')
    },
    

    
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
    },
    wagesTradingYearActive: state => {
        
        return state.wagesTradingYearActive
    },
    wagesViewingTradingYear: state => {
        return state.wagesViewingTradingYear
    },
    wagesTradingYear: state => {
        
        return state.wagesTradingYear
    },
    //returns an array only of invoice amounts
    tradingYearWageAmountsAry: state => {
        const wagesFiltered = state.wagesTradingYear
        let wagesOnly = [];
       
        wagesFiltered.forEach(function(wagesFiltered){
            var x = wagesFiltered.wage;
            wagesOnly.push(x);
        });
        
        return wagesOnly
    },
    
};

export default {
    state,
    mutations,
    actions,
    getters
};