<template>
    <div>
        <div class="tabs">
            <ul>
                 <app-table-filter v-for="(data, index) in invoicesCompanies" :filterData="data" :filtering="invoices"></app-table-filter>
            </ul>
        </div>
    </div>
</template>

<script>

    import {mapActions} from 'vuex'

    import tableFilter from '../TableFilter.vue'

    export default {
		data(){
			return {
                isActive: false,
                invoices: 'invoices'
            }
		},
        components: {

            appTableFilter: tableFilter
        },
        computed: {
            invoicesCompanies(){

                return this.$store.getters.invoicesCompanies
            }
        }

	}
</script>
