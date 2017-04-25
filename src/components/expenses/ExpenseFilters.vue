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

    import _ from 'lodash'

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
<style>
    .actionableRow .rowActions {
        opacity:0
    }
    .actionableRow:hover .rowActions {
        opacity:1;
        float:right;
        cursor:pointer;
    }

    .table-striped>tbody>tr.totals {
        background-color:#999;
        color:#FFF;
    }
    .nav.nav-pills-inline {
        padding:0;
    }
    .nav-pills-inline li {
        display:inline-block;
        float:left
    }
</style>
