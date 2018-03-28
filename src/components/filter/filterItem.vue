<template>
    <li class="filter">
        <a @click="addFilter($event, filterData)">{{title}} <span class="badge">{{filterData.count}}</span></a>
    </li>
</template>

<script>
    import {mapActions} from 'vuex'
    import filtersOff from '../mixins'

    export default {
		data(){
			return {
                isActive: false
            }
		},
        props: ['filterData','filtering'],
        computed: {
            title(){
                switch(this.filtering) {
                    case 'dividends':
                        return this.filterData.name
                    break
                    case 'wages':
                        return this.filterData.name
                    break
                    case 'expenses':
                        return this.filterData.type
                    break
                    case 'invoices':
                        return this.filterData.company
                    break
                    default:
                        return
                }
            },
        },
        mixins: [filtersOff],
        methods:{
             ...mapActions([
                'filterByDividendName',
                'filterByInvoiceCompany',
                'filterByName',
                'filterByType',
                'removeFilterByExpenses',
                'removeFilterDividends',
                'removeFilterInvoices',
                'removeFilterWages',
            ]),
            addFilter(e,filter){
                const lis = e.target.parentElement.parentElement.childNodes;
                if(e.target.parentElement.classList.contains('is-active')) {
                    e.target.parentElement.classList.remove('is-active')
                    this.removeFilter();
                }
                else {
                    this.filtersOff();
                    for (var i = 0, len = lis.length; i < len; i++) {
                       lis[i].classList.remove('is-active')
                    }
                    e.target.parentElement.classList.add('is-active')

                    //call filter actions
                    switch(this.filtering) {
                        case 'dividends':
                            this.filterByDividendName(filter.name);
                        break
                        case 'wages':
                            this.filterByName(filter.name);
                        break
                        case 'expenses':
                            this.filterByType(filter.type)
                        break
                        case 'invoices':
                            this.filterByInvoiceCompany(filter.company);
                        break
                        default:
                    return
                }
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

