<template>
    <div class="select">
        <select @change="setYear" v-model="t">
            <option v-for="year in tradingYearsArry" v-bind:value="year">Year {{year}}</option>
            <option value="all">Show All</option>
        </select>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import filtersOff from '../mixins'

export default {
    data() {
        return {
            t: this.$store.getters.totalYearsTrading
        }
    },
    props: ['yearFor'],
    mixins: [filtersOff],
    computed: {
        tradingYearsArry(){
            return this.$store.getters.tradingYearsArry
        }
    },
    methods:{
        ...mapActions([
            'removeFilterInvoices',
            'filterInvoiceTradingYear',
            'setInvoiceCompanies',
            'showAllInvoices',
            'removeFilterDividends',
            'filterDividendTradingYear',
            'setDividendNames',
            'showAllDividends',
            'removeFilterWages',
            'filterWagesTradingYear',
            'setEmployeeNames',
            'showAllWages',
            'removeFilterByExpenses',
            'filterExpensesTradingYear',
            'setExpenseTypes',
            'showAllExpenses',
        ]),
        setYear(e){
            switch (this.yearFor) {
                case 'invoices':
                    this.removeFilterInvoices();
                    e.target.value == 'all' ?  this.showAllInvoices() : this.filterInvoiceTradingYear(e.target.value)
                    this.setInvoiceCompanies();
                    break;
                case 'dividends':
                    this.removeFilterDividends();
                    e.target.value == 'all' ?  this.showAllDividends() : this.filterDividendTradingYear(e.target.value)
                    this.setDividendNames();
                    break;
                case 'wages':
                    this.removeFilterWages();
                    e.target.value == 'all' ?  this.showAllWages() : this.filterWagesTradingYear(e.target.value)
                    this.setEmployeeNames();
                    break;
                case 'expenses':
                    this.removeFilterByExpenses();
                    e.target.value == 'all' ?  this.showAllExpenses() : this.filterExpensesTradingYear(e.target.value)
                    this.setExpenseTypes();
                    break;
                case 'corpTax':
                    console.log('corpTax', e.target.value)
                    /*
                        if we're calculating corp tax we need to get all that years invoices, wages and expenses and pass them into corp
                        tax calculator..
                    */
                    this.filterExpensesTradingYear(e.target.value)
                    this.filterWagesTradingYear(e.target.value)
                    this.filterInvoiceTradingYear(e.target.value)
                    break;
            }
            //this method will reset any active filter presentation state...
            this.filtersOff();
        },
    }
}
</script>
