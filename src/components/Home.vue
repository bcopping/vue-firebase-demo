<template>
    <div>
        <h2>Expenses</h2>
        <div class="row">
            <div class="col-xs-12">
                <app-add-expenses></app-add-expenses>
            </div>
        </div>
        
        <div class="row">
            <div class="col-xs-12">                
                <app-expense-filters :isFiltered="isFiltered"></app-expense-filters>
            </div>
        </div>

        <div>
            <app-expenses></app-expenses>
        </div>
       
        <hr>

        <h2>Wages</h2>
        <div class="row">
            <div class="col-xs-12">
                <app-add-wages></app-add-wages>
            </div>  

        </div>

        <div class="row">
            <div class="col-xs-12">                
                <app-wage-filters :isWagesFiltered="isWagesFiltered"></app-wage-filters>
            </div>
        </div>
        
        <app-wages></app-wages>
        <hr />
        <h2>Dividends</h2>
        <div class="row">
            <div class="col-xs-12">
                <app-add-dividends></app-add-dividends>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">                
                <app-dividend-filters :isDividendsFiltered="isDividendsFiltered"></app-dividend-filters>
            </div>
        </div>
        <app-dividends ></app-dividends>
        

        <h2>Invoices</h2>
        <div class="row">
            <div class="col-xs-12">
                <app-add-invoices></app-add-invoices>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">                
                <app-invoice-filters :isInvoicesFiltered="isInvoicesFiltered"></app-invoice-filters>
            </div>
        </div>
        <div>
            <app-invoices></app-invoices>
        </div>

        <h2>People</h2>
        <div class="row">
            <div class="col-xs-12">
                <app-add-company-person></app-add-company-person>
            </div>
        </div>
        <app-company-person-select></app-company-person-select>
    </div>
</template>

<script>
   
    import {config} from './firebase/config.js'
    
    import logon from './logon/LoginButton.vue'
   
    import addExpenses from './expenses/AddExpense.vue'
    import expenseFilters from './expenses/ExpenseFilters.vue'
    import expenses from './expenses/Expenses.vue'
    
    import addWages from './wages/AddWage.vue'
    import wageFilters from './wages/WagesFilters.vue'
    import wages from './wages/Wages.vue'
    
    
    import addDividends from './dividends/AddDividend.vue'
    import dividendFilters from './dividends/DividendsFilters.vue'
    import dividends from './dividends/Dividends.vue'

    import invoiceFilters from './invoices/InvoicesFilters.vue'
    import addInvoices from './invoices/AddInvoice.vue'
    import invoices from './invoices/Invoices.vue'
    
    import addPerson from './people/AddCompanyPerson.vue'
    import companyPersonSelect from './people/CompanyPersonSelect.vue'
    
    export default {
        data() {
            return {
              
            }
        },
        
        computed: {
            
            isFiltered(){
                return this.$store.getters.expensesFilterActive;
            },
            isWagesFiltered(){
                return this.$store.getters.wagesFilterActive;
            },
            isDividendsFiltered(){
                return this.$store.getters.dividendsFilterActive;
            },
            isInvoicesFiltered(){
                return this.$store.getters.invoicesFilterActive;
            },
            
        },
        
        components: {
            appAddExpenses: addExpenses,
            appExpenseFilters: expenseFilters,
            appExpenses: expenses,
            appAddWages: addWages,
            appWageFilters: wageFilters,
            appWages: wages,
            appAddDividends: addDividends,
            appDividendFilters: dividendFilters,
            appDividends: dividends,
            appInvoiceFilters: invoiceFilters,
            appAddInvoices: addInvoices,
            appInvoices: invoices,
            appAddCompanyPerson: addPerson,
            appCompanyPersonSelect: companyPersonSelect,
            
        },
        
        created() {
            
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
