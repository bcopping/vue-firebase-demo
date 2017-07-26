<template>
     <div>
        <h1> Tax year calculations</h1>
        <p>Tax year calculations are performed from 6th April and are automatically calculated by wages and dividend payments you have created</p>
        <select ref="setYear">
            <option v-for="year in selectTaxYear" v-bind:value="year.taxYear">Tax Year {{year.taxYear}} / {{year.taxYear + 1}}</option>
        </select>
        <select ref="setName">
            <option v-for="name in people" v-bind:value="name.name">Name {{name.name}}</option>
        </select>
        <button @click="runCalcs">go</button>
        <p>Total Dividends : {{userDivAmount | currency('£')}}<br />
            Total Wages : {{userWagesAmount | currency('£')}}</p>
        -----------------------------------------
        <p><b>Dividend tax Due : {{divTaxDue | currency('£')}}</b></p>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import {getDateRangeResults} from '../../lib/tax-year/return-date-range'
import {divTax1617} from '../../lib/tax-year/tax-calc-16-17'

import getWages from '../mixins'
import getDividends from '../mixins'
import filter from 'lodash/filter'
import {addDecimals} from '../../lib/decimal-operations'

export default {
    data() {
        return {
            userDivAmount: '',
            userWagesAmount: '',
            divTaxDue: ''
        }
    },
    props: [''],
    mixins: [getWages ,getDividends],
    computed: {
        people() {
            return this.$store.getters.people
        },
        selectTaxYear(){
            return this.$store.getters.selectTaxYear
        },

    },
    methods:{
        ...mapActions([

        ]),

        calculateDivTax(){
            /*--
                This is where we send data to the tax year filter func to return per tax year.
                data is wages, divs etc...
            --*/
            let dividendVals = this.$store.getters.dividends
            let wagesvals = this.$store.getters.wages


            //set the start and end dates for tax year ranges
            let d = this.$refs.setYear;
            let endDate = parseInt(d.options[d.selectedIndex].value) + 1;
            let dateRange = [];
            endDate = endDate + '-04-05'
            const startDate = d.options[d.selectedIndex].value + '-04-06'

            //pass our required arrays through the date range filter
            let taxRangeWages = getDateRangeResults(startDate, endDate, wagesvals);
            let taxRangeDividends = getDateRangeResults(startDate, endDate, dividendVals);

            //second filter should be for each person in state.dividendNames create div arrays for each of them
            taxRangeWages = filter(taxRangeWages, {name: this.$refs.setName.options[this.$refs.setName.selectedIndex].value});
            taxRangeDividends = filter(taxRangeDividends, {name: this.$refs.setName.options[this.$refs.setName.selectedIndex].value});

            let taxWagesOnly = [];
            let taxDividendsOnly = [];

            taxRangeWages.forEach(function(amount){
                var x = amount.wage;
                taxWagesOnly.push(x);
            });

            taxRangeDividends.forEach(function(amount){
                var x = amount.dividend;
                taxDividendsOnly.push(x);
            });

            this.userDivAmount = addDecimals(taxDividendsOnly).toFixed(2);
            this.userWagesAmount = addDecimals(taxWagesOnly).toFixed(2);

            this.divTaxDue = divTax1617(this.userWagesAmount, this.userDivAmount);

        },
        runCalcs(){
            this.calculateDivTax();

        }

    },

    mounted() {
        this.runCalcs()

    }

}
</script>
