<template>
    <div>
        <div class="row">
            <div class="col-xs-12">
                <ul class="nav nav-pills nav-pills-inline">
                    <app-filter-name v-for="(name, index) in invoicesCompanies" :name="name"></app-filter-name>
                </ul>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
   
    import {mapActions} from 'vuex'

    import _ from 'lodash'

    import filterName from './FilterInvCompany.vue'

    
    export default {
		data(){
			return {
                isActive: false
            }
		},
        components: {
            appFilterName: filterName
        },
        computed: {
            invoicesCompanies(){
                
                return this.$store.getters.invoicesCompanies
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
