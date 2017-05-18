<template>
    <div>
        <div class="row">
            <div class="col-xs-12">
                <ul class="nav nav-pills nav-pills-inline">
                    <app-filter-name v-for="(name, index) in dividendNames" :name="name"></app-filter-name>
                </ul>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
   
    import {mapActions} from 'vuex'

    import filterName from './FilterName.vue'

    
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
            dividendNames(){
                return this.$store.getters.dividendNames
            }            
        }
        
	}
</script>

