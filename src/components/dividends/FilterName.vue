<template>
   
                    
        <li class="filter">
            <a @click="addFilter($event, name.name)">{{name.name}} <span class="badge">{{name.count}}</span></a>
        </li>

            
</template>

<script>
   
    import {mapActions} from 'vuex'

    import _ from 'lodash'

    
    import filtersOff from '../mixins'
    
    export default {
		data(){
			return {
                isActive: false
            }
		},
        props: ['name'],
        mixins: [filtersOff],
        methods:{
             ...mapActions([    
                'filterByDividendName',
                'removeFilterDividends'
            ]),
            addFilter(e,name){
                if(e.target.parentElement.classList.contains('active')) {
                    
                    e.target.parentElement.classList.remove('active')
                    
                    this.removeFilter();
                    
                }
                else {
                    
                    this.filtersOff();


                    e.target.parentElement.classList.add('active')
                    
                    this.filterByDividendName(name);
                }
             },
            removeFilter(){
                this.removeFilterDividends();
            }
            
            
        },
        created(){
            //this.removeFilter();
        }
	}
</script>
<style>
    .filter a {
        cursor: pointer
    }
</style>
