<template>
    <div>
        <section class="hero is-fullwidth is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Dividends</h1>
                    <h2 class="subtitle">Manage company dividend entries</h2>
                </div>
            </div>
        </section>
        <div class="container">
            <app-add-dividends :user="user"></app-add-dividends>
            <app-filter :showFilter="showFilter" :filterObject="dividendNames" filterTitle="dividends"></app-filter>
            <app-dividends :user="user"></app-dividends>
        </div>

    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import addDividends from './dividends/AddDividend.vue'
    import dividends from './dividends/Dividends.vue'
    import filter from './filter/filter.vue'

    export default {
        methods:{
             ...mapActions(['removeFilterDividends']),
        },
        created() {
            this.removeFilterDividends()
        },
        computed: {
            user() {
                return this.$store.getters.user
            },
            dividendNames(){
                return this.$store.getters.dividendNames
            },
            showFilter(){
                const that = this;
                return this.$store.getters.dividendNames.length > 1 ? true : false
            }
        },
        components: {
            appAddDividends: addDividends,
            appDividends: dividends,
            appFilter: filter,
        },
    }
</script>
