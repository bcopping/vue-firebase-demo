<template>
    <div>
        <section class="hero is-fullwidth is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Wages</h1>
                    <h2 class="subtitle">Manage company employees wages</h2>
                </div>
            </div>
        </section>
        <div class="container">
            <app-add-wages :user="user"></app-add-wages>
            <app-filter :showFilter="showFilter" :filterObject="employeeNames" filterTitle="wages"></app-filter>
            <wage-table :user="user"></wage-table>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import addWages from './wages/AddWage.vue'
    import wageTable from './wages/Wages.vue'
    import filter from './filter/filter.vue'

    export default {
        methods:{
             ...mapActions(['removeFilterWages']),
        },
        created() {
            this.removeFilterWages()
        },
        computed: {
            user() {
                return this.$store.getters.user
            },
            employeeNames(){
                return this.$store.getters.employeeNames
            },
            showFilter(){
                const that = this;
                return this.$store.getters.employeeNames.length > 1 ? true : false
            }
        },
        components: {
            appAddWages: addWages,
            appFilter: filter,
            wageTable
        }
    }
</script>
