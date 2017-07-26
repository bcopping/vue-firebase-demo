<template>
    <div>
        <section class="hero is-fullwidth is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Expenses</h1>
                    <h2 class="subtitle">Create company expense records</h2>
                </div>
            </div>
        </section>
        <div class="container">
            <app-add-expenses :user="user"></app-add-expenses>

            <app-expense-filters :isFiltered="isFiltered"></app-expense-filters>

            <app-expenses-table :user="user"></app-expenses-table>
        </div>
    </div>
</template>

<script>

    import {config} from './firebase/config.js'



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
