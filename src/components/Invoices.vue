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

            <app-invoice-filters :isInvoicesFiltered="isInvoicesFiltered"></app-invoice-filters>

            <app-invoices :user="user"></app-invoices>
        </div>
    </div>
</template>

<script>

    import {config} from './firebase/config.js'



    import invoiceFilters from './invoices/InvoicesFilters.vue'
    import addInvoices from './invoices/AddInvoice.vue'
    import invoices from './invoices/Invoices.vue'

    export default {
        data() {
            return {

            }
        },
        computed: {
            user() {
                return this.$store.getters.user
            },
            isInvoicesFiltered(){
                return this.$store.getters.invoicesFilterActive;
            },
        },
        components: {
            appInvoiceFilters: invoiceFilters,
            appAddInvoices: addInvoices,
            appInvoices: invoices,
        }
    }
</script>
