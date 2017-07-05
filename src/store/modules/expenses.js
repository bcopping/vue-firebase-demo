
//var _ = require('lodash/core')
import filter from 'lodash/filter'
import orderBy from 'lodash/orderBy'
import uniq from 'lodash/uniq'
import * as firebase from 'firebase/app';

const state = {
    expenses2: [],
    expensesFiltered: [],
    allExpenseTypes: [],
    expenseTypes: [],
    expensesFilterActive: false,
    expensesTradingYear: [],
    expensesTradingYearActive: false,
    expensesViewingTradingYear: ''
};

const mutations = {
    
    'SET_EXPENSES2' (state, payload) {
        state.expenses2 = payload;     
    },
    'SET_FILTERED_EXPENSES' (state, payload) {
        state.expensesFiltered.push(payload);
        orderBy(state.expensesFiltered, 'timestamp', ['desc']);
    },
    'DELETE_FILTERED_EXPENSE' (state, payload) {
        var items = state.expensesFiltered
        for (var i = 0; i < items.length; i++)
        if (items[i].id && items[i].id === payload) { 
            items.splice(i, 1);
            break;
        }
    },
    'EXPENSE_ORDER'(state, payload){
        state.expenses2 = orderBy(state.expenses2, [payload.orderBy], [payload.asDs]);
        state.expensesFiltered = orderBy(state.expensesFiltered, [payload.orderBy], [payload.asDs]);
    },
    'FILTER_EXPENSES'(state, payload){
        console.log('FILTER EXPENSES PAYLOAD = ', payload);
        if(state.expensesTradingYearActive == true){
            state.expensesFiltered = filter(state.expensesTradingYear, {type: payload}); 
        }
        else {
            state.expensesFiltered = filter(state.expenses2, {type: payload}); 
        }
        state.expensesFilterActive = true;
    },
    'FILTER_EXPENSES_TRADING_YEAR'(state, payload){
        state.expensesTradingYear = filter(state.expenses2, {tradingYear: Number(payload)}); 
        
        state.expensesTradingYearActive = true;
        state.expensesViewingTradingYear = payload;
    },
    'SHOW_ALL_EXPENSES'(state){
        state.expensesTradingYearActive = false;
    },
    'REMOVE_FILTER_EXPENSES'(state){
        state.expensesFiltered = [];
        state.expensesFilterActive = false;
    },
    //gets the expense types and number of items in each type
    'SET_EXPENSE_TYPES' (state, payload) {
        
        //push all types into expeseTypesOnly
        state.expenseTypes = []
        state.allExpenseTypes = []
        
        var array_elements = []
        var types = []
        var expenses 

        if (state.expensesTradingYearActive === true){
            expenses = state.expensesTradingYear
        }
        else {
            expenses = state.expenses2
        }
        
        state.expenses2.forEach(function(payload){
            let x = payload.type;
            state.expenseTypes.push(x);
            state.allExpenseTypes.push(x);
        });
        
        //ditch the duplicates...
        state.expenseTypes = uniq(state.expenseTypes);
        state.allExpenseTypes = uniq(state.expenseTypes);
          
        expenses.forEach(function(payload){
            let x = payload.type;
            array_elements.push(x);
        });  


        array_elements.sort();
		
        var current = null;
        var cnt = 0;

        for (var i = 0; i < array_elements.length; i++) {
            
            if (array_elements[i] != current) {
                if (cnt > 0) {
                    types.push({type:current, count:cnt})
                }
                current = array_elements[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {
            
            types.push({type:current, count:cnt})
        }

       state.expenseTypes = types; 
    }
};

const actions = {
    setExpenses2: ({commit}, payload) => {
        commit('SET_EXPENSES2', payload);
    },
    setFilteredExpenses: ({commit}, payload) => {
        commit('SET_FILTERED_EXPENSES', payload);
    },
    deleteFilteredExpense: ({commit}, payload) => {
        commit('DELETE_FILTERED_EXPENSE', payload);
    },
    
    filterByType: ({commit}, payload) => {
        commit('FILTER_EXPENSES', payload)
    },
    removeFilterByExpenses: ({commit}) => {
        commit('REMOVE_FILTER_EXPENSES');
    },
    setExpenseTypes: ({commit}, payload) => {
        commit('SET_EXPENSE_TYPES', payload)
    },
    filterExpensesTradingYear: ({commit}, payload) => {
        commit('FILTER_EXPENSES_TRADING_YEAR', payload)
    },
    showAllExpenses: ({commit}) => {
        commit('SHOW_ALL_EXPENSES')
    },
};

const getters = {
    allexpenses: state => {
        return state;
    },
    expenses2: state => {
       return state.expenses2
    },
    expensesFiltered: state => {
       return state.expensesFiltered
    },
    //returns an array only of expense amounts
    expenseAmountsAry: state => {
        const expenses2 = state.expenses2;
        let expensesOnly = [];
       
        expenses2.forEach(function(expenses2){
            var x = expenses2.amount;
            expensesOnly.push(x);
        });
        
        return expensesOnly
    },
    //returns an array only of expense amounts
    filteredExpenseAmountsAry: state => {
        const expensesFiltered = state.expensesFiltered;
        let expensesOnly = [];
       
        expensesFiltered.forEach(function(expensesFiltered){
            var x = expensesFiltered.amount;
            expensesOnly.push(x);
        });
        
        return expensesOnly
    },
    //returns an array only of expense amounts
    expenseAmountsVATAry: state => {
        const expenses2 = state.expenses2;
        let expensesOnly = [];
       
        expenses2.forEach(function(expenses2){
            var x = expenses2.amountVAT;
            expensesOnly.push(x);
        });
        
        return expensesOnly
    },
    //returns an array only of expense amounts
    filteredExpenseAmountsVATAry: state => {
        const expensesFiltered = state.expensesFiltered;
        let expensesOnly = [];
       
        expensesFiltered.forEach(function(expensesFiltered){
            var x = expensesFiltered.amountVAT;
            expensesOnly.push(x);
        });
        
        return expensesOnly
    },
    //returns an array of expense types by trading year, used for filtering types by year
    expenses2Types: state => {
        return state.expenseTypes
    },
    //returns an array of all expense types
    allExpenses2Types: state => {
        return state.allExpenseTypes
    },
    expensesFilterActive: state => {
        return state.expensesFilterActive
    },
    expensesTradingYearActive: state => {
        
        return state.expensesTradingYearActive
    },
    expensesViewingTradingYear: state => {
        return state.expensesViewingTradingYear
    },
    expensesTradingYear: state => {
        
        return state.expensesTradingYear
    },
    //returns an array only of invoice amounts
    tradingYearExpenseAmountsAry: state => {
        const expensesFiltered = state.expensesTradingYear
        let expensesOnly = [];
       
        expensesFiltered.forEach(function(expensesFiltered){
            var x = expensesFiltered.amount;
            expensesOnly.push(x);
        });
        
        return expensesOnly
    },
    //returns an array only of invoice amounts
    tradingYearExpenseAmountsVATAry: state => {
        const expensesFiltered = state.expensesTradingYear;
        let expensesOnly = [];
       
        expensesFiltered.forEach(function(expensesFiltered){
            var x = expensesFiltered.amountVAT;
            expensesOnly.push(x);
        });
        
        return expensesOnly
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};