<template>
    <li>
        <a v-if="dividendWageType" @click="addFilter($event, filterData.name)">{{filterData.name}} <span class="badge">{{filterData.count}}</span></a>
        <a v-if="expenseType" @click="addFilter($event, filterData.type)">{{filterData.type}} <span class="badge">{{filterData.count}}</span></a>
        <a v-if="invoicesType" @click="addFilter($event, filterData.company)">{{filterData.company}} <span class="badge">{{filterData.count}}</span></a>
        <!--

            <a @click="addFilter($event, filterData.name)">{{filterData.name}} <span class="badge">{{filterData.count}}</span></a>
            <a @click="addFilter($event, filterData.name)">{{filterData.name}} <span class="badge">{{filterData.count}}</span></a>

        -->
    </li>
</template>

<script>

    import {mapActions} from 'vuex'

    import filtersOff from './mixins'

    export default {
		data(){
			return {
                isActive: false,
                dividend: false
            }
		},
        computed: {
            dividendWageType() {
                if (this.filtering === 'dividends' || this.filtering === 'wages') {
                    return true
                }
                else {
                    return false
                }
            },
            expenseType() {
                if (this.filtering === 'expenses') {
                    return true
                }
                else {
                    return false
                }
            },
            invoicesType(){
                if (this.filtering === 'invoices') {
                    return true
                }
                else {
                    return false
                }
            }

        },
        props: ['filterData','filtering'],
        mixins: [filtersOff],
        methods:{
             ...mapActions([
                'filterByDividendName',
                'removeFilterDividends',
                'filterByType',
                'removeFilterByExpenses',
                'filterByName',
                'removeFilterWages',
                'filterByInvoiceCompany',
                'removeFilterInvoices'
            ]),
            addFilter(e,filterData, filtering){
                console.log(this.filterData);
                console.log(this.filtering);
                let lis = e.target.parentElement.parentElement.childNodes;


                if(e.target.parentElement.classList.contains('is-active')) {

                    e.target.parentElement.classList.remove('is-active')

                    this.removeFilter();

                }
                else {

                    this.filtersOff();
                    for (var i = 0, len = lis.length; i < len; i++) {
                       lis[i].className = '';
                    }
                    e.target.parentElement.classList.add('is-active')
                    /*-- switch staement needed here --*/
                    this.filterByDividendName(filterData);
                    this.filterByName(filterData);


                    this.filterByType(filterData)
                    this.filterByInvoiceCompany(filterData);

                }
             },
            removeFilter(){
                this.removeFilterDividends();
                this.removeFilterByExpenses();
                this.removeFilterWages();
                this.removeFilterInvoices();
            }
        },

	}
</script>

