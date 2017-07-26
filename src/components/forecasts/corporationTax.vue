<template>
    <div>
        <h1>Corporation Tax</h1>
        <app-trading-year :yearFor="title"></app-trading-year>
        <br />
        EXPENSES : {{expenses | currency('£')}}<br />
        WAGES: {{wages | currency('£')}}<br />
        INVOICES : {{invoices | currency('£')}}<br />
        ------------------------------
        <br />
        <b>Corporation tax estimate {{corpTaxDue | currency('£')}}</b>
    </div>
</template>
<script>
    import selectTradingYear from '../tradingYear/selectTradingYear.vue'
    import {mapActions} from 'vuex'
    import {addDecimals} from '../../lib/decimal-operations'
    import {corpTax} from '../../lib/tax-year/tax-calc-16-17'

    export default {
        data() {
            return {
                title : 'corpTax',
                tradingYear : ''
            }
        },
        components : {
            appTradingYear: selectTradingYear
        },
        props: [''],
        mixins: [],
        computed: {
            expenses(){
              let sum = this.$store.getters.tradingYearExpenseAmountsAry;

              return addDecimals(sum).toFixed(2);
            },
            wages(){
                let sum = this.$store.getters.tradingYearWageAmountsAry;

                return addDecimals(sum).toFixed(2);
            },
            invoices(){
                let sum = this.$store.getters.tradingYearInvoiceAmountsAry;

                return addDecimals(sum).toFixed(2);
            },
            corpTaxDue(){
                return corpTax('2016', this.wages, this.expenses, this.invoices)
            }
        },
        methods: {
            ...mapActions([
                'filterExpensesTradingYear',
                'filterWagesTradingYear',
                'filterInvoiceTradingYear',
            ]),
        },
        created(){

        },
        mounted(){
            let tradingYear = this.$store.getters.totalYearsTrading

            //get yr two
            this.filterExpensesTradingYear(tradingYear)
            this.filterWagesTradingYear(tradingYear)
            this.filterInvoiceTradingYear(tradingYear)



        }

    }
</script>
