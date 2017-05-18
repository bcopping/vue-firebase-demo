<template>
    <div>
        <h2>Expenses</h2>
        <div class="row">
            <div class="col-xs-12">
                <app-add-expenses :user="user"></app-add-expenses>
            </div>
        </div>
        
        <div class="row">
            <div class="col-xs-12">                
                <app-expense-filters :isFiltered="isFiltered"></app-expense-filters>
            </div>
        </div>

        <div>
            <app-expenses-table :user="user"></app-expenses-table>
        </div>
       
        
    </div>
</template>

<script>
   
    import {config} from './firebase/config.js'
    
    import logon from './logon/LoginButton.vue'
   
    import addExpenses from './expenses/AddExpense.vue'
    import expenseFilters from './expenses/ExpenseFilters.vue'
    import expenses from './expenses/Expenses.vue'
    
    
    export default {
        data() {
            return {
              
            }
        },
        
        computed: {
            user() {
                return this.$store.getters.user
            },
            isFiltered(){
                return this.$store.getters.expensesFilterActive;
            },
        },
        
        components: {
            appAddExpenses: addExpenses,
            appExpenseFilters: expenseFilters,
            appExpensesTable: expenses,
            
        }
    }
</script>