<template>
     <select @change="setYear" v-model="selected">
        <option v-for="year in tradingYearsArry" v-bind:value="year">Year {{year}}</option>
        <option value="all">Show All</option>
      </select>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data() {
        return {
            t: this.$store.getters.totalYearsTrading
        }
    },
    props: ['yearFor'],
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
                
                    break;
                case 'expenses':
                
                    break;
            }
        },
    }
}
</script>
