<template>
    <div>
        

        <h2>Invoices</h2>
        <div class="row">
            <div class="col-xs-12">
                <app-add-invoices :user="user"></app-add-invoices>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">                
                <app-invoice-filters :isInvoicesFiltered="isInvoicesFiltered"></app-invoice-filters>
            </div>
        </div>
        <div>
            <app-invoices :user="user"></app-invoices>
        </div>

        
    </div>
</template>

<script>
   
    import {config} from './firebase/config.js'
    
    import logon from './logon/LoginButton.vue'
    
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
<style>

    .newExpenseInput {
        opacity:0;
        position: absolute;
        left:-9999px;
    }
    .newExpenseInput.visible {
        position: relative;
        left: 0;
        opacity:1;
    }
</style>
