<template>
    <div>
        <div class="tabs">
            <ul>
                <app-table-filter v-for="(data, index) in dividendNames" :filterData="data" :filtering="dividends"></app-table-filter>
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
                dividends: 'dividends'
            }
		},
        components: {
            appTableFilter: tableFilter
        },
        computed: {
            dividendNames(){
                return this.$store.getters.dividendNames
            }
        }

	}
</script>

