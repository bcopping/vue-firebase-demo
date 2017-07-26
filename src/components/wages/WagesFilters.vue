<template>
    <div>
        <div class="tabs">
            <ul>
                <app-table-filter v-for="(data, index) in employeeNames" :filterData="data" :filtering="wages"></app-table-filter>
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
                wages: 'wages'
            }
		},
        components: {
            appTableFilter: tableFilter
        },
        computed: {
            employeeNames(){
                return this.$store.getters.employeeNames
            }
        }

	}
</script>
