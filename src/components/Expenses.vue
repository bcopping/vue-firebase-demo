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
            <app-filter :showFilter="showFilter" :filterObject="expenseTypes" filterTitle="expenses"></app-filter>
            <app-expenses-table :user="user"></app-expenses-table>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import addExpenses from './expenses/AddExpense.vue'
    import expenses from './expenses/Expenses.vue'
    import filter from './filter/filter.vue'

    export default {
        methods:{
             ...mapActions(['removeFilterByExpenses']),
        },
        created: function() {
            this.removeFilterByExpenses()
        },
        computed: {
            user() {
                return this.$store.getters.user
            },
            expenseTypes(){
                return this.$store.getters.expenses2Types
            },
            showFilter(){
                const that = this;
                return this.$store.getters.expenses2Types.length > 1 ? true : false
            }
        },
        components: {
            appAddExpenses: addExpenses,
            appExpensesTable: expenses,
            appFilter: filter,
        }
    }
</script>
