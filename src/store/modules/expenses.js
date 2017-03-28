import _ from 'lodash';
import * as firebase from 'firebase';

const state = {
    expenses: {

    },
    expenses2: [],
    amounts: [

    ]
};

const mutations = {
    'SET_EXPENSES' (state, payload) {
        state.expenses = payload;
        console.log('store expenses', state);
    },
    'SET_EXPENSES2' (state, payload) {
        state.expenses2 = payload;
        console.log('store expenses2', state);
    },
    'EXPENSE_ORDER'(state, payload){
        console.log(payload);
        state.expenses2 = _.orderBy(state.expenses2, [payload.orderBy], [payload.asDs]);
    }
};

const actions = {
    setExpenses: ({commit}, payload) => {
        commit('SET_EXPENSES', payload);
    },
    setExpenses2: ({commit}, payload) => {
        commit('SET_EXPENSES2', payload);
    },
    expensesOrdering: ({commit}, payload) => {
        commit('EXPENSE_ORDER', payload);
        
    }
};

const getters = {
   allexpenses: state => {
    return state;
   },
   expenseTypes: state => {
        var keys = [];
        for (var key in state.expenses) {
            keys.push(key);
        }

        return keys
    },
    expenses: state => type => {

        var test = state.expenses[type]

       return state.expenses[type]
    },
    expenses2: state => {
       return state.expenses2
    },
    expenseAmountsAry: state => {
        const expenses2 = state.expenses2;
        let expensesOnly = [];
       
        expenses2.forEach(function(expenses2){
            var x = expenses2.amount;
            expensesOnly.push(x);
        });
        
        return expensesOnly
    },
    expenses2Types: state => {
        const expenses2 = state.expenses2;
        let expenseTypesOnly = [];
        
        expenses2.forEach(function(expenses2){
            var x = expenses2.type;
            expenseTypesOnly.push(x);
        });
        
        

        return _.uniq(expenseTypesOnly);


    },

    getExpenses2: state => uid => {
        console.log('uid -------------------', uid);
        
        const ref = firebase.database().ref('users/'+ uid).child('/expenses2/')
        
        var expenses = [];
        var amounts = [];
        
        ref.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(expense) {
                expenses.push( expense.val() );
            });
            console.log(expenses);
            console.log(actions);
            //actions.setExpenses2(expenses);
        });
    },


    
};

export default {
    state,
    mutations,
    actions,
    getters
};