<template>
    <div>
        <div class="row">
            <div class="col-xs-12">
                <ul class="nav nav-pills nav-pills-inline">
                    <app-filter-type v-for="(type, index) in expenseTypes" :type="type"></app-filter-type>
                </ul>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
   
    import {mapActions} from 'vuex'

    import filterType from './FilterType.vue'

    
    export default {
		data(){
			return {
                isActive: false
            }
		},
        components: {
            appFilterType: filterType  
        },
        computed: {
            expenseTypes(){
                return this.$store.getters.expenses2Types
            }            
        }
        
	}
</script>
