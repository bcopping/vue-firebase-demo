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

            <app-dividend-filters :isDividendsFiltered="isDividendsFiltered"></app-dividend-filters>

            <app-dividends :user="user"></app-dividends>
        </div>

    </div>
</template>

<script>

    import addDividends from './dividends/AddDividend.vue'
    import dividendFilters from './dividends/DividendsFilters.vue'
    import dividends from './dividends/Dividends.vue'

    export default {
        data() {
            return {

            }
        },

        computed: {
            user() {
                return this.$store.getters.user
            },

            isDividendsFiltered(){
                return this.$store.getters.dividendsFilterActive;
            },

        },

        components: {

            appAddDividends: addDividends,
            appDividendFilters: dividendFilters,
            appDividends: dividends,

        },

    }
</script>
