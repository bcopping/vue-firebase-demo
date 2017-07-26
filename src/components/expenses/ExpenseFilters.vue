<template>
    <div>
        <div class="tabs">
            <ul>
                <app-table-filter v-for="(data, index) in expenseTypes" :filterData="data" :filtering="expenses"></app-table-filter>
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
                expenses: 'expenses'
            }
		},
        components: {
            appTableFilter: tableFilter
        },
        computed: {
            expenseTypes(){
                return this.$store.getters.expenses2Types
            }
        }

	}
</script>
