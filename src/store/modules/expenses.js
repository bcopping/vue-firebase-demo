import _ from 'lodash';
import * as firebase from 'firebase';

const state = {
   
    expenses2: [],
    expensesFiltered: [],
    
    expenseTypes: [

    ],
    expensesFilterActive: false,
};

const mutations = {
    
    'SET_EXPENSES2' (state, payload) {
        state.expenses2 = payload;
       
    },
    'SET_FILTERED_EXPENSES' (state, payload) {
        state.expensesFiltered.push(payload);
        _.orderBy(state.expensesFiltered, 'timestamp', ['desc']);
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
        state.expenses2 = _.orderBy(state.expenses2, [payload.orderBy], [payload.asDs]);
        state.expensesFiltered = _.orderBy(state.expensesFiltered, [payload.orderBy], [payload.asDs]);
    },
    'FILTER_EXPENSES'(state, payload){
        state.expensesFiltered = _.filter(state.expenses2, {type: payload}); 
        state.expensesFilterActive = true;
    },
    'REMOVE_FILTER_EXPENSES'(state){
        state.expensesFiltered = [];
        state.expensesFilterActive = false;
    },
    //gets the expense types and number of items in each type
    'SET_EXPENSE_TYPES' (state, payload) {
        
        //push all types into expeseTypesOnly
        state.expenseTypes = [];
        
        var array_elements = []
        var types = []

        payload.forEach(function(payload){
            var x = payload.type;
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
    expensesOrdering: ({commit}, payload) => {
        commit('EXPENSE_ORDER', payload); 
    },
    filterByType: ({commit}, payload) => {
        commit('FILTER_EXPENSES', payload)
    },
    removeFilterByType: ({commit}) => {
        commit('REMOVE_FILTER_EXPENSES');
    },
    setExpenseTypes: ({commit}, payload) => {
        commit('SET_EXPENSE_TYPES', payload)
    }
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
    //returns an array of expense types only
    expenses2Types: state => {
        return state.expenseTypes
    },
    expensesFilterActive: state => {
        return state.expensesFilterActive
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};