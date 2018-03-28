<template>
    <div>
        <section class="hero is-fullwidth is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Invoices</h1>
                    <h2 class="subtitle">Create and record your company invoices</h2>
                </div>
            </div>
        </section>
        <div class="container">
            <app-add-invoices :user="user"></app-add-invoices>
            <app-filter :showFilter="showFilter" :filterObject="invoicesCompanies" filterTitle="invoices"></app-filter>
            <app-invoices :user="user"></app-invoices>
        </div>
    </div>
</template>

<script>
    import addInvoices from './invoices/AddInvoice.vue'
    import invoices from './invoices/Invoices.vue'
    import filter from './filter/filter.vue'
    import {mapActions} from 'vuex'

    export default {
         methods:{
             ...mapActions(['removeFilterInvoices']),
        },
        created: function() {
            this.removeFilterInvoices()
        },
        computed: {
            user() {
                return this.$store.getters.user
            },
            invoicesCompanies(){
                return this.$store.getters.invoicesCompanies
            },
            showFilter(){
                const that = this;
                return this.$store.getters.invoicesCompanies.length > 1 ? true : false
            }
        },
        components: {
            appAddInvoices: addInvoices,
            appInvoices: invoices,
            appFilter: filter,
        }
    }
</script>
